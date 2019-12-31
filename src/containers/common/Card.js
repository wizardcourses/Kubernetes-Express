import React from 'react';
import {View} from 'react-native';

const Card = props => {
  return <View style={styles.cardContainerStyle}>{props.children}</View>;
};

const styles = {
  cardContainerStyle: {
    borderWidth: 0,
    borderRadius: 0,
    borderColor: '#fff',
    borderBottomWidth: 0,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
};

export {Card};
