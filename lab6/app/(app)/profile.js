import {
  View, Text, TextInput, Alert, StyleSheet,
  ActivityIndicator, Modal, TouchableOpacity, ScrollView
} from 'react-native';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
  const { user, updateProfile, deleteAccount, logout } = useAuth();
  
  const [name, setName] = useState(user?.name || '');
  const [age, setAge] = useState(user?.age ? String(user.age) : '');
  const [city, setCity] = useState(user?.city || '');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      const parsedAge = age ? parseInt(age, 10) : 0; 
      await updateProfile({ name, age: parsedAge, city });
      setIsEditing(false);
      Alert.alert('Успішно', 'Профіль оновлено');
    } catch (error) {
      Alert.alert('Помилка', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      Alert.alert('Помилка', 'Введіть поточний пароль');
      return;
    }
    try {
      setLoading(true);
      await deleteAccount(deletePassword);
    } catch (error) {
      Alert.alert('Помилка видалення', error.message);
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
      setDeletePassword('');
    }
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Мій профіль</Text>
      </View>

      <View style={styles.card}>
        {!isEditing ? (
          <>
            <InfoRow label="Email" value={user.email} />
            <InfoRow label="Ім'я" value={user.name} />
            <InfoRow label="Вік" value={user.age} />
            <InfoRow label="Місто" value={user.city} />
            
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
              <Text style={styles.editButtonText}>Редагувати профіль</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.inputLabel}>Ім'я</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholderTextColor="#9CA3AF"
            />
            <Text style={styles.inputLabel}>Вік</Text>
            <TextInput
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor="#9CA3AF"
            />
            <Text style={styles.inputLabel}>Місто</Text>
            <TextInput
              value={city}
              onChangeText={setCity}
              style={styles.input}
              placeholderTextColor="#9CA3AF"
            />
            
            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.saveButton, loading && styles.disabledOpacity]} onPress={handleSave} disabled={loading}>
                <Text style={styles.saveButtonText}>Зберегти</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
                <Text style={styles.cancelButtonText}>Скасувати</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {!isEditing && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutButtonText}>Вийти з акаунту</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.deleteButton} onPress={() => setShowDeleteConfirm(true)}>
            <Text style={styles.deleteButtonText}>Видалити акаунт</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal visible={showDeleteConfirm} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Видалення акаунту</Text>
            <Text style={styles.modalText}>Цю дію неможливо скасувати. Будь ласка, введіть свій пароль для підтвердження.</Text>
            
            <TextInput
              secureTextEntry
              value={deletePassword}
              onChangeText={setDeletePassword}
              style={styles.input}
              placeholder="Ваш пароль"
              placeholderTextColor="#9CA3AF"
            />
            
            <View style={styles.modalButtonRow}>
              <TouchableOpacity style={styles.modalCancelButton} onPress={() => { setShowDeleteConfirm(false); setDeletePassword(''); }}>
                <Text style={styles.modalCancelText}>Скасувати</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalDeleteButton, loading && styles.disabledOpacity]} onPress={handleDeleteAccount} disabled={loading}>
                <Text style={styles.modalDeleteText}>{loading ? 'Видалення...' : 'Видалити'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#F3F4F6' 
  },
  container: { 
    flex: 1, 
    backgroundColor: '#F3F4F6' 
  },
  scrollContent: { 
    padding: 20, 
    paddingBottom: 40 
  },
  header: { 
    marginTop: 40, 
    marginBottom: 20 
  },
  headerTitle: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#1F2937' 
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24,
  },
  infoRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F3F4F6' 
  },
  infoLabel: { 
    fontSize: 15, 
    color: '#6B7280', 
    fontWeight: '500' 
  },
  infoValue: { 
    fontSize: 15, 
    color: '#1F2937', 
    fontWeight: '600' 
  },
  editButton: { 
    backgroundColor: '#EEF2FF', 
    paddingVertical: 12, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 16 
  },
  editButtonText: { 
    color: '#4F46E5', 
    fontSize: 15, 
    fontWeight: '600' 
  },
  inputLabel: { 
    fontSize: 14, 
    color: '#4B5563', 
    marginBottom: 6, 
    fontWeight: '500' 
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 14,
    marginBottom: 16,
    borderRadius: 10,
    fontSize: 16,
    color: '#1F2937',
  },
  buttonRow: { 
    flexDirection: 'row', 
    gap: 12, 
    marginTop: 8 
  },
  saveButton: { 
    flex: 1, 
    backgroundColor: '#4F46E5', 
    paddingVertical: 14, 
    borderRadius: 10, 
    alignItems: 'center' 
  },
  saveButtonText: { 
    color: '#FFFFFF', 
    fontSize: 15, 
    fontWeight: '600' 
  },
  cancelButton: { 
    flex: 1, 
    backgroundColor: '#F3F4F6', 
    paddingVertical: 14,
    borderRadius: 10, 
    alignItems: 'center' 
  },
  cancelButtonText: { 
    color: '#4B5563', 
    fontSize: 15, 
    fontWeight: '600' 
  },
  disabledOpacity: { 
    opacity: 0.7 
  },
  actionsContainer: { 
    gap: 12 
  },
  logoutButton: { 
    backgroundColor: '#FFFFFF', 
    paddingVertical: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#E5E7EB' 
  },
  logoutButtonText: { 
    color: '#374151', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  deleteButton: { 
    backgroundColor: '#FEF2F2', 
    paddingVertical: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#FECACA' 
  },
  deleteButtonText: { 
    color: '#DC2626', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  modalCard: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 16, 
    padding: 24, 
    width: '100%', 
    shadowColor: '#000', 
    shadowOffset: { 
        width: 0, 
        height: 10 
    }, 
    shadowOpacity: 0.1, 
    shadowRadius: 20, 
    elevation: 10 
  },
  modalTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#1F2937',
    marginBottom: 8 
  },
  modalText: { 
    fontSize: 14, 
    color: '#6B7280', 
    marginBottom: 20, 
    lineHeight: 20 
  },
  modalButtonRow: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    gap: 12, 
    marginTop: 8 
  },
  modalCancelButton: { 
    paddingVertical: 10, 
    paddingHorizontal: 16, 
    borderRadius: 8 
  },
  modalCancelText: { 
    color: '#4B5563', 
    fontSize: 15, 
    fontWeight: '600' 
  },
  modalDeleteButton: { 
    backgroundColor: '#DC2626', 
    paddingVertical: 10, 
    paddingHorizontal: 16, 
    borderRadius: 8 
  },
  modalDeleteText: { 
    color: '#FFFFFF', 
    fontSize: 15, 
    fontWeight: '600' 
  }
});