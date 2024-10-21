import { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Pressable, Text } from 'react-native';
import { Audio } from 'expo-av';

type Props = {
    item: any;
}

export default function AudioPlayer({ item }: Props) {
    const [sound, setSound] = useState<any>();
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    async function handleSound() {
      const { sound } = await Audio.Sound.createAsync({
        uri: item.file
      });
      setSound(sound);
      switch (isPlaying) {
        case true: {
          setIsPlaying(false)
          await sound.pauseAsync();
        }
        break;
        case false: {
          setIsPlaying(true)
          await sound.playAsync();
        }
        break;
      }
    }
  
    useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
          }
        : undefined;
    }, [sound]);
  
    return (
    <Pressable style={styles.button} onPress={handleSound}>
      <Text style={styles.text}>{isPlaying ? "Pause Sound" : "Play Sound"}</Text>
    </Pressable>
);
}

const styles = StyleSheet.create({
button: {
  width: "50%",
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 12,
  paddingHorizontal: 32,
  borderRadius: 4,
  elevation: 3,
  backgroundColor: '#00796B',
},
text: {
  fontSize: 16,
  lineHeight: 21,
  fontWeight: 'bold',
  letterSpacing: 0.25,
  color: 'black',
},
});

  //   return (
  //     <View style={styles.container}>
  //       <Button color="#00796B" style={{ backgroundColor: 'yellow' }} title="Play Sound" onPress={playSound} />
  //     </View>
  //   );
  // }
  
  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1 / 20,
  //     justifyContent: 'center',
  //     padding: 10,
  //   },
  // });
