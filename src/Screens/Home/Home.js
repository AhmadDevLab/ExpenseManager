import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WeekSlider from '../../Components/WeekSlider';
import NavigationStrings from '../../constants/NavigationStrings';
import {CurrencyContext} from '../../context/CurrencyContext';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

import {
  requestUserPermission,
  NotificationListener,
} from '../../utils/NotificationService';
import styles from './styles';
import {IcBackHome, IcBalance, IcExpense, IcIncome} from '../../assets/icons';
import fonts from '../../constants/fonts';

const Home = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const {currency} = useContext(CurrencyContext);
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

  const renderItem = ({item}) => {
    const formattedAmount =
      item.type === 'income'
        ? `+ ${currency} ${parseFloat(item.amount).toFixed(2)}`
        : `- ${currency} ${parseFloat(item.amount).toFixed(2)}`;

    return (
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.category}>{item.category}</Text>
        </View>
        <Text style={styles.amount}>{formattedAmount}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <WeekSlider onDateChange={setSelectedDate} />
      </View>

      <View style={styles.downContainer}>
        <View style={styles.expenseContainer}>
          <View style={styles.expensesContainer}>
            <IcBalance />
            <Text style={styles.textGreen}>
              {currency} {balance.toFixed(2)}
            </Text>
            <Text style={styles.tvExpenses}> Balance</Text>
          </View>
          <View style={styles.expensesContainer}>
            <IcIncome />
            <Text style={styles.textBlue}>
              {currency} {income.toFixed(2)}
            </Text>
            <Text style={styles.tvExpenses}>Income</Text>
          </View>
          <View style={styles.expensesContainer}>
            <IcExpense />
            <Text style={styles.textRed}>
              {currency} {expense.toFixed(2)}
            </Text>
            <Text style={styles.tvExpenses}>Expenses</Text>
          </View>
        </View>

        <Text
          style={{
            marginLeft: 15,
            fontFamily: fonts.SplineSansBold,
            marginBottom: 5,
            marginTop: 10,
            fontSize: 16,
          }}>
          Expense List
        </Text>

        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{paddingHorizontal: 15, marginTop: 10}}
        />

        <TouchableOpacity onPress={onAddClick} style={styles.addButton}>
          <Text style={{color: 'black', fontSize: 30}}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
