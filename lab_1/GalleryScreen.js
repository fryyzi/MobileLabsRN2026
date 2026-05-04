import React from 'react';
import { StyleSheet, View, FlatList, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');

const GALLERY_DATA = [
  { id: '1', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400' },
  { id: '2', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400' },
  { id: '3', url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400' },
  { id: '4', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400' },
  { id: '5', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400' },
  { id: '6', url: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400' },
  { id: '7', url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400' },
  { id: '8', url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400' },
  { id: '9', url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400' },
  { id: '10', url: 'https://images.unsplash.com/photo-1580894732230-28e193399e8c?w=400' },
];

export default function GalleryScreen() {
  const renderGalleryItem = ({ item }) => (
    <View style={styles.card}>
      <Image 
        source={{ uri: item.url }} 
        style={styles.image} 
        resizeMode="cover"
      />
    </View>
  );

  return (
    <View style={styles.content}>
      <FlatList
        data={GALLERY_DATA}
        renderItem={renderGalleryItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.galleryGrid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, paddingHorizontal: 10 },
  galleryGrid: { 
    paddingTop: 20,
    paddingBottom: 20 
  },
  card: {
    width: (width - 40) / 2, 
    aspectRatio: 1, 
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    margin: 5,
    overflow: 'hidden', 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});