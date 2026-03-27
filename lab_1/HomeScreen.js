import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

const NEWS_DATA = [
  {
    id: '1',
    title: 'Інновації в Житомирській політехніці',
    date: '20.03.2024',
    description: 'Відкриття нового коворкінгу для студентів факультету ІКТ.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
  },
  {
    id: '2',
    title: 'Науковий семінар',
    date: '19.03.2024',
    description: 'Обговорення сучасних методів розробки мобільних додатків.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
  },
  {
    id: '3',
    title: 'Студентське дозвілля',
    date: '18.03.2024',
    description: 'Зустріч з випускниками, які працюють у провідних IT-компаніях.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400',
  },
];

export default function HomeScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textBlock}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.content}>
      <Text style={styles.header}>Новини</Text>
      <FlatList
        data={NEWS_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, paddingHorizontal: 10 },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  item: { flexDirection: 'row', marginBottom: 15 },
  image: { width: 60, height: 60, backgroundColor: '#eee', marginRight: 10 },
  textBlock: { flex: 1 },
  title: { fontWeight: 'bold', fontSize: 14 },
  date: { fontSize: 12, color: '#777', marginVertical: 2 },
  description: { fontSize: 12, color: '#444' },
});