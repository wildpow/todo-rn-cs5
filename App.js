import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Todos from './Todos';

const Home = props => {
  console.log('PROPS', props);
  const { navigate } = props.navigation;
  return (
    <View style={styles.container}>
      <Text>HOME</Text>
      <Button title="Todos" onPress={() => navigate('Todos')} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 33
  },
})

const Routes = StackNavigator({
  Home: { screen: Home },
  Todos: { screen: Todos },
});

export default Routes;