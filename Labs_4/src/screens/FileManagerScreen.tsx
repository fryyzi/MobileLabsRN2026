import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { File } from 'expo-file-system';
import { useFileManager } from '../hooks/useFileManager';
import { StorageStats } from '../components/StorageStats';
import { ItemRow } from '../components/ItemRow';
import { CustomModal } from '../components/CustomModal';
import { ModalType } from '../types';
import { readFileContent, writeFileContent, getFileInfo } from '../utils/fileSystem';
import { formatDate, formatBytes } from '../utils/formatters';

export const FileManagerScreen: React.FC = () => {
  const {
    items,
    currentPath,
    historyLength,
    openFolder,
    goBack,
    createFolder,
    createFile,
    deleteItem,
    refresh,
  } = useFileManager();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [inputName, setInputName] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const showCreateFolderModal = () => {
    setModalType('createFolder');
    setInputName('');
    setInputContent('');
    setModalVisible(true);
  };

  const showCreateFileModal = () => {
    setModalType('createFile');
    setInputName('');
    setInputContent('');
    setModalVisible(true);
  };

  const openFileForEdit = async (file: File) => {
    try {
      const content = await readFileContent(file);
      setSelectedFile(file);
      setInputName(file.name);
      setInputContent(content);
      setModalType('editFile');
      setModalVisible(true);
    } catch (error) {
      Alert.alert('Помилка', `Не вдалося прочитати файл: ${error}`);
    }
  };

  const showFileInfo = async (file: File) => {
    try {
      const info = await getFileInfo(file);
      Alert.alert(
        `Інформація: ${info.name}`,
        `Тип: ${info.extension}\n` +
        `Розмір: ${formatBytes(info.size)}\n` +
        `Дата зміни: ${formatDate(info.modificationTime)}\n` +
        `MIME: ${info.mimeType || 'не визначено'}`
      );
    } catch (error) {
      Alert.alert('Помилка', `Не вдалося отримати інформацію: ${error}`);
    }
  };

  const confirmDelete = (item: any) => {
    Alert.alert(
      'Підтвердження',
      `Видалити "${item.name}"?`,
      [
        { text: 'Скасувати', style: 'cancel' },
        { text: 'Видалити', style: 'destructive', onPress: () => deleteItem(item) },
      ],
      { cancelable: true }
    );
  };

  const handleModalSubmit = async () => {
    try {
        if (modalType === 'createFolder') {
        if (!inputName.trim()) throw new Error('Введіть назву папки');
        await createFolder(inputName);
        } else if (modalType === 'createFile') {
            if (!inputName.trim()) throw new Error('Введіть назву файлу');
                await createFile(inputName, inputContent);
            } else if (modalType === 'editFile' && selectedFile) {
                await writeFileContent(selectedFile, inputContent);
                refresh();
            }
            setModalVisible(false);
            setModalType(null);
            setInputName('');
            setInputContent('');
            setSelectedFile(null);
            Alert.alert('Успіх', 'Операцію виконано');
    } catch (error: any) {
        Alert.alert('Помилка', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StorageStats />

      <View style={styles.navBar}>
        <TouchableOpacity onPress={goBack} disabled={historyLength === 0}>
          <Text style={[styles.navButton, historyLength === 0 && styles.disabled]}>⬅ Назад</Text>
        </TouchableOpacity>
        <Text style={styles.pathText} numberOfLines={1} ellipsizeMode="middle">
          {currentPath}
        </Text>
      </View>

      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionButton} onPress={showCreateFolderModal}>
          <Text style={styles.actionButtonText}>📁 Нова папка</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={showCreateFileModal}>
          <Text style={styles.actionButtonText}>📄 Новий файл</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item, index) => item.uri + index}
        renderItem={({ item }) => (
          <ItemRow
            item={item}
            onPress={(it) => {
              if (it instanceof File) openFileForEdit(it);
              else openFolder(it);
            }}
            onLongPress={(it) => confirmDelete(it)}
            onInfo={(file) => showFileInfo(file)}
            onDelete={confirmDelete}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Папка порожня</Text>}
      />

      <CustomModal
        visible={modalVisible}
        type={modalType}
        fileName={inputName}
        fileContent={inputContent}
        onNameChange={setInputName}
        onContentChange={setInputContent}
        onCancel={() => {
          setModalVisible(false);
          setModalType(null);
          setSelectedFile(null);
        }}
        onSubmit={handleModalSubmit}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  navButton: { fontSize: 16, color: '#007aff', fontWeight: '600', marginRight: 12 },
  disabled: { color: '#aaa' },
  pathText: { flex: 1, fontSize: 12, color: '#555' },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  actionButton: {
    backgroundColor: '#007aff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  actionButtonText: { color: '#fff', fontWeight: '600' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#888' },
});