import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

// Імпортуємо всі три екрани
import HomeScreen from './HomeScreen';
import GalleryScreen from './GalleryScreen';
import ProfileScreen from './ProfileScreen';

export default function App() {
  const [currentTab, setCurrentTab] = useState('news');

  const renderScreen = () => {
    switch (currentTab) {
      case 'news': 
        return <HomeScreen />; 
      case 'gallery': 
        return <GalleryScreen />;
      case 'profile': 
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Image 
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D0%96%D0%B8%D1%82%D0%BE%D0%BC%D0%B8%D1%80%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BF%D0%BE%D0%BB%D1%96%D1%82%D0%B5%D1%85%D0%BD%D1%96%D0%BA%D0%B8.png' }} 
          style={styles.mainLogo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>FirstMobileApp</Text>
      </View>

      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.navTab} onPress={() => setCurrentTab('news')}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946436.png' }} 
            style={[styles.navIcon, currentTab === 'news' && { tintColor: '#0056b3' }]} 
          />
          <Text style={[styles.navLabel, currentTab === 'news' && { color: '#0056b3' }]}>Головна</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navTab} onPress={() => setCurrentTab('gallery')}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1375/1375106.png' }} 
            style={[styles.navIcon, currentTab === 'gallery' && { tintColor: '#0056b3' }]} 
          />
          <Text style={[styles.navLabel, currentTab === 'gallery' && { color: '#0056b3' }]}>Фотогалерея</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navTab} onPress={() => setCurrentTab('profile')}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png' }} 
            style={[styles.navIcon, currentTab === 'profile' && { tintColor: '#0056b3' }]} 
          />
          <Text style={[styles.navLabel, currentTab === 'profile' && { color: '#0056b3' }]}>Профіль</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {currentTab === 'profile' 
            ? "Хомнюк Віктор Олександрович, ІПЗ-22-1" 
            : 'Хомнюк Віктор Олександрович, ІПЗ-22-1'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10 },
  mainLogo: { width: 180, height: 50 },
  appName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  navigationBar: { flexDirection: 'row', backgroundColor: '#f4f4f4', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#ddd', height: 70 },
  navTab: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  navIcon: { width: 24, height: 24, marginBottom: 4, tintColor: '#555' },
  navLabel: { fontSize: 12, color: '#555' },
  footer: { paddingVertical: 8, borderTopWidth: 1, borderColor: '#ddd' },
  footerText: { textAlign: 'center', fontSize: 12, color: '#555' },
});