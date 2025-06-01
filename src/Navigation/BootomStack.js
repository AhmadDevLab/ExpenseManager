import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Report, Setting} from '../Screens';
import {
  IcPrompt,
  IcPost,
  IcCommunity,
  IcActiveHome,
  IcActiveSetting,
  IcInActiveHome,
  IcInActiveSetting,
} from '../assets/icons';
import NavigationStrings from '../constants/NavigationStrings';
import colors from '../constants/colors';

const Tab = createBottomTabNavigator();

const BootomStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: '#aaaaaa',
        tabBarHideOnKeyboard: false,
        animation: 'fade',

        tabBarIcon: ({focused}) => {
          const iconSize = 24;
          const backgroundColor = focused ? 'transparent' : 'transparent';
          const iconColor = focused ? '#0E1F2F' : '#AAAAAA';
          const renderIcon = IconComponent => (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'transparent',
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
              return focused
                ? renderIcon(IcActiveHome)
                : renderIcon(IcInActiveHome);
            case 'Setting':
              return focused
                ? renderIcon(IcActiveSetting)
                : renderIcon(IcInActiveSetting);
            default:
              return null;
          }
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarStyle: {
          position: 'absolute',
          height: 60,
          backgroundColor: colors.bgColor,
        },
      })}>
      <Tab.Screen
        component={Home}
        name={NavigationStrings.HOME}
        options={{
          tabBarLabel: 'Home', // Text for the Home tab
        }}
      />
      <Tab.Screen
        component={Setting}
        name={NavigationStrings.SETTING}
        options={{
          tabBarLabel: 'Setting', // Text for the Setting tab
        }}
      />
    </Tab.Navigator>
  );
};

export default BootomStack;
