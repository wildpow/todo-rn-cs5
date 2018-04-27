import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList, 
  AsyncStorage,
} from 'react-native';

export default class Todos extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      todos: []
    };
  }

  handleButtonPress = () => {
    this.setState(prevState => {
      let { text, todos } = prevState;
      return {
        text: '',
        todos: [...todos, { key: text + todos.length, text, completed: false }]
      };
    });
  };

  handleTextChange = text => {
    this.setState({ text });
  };

  handleCompletedToggle = todoKey => {
    const todos = this.state.todos.slice();
    todos.map(todo => {
      if (todo.key === todoKey) {
        return (todo.completed = !todo.completed);
      }
    });
    this.setState({ todos });
  };

  removeCompleted = () => {
    const todos = this.state.todos.slice();
    const filteredTodos = todos.filter(todo => !todo.completed);
    this.setState({ todos: filteredTodos });
  };

  componentDidMount() {
   const todos = AsyncStorage.getItem('todos');
   if(todos !== null) {
    todos
     .then(res => {
       const parsedTodos = JSON.parse(res);
       this.setState(prevState => {
        return {
          todos: parsedTodos
        }
       });
     })
     .catch(err => {
       console.log(err, 'error on retrieval of todos');
     });
   }
  };

  componentWillUnmount() {
    const todos = this.state.todos.slice();
    AsyncStorage.setItem('todos', JSON.stringify(todos), err => {
      if(err) {
        console.log(err, 'Something went terribly wrong setting items');
      } else {
        console.log('Todos have been set!');
      }
    });
  };

  render() {
    console.log('STATE: ', this.state.todos);
    return (
      <View style={container}>
        {this.state.todos.length === 0 ? (
          <Text style={textFont}>You're free</Text>
        ) : (
          <Text style={textFont}>You got stuff to do!</Text>
        )}
        <TextInput
          onChangeText={this.handleTextChange}
          value={this.state.text}
          placeholder="Add Todo"
        />
        <Button onPress={() => this.handleButtonPress()} title="Add Todo" />
        <FlatList
          data={this.state.todos}
          renderItem={({ item, key }) => {
            return (
              <View key={item.key}>
                <Text
                  onPress={() => this.handleCompletedToggle(item.key)}
                  style={item.completed ? styles.lineThrough : null}
                >
                  {item.text}
                </Text>
              </View>
            );
          }}
        />
        <View style={buttonWrapper}>
          <Button title="Remove Completed" onPress={() => this.removeCompleted()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lineThrough: {
    textDecorationLine: 'line-through'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 33
  },
  textFont: {
    fontSize: 28
  }, 
  buttonWrapper: {
    marginBottom: 25
  }
});

const { container, textFont, buttonWrapper } = styles;