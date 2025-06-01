import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import DropdownComponent from '../../Components/DropdownComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CurrencyContext} from '../../context/CurrencyContext';

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
  {label: 'A$ AUD - Australian Dollar', value: 'A$'},
  {label: 'C$ CAD - Canadian Dollar', value: 'C$'},
  {label: 'R$ BRL - Brazilian Real', value: 'R$'},
  {label: '₽ BYN - Belarusian Ruble', value: '₽'},
  {label: '₩ KRW - South Korean Won', value: '₩'},
  {label: '₹ PKR - Pakistani Rupee', value: '₹'},
  {label: '₽ RUB - Russian Ruble', value: '₽'},
  {label: '₹ BDT - Bangladeshi Taka', value: '₹'},
  {label: '₿ BTC - Bitcoin', value: '₿'},
  {label: '₵ GHS - Ghanaian Cedi', value: '₵'},
  {label: '₣ CHF - Swiss Franc', value: '₣'},
  {label: '₼ AZN - Azerbaijani Manat', value: '₼'},
  {label: '₹ LKR - Sri Lankan Rupee', value: '₹'},
  {label: '₤ KWD - Kuwaiti Dinar', value: '₤'},
  {label: '৳ BDT - Bangladeshi Taka', value: '৳'},
  {label: '₾ GEL - Georgian Lari', value: '₾'},
  {label: '₲ PYG - Paraguayan Guarani', value: '₲'},
  {label: '₸ KZT - Kazakhstani Tenge', value: '₸'},
  {label: '₴ UAH - Ukrainian Hryvnia', value: '₴'},
  {label: '₮ MNT - Mongolian Tögrög', value: '₮'},
  {label: '₽ RUB - Russian Ruble', value: '₽'},
  {label: '₺ TRY - Turkish Lira', value: '₺'},
  {label: '৳ BDT - Bangladeshi Taka', value: '৳'},
  {label: '৳ INR - Indian Rupee', value: '₹'},
  {label: '₨ NPR - Nepalese Rupee', value: '₨'},
  {label: '₮ KZT - Kazakhstani Tenge', value: '₮'},
  {label: '₽ RUB - Russian Ruble', value: '₽'},
  {label: '₵ GHS - Ghanaian Cedi', value: '₵'},
  {label: '₮ MNT - Mongolian Tögrög', value: '₮'},
  {label: '₣ BGN - Bulgarian Lev', value: '₣'},
  {label: '₳ ARS - Argentine Peso', value: '₳'},
  {label: '₳ GEL - Georgian Lari', value: '₳'},
  {label: '₴ ZAR - South African Rand', value: '₴'},
  {label: '₺ TRY - Turkish Lira', value: '₺'},
  {label: '₤ KHR - Cambodian Riel', value: '₤'},
  {label: '₶ MNT - Mongolian Tögrög', value: '₶'},
  {label: '₽ BOB - Bolivian Boliviano', value: '₽'},
  {label: '₵ BGN - Bulgarian Lev', value: '₵'},
  {label: '₣ ZAR - South African Rand', value: '₣'},
  {label: '₩ KWD - Kuwaiti Dinar', value: '₩'},
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
