import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Button = ({onPress, children}) => {
  const {buttonStyle, textStyle} = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#008BAA',
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
  },
  textStyle: {
    alignSelf: 'center',
    color: '#008BAA',
    fontSize: 16,
    fontWeight: '600',
  },
};

export {Button};
