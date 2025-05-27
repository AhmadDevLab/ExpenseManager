import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../constants/colors';
import DropdownComponent from '../../Components/DropdownComponent';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = () => {
  const [typeValue, setTypeValue] = useState(null);
  const [categoryValue, setCategoryValue] = useState(null);

  const [categoryItems, setCategoryItems] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snapshot = await firestore().collection('categories').get();
        const categories = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            label: data.name || data.label || 'Unnamed', 
            value: data.id || data.value || doc.id,
          };
        });
        setCategoryItems(categories);
      } catch (error) {
        console.log('Error fetching categories:', error);
      }
    };

    fetchCategories();

    AsyncStorage.getItem('userId').then(id => {
      if (id) setUserId(id);
    });
  }, []);

  const typeItems = [
    {label: 'Expense', value: 'expense'},
    {label: 'Income', value: 'income'},
  ];

  const handleAddExpense = async () => {
    if (!typeValue || !categoryValue || !amount) {
      Alert.alert('Please fill type, category and amount');
      return;
    }

    if (!userId) {
      Alert.alert('User not logged in');
      return;
    }

    try {
      const expensesRef = firestore()
        .collection('users')
        .doc(userId)
        .collection('userExpense');

      await expensesRef.add({
        type: typeValue,
        category: categoryValue,
        amount: parseFloat(amount),
        description: description.trim() || '',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Expense added successfully');

      setTypeValue(null);
      setCategoryValue(null);
      setAmount('');
      setDescription('');
    } catch (error) {
      console.error('Error adding expense:', error);
      Alert.alert('Failed to add expense');
    }
  };

  return (
    <View style={styles.container}>
      <DropdownComponent
        data={typeItems}
        showSearch={false}
        placeholder="Select Type"
        onChangeValue={setTypeValue}
        value={typeValue} // pass selected value to keep dropdown synced
      />

      <DropdownComponent
        data={categoryItems}
        showSearch={true}
        placeholder="Select Category"
        onChangeValue={setCategoryValue}
        value={categoryValue} // pass selected value to keep dropdown synced
      />

      <TextInput
        style={styles.etAmount}
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={value => setAmount(value)}
      />

      <TextInput
        style={styles.etAmount}
        placeholder="Enter Description (Optional)"
        value={description}
        onChangeText={value => setDescription(value)}
      />

      <TouchableOpacity style={styles.btnAddExpense} onPress={handleAddExpense}>
        <Text style={styles.tvAddExpense}>Add new expense</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  etAmount: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 12,
    height: 50,
  },
  btnAddExpense: {
    padding: 12,
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginTop: 20,
  },
  tvAddExpense: {
    textAlign: 'center',
    color: colors.white,
  },
});
