import React from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ModalType } from '../types';

interface CustomModalProps {
  visible: boolean;
  type: ModalType;
  fileName?: string;
  fileContent?: string;
  onNameChange: (text: string) => void;
  onContentChange: (text: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  type,
  fileName = '',
  fileContent = '',
  onNameChange,
  onContentChange,
  onCancel,
  onSubmit,
}) => {
  if (!type) return null;

  const getTitle = () => {
    if (type === 'createFolder') return 'Створення папки';
    if (type === 'createFile') return 'Створення текстового файлу';
    return `Редагування: ${fileName}`;
  };

  const showNameInput = type !== 'editFile';
  const showContentInput = type === 'createFile' || type === 'editFile';

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>{getTitle()}</Text>

          {showNameInput && (
            <TextInput
              style={styles.input}
              placeholder="Назва"
              value={fileName}
              onChangeText={onNameChange}
              autoCapitalize="none"
            />
          )}

          {showContentInput && (
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Вміст файлу..."
              value={fileContent}
              onChangeText={onContentChange}
              multiline
              numberOfLines={6}
            />
          )}

          <View style={styles.buttons}>
            <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onCancel}>
              <Text style={styles.buttonText}>Скасувати</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.submit]} onPress={onSubmit}>
              <Text style={styles.buttonText}>{type === 'editFile' ? 'Зберегти' : 'Створити'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: { height: 120, textAlignVertical: 'top' },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancel: { backgroundColor: '#aaa' },
  submit: { backgroundColor: '#007aff' },
  buttonText: { color: '#fff', fontWeight: '600' },
});