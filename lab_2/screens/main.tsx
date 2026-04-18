import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { news } from '../data/news';
import NewsItem from '../components/news';

export default function Main() {
  const PAGE_SIZE = 3;
  const [refreshing, setRefresh] = useState(false);
  const [displayedNews, setDisplayedNews] = useState(news.slice(0, PAGE_SIZE));
  const [loadingMore, setLoadingMore] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setDisplayedNews(news.slice(0, PAGE_SIZE));
      setRefresh(false);
    }, 1000);
  };

  const loadMoreData = () => {
    if (loadingMore || displayedNews.length >= news.length) return;
    setLoadingMore(true);
    setTimeout(() => {
      const currentLength = displayedNews.length;
      const nextBatch = news.slice(currentLength, currentLength + PAGE_SIZE);
      setDisplayedNews([...displayedNews, ...nextBatch]);
      setLoadingMore(false);
    }, 1500);
  };

  const renderListFooter = () => {
    if (loadingMore) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color="#4f46e5" />
          <Text style={styles.loaderText}>Завантаження...</Text>
        </View>
      );
    }
    if (displayedNews.length >= news.length) {
      return (
        <View style={styles.footer}>
          <View style={styles.footerDot} />
          <Text style={styles.footerText}>Це всі новини на сьогодні</Text>
        </View>
      );
    }
    return <View style={{ height: 40 }} />;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <FlatList
        data={displayedNews}
        style={{ width: '100%' }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <NewsItem news={item} />}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.dateText}>
              {new Date().toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'long' })}
            </Text>
            <Text style={styles.title}>Стрічка новин</Text>
            <View style={styles.accentLine} />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={renderListFooter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', 
  },
  listContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
  },
  dateText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6366f1',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    color: '#0f172a',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  accentLine: {
    width: 40,
    height: 4,
    backgroundColor: '#0f172a',
    marginTop: 12,
    borderRadius: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginHorizontal: 20,
    marginVertical: 12,
  },
  loaderContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loaderText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  footerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#cbd5e1',
    marginBottom: 12,
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '500',
  },
});