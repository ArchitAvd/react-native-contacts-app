import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { toPhoneNumber } from '../../helpers/string';
import colors from '../../config/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const Row = ({ label, body, actions = [] }) => {
  return (
    <View style={styles.actionRow}>
      <View style={styles.actionInfo}>
        <Text style={styles.actionLabel}>{label}</Text>
        <Text style={styles.actionBody}>{body}</Text>
      </View>
      <View style={styles.actionIcons}>
        {actions.map((action, index) => (
          <TouchableOpacity onPress={action.onPress} key={index}>
            <FontAwesomeIcon
              color={colors.link}
              icon={action.icon}
              size={ICON_SIZE}
              style={styles.actionIcon}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Row;

const ICON_SIZE = 25;
const styles = StyleSheet.create({
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  actionInfo: {
    flexDirection: 'column',
  },
  actionLabel: {
    fontSize: 12,
    color: 'red',
    marginBottom: 3,
  },
  actionBody: {
    fontSize: 16,
    color: colors.primaryText,
    marginBottom: 5,
  },
  actionIcons: {
    flexDirection: 'row',
  },
  actionIcon: {
    marginLeft: 13,
  },
});
