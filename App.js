import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList
} from 'react-native';

export default class App extends React.Component {
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

  render() {
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
  }
});

const { container, textFont } = styles;