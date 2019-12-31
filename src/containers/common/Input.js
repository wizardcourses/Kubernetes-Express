import React from 'react';
import {TextInput, View} from 'react-native';

const Input = ({value, onChangeText, placeholder, secureTextEntry}) => {
  const {containerStyle, inputStyle} = styles;
  return (
    <View style={containerStyle}>
      <TextInput
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = {
  containerStyle: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: '#008BAA',
    borderBottomWidth: 1,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 20,
  },
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
  },
};
export {Input};
