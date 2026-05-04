import { useState, useEffect, useCallback, useRef } from 'react';
import * as FileSystem from 'expo-file-system';
import { FileSystemItem } from '../types';
import {
  loadDirectoryContents,
  createFolder,
  createTextFile,
  deleteItem,
  getInitialDirectory,
} from '../utils/fileSystem';

export const useFileManager = () => {
  const [currentDir, setCurrentDir] = useState<FileSystem.Directory>(getInitialDirectory());
  const [items, setItems] = useState<FileSystemItem[]>([]);
  const [history, setHistory] = useState<FileSystem.Directory[]>([]);
  const [currentPath, setCurrentPath] = useState<string>('');

  const currentDirRef = useRef(currentDir);
  useEffect(() => {
    currentDirRef.current = currentDir;
  }, [currentDir]);

  const loadDirectory = useCallback(async (dir: FileSystem.Directory) => {
    const contents = await loadDirectoryContents(dir);
    setCurrentDir(dir);
    setCurrentPath(dir.uri);
    setItems(contents);
  }, []);

  useEffect(() => {
    loadDirectory(getInitialDirectory());
  }, []);

  const openFolder = useCallback(async (folder: FileSystem.Directory) => {
    setHistory(prev => [...prev, currentDir]);
    await loadDirectory(folder);
  }, [currentDir, loadDirectory]);

  const goBack = useCallback(async () => {
    if (history.length === 0) return;
    const prevDir = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    await loadDirectory(prevDir);
  }, [history, loadDirectory]);

  const handleCreateFolder = useCallback(async (name: string) => {
    const dir = currentDirRef.current;
    if (!dir) return;
    await createFolder(dir, name);
    await loadDirectory(dir);
  }, [loadDirectory]);

  const handleCreateFile = useCallback(async (name: string, content: string) => {
    const dir = currentDirRef.current;
    if (!dir) return;
    await createTextFile(dir, name, content);
    await loadDirectory(dir);
  }, [loadDirectory]);

  const handleDeleteItem = useCallback(async (item: FileSystemItem) => {
    const dir = currentDirRef.current;
    if (!dir) return;
    await deleteItem(item);
    await loadDirectory(dir);
  }, [loadDirectory]);

  const refresh = useCallback(() => {
    const dir = currentDirRef.current;
    if (dir) loadDirectory(dir);
  }, [loadDirectory]);

  return {
    currentDir,
    items,
    currentPath,
    historyLength: history.length,
    openFolder,
    goBack,
    createFolder: handleCreateFolder,
    createFile: handleCreateFile,
    deleteItem: handleDeleteItem,
    refresh,
  };
};