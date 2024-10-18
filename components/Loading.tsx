import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, ImageBackground } from 'react-native';

  // const image = {uri:
  //   "https://img.freepik.com/premium-vector/road-runner-icon-clipart-avatar-logotype-isolated-vector-illustration_955346-949.jpg"
  // }



export default function Loading() {
  return (
        <ImageBackground source={require('../assets/dove.png')} resizeMode="contain" style={styles.image}>

        {/* Loading Text */}
        <View style={styles.image} >
          <Text style={styles.title}>Bird Audio App</Text>
          <Text style={styles.subtitle}>Getting bird songs...</Text>
        </View>
        {/* Spinner */}
        <ActivityIndicator size="large" color="#00BFFF" style={styles.spinner} />
        </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#00796B',
    marginBottom: 20,
  },
  spinner: {
    marginTop: 20,
  },
});