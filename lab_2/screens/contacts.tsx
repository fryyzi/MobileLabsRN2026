import { SectionList, StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import { CONTACTS } from "../data/contacts";

export default function Contacts() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <SectionList
        sections={CONTACTS}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listPadding}
        stickySectionHeadersEnabled={true}
        showsVerticalScrollIndicator={false} 
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.avatarPlaceholder}>
               <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc', 
  },
  listPadding: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: 8,
  },
  header: {
    backgroundColor: 'rgba(248, 250, 252, 0.95)',
    paddingVertical: 12,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e293b',
    letterSpacing: 0.5,
    textTransform: 'uppercase', 
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginVertical: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#334155',
  },
  separator: {
    height: 0, 
  },
});