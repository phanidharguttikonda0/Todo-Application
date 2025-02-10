import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home' ;
import Authentication from './screens/Authentication.jsx' ;
import * as SecureStore from 'expo-secure-store' ;
import { useEffect,useState } from 'react';

const Stack = createStackNavigator() ;

export default function App() {

  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true) ;

  useEffect(() => {
    
    async function main() {

      if(await SecureStore.getItemAsync('authorization')) {
        
        setisAuthenticated(true) ;
        setLoading(false) ;
      }
      
    } main()

  },[])
  
  if(loading) return <ActivityIndicator />
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      {
        isAuthenticated ? (<Stack.Screen name='Home' component={Home} />) :
         (<Stack.Screen name='Authentication' component={Authentication} />)
        
      }
      {
        isAuthenticated ? (<Stack.Screen name='Authentication' component={Authentication} />) 
        : (<Stack.Screen name='Home' component={Home} />) 
      }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

