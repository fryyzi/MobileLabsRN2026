import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function ProfileScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Реєстрація</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Електронна пошта</Text>
        <TextInput 
          style={styles.input} 
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address"
        />

        <Text style={styles.label}>Пароль</Text>
        <TextInput 
          style={styles.input} 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
        />

        <Text style={styles.label}>Пароль (ще раз)</Text>
        <TextInput 
          style={styles.input} 
          value={confirmPassword} 
          onChangeText={setConfirmPassword} 
          secureTextEntry 
        />

        <Text style={styles.label}>Прізвище</Text>
        <TextInput 
          style={styles.input} 
          value={lastName} 
          onChangeText={setLastName} 
        />

        <Text style={styles.label}>Ім'я</Text>
        <TextInput 
          style={styles.input} 
          value={firstName} 
          onChangeText={setFirstName} 
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Зареєструватися</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    paddingHorizontal: 30, 
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 20
  },
  header: { 
    fontSize: 28, 
    fontWeight: '400', 
    marginVertical: 30,
    color: '#333' 
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 'auto',
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    paddingTop: 20
  }
});