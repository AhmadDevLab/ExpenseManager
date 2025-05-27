import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Home, Report, Setting } from '../Screens';
import {IcPrompt, IcPost, IcCommunity} from '../assets/icons';

import NavigationStrings from '../constants/NavigationStrings';
const Tab = createBottomTabNavigator();


const BootomStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#ffffff',
        tabBarHideOnKeyboard: false,

        tabBarInactiveTintColor: '#aaaaaa',
        tabBarIcon: ({focused}) => {
          const iconSize = 24;
          const backgroundColor = focused ? '#D9D9D9' : 'transparent';
          const iconColor = focused ? '#0E1F2F' : '#AAAAAA';

          const renderIcon = IconComponent => (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: backgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <IconComponent
                width={iconSize}
                height={iconSize}
                fill={iconColor}
              />
            </View>
          );

          switch (route.name) {
            case 'Home':
              return renderIcon(IcPrompt);
            case 'Report':
              return renderIcon(IcPost);
            case 'Setting':
              return renderIcon(IcCommunity);
            default:
              return null;
          }
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          backgroundColor: '#0E1F2F',
          borderRadius: 40,
          paddingBottom: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 5},
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
          marginHorizontal: 20,
        },
      })}>
      <Tab.Screen component={Home} name={NavigationStrings.HOME} />
      <Tab.Screen component={Report} name={NavigationStrings.REPORT} />
      <Tab.Screen component={Setting} name={NavigationStrings.SETTING} />
    </Tab.Navigator>
  );
};

export default BootomStack;

