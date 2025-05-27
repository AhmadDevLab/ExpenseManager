import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Add, Login, SignUp, Splash} from '../Screens';
import NavigationStrings from '../constants/NavigationStrings';
import BootomStack from './BootomStack';
import AddCategory from '../Screens/AddCategory/AddCategory';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen component={Splash} name={NavigationStrings.SPLASH} />
        <Stack.Screen component={Login} name={NavigationStrings.LOGIN} />
        <Stack.Screen component={SignUp} name={NavigationStrings.SIGNUP} />
        <Stack.Screen
          component={BootomStack}
          name={NavigationStrings.BOTTOMSTACK}
        />
        <Stack.Screen component={Add} name={NavigationStrings.ADD} />
        <Stack.Screen
          component={AddCategory}
          name={NavigationStrings.ADDCATEGORY}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
