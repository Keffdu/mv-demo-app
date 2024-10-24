import { Modal, View, Text, Pressable, StyleSheet} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
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
        <Text style={styles.detailTitle} >Location:</Text>
        <Text style={styles.detailText} >{item.loc}</Text>
        <Text style={styles.detailTitle} >Country:</Text>
        <Text style={styles.detailText} >{item.cnt}</Text>
        <Text style={styles.detailTitle} >Recording Method:</Text>
        <Text style={styles.detailText} >{item.method}</Text>
        <Text style={styles.detailTitle} >Type:</Text>
        <Text style={styles.detailText} >{item.type}</Text>
        <Text style={styles.detailTitle} >Sound Length:</Text>
        <Text style={styles.detailText} >{item.length}</Text>
        <Text style={styles.detailTitle} >Sex:</Text>
        <Text style={styles.detailText} >{item.sex ? item.sex : 'N/A'}</Text>
      </View>
      <View style={styles.audio} >
        <AudioPlayer item={item}/>
      </View>
      </View>
    </Modal>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  audio: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  image: {
    width: 25,
    height: 25,
  },
  container: {
    flex: 1,
  },
  detailTitle: {
      color: 'black',
      fontSize: 22,
      paddingLeft: 20,
      paddingTop: 10,
      fontStyle: 'italic'
  },
  detailText: {
      paddingLeft: 40,
      color: 'black',
      fontSize: 20,
  },
  item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
  },
  modalContent: {
    height: '100%',
    width: '100%',
    backgroundColor: '#969492',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  titleContainer: {
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '16%',
    width: "100%",
    backgroundColor: '#00796B',
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
    paddingTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'center',
  }
});
