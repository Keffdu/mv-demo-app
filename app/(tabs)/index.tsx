import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { StatusBar } from 'expo-status-bar';
import Item from '@/components/Item';
import Loading from '@/components/Loading'


export default function Index() {
  const [selectedId, setSelectedId] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const [text, onChangeText] = useState<string>('');
  const [page, setPage] = useState<number>(1)
  

  const getBirdRecordings = async (text) => {
    try {
      if (text) {
      const response = await fetch(`https://xeno-canto.org/api/2/recordings?query=${text}`);
      const data = await response.json();
      setData(data.recordings)
    } else {
      const response = await fetch('https://xeno-canto.org/api/2/recordings?query=eagle');
      const data = await response.json();
      setData(data.recordings)
    }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBirdRecordings();
  }, []);

  const handleSearch = (text) => {
    getBirdRecordings(text)
    setLoading(true)

  }

  const handleLoadMore = () => {
    setPage(page + 1)
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#00796B' : '#969492';

    return (
      <Item
        item={item}
        setSelectedId={setSelectedId}
        selectedId={selectedId}
        backgroundColor={backgroundColor}
      />
    );
  };

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.loading}>
          <Loading />
        </ SafeAreaView>
      </ SafeAreaProvider>
  )}

// TODO: CREATE VIEW FOR NO SEARCH RESULTS
  if (data.length === 0) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.loading}>
          <Text>Sorry!</Text>
        </ SafeAreaView>
      </ SafeAreaProvider>
  )}

  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.dataContainer}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              onSubmitEditing={() => handleSearch(text)}
              value={text}
              placeholder='eg. Name, Genus'
            />
            <View style={styles.listContainer}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
              />
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </GestureHandlerRootView>
      <StatusBar style="dark" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    marginTop: StatusBar.currentHeight || 0,
    width: '100%',
  },
  loading: {
    flex: 1,
    backgroundColor: '#25292e',
    marginTop: StatusBar.currentHeight || 0,
    width: '100%',
  },
  title: {
    fontSize: 32,
  },
  input: {
    width: '75%',
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#969492',
    borderRadius: 6,
  },
  dataContainer: {
    flex: 1,
    width: '100%',
    marginTop: StatusBar.currentHeight || 0,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  listContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
});
