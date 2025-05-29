import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import DropdownComponent from '../../Components/DropdownComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CurrencyContext } from '../../context/CurrencyContext';



const currencyItem = [
  {label: '₹ INR - Indian Rupee', value: '₹'},
  {label: '$ USD - US Dollar', value: '$'},
  {label: '€ EUR - Euro', value: '€'},
  {label: '£ GBP - British Pound', value: '£'},
  {label: '₣ CHF - Swiss Franc', value: '₣'},
  {label: '¥ JPY - Japanese Yen', value: '¥'},
  {label: '₽ RUB - Russian Ruble', value: '₽'},
  {label: '₩ KRW - South Korean Won', value: '₩'},
  {label: '₺ TRY - Turkish Lira', value: '₺'},
  {label: '₦ NGN - Nigerian Naira', value: '₦'},
  {label: 'AED - UAE Dirham', value: 'AED'},
  {label: 'SAR - Saudi Riyal', value: 'SAR'},
];

const SelectCurrency = () => {
    const {currency, updateCurrency} = useContext(CurrencyContext);
    const [selectedCurrency, setSelectedCurrency] = useState(currency);
    
  useEffect(() => {
    const loadCurrency = async () => {
      const savedCurrency = await AsyncStorage.getItem('currencySymbol');
      if (savedCurrency) {
        setSelectedCurrency(savedCurrency);
      }
    };
    loadCurrency();
  }, []);

  const onCurrencyChange = async val => {
    setSelectedCurrency(val);
    await updateCurrency(val); 
    Alert.alert('Currency Saved', `You selected ${val} as your currency.`);
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Your Preferred Currency</Text>
      <DropdownComponent
        data={currencyItem}
        showSearch={true}
        placeholder="Select Currency"
        onChangeValue={onCurrencyChange}
        value={selectedCurrency}
      />
    </View>
  );
};

export default SelectCurrency;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
