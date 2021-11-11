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
} from "react-native";

import PhoneInput from "react-native-phone-number-input";
import { color } from "react-native-reanimated";

export default function Signup() {

    /********* Phone Number ********* */
    const [value, setValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);
    /*************************************** */
    
    const [userInput, setUserInput] = useState({mail:'' , phone:'' , password:''})
    return (
        <View style={styles.pageContainer}>
            <Text style={styles.textBook}>Book</Text>
            <View style={styles.container}>
                <TextInput onChangeText={(input)=>{setUserInput({...userInput,orgname:input})}} style={styles.textInput} placeholderTextColor='#8a8a8a' placeholder='Organization Name'/>
                <TextInput onChangeText={(input)=>{setUserInput({...userInput,orgusername:input})}} style={styles.textInput} placeholderTextColor='#8a8a8a' placeholder='Username'/>
                <TextInput onChangeText={(input)=>{setUserInput({...userInput,mail:input})}} style={styles.textInput} placeholderTextColor='#8a8a8a' placeholder='Email'/>
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
                    console.log(userInput.mail +' '+userInput.phone+' '+userInput.password);
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
        marginTop:80,
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
