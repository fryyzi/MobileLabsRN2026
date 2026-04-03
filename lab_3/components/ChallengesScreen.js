import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function ChallengesScreen({ stats, score }) {
  const CHALLENGES = [
    { id: '1', title: '10 кліків', subtitle: 'Натисніть на об\'єкт 10 разів', progress: stats.taps, target: 10 },
    { id: '2', title: '5 подвійних кліків', subtitle: 'Швидко натисніть двічі', progress: stats.doubleTaps, target: 5 },
    { id: '3', title: 'Утримання 3 секунди', subtitle: 'Затисніть і чекайте', progress: stats.longPresses, target: 3 },
    { id: '4', title: 'Перетягування', subtitle: 'Порухайте об\'єкт по екрану', progress: stats.panMoved ? 1 : 0, target: 1 },
    { id: '5', title: 'Свайп вправо', subtitle: 'Швидкий жест вправо', progress: stats.swipesRight, target: 1 },
    { id: '6', title: 'Свайп вліво', subtitle: 'Швидкий жест вліво', progress: stats.swipesLeft, target: 1 },
    { id: '7', title: 'Зміна розміру', subtitle: 'Використайте два пальці (Pinch)', progress: stats.pinched ? 1 : 0, target: 1 },
    { id: '8', title: 'Майстер очок', subtitle: 'Набрати 100 очок', progress: score, target: 100 },
    // ВЛАСНЕ ЗАВДАННЯ:
    { id: '9', title: 'Швидка серія', subtitle: 'Зробіть 5 кліків поспіль без зупинок', progress: stats.combo, target: 5 },
  ];

  return (
    <FlatList
      data={CHALLENGES}
      keyExtractor={item => item.id}
      contentContainerStyle={{ padding: 20 }}
      renderItem={({ item }) => {
        const isDone = item.progress >= item.target;
        return (
          <View style={[styles.card, isDone && styles.cardDone]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              {!isDone && (
                <View style={styles.barBg}>
                  <View style={[styles.barFill, { width: `${Math.min((item.progress / item.target) * 100, 100)}%` }]} />
                </View>
              )}
            </View>
            <Text style={styles.statusText}>{isDone ? '✅' : `${item.progress}/${item.target}`}</Text>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10, elevation: 2, alignItems: 'center' },
  cardDone: { backgroundColor: '#e8f5e9' },
  title: { fontSize: 16, fontWeight: 'bold' },
  subtitle: { fontSize: 12, color: '#777' },
  barBg: { height: 4, backgroundColor: '#eee', borderRadius: 2, marginTop: 8, width: '90%' },
  barFill: { height: 4, backgroundColor: '#2196F3', borderRadius: 2 },
  statusText: { fontWeight: 'bold' }
});