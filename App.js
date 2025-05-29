import {StatusBar} from 'react-native';
import React, { useEffect } from 'react';
import AuthStack from './src/Navigation/AuthStack';
import colors from './src/constants/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

GestureHandlerRootView;


const App = () => {
 

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar backgroundColor={colors.primary_color} />
      <AuthStack />
    </GestureHandlerRootView>
  );
};

export default App;
