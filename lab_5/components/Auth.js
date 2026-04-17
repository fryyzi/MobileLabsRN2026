import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert 
} from 'react-native';

export const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAction = () => {
    if (email && password) {
      // Тут можна додати реальну логіку перевірки через AuthContext
      onLogin();
    } else {
      Alert.alert("Помилка", "Будь ласка, заповніть усі поля");
    }
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.authTitle}>{isLogin ? 'Вхід' : 'Реєстрація'}</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Електронна пошта" 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Пароль" 
        value={password}
        onChangeText={setPassword}
        secureTextEntry 
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.mainButton} onPress={handleAction} activeOpacity={0.8}>
        <Text style={styles.buttonText}>
          {isLogin ? 'Увійти' : 'Створити акаунт'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin ? 'Немає акаунту? Зареєструватися' : 'Вже є акаунт? Увійти'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  authContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 30, 
    backgroundColor: '#FFF' 
  },
  authTitle: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 30, 
    textAlign: 'center',
    color: '#333'
  },
  input: { 
    backgroundColor: '#F5F5F5', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 15, 
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#EEE'
  },
  mainButton: { 
    backgroundColor: '#007AFF', 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: { 
    color: '#FFF', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  switchText: { 
    color: '#007AFF', 
    textAlign: 'center', 
    marginTop: 25, 
    fontSize: 15,
    fontWeight: '500'
  }
});