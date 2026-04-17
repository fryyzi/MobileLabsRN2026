import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  ScrollView
} from 'react-native';

// Імпортуємо компоненти (переконайтеся, що в Auth теж українська мова)
import { Auth } from './components/Auth';
import { AuthProvider } from './context/AuthContext';

const DATA = [
  {
    id: '1',
    name: 'NVIDIA GeForce GTX 1650',
    category: 'Відеокарти',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=400',
    description: '4GB GDDR6, техпроцес 12 нм. Чудове бюджетне рішення для кіберспортивних дисциплін та стабільної роботи.',
  },
  {
    id: '2',
    name: 'Механічна клавіатура RGB',
    category: 'Периферія',
    price: 2100,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=400',
    description: 'Сині перемикачі з чітким кліком, настроюване RGB підсвічування та міцний алюмінієвий корпус.',
  },
  {
    id: '3',
    name: 'SSD Samsung 980 Pro 1TB',
    category: 'Накопичувачі',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1597872200382-0bf1ea3967e0?q=80&w=400',
    description: 'NVMe M.2 накопичувач зі швидкістю читання до 7000 МБ/с. Лідер за надійністю та швидкістю завантаження ігор.',
  },
  {
    id: '4',
    name: 'Intel Core i5-12400F',
    category: 'Процесори',
    price: 5900,
    image: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?q=80&w=400',
    description: '6 ядер, 12 потоків. Найкращий процесор у середньому сегменті для сучасних ігрових збірок.',
  },
  {
    id: '5',
    name: 'Монітор 27" Curved 165Hz',
    category: 'Монітори',
    price: 10500,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400',
    description: 'Вигнутий екран, частота оновлення 165 Гц та час відгуку 1 мс для максимального занурення в ігровий процес.',
  },
  {
    id: '6',
    name: 'Оперативна пам\'ять 16GB DDR4',
    category: 'Пам\'ять',
    price: 1950,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=400',
    description: 'Дві планки по 8GB з частотою 3200MHz та стильними радіаторами охолодження.',
  },
  {
    id: '7',
    name: 'Миша Razer DeathAdder V2',
    category: 'Периферія',
    price: 2400,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=400',
    description: 'Ергономічна форма, оптичний сенсор Focus+ та миттєвий відгук кнопок.',
  },
  {
    id: '8',
    name: 'Блок живлення 750W Gold',
    category: 'Живлення',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1587202372775-e239fcc709bb?q=80&w=400',
    description: 'Сертифікат 80 PLUS Gold, повністю модульна конструкція та безшумний вентилятор.',
  },
  {
    id: '9',
    name: 'Корпус NZXT H510 Flow',
    category: 'Корпуси',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=400',
    description: 'Мінімалістичний дизайн, загартоване скло та чудова продувність для потужних систем.',
  },
  {
    id: '10',
    name: 'Ігрові навушники 7.1',
    category: 'Периферія',
    price: 2900,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400',
    description: 'Об\'ємний звук 7.1, мікрофон із шумопоглинанням та м\'які амбушури з екошкіри.',
  },
  {
    id: '11',
    name: 'Материнська плата B550',
    category: 'Материнські плати',
    price: 4800,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400',
    description: 'Підтримка PCIe 4.0, потужна підсистема живлення та сучасні роз\'єми для швидкісної периферії.',
  },
  {
    id: '12',
    name: 'Кулер для процесора RGB',
    category: 'Охолодження',
    price: 1350,
    image: 'https://images.unsplash.com/photo-1555617766-c94804975da3?q=80&w=400',
    description: 'Баштова конструкція з чотирма тепловими трубками та яскравим адресним підсвічуванням.',
  }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!isAuthenticated) {
    return <Auth onLogin={() => setIsAuthenticated(true)} />;
  }

  if (selectedProduct) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Image source={{ uri: selectedProduct.image }} style={styles.detailImage} />
          <View style={styles.detailContent}>
            <Text style={styles.detailTitle}>{selectedProduct.name}</Text>
            <Text style={styles.detailCategory}>{selectedProduct.category}</Text>
            <Text style={styles.detailPrice}>{selectedProduct.price} грн</Text>
            <Text style={styles.detailDescriptionText}>{selectedProduct.description}</Text>
            
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Додати в кошик</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.backButton} onPress={() => setSelectedProduct(null)}>
              <Text style={styles.backButtonText}>← Повернутися до каталогу</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Каталог товарів</Text>
          <TouchableOpacity onPress={() => setIsAuthenticated(false)}>
            <Text style={{color: 'red', fontWeight: '600'}}>Вийти</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listPadding}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => setSelectedProduct(item)}
              activeOpacity={0.7}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.infoContainer}>
                <Text style={styles.categoryBadge}>{item.category}</Text>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.price}>{item.price} грн</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingVertical: 15,
    backgroundColor: '#FFF', 
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  listPadding: { padding: 16 },
  card: { 
    backgroundColor: '#FFF', 
    borderRadius: 15, 
    flexDirection: 'row', 
    marginBottom: 16, 
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: { width: 110, height: 110, borderTopLeftRadius: 15, borderBottomLeftRadius: 15 },
  infoContainer: { flex: 1, padding: 12, justifyContent: 'center' },
  categoryBadge: { fontSize: 10, color: '#007AFF', fontWeight: 'bold', marginBottom: 4, textTransform: 'uppercase' },
  title: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  price: { fontSize: 15, fontWeight: 'bold', color: '#007AFF', marginTop: 4 },
  
  detailImage: { width: '100%', height: 350 },
  detailContent: { padding: 25, backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30 },
  detailTitle: { fontSize: 26, fontWeight: 'bold', color: '#222' },
  detailCategory: { fontSize: 14, color: '#888', marginTop: 5 },
  detailPrice: { fontSize: 24, color: '#2ecc71', fontWeight: 'bold', marginVertical: 15 },
  detailDescriptionText: { fontSize: 16, color: '#444', lineHeight: 24, marginBottom: 25 },
  
  buyButton: { backgroundColor: '#007AFF', padding: 18, borderRadius: 15, alignItems: 'center' },
  buyButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  backButton: { marginTop: 15, padding: 10, alignItems: 'center' },
  backButtonText: { color: '#888', fontSize: 16 }
});