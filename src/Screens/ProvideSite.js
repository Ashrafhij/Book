import React, { useState, useRef } from "react";
import {
  Image,
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
// import { color } from "react-native-reanimated";


export default function ProvideSite({navigation,route}) {
    /********* Phone Number ********* */
    const [value, setValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);
    /*************************************** */
    const [userInput, setUserInput] = useState({orgname:'' })
    const [query, setQuery] = useState("");

    return (
        <View style={styles.pageContainer}>
            <Image source={{uri:route.params.userInput.img}} style={{width :"100%",height:"40%",borderRadius:10}}/>
            <Text style={styles.textBook}>{route.params.userInput.orgname}</Text>
            {/* <Text>{JSON.stringify(route.params)} </Text> */}
            <Text style={styles.presstylecolor2}>Enter Phone or Email</Text>
                 <View style={{flexDirection: 'row', alignItems: 'center',margin:30 }}>
                     <Pressable style={styles.presstyle2} onPress={()=>{
                            setQuery("")
                        }}>
                        <Text style={styles.presstylecolor}>Phone</Text>
                    </Pressable>
                            <View>
                                <Text style={{width: 50, textAlign: 'center' , color:'white' }}>|</Text>
                            </View>
                            <Pressable style={styles.presstyle2} onPress={()=>{
                            setQuery("asas")
                        }}>
                        <Text style={styles.presstylecolor}>Email</Text>
                    </Pressable>
                </View>
            {
                    query ?
                        <View>
                            <TextInput onChangeText={(input)=>{setUserInput({...userInput,orgname:input})}} style={styles.textInput} placeholderTextColor='#8a8a8a' placeholder='Email Address'/>
                        </View>
                        : 
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
                        
            }
            <Pressable style={styles.btnStyle1} onPress={()=>{
                    navigation.navigate('Signup')
                    }}>
                    <Text style={styles.textStyle2}>Next</Text>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:"7%",
    },
    pageContainer:{
        flex:1,
        // position:'relative',
        alignItems: 'center',
        // width:414,
        // height:736,
        backgroundColor:'#343434',
    },
    phoneContainer:{
        margin:"30%",
        alignItems: 'center',
        backgroundColor:'red',
    },
    ph:{
        // height:200,
        // marginTop:"50%",
        // padding:"50%",
        // paddingTop:100,
    },
    textBook:{
        marginTop:10,
        textAlign:'center',
        alignItems:'center',
        color:'#1877F2',
        fontSize:24,
        fontWeight: "bold",
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 20
    },
    btnStyle1 :{
        marginTop:"10%",
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
    btnStyle2:{
        borderRadius:10,
        width:350,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(24, 119, 242, 0.3)'
    },
    presstyle1:{
        alignItems:'center',
        justifyContent:'center',
        width:165,
        height:40,
        marginLeft:100,
        marginTop:5,
    },
    presstyle2:{
        alignItems:'center',
        justifyContent:'center',
        width:60,
        height:40
    },
    presstylecolor2:{
        paddingTop:15,
        color:'white',
        fontSize:22,
        fontWeight:'bold',
    },
    presstylecolor:{
        
        // paddingTop:15,
        color:'#1877F2',
        fontSize:18,
        fontWeight:'bold',
    },
    textStyle:{
        fontSize:18,
        color:'#353839',
        // color:'white',
        fontWeight:'bold'
    },
    textStyle2:{
        fontSize:18,
        color:'#F0FFFF',
    },
    textInput:{
        backgroundColor:'white',
        color:'black',
        width:330,
        height:60,
        borderRadius:2.1,
        // textAlign:'center',
        // color:'red',
        padding:15,
        // borderColor:'#8a8a8a',
        borderWidth:1,
    },
    or:{
        color:'white',
    }
})
