import {
  Alert,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationStrings from '../../constants/NavigationStrings';
import auth from '@react-native-firebase/auth'; // Import Firebase Auth
import {IcAdd, IcBack, IcCurrency, IcLogout, IcPrivacy} from '../../assets/icons';
import fonts from '../../constants/fonts';

const Setting = ({navigation}) => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('Name');
  const [userEmail, setUserEmail] = useState('');

  const addCategory = () => {
    navigation.navigate(NavigationStrings.ADDCATEGORY);
  };

  const selectCurrency = () => {
    navigation.navigate(NavigationStrings.SELECTCURRENCY);
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('userId');
      Alert.alert('Logged out');
      navigation.replace(NavigationStrings.LOGIN);
    } catch (error) {
      console.log('Error during logout:', error);
      Alert.alert('Logout failed');
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const currentUser = auth().currentUser;

      if (currentUser) {
        setUserId(currentUser.uid);
        setUserName(currentUser.displayName || 'Ahmad');
        setUserEmail(currentUser.email || '');
      } else {
        console.log('No user is logged in!');
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.dpContainer}>
          <Text>Hy, Buddy</Text>
          {/* <Image
            style={{height: 80, width: 80}}
            source={require('../../assets/images/splashTop.png')}
          /> */}
        </View>
        <View style={{marginLeft: 10}}>
          {userName && <Text style={styles.userName}>{userName}</Text>}
          {userEmail && <Text style={styles.userEmail}>{userEmail}</Text>}
        </View>
      </View>

      <Text style={styles.subTitle}>Settings</Text>

      <View style={styles.settingOptions}>
        <View style={styles.icContainer}>
          <IcAdd />
        </View>
        <TouchableOpacity onPress={() => addCategory()}>
          <Text style={styles.tvAddCategory}>Add Category</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.settingOptions}>
        <View style={styles.icContainer}>
          <IcCurrency />
        </View>
        <TouchableOpacity onPress={() => selectCurrency()}>
          <Text style={styles.tvAddCategory}>Select Currency</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.settingOptions}>
        <View style={styles.icContainer}>
          <IcPrivacy />
        </View>
        <TouchableOpacity>
          <Text style={styles.tvAddCategory}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.settingOptions}>
        <View style={styles.icContainer}>
          <IcLogout />
        </View>
        <TouchableOpacity onPress={() => handleLogout()}>
          <Text style={styles.tvAddCategory}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: colors.bgPrimary,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  subTitle: {
    fontSize: 18,
    fontFamily: fonts.SplineSansBold,
    marginTop: 20,
    marginBottom: 10,
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  dpContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#f8ddc8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icContainer: {
    height: 40,
    width: 40,
    borderRadius: 5,
    backgroundColor: '#F5F5F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnAddCategory: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  tvAddCategory: {
    color: colors.black,
    fontFamily: fonts.SplineSansRegular,
    marginLeft: 10,
    fontSize: 16,
  },
  userName: {
    fontSize: 14,
    fontFamily: fonts.SplineSansBold,
  },
  userEmail: {
    fontSize: 12,
    fontFamily: fonts.SplineSansRegular,
  },
});
