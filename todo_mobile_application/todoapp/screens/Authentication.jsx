import { View ,StatusBar,TextInput, StyleSheet, TouchableOpacity,Text, Modal,Pressable} from "react-native";
import './global.css' ;
import { useEffect, useState } from "react";
import { z } from "zod";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import url from "./config";

export default function Authentication({navigation}){

    const [signIn , setSignIn] = useState(true) ;
    const [mailId, setMailId] = useState("") ;
    const [username, setUsername] = useState("") ;
    const [password, setPassword] = useState("") ;
    const [error, setError] = useState("") ;
    const [showModal, setShowModal ] = useState(false) ;



    const submit = async () => {
    
        // username and password check
        const usernameSchema = z.string().regex(/^[a-zA-Z][a-zA-Z0-9_]{2,19}$/, {
            message: "invalid username",
        });
    
        const emailSchema = z.string().email() ;
        const passwordSchema = z.string().min(8).max(18) ;
        const passwordErrorMessage = "password: min length 8 and max 18" ;
        const usernameErrorMessage = "username: should only contain alphabets unserscores and numbers" ;
        let go = false ;
        if(usernameSchema.safeParse(username).success){
            if(passwordSchema.safeParse(password).success){
                go = true ;
            }else{
                // we are going to use Modal component 
                setError(passwordErrorMessage) ;
                setShowModal(true) ;
            }
        }else{
            // we are going to use Modal component 
            setError(usernameErrorMessage) ;
            setShowModal(true) ;
        }
        let result ;
        if(signIn && go){
            result = await axios.post(`${url}/Authentication/sign-in`,{
                username, password
            }) ;

        }else if(go){
            if(emailSchema.safeParse(mailId).success){
                result = await axios.post(`${url}/Authentication/sign-up`,{
                    username,password,email: mailId
                }) ;
            }else{
                setError("Invalid Mail Id") ;
                setShowModal(true) ;
            }
        }
        console.log(`the result was ${result}`)
        console.log(`the result  ${result.data.message}`)
        if(result.data.value) {
            // we need to store the authorization key and then navigate
            await SecureStore.setItemAsync("authorization", result.data.authorization) ;
            console.log(result.data.value)
            console.log(`navigation was ${navigation}`)
            console.log('navigating to the home')
            navigation.navigate('Home') ;
        }else{
            setError(result.data.message) ;
            setShowModal(true)
        }
        
    }


    useEffect(() => {
        async function main(){
            console.log(`The check was ${await SecureStore.getItemAsync('authorization')}`)
            if(await SecureStore.getItemAsync('authorization')) navigation.navigate('Home')
        }main()
    },[])
    
 
   


    return <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.inner}>

            {
                !signIn && <TextInput placeholder="mail-id" placeholderTextColor={'#94a3b8'} style={styles.input}
                value={mailId} onChangeText={(text)=> setMailId(text)}
                keyboardType="email-address" 
                autoCapitalize="none" 
                autoCorrect={false} 
                />
            }
            <TextInput placeholder="username" placeholderTextColor={'#94a3b8'} style={styles.input}
            value={username} onChangeText={(text) => setUsername(text)}
            autoCapitalize="none" 
            autoCorrect={false}
             />
            <TextInput placeholder="password" placeholderTextColor={'#94a3b8'} style={styles.input} 
            value={password} onChangeText={(text)=> setPassword(text)}
            keyboardType="visible-password"
            autoCapitalize="none" 
            autoCorrect={false}
            />
            {
                signIn && <TouchableOpacity onPress={() => {}} style={styles.link}>
                    <Text style={styles.sec}> forgot password </Text>
                </TouchableOpacity>
            }
            <TouchableOpacity onPress={submit} style={styles.btn}>
                <Text style={styles.txt}> {signIn ? 'Sign in': 'Sign up'} </Text>
            </TouchableOpacity>

            <View style={styles.linker}>
                <Text style={{color: '#94a3b8'}}> {
                    signIn ? `doesn't have an account` : 'have an account'
                    } </Text>
                <TouchableOpacity onPress={() => setSignIn(!signIn)}>
                    <Text style={{color: '#f1f5f9', textDecorationLine: "underline"}}> {
                        signIn ? 'sign up' : 'sign in'
                        } </Text>
                </TouchableOpacity>
            </View>

            <Modal animationType="fade"
            transparent={true}
            onRequestClose={() => setShowModal(false)}
            visible={showModal}>

                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setShowModal(false)}>


                    <View style={styles.modalContent}>
                        <Text style={{color: "#e11d48", fontStyle: 12}}> {error} </Text>
                        <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalButton}>
                            <Text style={{color: '#f1f5f9'}}> Close </Text>
                        </TouchableOpacity>
                    </View>
                    




                    </Pressable>


            </Modal>

        </View>
    </View>

}


export const styles = StyleSheet.create({
        container:{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            , backgroundColor: "#0f172a",
            height: "100%",
            color: "white",

        },
        inner:{
            width: '80%'
        },
        input:{
            color: '#f1f5f9',
            backgroundColor: '#1e293b',
            borderRadius: 8,
            padding: 12,
            borderWidth: 1,
            borderColor: '#334155',
            width: '100%',
            marginTop: 12,
        },
        btn:{
            backgroundColor: '#3b82f6',
            padding: 8,
            flexDirection: "row",
            justifyContent: 'center',
            borderRadius: 8,
            marginTop: 12,
        },
        txt:{
            color: '#f1f5f9',
        },
        link:{
            flexDirection: 'row-reverse',
            marginTop: 5
        },
        sec:{
            color: '#94a3b8',
            textDecorationLine: 'underline' ,
        },
        linker:{
            marginTop: 25,
            flexDirection: "row"
        },
        modalOverlay: { // how background should appear
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            
        },
        modalContent: {
            width: '90%',
            backgroundColor: '#0f172a',
            borderRadius: 20,
            padding: 20,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        modalButton: {
            width: '100%',
            padding: 15,
            borderRadius: 10,
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#3b82f6',
        },

})