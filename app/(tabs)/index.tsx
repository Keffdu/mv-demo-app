import {
  Text,
  View,
  StyleSheet,
  Platform,
  FlatList,
  TextInput } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useState, useRef, useEffect } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler"
import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import EmojiPicker from '@/components/AdditionalBirdInfo';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/AdditionalBirdInfo';
import * as MediaLibrary from 'expo-media-library'
import { captureRef } from 'react-native-view-shot';
import domtoimage from 'dom-to-image'
import { StatusBar } from 'expo-status-bar';
import Item from '@/components/Item';
import Loading from '@/components/Loading'


export default function Index() {
  const [selectedId, setSelectedId] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [text, onChangeText] = useState<string>();
  

  const getBirdRecordings = async () => {
    try {
      const response = await fetch('https://xeno-canto.org/api/2/recordings?query=bearded+bellbird+q:A');
      const data = await response.json();
      setData(data.recordings);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBirdRecordings();
  }, []);
  
  console.log(data[0])

  const imageRef = useRef<View>(null)


  if (status === null) {
    requestPermission();
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert('Saved!');
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      const dataUrl = await domtoimage.toJpeg(imageRef.current, {
        quality: 0.95,
        width: 320,
        height: 440,
      });

      let link = document.createElement('a');
      link.download = 'sticker-smash.jpeg';
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.log(e);
    }
  }
  };


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
        <SafeAreaView style={styles.container}>
          <Loading />
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
              value={text}
              placeholder='eg. Name, Genus'
            />
            <View style={styles.listContainer}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                initialNumToRender={5}
              />
            </View>
            {/* <View ref={imageRef} collapsable={false} >
              <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
              {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
            </View> */}
          </SafeAreaView>
          {/* {showAppOptions ? (
            <View style={styles.optionsContainer}>
              <View style={styles.optionsRow}>
                <IconButton icon="refresh" label="Reset" onPress={onReset} />
                <CircleButton onPress={onAddSticker} />
                <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
              </View>
            </View>
          ) : (
            <View style={styles.footerContainer}>
              <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
              <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
            </View>
          )}*/}
          {/* <AdditionalBirdInfo isVisible={isModalVisible} onClose={onModalClose}> */}
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
    // justifyContent: 'center',
    // alignItems: 'center',
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
  loading: {
    color: 'white',
    fontSize: 22,
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
