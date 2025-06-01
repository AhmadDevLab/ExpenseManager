import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationStrings from '../../constants/NavigationStrings';
import firestore from '@react-native-firebase/firestore';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter email and password');
      return;
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const userId = userCredential.user.uid;

      const fcmToken = await messaging().getToken();
      console.log('FCM Token:', fcmToken);

      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('fcmToken', fcmToken);

      await firestore()
        .collection('users')
        .doc(userId)
        .collection('userInfo')
        .doc('fcmTokenDoc')
        .set({fcmToken});

      ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
      navigation.replace(NavigationStrings.BOTTOMSTACK);
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Login Failed', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Login</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor={colors.etTextPrimarycolor}
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={colors.etTextPrimarycolor}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tvSignUpContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(NavigationStrings.SIGNUP)}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.bgPrimary,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 20,
    fontFamily: fonts.SplineSansBold,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.etPrimarycolor,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    color: colors.textPrimary,
    textAlign: 'center',
    fontSize: 14,
  },
  tvSignUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
