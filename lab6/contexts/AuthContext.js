import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          const profileData = userDoc.exists() ? userDoc.data() : {};
          setUser({ ...currentUser, ...profileData });
        } catch (error) {
          console.warn("Помилка отримання профілю:", error);
          setUser({ ...currentUser }); 
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const register = async (email, password, name, age, city) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    
    await setDoc(doc(db, 'users', uid), {
      name,
      age,
      city,
      email,
      uid,
      createdAt: new Date().toISOString()
    });
    
    return userCredential;
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    const profileData = userDoc.exists() ? userDoc.data() : {};
    const fullUser = { ...userCredential.user, ...profileData };
    setUser(fullUser);
    return userCredential;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const updateProfile = async (data) => {
    if (!user) throw new Error('Користувач не авторизований');
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, data);
    setUser(prev => ({ ...prev, ...data }));
  };

  const getProfile = async () => {
    if (!user) return null;
    const docSnap = await getDoc(doc(db, 'users', user.uid));
    return docSnap.exists() ? docSnap.data() : null;
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const reauthenticate = async (password) => {
    const currentUser = auth.currentUser;
    if (!currentUser || !currentUser.email) throw new Error('Користувач не знайдений');
    const credential = EmailAuthProvider.credential(currentUser.email, password);
    await reauthenticateWithCredential(currentUser, credential);
  };

  const deleteAccount = async (password) => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('Користувач не авторизований');
    
    await reauthenticate(password);
    await deleteDoc(doc(db, 'users', currentUser.uid));
    await deleteUser(currentUser);
    setUser(null);
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateProfile,
    resetPassword,
    deleteAccount,
    getProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};