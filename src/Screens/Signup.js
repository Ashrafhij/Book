import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  Pressable,
  Alert,
} from "react-native";

import PhoneInput from "react-native-phone-number-input";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import UploadImage from '../Components/UploadImage'
import { color } from "react-native-reanimated";
// import TimePicker from 'react-native-simple-time-picker';
import { addDataDoc } from "../Firebase/firebase";

import { LogBox } from 'react-native';
import ExpoImagePicker from "../Components/ExpoImagePicker";

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function Signup({navigation}) {

    /********* Phone Number ********* */
    const [value, setValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);
    /*************************************** */
    
    const [userInput, setUserInput] = useState({phone:'' , password:'',image:''})
    const [secondPassword, setSecondPassword] = useState('')
    const [services, setservices] = useState([]);
    const [orgWHlist, setorgWHlist] = useState([]);


    const [sectionToShow, SetsectionToShow] = useState('orgInfoSection');

    /* ******** time picker ********************/
    const [selectedHours, setSelectedHours] = useState(0);
    const [selectedMinutes, setSelectedMinutes] = useState(0);
    /* *****************************************/

    const [errormodalVisible, seterrormodalVisible] = useState(false);
    const [successModalVisible, setsuccessModalVisible] = useState(false);
    

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

                    <Text style={styles.textStylemodal}>ok </Text>
                    </Pressable>
                    </View>
                </View>
                </View>
            </Modal>
        </View>
    )

    let successModal = (
        <View style={styles.errorcenteredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={successModalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setsuccessModalVisible(!successModalVisible);
                }}
            >
                <View style={styles.errorcenteredView}>
                <View style={styles.errormodalView}>
                <View style={styles.errorcenteredView}>
                        <Text style={{fontSize:22,padding:"2%",color:'black',alignItems:'center',
                            textAlign:'center',marginBottom:'15%'}}>Organization Added Succesfully</Text>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                            setsuccessModalVisible(!successModalVisible)
                            navigation.navigate('HomePage')

                        }}>

                    <Text style={styles.textStylemodal}>ok </Text>
                    </Pressable>
                    </View>
                </View>
                </View>
            </Modal>
        </View>
    )

    let createOrganization=(orgDetails ={} , services={} , workingHours = {})=>{

        if (!orgDetails) {
            return false
        }else{
            // let orgDetailsTemp = {...orgDetails,services:[{id:1,name:'General Services',duration:15},{id:2,name:'Orders',duration:10},{id:3,name:'Techinical Support',duration:15}],
            // workingHours :[ {start:"07:00",end:"17:00",day:'sunday'},
            //                 {start:"08:00",end:"17:00",day:'monday'},
            //                 {start:"09:15",end:"17:00",day:'tuesday'},
            //                 {start:"10:00",end:"17:00",day:'wednesday'},
            //                 {start:"11:00",end:"17:00",day:'thursday'}]}
            let orgDetailsTemp = {...orgDetails,services,workingHours}
            addDataDoc('organization',orgDetailsTemp)
            setsuccessModalVisible(!successModalVisible)
            return true
        }
    }

    let validateData=(orgData)=>{
        let failure = false
        for(let key in orgData){
            if( !orgData[key] ){
                // seterrormodalVisible(true)
                failure = true
            }
        }
        if(secondPassword.spassword != orgData.password){
            failure=true
        }
        seterrormodalVisible(failure)
        if( !failure )
        {
            SetsectionToShow("orgService")
        }
    }

    let orgInfoSection = (
        <View>
            <TextInput onChangeText={(input)=>{setUserInput({...userInput,name:input})}} style={styles.textInput} placeholderTextColor='white' placeholder='Organization Name'/>
            <TextInput onChangeText={(input)=>{setUserInput({...userInput,username:input})}} style={styles.textInput} placeholderTextColor='white' placeholder='Username'/>
            <TextInput onChangeText={(input)=>{setUserInput({...userInput,orgEmail:input})}} style={styles.textInput} placeholderTextColor='white' placeholder='Email'/>
            <ExpoImagePicker  saveImageDetails ={(imageUrl)=>{setUserInput({...userInput,image:imageUrl})}}></ExpoImagePicker>
            {/* <TextInput onChangeText={(input)=>{setUserInput({...userInput,image:input})}} style={styles.textInput} placeholderTextColor='white' placeholder='image URL'/> */}
            <View style={styles.phone}>
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={value}
                    defaultCode="IL"
                    onChangeText={(input)=>{setUserInput({...userInput,phone:input})}}
                    withShadow
                    autoFocus
                />
            </View>

            <View style={styles.pass}>
            <TextInput onChangeText={(input)=>{setUserInput({...userInput,password:input})}} secureTextEntry={true} style={styles.passwordStyle} placeholderTextColor='white' placeholder='Password'/>
            <TextInput onChangeText={(input)=>{setSecondPassword({...secondPassword,spassword:input})}} secureTextEntry={true} style={styles.passwordStyle} placeholderTextColor='white' placeholder='Confirm Password'/>
            </View>
            <Pressable style={styles.btnStyleOrgInfo} onPress={()=>{
                validateData(userInput)
                    }}>
                    <Text style={styles.textStyle}>Next</Text>
            </Pressable>
        </View>
    )

    const [numTextInputs,setNumTextInputs] = React.useState(1);

    let orgService = (
    <View>
        <Text style={styles.twoSectionsText}>Types of Services in Your Place</Text>
            <View style={styles.parent}>
                <ScrollView>
                    {services.map(orgService=>{
                        return <View key={orgService.id} style={{flexDirection: 'row', alignItems: 'center',paddingBottom:5}}>
                                    <TextInput onChangeText={(input)=>{orgService.name=input}} placeholder="Service Name" placeholderTextColor="white" style={styles.servicetextInput}/>
                                    <TextInput onChangeText={(input)=>{orgService.duration=parseInt(input)}} keyboardType='numeric' placeholder="Duration" placeholderTextColor="white" style={styles.servicetimeInput}/>
                                    <TouchableOpacity onPress={()=>{setservices(services.filter(orgServ=>(orgServ.id != orgService.id))      
                                        )}} style={{}}>
                                        <Ionicons name="ios-remove-circle-outline" size={32} color="white" />
                                        {/* <MaterialCommunityIcons name="playlist-minus" size={32} color="white" /> */}
                                    </TouchableOpacity>
                                </View>
                    })}
                </ScrollView>
            </View>
            <View style={{flexDirection: 'row'}}>
                    <Ionicons name="arrow-back" style={{color:"#1877F2",paddingLeft:'5%'}} size={32} onPress={()=> {
                        SetsectionToShow("orgInfoSection")
                    }} />

                    <TouchableOpacity onPress={()=>
                        {
                            setNumTextInputs(val=>val+1)
                            setservices([...services,{id:Math.random()*1000,name:"",duration:10}])
                        }} style={{paddingLeft:'70%'}}>
                        <Entypo name="add-to-list" size={32} color="white" />
                    </TouchableOpacity>
            </View>
        <Pressable style={styles.btnStyle} onPress={()=>{
                SetsectionToShow("orgworkHours")
                // console.log(services)
            }}>
            <Text style={styles.textStyle}>Next</Text>
        </Pressable>
    </View> 
    )

    let orgworkHours = (
        <View>
            <View>
                <Text style={styles.whsecion3title}>fill Work Hours</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.presstylecolor}>Day      </Text>
                <Text style={styles.presstylecolor}>|</Text>
                <Text style={styles.presstylecolor}>Open at</Text>
                <Text style={styles.presstylecolor}>|</Text>
                <Text style={styles.presstylecolor}>Close at</Text>
            </View>
            <ScrollView>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.weekDaysstyle}>Sunday</Text>
                    <TextInput onChangeText={(input)=>{setorgWHlist({...orgWHlist,start1:input})}} placeholder="hh:mm" placeholderTextColor="white" style={styles.servicetimeInput}/>
                    <TextInput onChangeText={(input)=>{setorgWHlist({...orgWHlist,end1:input})}} placeholder="hh:mm" placeholderTextColor="white" style={styles.servicetimeInput}/>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.weekDaysstyle}>Monday</Text>
                    <TextInput onChangeText={(input)=>{setorgWHlist({...orgWHlist,start2:input})}} placeholder="hh:mm" placeholderTextColor="white" style={styles.servicetimeInput}/>
                    <TextInput onChangeText={(input)=>{setorgWHlist({...orgWHlist,end2:input})}} placeholder="hh:mm" placeholderTextColor="white" style={styles.servicetimeInput}/>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.weekDaysstyle}>Tuesday</Text>
                    <TextInput onChangeText={(input)=>{setorgWHlist({...orgWHlist,start3:input})}} placeholder="hh:mm" placeholderTextColor="white" style={styles.servicetimeInput}/>
                    <TextInput onChangeText={(input)=>{setorgWHlist({...orgWHlist,end3:input})}} placeholder="hh:mm" placeholderTextColor="white" style={styles.servicetimeInput}/>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.weekDaysstyle}>Wednesday</Text>
                    <TextInput onChangeText={(input)=>{setorgWHlist({...orgWHlist,start4:input})}} placeholder="hh:mm" placeholderTextColor="white" style={styles.servicetimeInput}/>
                    <TextInput onChangeText={(input)=>{setorgWHlist({...orgWHlist,end4:input})}} placeholder="hh:mm" placeholderTextColor="white" style={styles.servicetimeInput}/>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.weekDaysstyle}>Thursday</Text>
                    <TextInput onChangeText={(input)=>{setorgWHlist({...orgWHlist,start5:input})}} placeholder="hh:mm" placeholderTextColor="white" style={styles.servicetimeInput}/>
                    <TextInput onChangeText={(input)=>{setorgWHlist({...orgWHlist,end5:input})}} placeholder="hh:mm" placeholderTextColor="white" style={styles.servicetimeInput}/>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.weekDaysstyle}>Friday</Text>
                    <TextInput onChangeText={(input)=>{setorgWHlist({...orgWHlist,start6:input})}} placeholder="hh:mm" placeholderTextColor="white" style={styles.servicetimeInput}/>
                    <TextInput onChangeText={(input)=>{setorgWHlist({...orgWHlist,end6:input})}} placeholder="hh:mm" placeholderTextColor="white" style={styles.servicetimeInput}/>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.weekDaysstyle}>Saturday</Text>
                    <TextInput onChangeText={(input)=>{setorgWHlist({...orgWHlist,start7:input})}} placeholder="hh:mm" placeholderTextColor="white" style={styles.servicetimeInput}/>
                    <TextInput onChangeText={(input)=>{setorgWHlist({...orgWHlist,end7:input})}} placeholder="hh:mm" placeholderTextColor="white" style={styles.servicetimeInput}/>
                </View>
            </ScrollView>
            <View style={{flexDirection: 'row' , paddingTop:'10%'}}>
                <Ionicons name="arrow-back" style={{color:"#1877F2"}} size={36} onPress={()=> {
                    SetsectionToShow("orgService")
                }} />
                <Pressable style={styles.btnStyleDoneOrg} onPress={()=>{
                        SetsectionToShow("orgworkHours")
                        var workingHours =[];
                        if (!orgWHlist.start1 || !orgWHlist.end1) {
                            workingHours=[...workingHours,{start:"00:00",end:"00:00",day:'sunday'}]
                        }
                        else{
                            workingHours=[...workingHours,{start:orgWHlist.start1,end:orgWHlist.end1,day:'sunday'}]
                        }
                        if (!orgWHlist.start2 || !orgWHlist.end2) {
                            workingHours=[...workingHours,{start:"00:00",end:"00:00",day:'monday'}]
                        }
                        else{
                            workingHours=[...workingHours,{start:orgWHlist.start2,end:orgWHlist.end2,day:'monday'}]
                        }
                        if (!orgWHlist.start3 || !orgWHlist.end3) {
                            workingHours=[...workingHours,{start:"00:00",end:"00:00",day:'tuesday'}]
                        }
                        else{
                            workingHours=[...workingHours,{start:orgWHlist.start3,end:orgWHlist.end3,day:'tuesday'}]
                        }
                        if (!orgWHlist.start4 || !orgWHlist.end4) {
                            workingHours=[...workingHours,{start:"00:00",end:"00:00",day:'wednesday'}]
                        }
                        else{
                            workingHours=[...workingHours,{start:orgWHlist.start4,end:orgWHlist.end4,day:'wednesday'}]
                        }
                        if (!orgWHlist.start5 || !orgWHlist.end5) {
                            workingHours=[...workingHours,{start:"00:00",end:"00:00",day:'thursday'}]
                        }
                        else{
                            workingHours=[...workingHours,{start:orgWHlist.start5,end:orgWHlist.end5,day:'thursday'}]
                        }
                        if (!orgWHlist.start6 || !orgWHlist.end6) {
                            workingHours=[...workingHours,{start:"00:00",end:"00:00",day:'friday'}]
                        }
                        else{
                            workingHours=[...workingHours,{start:orgWHlist.start6,end:orgWHlist.end6,day:'friday'}]
                        }
                        if (!orgWHlist.start7 || !orgWHlist.end7) {
                            workingHours=[...workingHours,{start:"00:00",end:"00:00",day:'saturday'}]
                        }
                        else{
                            workingHours=[...workingHours,{start:orgWHlist.start7,end:orgWHlist.end7,day:'saturday'}]
                        }
                        
                        // console.log(workingHours)
                        createOrganization(userInput,services,workingHours)
                        
                    }}>
                    <Text style={styles.textStyle}>Sign Up</Text>
                </Pressable>
            </View>
        </View>
    )

    let showRelativeSection= (sectionToShow) =>{
        if (sectionToShow=="orgInfoSection") {
            return orgInfoSection
        } else {
            if (sectionToShow=="orgService") {
                return orgService
            }
            else{
                if (sectionToShow=="orgworkHours") {
                    return orgworkHours
                }
            }
        }
    }

    return (
        <View style={styles.pageContainer}>
            <Text style={styles.textBook}>Book</Text>
            <View style={styles.container}>
                {showRelativeSection(sectionToShow)}
                {
                    errormodalVisible ? 
                        errorModal
                        :
                        null
                }
                {
                    successModalVisible ?
                        successModal
                        :
                        null
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    /* Service TextInput Style */
    parent:{
        // backgroundColor:'red',
        height:"65%",
        justifyContent:"center",
        alignItems:"center"
    },

    buttton:{
        backgroundColor:"lightblue",
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center"
    },
  text:{
      fontSize:22,
      color:"black"
    },
  /* ************************ */ 

    container:{
        flex:1,
        // margin:10,
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
      textStylemodal: {
        color: "white",
        fontSize:18,
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        margin: "8%",
        textAlign: "center"
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
    twoSectionsText:{
        paddingTop:"5%",
        paddingBottom:"2%",
        textAlign:'center',
        color:'#1877F2',
        fontSize:25,
        fontWeight: "bold",
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 20
    },
    whsecion3title:{
        paddingBottom:"5%",
        textAlign:'center',
        color:'#1877F2',
        fontSize:25,
        fontWeight: "bold",
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 20
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
    presstylecolor:{
        paddingLeft:'7%',
        color:'#1877F2',
        fontSize:18,
        fontWeight:'bold',
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
    servicetextInput:{
        margin:10,
        backgroundColor:'#353839',
        color:'white',
        textAlign:'center',
        alignItems:'center',
        width:200,
        height:50,
        borderRadius:15,
        padding:15,
        borderColor:'blue',
        borderBottomWidth:2,
    },
    servicetimeInput:{
        margin:10,
        textAlign:'center',
        alignItems:'center',
        color:'white',
        width:100,
        height:50,
        borderRadius:15,
        padding:15,
        borderColor:'lightblue',
        borderBottomWidth:2,
    },
    weekDaysstyle:{
        margin:10,
        textAlign:'center',
        alignItems:'center',
        color:'white',
        width:100,
        height:50,
        borderRadius:15,
        padding:15,
        borderColor:'blue',
        borderBottomWidth:2,
    },
    textInput:{
        margin:10,
        backgroundColor:'#353839',
        color:'white',
        width:330,
        height:50,
        borderRadius:2.1,
        padding:15,
        borderColor:'blue',
        borderBottomWidth:2,
        },
        btnStyleOrgInfo :{
            marginTop:20,
            borderRadius:10,
            width:350,
            height:40,
            alignItems:'center',
            justifyContent:'center',
            marginBottom: "7%",
            // borderWidth:1,
            shadowColor: '#1877F2',  
            shadowOpacity: 1,  
            elevation: 3, 
            backgroundColor : "#1877F2" // invisible color
        },
    btnStyle :{
        marginTop:20,
        marginLeft:"5%",
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
    btnStyleDoneOrg :{
        // marginTop:'10%',
        marginLeft:"10%",
        borderRadius:10,
        width:275,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        marginBottom: "15%",
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
        borderColor:'lightblue',
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
