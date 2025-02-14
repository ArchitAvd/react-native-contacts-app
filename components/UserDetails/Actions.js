import { View, StyleSheet, Linking } from 'react-native';
import Row from './Row';
import colors from '../../config/colors';
import { toPhoneNumber } from '../../helpers/string';
import {
  faEnvelope,
  faPhone,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';

const Actions = ({ email, cell, phone }) => {
  return (
    <View style={styles.actionContainer}>
      <Row
        label="Email"
        body={email}
        actions={[
          {
            onPress: () => Linking.openURL(`mailto:${email}`),
            icon: faEnvelope,
          },
        ]}
      />

      <Row
        label="Phone"
        body={toPhoneNumber(cell)}
        actions={[
          {
            onPress: () => {
              Linking.canOpenURL(`tel:${cell}`).then((supported) => {
                if (supported) {
                  Linking.openURL(`tel:${cell}`);
                } else {
                  console.log('The device cannot make calls');
                }
              });
            },
            icon: faPhone,
          },
          {
            onPress: () => Linking.openURL(`sms:${cell}`),
            icon: faMessage,
          },
        ]}
      />

      <Row
        label="Home"
        body={toPhoneNumber(phone)}
        actions={[
          {
            onPress: () => Linking.openURL(`tel:${phone}`),
            icon: faPhone,
          },
        ]}
      />
    </View>
  );
};

export default Actions;

const styles = StyleSheet.create({
  actionContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    borderBottomColor: colors.border,
    paddingVertical: 15,
    backgroundColor: colors.grayBackground,
  },
});
