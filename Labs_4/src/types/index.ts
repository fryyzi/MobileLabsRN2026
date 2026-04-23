import { Directory, File } from 'expo-file-system';

export type FileSystemItem = Directory | File;

export interface StorageStats {
  total: number;
  free: number;
  used: number;
}

export type ModalType = 'createFolder' | 'createFile' | 'editFile' | null;