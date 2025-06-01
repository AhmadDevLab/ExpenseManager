import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import NavigationStrings from '../../constants/NavigationStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';

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
    <View style={styles.container}>
      <View>
        <View>
          <Image source={require('../../assets/images/splashTop.png')} />
        </View>

        <View style={styles.tvContainer}>
          <Text style={styles.tvStyle}>Expense Manager</Text>
          <Text style={styles.tvSecond}>
            Track your expenses and manage your finances with ease.
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.btnStart}>
        <Text style={styles.tvBtn}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  tvContainer: {
    alignItems: 'center',
  },
  tvStyle: {
    fontFamily: fonts.SplineSansBold,
    fontSize: 18,
    marginVertical: 10,
    color: colors.textPrimary,
  },
  tvSecond: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: fonts.SplineSansRegular,
    color: colors.textPrimary,
  },
  btnStart: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  tvBtn: {
    color: colors.textPrimary,
    fontSize: 12,
    fontFamily: fonts.SplineSansBold,
  },
});
