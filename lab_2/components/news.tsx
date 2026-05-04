import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { News } from "../types/News";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/RootStackParamList";

interface NewsItemProps {
  news: News;
}

export default function NewsItem({ news }: NewsItemProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Details', { newsData: news })}
      activeOpacity={0.7}
    >
      <Image source={news.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>{news.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    width: '90%',
    maxWidth: 360,
    marginBottom: 16,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 12,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#1e2a3a',
    lineHeight: 22,
  },
});