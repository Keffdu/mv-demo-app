import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, ImageBackground } from 'react-native';


export default function Loading() {
  return (
        <ImageBackground source={require('../assets/dove.png')} resizeMode="contain" style={styles.image}>
        <View style={styles.header} >
          <Text style={styles.title}>Bird Audio App</Text>
          <Text style={styles.subtitle}>Getting bird songs...</Text>
        </View>
        <View style={styles.spinner} >
          <ActivityIndicator size="large" color="#00796B" style={styles.spinner} />
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
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
    marginBottom: 100,
  },
  spinner: {
    flex: 1,
    marginTop: 5,
    marginBottom: 175,
    height: 50,
  },
});