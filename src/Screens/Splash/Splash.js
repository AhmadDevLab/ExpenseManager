import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import NavigationStrings from '../../constants/NavigationStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  useEffect(() => {
    const checkLogin = async () => {
      const userId = await AsyncStorage.getItem('userId');
      setTimeout(() => {
        if (userId) {
          navigation.replace(NavigationStrings.BOTTOMSTACK);
        } else {
          navigation.replace(NavigationStrings.LOGIN);
        }
      }, 1500);
    };

    checkLogin();
  }, []);
  
  return (
    <View style={{flex: 1}}>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
