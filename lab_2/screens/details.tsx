import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../types/RootStackParamList";
import { Text, View, Image, StyleSheet, ScrollView, StatusBar } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function Details({ route }: Props) {
  const { newsData } = route.params;

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <Image source={newsData.image} style={styles.image} />
        
        <View style={styles.contentContainer}>
          <View style={styles.dragHandle} />
          
          <Text style={styles.title}>{newsData.title}</Text>
          
          <View style={styles.metaRow}>
            <View style={styles.separator} />
            <Text style={styles.categoryText}>НОВИНИ</Text>
          </View>

          <Text style={styles.description}>{newsData.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: 320, 
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    marginTop: -30, 
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 32, 
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    color: '#0f172a', 
    lineHeight: 34,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  separator: {
    height: 4,
    width: 40,
    backgroundColor: '#6366f1', 
    borderRadius: 2,
    marginRight: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 1.2,
  },
  description: {
    fontSize: 17,
    lineHeight: 28, 
    color: '#334155', 
    textAlign: 'left', 
    letterSpacing: 0.3,
  },
});