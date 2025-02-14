import { NavigationContainer } from '@react-navigation/native';
import Contact from './screens/Contact';
import NewContact from './screens/NewContact';
import Me from './screens/Me';
import Detail from './screens/Details';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { capitalizeFirstLetter } from './helpers/string';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faPlus,
  faAddressBook,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyContactStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{
          title: 'Contacts',
        }}
      />
      <Stack.Screen
        name="Details"
        component={Detail}
        options={({ route }) => ({
          title: `${capitalizeFirstLetter(
            route.params.name.first
          )} ${capitalizeFirstLetter(route.params.name.last)}`,
        })}
      />
    </Stack.Navigator>
  );
}

function NewContactStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="New Contact"
        component={NewContact}
        options={{
          title: 'New Contact',
        }}
      />
    </Stack.Navigator>
  );
}

function MeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Me"
        component={Me}
        options={{
          title: 'Me',
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Contacts"
        screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="New Contact"
          component={NewContactStack}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <FontAwesomeIcon icon={faPlus} color={focused ? 'blue' : color} />
            ),
          }}
        />
        <Tab.Screen
          name="Contacts"
          component={MyContactStack}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <FontAwesomeIcon
                icon={faAddressBook}
                color={focused ? 'blue' : color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Me"
          component={MeStack}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <FontAwesomeIcon icon={faUser} color={focused ? 'blue' : color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
