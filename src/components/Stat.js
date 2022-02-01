import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Stat = props => {
  return (
    <View>
      <Text style={styles.statTitle}>{props.title}</Text>
      <Text style={styles.statValue}>
        {props.value} {!!props.sufix && props.sufix}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statValue: {
    color: '#F8BD1C',
    textAlign: 'center',
    fontWeight: '500',
  },
  statTitle: {
    color: '#707C84',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});

export default Stat;
