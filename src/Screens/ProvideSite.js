import React, { useState, useRef } from "react";
import {
  Alert,
  Modal,
  Image,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput,
  Pressable,
} from "react-native";

import PhoneInput from "react-native-phone-number-input";
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { addDataDoc } from "../Firebase/firebase";
import ModalBook from '../Components/ModalBook';


export default function ProvideSite({navigation,route}) {
    /********* Phone Number ********* */
    const [value, setValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);
    /*************************************** */
    const [userInput, setUserInput] = useState({orgname:'' })

    /* customer details */
    const [cusName, setcusName] = useState();
    const [cusPhone, setcusPhone] = useState();
    const [cusEmail, setcusEmail] = useState();

    const [query, setQuery] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [errormodalVisible, seterrormodalVisible] = useState(false);

    let createAppointment=(appDetails ={})=>{

        if (!appDetails) {
            return false
        }else{
            addDataDoc('appointments',appDetails)
            return true
        }
    }

    let errorModal = (
        <View style={styles.errorcenteredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={errormodalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                seterrormodalVisible(!errormodalVisible);
                }}
            >
                <View style={styles.errorcenteredView}>
                <View style={styles.errormodalView}>
                <Fontisto name="close-a" size={24} color="black" onPress={()=> { 
                    seterrormodalVisible(!errormodalVisible);
                }} />
                <View style={styles.errorcenteredView}>
                        <Text style={{fontSize:22,padding:"2%",color:'black',alignItems:'center',
                                        textAlign:'center',marginBottom:'15%'}}>Wrong Content</Text>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                        seterrormodalVisible(!errormodalVisible)
                        }}>

                    <Text style={styles.textStyle}>ok </Text>
                    </Pressable>
                    </View>
                </View>
                </View>
            </Modal>
        </View>
    )


    let modal = (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Fontisto name="close-a" size={24} color="black" onPress={()=> { 
                    setModalVisible(!modalVisible);
                }} />
                <View style={{textAlign:'center',alignItems:'center'}}>
                    <Text style={styles.modalTitle}>Summary</Text>
                    <Image source={{uri:route.params?.userInput.img}} style={{width :50,height:40,borderRadius:10}}/>
                    <Text style={{fontSize:22,padding:"3%"}}>hello {cusName}</Text>
                    <Text style={{fontSize:18}}>Here is Your Appointment Details:</Text>
                </View>
                    
                <View style={styles.modalText}>
                    <Text style={styles.summaryTextStyle}>{route.params?.userInput.serviceName}</Text>
                    <View  style={{alignItems: 'center'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Fontisto name="date" size={24} color="black" />
                        <Text style={styles.summaryTextStyle}>  {route.params?.userInput.date}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Ionicons name="time" size={24} color="black" />
                        <Text style={styles.summaryTextStyle}>  {route.params?.userInput.hour}</Text>
                        </View>
                    </View>
                </View>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                        setModalVisible(!modalVisible)
                        let tempinfo = {cusName:cusName,
                            cusPhone:cusPhone,
                            appDate:route.params?.userInput.date,
                            orgID:route.params?.userInput.orgID,
                            appHour:route.params?.userInput.hour,
                            serviceID:route.params?.userInput.serviceID,
                            serviceName:route.params?.userInput.serviceName}
                        createAppointment(tempinfo)
                        navigation.navigate('HomePage')
                        }}>

                    <Text style={styles.textStyle}>Book Now</Text>
                    </Pressable>
                </View>
                </View>
            </Modal>
        </View>
    )


    return (
        <View style={styles.pageContainer}>
            <Image source={{uri:route.params?.userInput.img}} style={{width :"100%",height:"40%",borderRadius:10}}/>
            <Text style={styles.textBook}>{route.params?.userInput.orgname}</Text>
            <Text style={styles.presstylecolor2}>Enter Phone or Email</Text>
                 <View style={{flexDirection: 'row', alignItems: 'center',margin:30 }}>
                     <Pressable style={styles.presstyle2} onPress={()=>{
                            setQuery(false)
                        }}>
                        <Text style={styles.presstylecolor}>Phone</Text>
                    </Pressable>
                            <View>
                                <Text style={{width: 50, textAlign: 'center' , color:'white' }}>|</Text>
                            </View>
                    <Pressable style={styles.presstyle2} onPress={()=>{
                            setQuery(true)
                        }}>
                        <Text style={styles.presstylecolor}>Email</Text>
                    </Pressable>
                </View>
                <View>
                        <TextInput onChangeText={(input)=>{setUserInput({...userInput,cusName:input}),setcusName(input)}} style={styles.nameInput} placeholderTextColor='#8a8a8a' placeholder='Customer Name'/>
                    </View>
            {
                    query ?
                        <View>
                            <TextInput onChangeText={(input)=>{setUserInput({...userInput,cusEmail:input}),setcusEmail(input)}} style={styles.textInput} placeholderTextColor='#8a8a8a' placeholder='someone@example.com'/>
                        </View>
                        :
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={value}
                            defaultCode="IL"
                            onChangeText={(input)=>{setUserInput({...userInput,cusPhone:input}),setcusPhone(input)}}
                            // onChangeFormattedText={(text) => {
                            // setValue(text);
                            // }}
                            withDarkTheme
                            withShadow
                            autoFocus
                        />
                        
            }
            <Pressable style={styles.btnStyle1} onPress={()=>{
                    if (cusName == "" || !cusName) {
                        seterrormodalVisible(true)
                    }else{
                        setModalVisible(true)
                    }
                    }}>
                    <Text style={styles.textStyle2}>Book it</Text>
            </Pressable>
            {
            modalVisible ? 
                    modal
                    :
                    null
            }
            {
            errormodalVisible ? 
                    errorModal
                    :
                    null
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:"7%",
    },
    summaryTextStyle:{
        textAlign:'center',
        alignItems:'center',
        fontSize:22,
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
    modalTitle:{
        paddingBottom:10,
        color:'#1877F2',
        fontSize:33,
        fontWeight: "bold",
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
        textAlign:'center',
        // color:'red',
        padding:15,
        // borderColor:'#8a8a8a',
        borderWidth:1,
    },
    nameInput:{
        backgroundColor:'white',
        color:'black',
        width:330,
        height:50,
        borderRadius:2.1,
        textAlign:'center',
        // color:'red',
        padding:15,
        // borderColor:'#8a8a8a',
        borderWidth:2,
    },
    or:{
        color:'white',
    },
    errorcenteredView: {
        marginTop: "25%"
      },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      errormodalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: "10%",
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        margin: "8%",
        textAlign: "center"
      }
})
