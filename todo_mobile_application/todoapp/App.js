import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home' ;
import Authentication from './screens/Authentication.jsx' ;

const Stack = createStackNavigator() ;

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Authentication' component={Authentication} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

