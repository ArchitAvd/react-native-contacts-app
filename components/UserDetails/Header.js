import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { capitalizeFirstLetter } from '../../helpers/string';
import colors from '../../config/colors';

const Header = ({ picture, name }) => {
  const defaultImage = require('../../assets/default-user.png');

  const imageUrl = picture.large ? { uri: picture.large } : defaultImage;

  return (
    <View style={styles.headerContainer}>
      <Image source={imageUrl} style={styles.image} />
      <Text style={styles.name}>
        {capitalizeFirstLetter(name.first)} {capitalizeFirstLetter(name.last)}
      </Text>
    </View>
  );
};

export default Header;

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  image: {
    width: window.width / 2,
    height: window.width / 2,
    borderRadius: window.width / 4,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  name: {
    fontSize: 22,
    marginTop: 10,
    color: colors.primaryText,
  },
});
