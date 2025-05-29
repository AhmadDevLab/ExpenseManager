import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WeekSlider from '../../Components/WeekSlider';
import NavigationStrings from '../../constants/NavigationStrings';
import colors from '../../constants/colors';
import {CurrencyContext} from '../../context/CurrencyContext';
import {useFocusEffect} from '@react-navigation/native';
import { useCallback } from 'react';

import {
  requestUserPermission,
  NotificationListener,
} from '../../utils/NotificationService';

const Home = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const { currency } = useContext(CurrencyContext); // ✅ use global context
  useEffect(() => {
    const initNotifications = async () => {
      const permissionGranted = await requestUserPermission();
      if (permissionGranted) {
        NotificationListener();
      }
    };

    initNotifications();
  }, []);
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const id = await AsyncStorage.getItem('userId');
        if (!id) return;

        const totalSnapshot = await firestore()
          .collection('users')
          .doc(id)
          .collection('userExpense')
          .get();

        let incomeTotal = 0;
        let expenseTotal = 0;

        totalSnapshot.forEach(doc => {
          const data = doc.data();
          if (data.type === 'income') {
            incomeTotal += parseFloat(data.amount);
          } else if (data.type === 'expense') {
            expenseTotal += parseFloat(data.amount);
          }
        });

        setIncome(incomeTotal);
        setExpense(expenseTotal);
        setBalance(incomeTotal - expenseTotal);

        // Filter by selectedDate
        const dailySnapshot = await firestore()
          .collection('users')
          .doc(id)
          .collection('userExpense')
          .where('date', '==', selectedDate)
          .get();

        const items = [];
        dailySnapshot.forEach(doc => {
          const data = doc.data();
          items.push({...data, id: doc.id});
        });

        setTransactions(items);
      };
      fetchData();
    }, [selectedDate]),
  );

  const onAddClick = () => {
    navigation.navigate(NavigationStrings.ADD);
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.amount}>
        {currency} {parseFloat(item.amount).toFixed(2)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <WeekSlider onDateChange={setSelectedDate} />
      </View>

      <View style={styles.downContainer}>
        <View style={styles.expenseContainer}>
          <Text style={styles.textRed}>
            Expenses: {currency} {expense.toFixed(2)}
          </Text>
          <Text style={styles.textGreen}>
            Balance: {currency} {balance.toFixed(2)}
          </Text>
          <Text style={styles.textBlue}>
            Income: {currency} {income.toFixed(2)}
          </Text>
        </View>

        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{paddingHorizontal: 15, marginTop: 10}}
        />

        <TouchableOpacity onPress={onAddClick} style={styles.addButton}>
          <Text style={{color: 'white', fontSize: 30}}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},

  topContainer: {
    flex: 0.2,
  },
  downContainer: {
    flex: 0.7,
  },
  addButton: {
    backgroundColor: colors.primaryDark,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  expenseContainer: {
    borderWidth: 1,
    borderColor: colors.primaryDark,
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  textRed: {color: 'red'},
  textGreen: {color: 'green'},
  textBlue: {color: 'blue'},
  label: {
    marginHorizontal: 15,
    fontWeight: '600',
    marginTop: 10,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginVertical: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    color: '#777',
    fontSize: 14,
  },
  amount: {
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'flex-end',
    color: '#444',
  },
});

export default Home;
