import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CompletedTodos from "./CompletedTodos";
import HomeTodos from "./HomeTodos";
import AddTodo from "./AddTodo" ;
import Profile from "./Profile";
import CustomTabBar from "./CustomTabBar";
import { useEffect } from "react";
import * as SecureStore from 'expo-secure-store' ;

const Tab = createBottomTabNavigator() ;

export default function Home({navigation}){

    useEffect(() => {
        async function main() {
            if(await SecureStore.getItemAsync('authorization') === null) navigation.navigate('Authentication')
        }
        main()
    }, [])


    return <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
                
                <Tab.Screen name="HomeTodos" component={HomeTodos} />
                <Tab.Screen name='CompletedTodos' component={CompletedTodos} />
                <Tab.Screen name='AddTodo' component={AddTodo} />
                <Tab.Screen name='Profile' component={Profile} />
            </Tab.Navigator>


}