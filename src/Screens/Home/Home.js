import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import WeekSlider from '../../Components/WeekSlider';
import NavigationStrings from '../../constants/NavigationStrings';
import {Picker} from '@react-native-picker/picker';

const Home = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState('');

  const onAddClick = () => {
    navigation.navigate(NavigationStrings.ADD);
  };

  return (
    <View style={styles.container}>
      <WeekSlider onDateChange={setSelectedDate} />
      <Text style={styles.label}>Selected Date: {selectedDate}</Text>

      <TouchableOpacity onPress={() => onAddClick()} style={styles.addButton}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    backgroundColor: 'red',
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    alignSelf: 'flex-end',
    marginBottom: 90,
    marginRight: 20,
  },
});

export default Home;
