import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({children}) => {
  const [currency, setCurrency] = useState('Rs');

  useEffect(() => {
    AsyncStorage.getItem('currencySymbol').then(val => {
      if (val) setCurrency(val);
    });
  }, []);

  const updateCurrency = async value => {
    setCurrency(value);
    await AsyncStorage.setItem('currencySymbol', value);
  };

  return (
    <CurrencyContext.Provider value={{currency, updateCurrency}}>
      {children}
    </CurrencyContext.Provider>
  );
};
