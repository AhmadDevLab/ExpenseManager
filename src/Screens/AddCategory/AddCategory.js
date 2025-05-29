import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('userId').then(id => {
      if (id) setUserId(id);
    });
  }, []);

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      Alert.alert('Enter a category name');
      return;
    }

    if (!userId) {
      Alert.alert('User not logged in');
      return;
    }

    const trimmedCategory = categoryName.trim();

    try {
      await firestore()
        .collection('users')
        .doc(userId)
        .collection('customCategories')
        .add({
          label: trimmedCategory,
          value: trimmedCategory,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      Alert.alert('Category added');
      setCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
      Alert.alert('Error adding category');
    }
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter category name"
        value={categoryName}
        onChangeText={setCategoryName}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddCategory}>
        <Text style={styles.buttonText}>Add Category</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 12,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
