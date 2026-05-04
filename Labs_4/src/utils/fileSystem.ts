import * as FileSystem from 'expo-file-system';
import { FileSystemItem } from '../types';

const { Directory, File, Paths } = FileSystem;

export const loadDirectoryContents = async (dir: FileSystem.Directory): Promise<FileSystemItem[]> => {
  if (!dir.exists) {
    await dir.create({ intermediates: true });
  }
  return await dir.list();
};

export const createFolder = async (parent: FileSystem.Directory, name: string): Promise<void> => {
  const newFolder = new Directory(parent, name.trim());
  await newFolder.create({ intermediates: true, idempotent: true });
};

export const createTextFile = async (
  parent: FileSystem.Directory,
  name: string,
  initialContent = ''
): Promise<void> => {
  let fileName = name.trim();
  if (!fileName.endsWith('.txt')) fileName += '.txt';
  
  const newFile = new File(parent, fileName);
  await newFile.write(initialContent);
};

export const readFileContent = async (file: FileSystem.File): Promise<string> => {
  return await file.text();
};

export const writeFileContent = async (file: FileSystem.File, content: string): Promise<void> => {
  await file.write(content);
};

export const deleteItem = async (item: FileSystemItem): Promise<void> => {
  await item.delete();
};

export const getFileInfo = async (file: FileSystem.File) => {
  const info = await file.info();
  return {
    name: file.name,
    extension: file.extension || 'без розширення',
    size: info.size,
    modificationTime: info.modificationTime,
    mimeType: file.type,
    uri: file.uri,
  };
};

export const getStorageStats = () => {
  const total = Paths.totalDiskSpace || 0;
  const free = Paths.availableDiskSpace || 0;
  return { total, free, used: total - free };
};

export const getInitialDirectory = (): FileSystem.Directory => {
  return new Directory(Paths.document);
};