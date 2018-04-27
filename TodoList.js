import React from 'react';
import { FlatList, View, Text} from 'react-native';

const TodoList = props => {
  return (
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
  )
}

export default TodoList;