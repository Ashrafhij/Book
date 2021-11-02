import React,{useState} from 'react'
import { View, Text, StyleSheet,Pressable,TextInput } from 'react-native'

export default function HomePage({navigation}) {
    const [userInput, setUserInput] = useState({password:''})

    return (
        
        <View style={styles.pageContainer}>
            <Text>HomePage</Text>
            <Text>{JSON.stringify(userInput)}</Text>
            <Pressable style={styles.btnStyle} title='login' onPress={()=>navigation.navigate('Login',{userInput:userInput})}>
                <Text style={styles.textStyle}>Login </Text>
            </Pressable>
            <Pressable style={styles.btnStyle} onPress={()=>{
                console.log("ashhrqaf");
                navigation.navigate('Signup')
                }}>
                <Text style={styles.textStyle}>signup </Text>
            </Pressable>
            <TextInput onChangeText={(input)=>{setUserInput({...userInput,password:input})}} style={styles.textInput} placeholder='password'/>
        
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer :{
        padding:25,
        backgroundColor:'red'
    },
    btnStyle :{
        borderRadius:62.5,
        width:300,
        height:70,
        alignItems:'center',
        justifyContent:'center',
        color : 'white',
        marginBottom: 10,
        borderWidth:2,

    },
    textStyle:{
        fontSize:27,
        color:'white',
        fontWeight:'bold'
    }
    ,textInput:{
        backgroundColor:'white',
        width:300,
        height:60,
        borderRadius:10,
        // textAlign:'center',
        padding:20,

    }
})