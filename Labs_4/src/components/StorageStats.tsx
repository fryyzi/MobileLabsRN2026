import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getStorageStats } from '../utils/fileSystem';
import { formatBytes } from '../utils/formatters';
import { StorageStats as StorageStatsType } from '../types';

export const StorageStats: React.FC = () => {
  const [stats, setStats] = useState<StorageStatsType>({ total: 0, free: 0, used: 0 });

  const loadStats = () => {
    setStats(getStorageStats());
  };

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Статистика пам'яті пристрою</Text>
      <Text style={styles.text}>Загалом: {formatBytes(stats.total)}</Text>
      <Text style={styles.text}>Вільно: {formatBytes(stats.free)}</Text>
      <Text style={styles.text}>Зайнято: {formatBytes(stats.used)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e7ff',
    padding: 12,
    margin: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#c7d2fe',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: '#1e3a8a',
  },
  text: {
    fontSize: 14,
    color: '#1e293b',
  },
});