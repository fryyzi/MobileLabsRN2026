import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileManagerScreen } from './src/screens/FileManagerScreen';

export default function App() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <FileManagerScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});