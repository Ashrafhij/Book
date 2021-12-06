import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput,
  Pressable,
  Alert,
} from "react-native";

import PhoneInput from "react-native-phone-number-input";
import { color } from "react-native-reanimated";
import { addDataDoc } from "../Firebase/firebase";

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function Signup() {

    /********* Phone Number ********* */
    const [value, setValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);
    /*************************************** */
    
    const [userInput, setUserInput] = useState({phone:'' , password:''})

    let createOrganization=(orgDetails ={})=>{

        if (!orgDetails) {
            return false
        }else{
            let orgDetailsTemp = {...orgDetails,services:[{id:1,name:'General Services',duration:15},{id:2,name:'Orders',duration:10},{id:3,name:'Techinical Support',duration:15}],
            workingHours :[ {start:"07:00",end:"17:00",day:'sunday'},
                            {start:"08:00",end:"17:00",day:'monday'},
                            {start:"09:15",end:"17:00",day:'tuesday'},
                            {start:"10:00",end:"17:00",day:'wednesday'},
                            {start:"11:00",end:"17:00",day:'thursday'}]}
            addDataDoc('organization',orgDetailsTemp)
            
            return true
        }
    }

    return (
        <View style={styles.pageContainer}>
            <Text style={styles.textBook}>Book</Text>
            <View style={styles.container}>
                <TextInput onChangeText={(input)=>{setUserInput({...userInput,name:input})}} style={styles.textInput} placeholderTextColor='#8a8a8a' placeholder='Organization Name'/>
                <TextInput onChangeText={(input)=>{setUserInput({...userInput,username:input})}} style={styles.textInput} placeholderTextColor='#8a8a8a' placeholder='Username'/>
                <TextInput onChangeText={(input)=>{setUserInput({...userInput,orgEmail:input})}} style={styles.textInput} placeholderTextColor='#8a8a8a' placeholder='Email'/>
                <TextInput onChangeText={(input)=>{setUserInput({...userInput,image:input})}} style={styles.textInput} placeholderTextColor='#8a8a8a' placeholder='image URL'/>
                <View style={styles.phone}>
                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={value}
                        defaultCode="IL"
                        onChangeText={(input)=>{setUserInput({...userInput,phone:input})}}
                        // onChangeFormattedText={(text) => {
                        // setValue(text);
                        // }}
                        withDarkTheme
                        withShadow
                        autoFocus
                    />
                </View>

                {/* <TouchableOpacity
                style={styles.button}
                onPress={() => {
                        const checkValid = phoneInput.current?.isValidNumber();
                        setValid(checkValid ? checkValid : false);
                        //proceed
                        }}>
                <Text>Check</Text>
                </TouchableOpacity> */}

                <View style={styles.pass}>
                <TextInput onChangeText={(input)=>{setUserInput({...userInput,password:input})}} secureTextEntry={true} style={styles.passwordStyle} placeholderTextColor='#8a8a8a' placeholder='Password'/>
                <TextInput secureTextEntry={true} style={styles.passwordStyle} placeholderTextColor='#8a8a8a' placeholder='Confirm Password'/>
                </View>
                <Pressable style={styles.btnStyle} onPress={()=>{
                    console.log("userInput => " ,userInput)
                    createOrganization(userInput)
                    // console.log(userInput.mail +' '+userInput.mail +' '+userInput.phone+' '+userInput.password);
                    }}>
                    <Text style={styles.textStyle}>signup </Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:10,
    },
    phone:{
        padding:10,
    },
    pageContainer:{
        flex:1,
        position:'relative',
        alignItems: 'center',
        width:414,
        height:736,
        backgroundColor:'#343434',
    },
    textBook:{
        marginTop:30,
        textAlign:'center',
        alignItems:'center',
        color:'#1877F2',
        fontSize:65,
        fontWeight: "bold",
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 20
    },
    textInput:{
        margin:10,
        backgroundColor:'#353839',
        color:'white',
        width:330,
        height:50,
        borderRadius:2.1,
        padding:15,
        borderColor:'#8a8a8a',
        borderBottomWidth:2,
        },
    btnStyle :{
        marginTop:20,
        borderRadius:10,
        width:350,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        marginBottom: 7,
        // borderWidth:1,
        shadowColor: '#1877F2',  
        shadowOpacity: 1,  
        elevation: 3, 
        backgroundColor : "#1877F2" // invisible color
    },
    passwordStyle:{
        backgroundColor:'#353839',
        color:'white',
        width:330,
        height:50,
        borderRadius:2.1,
        padding:15,
        borderColor:'#8a8a8a',
        borderWidth:1,
    },
    pass:{
        margin:10,
    },
    textStyle:{
        fontSize:18,
        color:'#353839',
        // color:'white',
        fontWeight:'bold'
    },
})
