// CalendarWeekSlider.tsx
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import dayjs from 'dayjs';

const screenWidth = Dimensions.get('window').width;

const CalendarWeekSlider = ({onDateSelected}) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const getWeek = date => {
    const start = date.startOf('week');
    return Array.from({length: 7}).map((_, i) => start.add(i, 'day'));
  };

  const handleSwipe = direction => {
    setCurrentDate(prev =>
      direction === 'left' ? prev.add(7, 'day') : prev.subtract(7, 'day'),
    );
  };

  const handleDateSelect = date => {
    setSelectedDate(date);
    onDateSelected?.(date.format('YYYY-MM-DD'));
  };

  const renderItem = ({item}) => {
    const isToday = item.isSame(dayjs(), 'day');
    const isSelected = item.isSame(selectedDate, 'day');

    return (
      <TouchableOpacity
        style={[
          styles.dateContainer,
          isSelected && styles.selectedDate,
          isToday && styles.todayDate,
        ]}
        onPress={() => handleDateSelect(item)}>
        <Text style={[styles.dayText, isSelected && styles.whiteText]}>
          {item.format('ddd')}
        </Text>
        <Text style={[styles.dateText, isSelected && styles.whiteText]}>
          {item.format('D')}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleSwipe('right')}>
          <Text style={styles.arrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentDate.format('MMMM YYYY')}</Text>
        <TouchableOpacity onPress={() => handleSwipe('left')}>
          <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={getWeek(currentDate)}
        keyExtractor={item => item.format('YYYY-MM-DD')}
        horizontal
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 10}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 2,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 5,
  },
  arrow: {
    fontSize: 20,
    color: '#444',
  },
  monthText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateContainer: {
    width: screenWidth / 8,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  selectedDate: {
    backgroundColor: '#007B8F',
  },
  todayDate: {
    borderWidth: 1,
    borderColor: '#007B8F',
    borderRadius: 10,
  },
  dayText: {
    fontSize: 12,
    color: '#555',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  whiteText: {
    color: '#fff',
  },
});

export default CalendarWeekSlider;
