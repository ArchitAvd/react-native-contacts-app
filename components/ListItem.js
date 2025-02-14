import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
} from 'react-native';

import { capitalizeFirstLetter } from '../helpers/string';
import colors from '../config/colors';

const ListItem = ({ contact, onPress }) => {
  const name = `${capitalizeFirstLetter(
    contact.name.first
  )} ${capitalizeFirstLetter(contact.name.last)}`;
  const defaultImage = require('../assets/default-user.png');

  const imageUrl = contact.picture.thumbnail
    ? { uri: contact.picture.thumbnail }
    : defaultImage;

  return (
    <TouchableHighlight onPress={onPress} underlayColor={colors.rowUnderlay}>
      <View style={styles.row}>
        <Image source={imageUrl} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{contact.email}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.primaryText,
  },
  email: {
    fontSize: 13,
    color: colors.subtleText,
  },
});
