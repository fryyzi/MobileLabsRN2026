import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Directory, File } from 'expo-file-system';
import { FileSystemItem } from '../types';

interface ItemRowProps {
  item: FileSystemItem;
  onPress: (item: FileSystemItem) => void;
  onLongPress?: (item: FileSystemItem) => void;
  onInfo?: (file: File) => void;
  onDelete: (item: FileSystemItem) => void;
}

export const ItemRow: React.FC<ItemRowProps> = ({ item, onPress, onLongPress, onInfo, onDelete }) => {
  const isDirectory = item instanceof Directory;
  const isFile = item instanceof File;

  const handlePress = () => onPress(item);
  const handleLongPress = () => onLongPress && onLongPress(item);
  const handleInfo = () => {
    if (isFile && onInfo) onInfo(item);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      onLongPress={handleLongPress}
      delayLongPress={300}
    >
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.type}>
          {isDirectory ? '📁 Папка' : `📄 ${(item as File).extension || 'файл'}`}
        </Text>
      </View>
      <View style={styles.actions}>
        {isFile && (
          <TouchableOpacity style={styles.infoButton} onPress={handleInfo}>
            <Text style={styles.buttonText}>ℹ️</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item)}>
          <Text style={styles.buttonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginHorizontal: 10,
    marginVertical: 4,
    borderRadius: 8,
    elevation: 1,
  },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '500' },
  type: { fontSize: 12, color: '#666', marginTop: 2 },
  actions: { flexDirection: 'row' },
  infoButton: {
    backgroundColor: '#34c759',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});