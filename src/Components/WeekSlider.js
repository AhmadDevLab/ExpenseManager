import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import dayjs from 'dayjs';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  IcBack,
  IcBackHome,
  icBackHome,
  IcNextHome,
  icNextHome,
} from '../assets/icons';
import colors from '../constants/colors';

icNextHome;

const {width} = Dimensions.get('window');

const WeekSlider = ({onDateChange}) => {
  const [startDate, setStartDate] = useState(dayjs().startOf('week'));
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    onDateChange?.(dayjs().format('YYYY-MM-DD'));
  }, []);

  const getWeekDates = useCallback(() => {
    return Array.from({length: 7}, (_, i) => startDate.add(i, 'day'));
  }, [startDate]);

  const handleDateSelect = date => {
    setSelectedDate(date);
    onDateChange?.(date.format('YYYY-MM-DD'));
  };

  const slideWeek = direction => {
    const newStart = startDate.add(direction === 'left' ? 7 : -7, 'day');
    setStartDate(newStart);
  };

  const onGestureEvent = event => {
    const dx = event.nativeEvent.translationX;
    if (event.nativeEvent.state === 5) {
      if (dx < -50) slideWeek('left');
      else if (dx > 50) slideWeek('right');
    }
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        {/* Month with arrows */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => slideWeek('right')}>
            <IcBackHome name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.month}>{startDate.format('MMMM YYYY')}</Text>
          <TouchableOpacity onPress={() => slideWeek('left')}>
            <IcNextHome name="chevron-forward" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Swipe area */}
        <PanGestureHandler onHandlerStateChange={onGestureEvent}>
          <View style={styles.weekRow}>
            {getWeekDates().map(day => {
              const isToday = day.isSame(dayjs(), 'day');
              const isSelected = day.isSame(selectedDate, 'day');
              return (
                <TouchableOpacity
                  key={day.format('YYYY-MM-DD')}
                  style={[
                    styles.dayContainer,
                    isSelected && styles.selected,
                    isToday && styles.today,
                  ]}
                  onPress={() => handleDateSelect(day)}>
                  <Text
                    style={[styles.dayText, isSelected && styles.selectedText]}>
                    {day.format('ddd')}
                  </Text>
                  <Text
                    style={[
                      styles.dateText,
                      isSelected && styles.selectedText,
                    ]}>
                    {day.format('D')}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
    elevation: 4,
    paddingVertical: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  month: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayContainer: {
    alignItems: 'center',
    width: 50,
    padding: 6,
    borderRadius: 10,
  },
  today: {
    borderColor: colors.black,
    borderWidth: 1,
  },
  selected: {
    backgroundColor: colors.primary,
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
  selectedText: {
    color: colors.black,
  },
});

export default WeekSlider;
