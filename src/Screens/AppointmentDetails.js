import React, { useState, useRef } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput,
  Pressable,
  Button,
} from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function AppointmentDetails({navigation,route}) {
    const [sectionToShow, SetsectionToShow] = useState('chooseSerivce');
    const [previousSection, SetpreviousSection] = useState('');
    const [day, SetDay] = useState('');
    const [month, SetMonth] = useState('');
    const [year, SetYear] = useState('');
    //states = choose-service || choose-date || show-available-appointments

    /*  DATE Region */
    const [date, setDate] = useState(new Date());
    const [displayDate, SetdisplayDate] = useState(false);
    const [showSelectedDate, SetshowSelectedDate] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        SetDay(currentDate.getDate())
        SetMonth(currentDate.getMonth()+1);
        SetYear(currentDate.getFullYear())
        SetdisplayDate(false)
        SetshowSelectedDate(true)
    };
    /******************************************* */

    let chooseSerivce = (
        <View>
            <Text style={styles.twoSectionsText}>Service Type</Text>
            <FlatList style={styles.flatListStyle}
            data={route.params.userInput.services}
            renderItem={({item}) => <TouchableOpacity key={item.id} style={styles.listItemStyle}
            onPress={()=> { 
                // navigation.navigate('ProvideSite',{userInput:{orgname:route.params.userInput.orgname,img:route.params.userInput.img}}) 
                SetpreviousSection("chooseSerivce")
                SetsectionToShow("chooseDate")
                }}>
                <Ionicons name="cut-sharp" size={24} color="white" />
                <Text style={styles.textStyle2}>{item.name}</Text>
                </TouchableOpacity>}
            />
        </View>
    )

    let chooseDate = (
        <View>
            <Text style={styles.twoSectionsText}>Appointment Date</Text>
            <Fontisto name="date" style={styles.dateView} onPress={()=> { 
                SetdisplayDate(true)
            }} />
            {/* <Button onPress={()=> { 
                SetdisplayDate(true)
            }}
            title='choose date'
            > </Button> */}
            {
            displayDate ?
                    <View>
                        <DateTimePicker
                            value={date}
                            onChange={onChange}
                        />
                    </View>
                        
                    :
                    showSelectedDate ? 
                        <Text style={styles.textStyle2}>{day}-{month}-{year}</Text>
                    :
                        null
            }
            {/* <Button onPress={()=> { 
            SetpreviousSection("chooseDate")
            SetsectionToShow("showAvailableAppointments")
            }}
            title='choose date'
            >
            </Button> */}
        </View>
        )
    
    let showAvailableAppointments = (<View><Button onPress={()=> { 
        // SetpreviousSection("chooseDate")
        }}
        title='show available'
        > </Button></View>)

    let showRelativeSection= (sectionToShow) =>{
        if (sectionToShow=="chooseSerivce") {
            return chooseSerivce
        } else {
            if (sectionToShow=="chooseDate") {
                return chooseDate
            }
            else{
                if (sectionToShow=="showAvailableAppointments") {
                    return showAvailableAppointments
                }
            }
        }
    }
    return (
        <View style={styles.pageContainer}>
            <Image source={{uri:route.params.userInput.img}} style={{width :"100%",height:"40%",borderRadius:10}}/>
            {/* <Text style={styles.textBook}>{route.params.userInput.orgname}</Text> */}
            {/* <Text style={styles.textBook}>Choose Service Type</Text> */}
            {
                previousSection ?
                <View>
                    <Ionicons name="arrow-back" style={styles.arrow} onPress={()=> {
                        SetshowSelectedDate(false)
                        if(sectionToShow=='showAvailableAppointments'){
                            SetpreviousSection('chooseSerivce')
                        }
                        if(sectionToShow=='chooseDate'){
                            SetpreviousSection('')
                        }
                        SetsectionToShow(previousSection)
                        }} />
                </View>
                :
                <View>
                    <Ionicons name="arrow-back" style={styles.invisibleArrow} />
                </View>
            }
                {showRelativeSection(sectionToShow)}
            
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
    flatListStyle:{
        width:"80%",
        direction:"rtl",
    },
    listItemStyle:{
        display:'flex',
        flexDirection:'row',
        borderColor:"#1877F2",
        borderWidth:2,
        borderRadius:4,
        padding:15,
        marginBottom:10,
    },
    phoneContainer:{
        margin:"30%",
        alignItems: 'center',
        backgroundColor:'red',
    },
    arrow:{
        paddingTop:'1.5%',
        paddingRight:"85%",
        fontSize:28,
        color:"#1877F2",
    },
    dateView:{
        paddingTop:'1.5%',
        // paddingRight:"85%",
        paddingLeft:"20%",
        fontSize:70,
        color:"#1877F2",
    },
    invisibleArrow:{
        paddingTop:'1.5%',
        paddingRight:"85%",
        fontSize:28,
        color:"#343434",
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
    twoSectionsText:{
        paddingBottom:"5%",
        textAlign:'center',
        alignItems:'center',
        color:'#1877F2',
        fontSize:28,
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
        marginLeft:15,
        fontSize:20,
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
