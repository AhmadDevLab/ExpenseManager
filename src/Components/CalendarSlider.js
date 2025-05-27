import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import dayjs from 'dayjs';

const screenWidth = Dimensions.get('window').width;

const CalendarSlider = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const getWeekDates = (baseDate: any) => {
    const startOfWeek = baseDate.startOf('week');
    return Array.from({length: 7}).map((_, i) => startOfWeek.add(i, 'day'));
  };

  const handleSwipeLeft = () => {
    setCurrentDate(prev => prev.add(7, 'day'));
  };

  const handleSwipeRight = () => {
    setCurrentDate(prev => prev.subtract(7, 'day'));
  };

  const weekDates = getWeekDates(currentDate);

  return (
    <GestureRecognizer
      onSwipeLeft={handleSwipeLeft}
      onSwipeRight={handleSwipeRight}>
      <View style={styles.container}>
        <Text style={styles.monthText}>{currentDate.format('MMMM YYYY')}</Text>
        <FlatList
          horizontal
          data={weekDates}
          keyExtractor={item => item.format('YYYY-MM-DD')}
          renderItem={({item}) => (
            <View style={styles.dayItem}>
              <Text style={styles.day}>{item.format('ddd')}</Text>
              <Text style={styles.date}>{item.format('D')}</Text>
            </View>
          )}
        />
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 8,
  },
  dayItem: {
    width: screenWidth / 7,
    alignItems: 'center',
  },
  day: {
    fontSize: 14,
    color: '#999',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CalendarSlider;
