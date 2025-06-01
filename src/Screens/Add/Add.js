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
import dayjs from 'dayjs';
import fonts from '../../constants/fonts';
import {IcBack, IcCancel, IcClose} from '../../assets/icons';
import NavigationStrings from '../../constants/NavigationStrings';

const Add = ({navigation}) => {
  const [typeValue, setTypeValue] = useState(null);
  const [categoryValue, setCategoryValue] = useState(null);

  const [categoryItems, setCategoryItems] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (!id) return;

        setUserId(id);

        // Fetch default categories
        const defaultSnap = await firestore().collection('categories').get();
        const defaultCategories = defaultSnap.docs.map(doc => {
          const data = doc.data();
          return {
            label: data.label || data.name || 'Unnamed',
            value: data.value || data.id || doc.id,
          };
        });

        // Fetch user custom categories
        const customSnap = await firestore()
          .collection('users')
          .doc(id)
          .collection('customCategories')
          .get();

        const customCategories = customSnap.docs.map(doc => {
          const data = doc.data();
          return {
            label: data.label || 'Unnamed',
            value: data.value || doc.id,
          };
        });

        // Combine both
        setCategoryItems([...defaultCategories, ...customCategories]);
      } catch (error) {
        console.log('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const typeItems = [
    {label: 'Expense', value: 'expense'},
    {label: 'Income', value: 'income'},
  ];

  const onBackPress = () => {
    navigation.replace(NavigationStrings.BOTTOMSTACK);
  };

  const handleAddExpense = async () => {
    const todayDate = dayjs().format('YYYY-MM-DD');

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
        date: todayDate,
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
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => onBackPress()}>
          <IcCancel />
        </TouchableOpacity>
        <Text style={styles.title}>Add Expense</Text>
      </View>

      <DropdownComponent
        data={typeItems}
        showSearch={false}
        placeholder="Select Type"
        onChangeValue={setTypeValue}
        value={typeValue}
      />

      <DropdownComponent
        data={categoryItems}
        showSearch={true}
        placeholder="Select Category"
        onChangeValue={setCategoryValue}
        value={categoryValue}
      />

      <TextInput
        style={styles.etAmount}
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={amount}
        placeholderTextColor={colors.textPrimary}
        onChangeText={value => setAmount(value)}
      />

      <TextInput
        style={styles.etAmount}
        placeholder="Enter Description (Optional)"
        value={description}
        placeholderTextColor={colors.textPrimary}
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
    backgroundColor: colors.bgPrimary,
    paddingHorizontal: 15,
  },
  etAmount: {
    borderColor: 'black',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 12,
    height: 50,
    backgroundColor: colors.etPrimarycolor,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  btnAddExpense: {
    padding: 12,
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginTop: 20,
  },
  tvAddExpense: {
    textAlign: 'center',
    color: colors.black,
    fontFamily: fonts.SplineSansBold,
    fontSize: 12,
  },
});
