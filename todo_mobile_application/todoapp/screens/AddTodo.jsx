import { TextInput, TouchableOpacity, View , Text, StyleSheet} from "react-native";
import {styles} from './Authentication' ;

export default function AddTodo({navigation}) {


    return <View style={styles_.container}>
        <TextInput placeholder="Title" style={styles_.input} placeholderTextColor={'#94a3b8'}/>
        <TextInput placeholder="Description" style={styles_.input} placeholderTextColor={'#94a3b8'}/>
        <TouchableOpacity onPress={() => {}} style={styles_.btn}>
            <Text style={styles_.txt}> add todo </Text>
        </TouchableOpacity>
    </View> 

}


const styles_ = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0f172a',
        
    },
    input:{
        color: '#f1f5f9',
        backgroundColor: '#1e293b',
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#334155',
        width: '90%',
        marginTop: 12,
    },
    btn:{
        backgroundColor: '#3b82f6',
        padding: 8,
        flexDirection: "row",
        justifyContent: 'center',
        borderRadius: 8,
        marginTop: 12,
        width: '90%'
    },txt:{
        color: '#f1f5f9',
    }
})