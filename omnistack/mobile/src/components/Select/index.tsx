import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-community/picker';

import styles from './styles';

interface Props {
  title: string;
  value: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  handleChangeSelectedValue: Function;
}

const Select: React.FC<Props> = ({ title, value, options, handleChangeSelectedValue }) => {

  return (
    <View style={styles.selectView}>
      <Picker
        style={styles.select}
        selectedValue={value}
        onValueChange={(value) => handleChangeSelectedValue(value)}
      >
        <Picker.Item value="" label={title}/>
        {options.map(option => {
          return <Picker.Item key={option.value} value={option.value} label={option.label} />
        })}
      </Picker>
    </View>
  );
}

export default Select;
