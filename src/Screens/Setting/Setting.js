import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationStrings from '../../constants/NavigationStrings';

const Setting = ({navigation}) => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const addCategory = () => {
    navigation.navigate(NavigationStrings.ADDCATEGORY);
  };

  const selectCurrency = () => {
    navigation.navigate(NavigationStrings.SELECTCURRENCY);
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      Alert.alert('Logged out');
      navigation.replace(NavigationStrings.LOGIN);
    } catch (error) {
      console.log('Error during logout:', error);
      Alert.alert('Logout failed');
    }
  };
  useEffect(() => {
    AsyncStorage.getItem('userId').then(id => {
      if (id) setUserId(id);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>{userName}</Text>
      <Text>{userEmail}</Text>

      <TouchableOpacity
        style={styles.btnAddCatrgory}
        onPress={() => addCategory()}>
        <Text style={styles.tvAddCategory}>Add Category</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnAddCatrgory}
        onPress={() => selectCurrency()}>
        <Text style={styles.tvAddCategory}>Select Currency</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnAddCatrgory}>
        <Text style={styles.tvAddCategory}>Privacy Policy</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnAddCatrgory}
        onPress={() => handleLogout()}>
        <Text style={styles.tvAddCategory}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  btnAddCatrgory: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  tvAddCategory: {
    color: colors.white,
  },
});
