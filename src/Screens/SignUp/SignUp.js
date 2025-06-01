import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../constants/colors';
import {IcBack} from '../../assets/icons';
import fonts from '../../constants/fonts';
import NavigationStrings from '../../constants/NavigationStrings';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onBackPress = () => {
    navigation.navigate(NavigationStrings.LOGIN);
  };

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      return Alert.alert('Error', 'Please fill in all fields');
    }

    if (password !== confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match');
    }

    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      // Update the user's displayName with the username (name)
      await result.user.updateProfile({
        displayName: name, // Set the displayName (username)
      });

      const uid = result.user.uid;

      // Save userId in AsyncStorage
      await AsyncStorage.setItem('userId', uid);

      Alert.alert('Success', 'User registered successfully');
      navigation.replace(NavigationStrings.HOME); // Navigate to home screen after successful signup
    } catch (error) {
      Alert.alert('Signup Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => onBackPress()}>
          <IcBack />
        </TouchableOpacity>
        <Text style={styles.title}>Sign Up</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor={colors.etTextPrimarycolor}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={colors.etTextPrimarycolor}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={colors.etTextPrimarycolor}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor={colors.etTextPrimarycolor}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.tvSignUpContainer}>
        <Text style={styles.signupText}>Already have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(NavigationStrings.LOGIN)}>
          <Text style={styles.signupText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.bgColor,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: colors.etPrimarycolor,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontFamily: fonts.SplineSansBold,
  },
  signupText: {
    color: colors.textPrimary,
    textAlign: 'center',
    fontFamily: fonts.SplineSansRegular,
    fontSize: 14,
  },
  tvSignUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});
