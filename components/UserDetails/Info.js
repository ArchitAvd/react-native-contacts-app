import { View, StyleSheet } from 'react-native';
import moment from 'moment';
import Row from './Row';
import { capitalizeFirstLetter } from '../../helpers/string';

const Info = ({ login, dob, location, registered }) => {
  return (
    <View style={styles.infoContainer}>
      <Row label="City" body={capitalizeFirstLetter(location.city)} />
      <Row label="Birthday" body={moment(dob).format('MMMM Do, YYYY')} />
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  infoContainer: {
    paddingVertical: 15,
  },
});
