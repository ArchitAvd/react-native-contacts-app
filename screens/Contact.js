import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import ListItem from '../components/ListItem';

import { contacts } from '../config/data';
import colors from '../config/colors';

class Contacts extends Component {
  handleRowPress = (item) => {
    this.props.navigation.navigate('Details', item);
  };

  render() {
    return (
      <FlatList
        style={{ backgroundColor: colors.background }}
        data={contacts}
        renderItem={({ item }) => (
          <ListItem contact={item} onPress={() => this.handleRowPress(item)} />
        )}
        keyExtractor={(item) => item.email}
      />
    );
  }
}
export default Contacts;