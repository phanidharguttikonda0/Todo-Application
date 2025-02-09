import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CustomTabBar = ({ state }) => {
  const navigation = useNavigation();
  
  const icons = {
    HomeTodos: "home",
    CompletedTodos: "checkmark-done",
    AddTodo: "add-circle",
    Profile: "person",
  };

  return (
    <View style={styles.Tab}>
        <View style={styles.container}>
      {state.routes.map((route, index) => (
        
        <TouchableOpacity key={index} onPress={() => navigation.navigate("Home", {screen: route.name})}>
            {
            console.log(route.name)
        }
          <Ionicons
            name={icons[route.name]}
            size={30}
            color={state.index === index ? "#f1f5f9" : "#94a3b8"}
          />
        </TouchableOpacity>
      ))}
    </View>
    </View>
  );
};

// { flexDirection: "row", justifyContent: "space-around", padding: 10, backgroundColor: "white" }

const styles = StyleSheet.create({
    Tab: {
        position: 'absolute',
        bottom: 23,
        left: 0,
        right: 0,   
        backgroundColor: '#1e293b',    
        height: 60
    },
    container:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
        , marginTop: 10,
        
    },
})



export default CustomTabBar;
