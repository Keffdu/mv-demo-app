import { Modal, View, Text, Pressable, StyleSheet, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AudioPlayer from './AudioPlayer';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  item: any;
};

export default function AdditionalBirdInfo({ isVisible, onClose, item}: Props) {
  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
    <Modal animationType="slide" presentationStyle={'overFullScreen'} transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <View style={styles.subContainer}>
            <Text style={styles.title}>{item.en }</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" color="black" size={22} />
            </Pressable>
          </View>
          <Text style={styles.subTitle}>{item.gen + " " + item.sp}</Text>
        </View>
      <View style={styles.extraDetails}>
        <Text style={styles.details} >Country: {item.cnt}</Text>
        <AudioPlayer item={item}/>
      </View>
      </View>
    </Modal>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
  },
  container: {
    flex: 1,
  },
  details: {
      color: 'black',
      fontSize: 32,
  },
  item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
  },
  modalContent: {
    height: '100%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    // position: 'absolute',
    // bottom: 0,
  },
  titleContainer: {
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '16%',
    width: "100%",
    backgroundColor: '#00796B',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  subContainer: {
    alignItems: 'center',
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    paddingTop: 30,
    color: 'black',
    fontSize: 28,
  },
  subTitle: {
    fontStyle: 'italic',
    color: 'black',
    fontSize: 16,
  },
  extraDetails: {
    display: 'flex',
    flex: 1,
    paddingBottom: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
