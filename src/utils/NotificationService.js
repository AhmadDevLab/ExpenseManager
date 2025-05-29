import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid, Platform, Alert} from 'react-native';

export const requestUserPermission = async () => {
  // 🔒 iOS permission
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  // ✅ Android 13+ needs explicit permission
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: 'Notification Permission',
        message:
          'This app needs notification permission to send you alerts and updates.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      },
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Android Notification permission denied');
      Alert.alert(
        'Permission Required',
        'Please enable notification permission in settings for full experience.',
      );
      return;
    }

    console.log('Android Notification permission granted');
  }

  if (enabled || Platform.OS === 'android') {
    console.log('Notification permission granted:', authStatus);
    getFcmToken();
  } else {
    console.log('Notification permission not granted');
  }
};

const getFcmToken = async () => {
  try {
    const storedToken = await AsyncStorage.getItem('fcmToken');
    if (!storedToken) {
      const token = await messaging().getToken();
      if (token) {
        console.log('FCM Token:', token);
        await AsyncStorage.setItem('fcmToken', token);
        // Optional: Send token to backend here
      }
    } else {
      console.log('FCM Token (from storage):', storedToken);
    }
  } catch (error) {
    console.log('Error fetching FCM token:', error);
  }
};

export const NotificationListener = () => {
  // App in background but opened via notification
  messaging().onNotificationOpenedApp(remoteMessage => {
    if (remoteMessage) {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    }
  });

  // App opened from quit state via notification
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  // App in foreground
  messaging().onMessage(async remoteMessage => {
    console.log('Notification received in foreground:', remoteMessage);
    // You can display local notification here using Notifee or any other method
  });
};
