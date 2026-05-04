import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  PanResponder, 
  Animated, 
  TouchableOpacity 
} from 'react-native';
import ChallengesScreen from './components/ChallengesScreen';

export default function App() {
  const [currentTab, setCurrentTab] = useState('clicker');
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState({
    taps: 0, doubleTaps: 0, longPresses: 0,
    swipesRight: 0, swipesLeft: 0,
    panMoved: false, pinched: false, combo: 0
  });

  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const lastTapRef = useRef(0);
  const timerRef = useRef(null);
  const comboCounter = useRef(0);
  const lastComboTap = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        timerRef.current = setTimeout(() => {
          setStats(s => ({ ...s, longPresses: s.longPresses + 1 }));
          setScore(s => s + 5);
        }, 3000);
      },
      onPanResponderMove: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        if (Math.abs(dx) > 15 || Math.abs(dy) > 15) {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
          setStats(s => ({ ...s, panMoved: true }));
          pan.setValue({ x: dx, y: dy });
        }
        if (evt.nativeEvent.touches.length >= 2) {
          setStats(s => ({ ...s, pinched: true }));
          scale.setValue(1.2);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        const { dx } = gestureState;

        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        Animated.spring(scale, { toValue: 1, useNativeDriver: false }).start();

        if (Math.abs(dx) > 60) {
          const points = Math.floor(Math.random() * 10) + 1;
          setScore(s => s + points);
          if (dx > 0) setStats(s => ({ ...s, swipesRight: s.swipesRight + 1 }));
          else setStats(s => ({ ...s, swipesLeft: s.swipesLeft + 1 }));
          return;
        }

        if (Math.abs(dx) < 15) {
          const now = Date.now();
          if (now - lastComboTap.current < 600) comboCounter.current += 1;
          else comboCounter.current = 1;
          lastComboTap.current = now;
          if (comboCounter.current >= 5) setStats(s => ({ ...s, combo: 5 }));

          if (now - lastTapRef.current < 350) {
            setStats(s => ({ ...s, doubleTaps: s.doubleTaps + 1 }));
            setScore(s => s + 2);
            lastTapRef.current = 0;
          } else {
            setStats(s => ({ ...s, taps: s.taps + 1 }));
            setScore(s => s + 1);
            lastTapRef.current = now;
          }
        }
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.container}>
      {/* Шапка як на макеті */}
      <View style={styles.header}>
        <Text style={styles.menuIcon}>≡</Text>
        <Text style={styles.headerTitle}>
          {currentTab === 'clicker' ? 'Gesture Clicker' : 'Завдання'}
        </Text>
        <Text style={styles.searchIcon}>🔍</Text>
      </View>

      <View style={{ flex: 1 }}>
        {currentTab === 'clicker' ? (
          <View style={styles.gameContent}>
            {/* Картка рахунку */}
            <View style={styles.scoreCard}>
              <Text style={styles.scoreLabel}>РАХУНОК</Text>
              <Text style={styles.scoreValue}>{score}</Text>
            </View>

            {/* Об'єкт для кліків */}
            <View style={styles.clickArea}>
              <Animated.View
                {...panResponder.panHandlers}
                style={[
                  styles.targetCircle,
                  { transform: [{ translateX: pan.x }, { translateY: pan.y }, { scale: scale }] }
                ]}
              >
                <Text style={styles.targetIcon}>👆</Text>
                <Text style={styles.targetText}>ТИСНИ</Text>
              </Animated.View>
            </View>

            {/* Легенда жестів (картка знизу) */}
            <View style={styles.legendCard}>
              <View style={styles.legendRow}>
                <Text style={styles.legendEmoji}>👆</Text>
                <Text style={styles.legendText}>Дотик: +1 бал</Text>
              </View>
              <View style={styles.legendRow}>
                <Text style={styles.legendEmoji}>✌️</Text>
                <Text style={styles.legendText}>Подвійний дотик: +2 бали</Text>
              </View>
              <View style={styles.legendRow}>
                <Text style={styles.legendEmoji}>✋</Text>
                <Text style={styles.legendText}>Утримання (3с): +5 балів</Text>
              </View>
              <View style={styles.legendRow}>
                <Text style={styles.legendEmoji}>↔️</Text>
                <Text style={styles.legendText}>Свайп: +1-10 випадкових балів</Text>
              </View>
              <View style={styles.legendRow}>
                <Text style={styles.legendEmoji}>🤌</Text>
                <Text style={styles.legendText}>Масштаб: +3 бали</Text>
              </View>
            </View>
          </View>
        ) : (
          <ChallengesScreen stats={stats} score={score} />
        )}
      </View>

      {/* Нижня навігація */}
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => setCurrentTab('clicker')} style={styles.tabItem}>
          <Text style={[styles.tabIcon, currentTab === 'clicker' && styles.tabActive]}>▶</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentTab('challenges')} style={styles.tabItem}>
          <Text style={[styles.tabIcon, currentTab === 'challenges' && styles.tabActive]}>▤</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>⚙</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  
  // Header
  header: { 
    height: 60, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    backgroundColor: '#FFF' 
  },
  headerTitle: { fontSize: 22, fontWeight: '400', color: '#333' },
  menuIcon: { fontSize: 28, color: '#333' },
  searchIcon: { fontSize: 22, color: '#333' },

  gameContent: { flex: 1, alignItems: 'center', paddingVertical: 20 },

  // Score Card
  scoreCard: { 
    width: '60%', 
    backgroundColor: '#FFF', 
    padding: 15, 
    borderRadius: 15, 
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  scoreLabel: { fontSize: 12, color: '#A0AEC0', letterSpacing: 1, fontWeight: 'bold' },
  scoreValue: { fontSize: 48, fontWeight: 'bold', color: '#3182CE' },

  // Click Target
  clickArea: { flex: 1, justifyContent: 'center' },
  targetCircle: { 
    width: 160, 
    height: 160, 
    borderRadius: 80, 
    backgroundColor: '#00A3FF', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 6,
    borderColor: '#E1F5FE',
    elevation: 10
  },
  targetIcon: { fontSize: 32, color: '#FFF' },
  targetText: { color: '#FFF', fontWeight: 'bold', fontSize: 14, marginTop: 5 },

  // Legend Card
  legendCard: { 
    width: '90%', 
    backgroundColor: '#FFF', 
    borderRadius: 20, 
    padding: 20, 
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2
  },
  legendRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  legendEmoji: { fontSize: 20, width: 35 },
  legendText: { fontSize: 14, color: '#4A5568' },

  // Tab Bar
  tabBar: { 
    height: 60, 
    flexDirection: 'row', 
    backgroundColor: '#FFF', 
    borderTopWidth: 1, 
    borderColor: '#E2E8F0' 
  },
  tabItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  tabIcon: { fontSize: 24, color: '#CBD5E0' },
  tabActive: { color: '#333' }
});