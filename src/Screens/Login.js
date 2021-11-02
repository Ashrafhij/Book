import React,{useState} from 'react'
import { View,StyleSheet, Text,Button,TextInput } from 'react-native'

export default function Login({navigation,route}) {
    const [userInput, setUserInput] = useState({password:'' , username:'' })
    return (
        <View>
            <Text>{JSON.stringify(route.params.userInput.password)}</Text>
            <TextInput style={styles.textInput} value={route.params.userInput.password} placeholder='password'/>
            <TextInput style={styles.textInput} placeholder='username'/>

            <Button title='Login' onPress={()=>{navigation.navigate('HomePage')}}/>
        </View>
    )
}

const styles = StyleSheet.create({
textInput:{
        backgroundColor:'white',
        width:300,
        height:60,
        borderRadius:10,
        // textAlign:'center',
        padding:20,
        borderColor:'black',
        borderWidth:2,


    }
})
