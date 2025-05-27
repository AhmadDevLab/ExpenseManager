import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import colors from '../constants/colors';

const DropdownComponent = ({data, showSearch, placeholder, onChangeValue}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          {placeholder}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.wrapper}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus && !value ? placeholder : ''}
        search={showSearch}
        searchPlaceholder="search here"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          onChangeValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 14,
    top: -10,
    zIndex: 10,
    fontSize: 12,
    paddingHorizontal: 4,
    color: 'gray',
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
});
