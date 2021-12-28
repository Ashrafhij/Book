import React, { useState, useRef ,useEffect} from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Button,
} from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import Moment from 'moment';
import { getData } from '../Firebase/firebase';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function AppointmentDetails({navigation,route}) {
    const [sectionToShow, SetsectionToShow] = useState('chooseSerivce');
    /* Provider Time Variables */
    const [selectedServiceDuration, SetselectedServiceDuration] = useState('');
    const [selectedServiceID, SetselectedServiceID] = useState('');
    const [selectedServiceName, SetselectedServiceName] = useState('');
    const [selectedOrgID, SetselectedOrgID] = useState('');
    const [selectedServiceWorkHours, SetselectedServiceWorkHours] = useState([]);

    /* *********************** */
    const [previousSection, SetpreviousSection] = useState('');
    const [day, SetDay] = useState(new Date().getDate());
    const [month, SetMonth] = useState(new Date().getMonth()+1);
    const [year, SetYear] = useState(new Date().getFullYear());
    //states = choose-service || choose-date || show-available-appointments

    //get All Apps From the DB
    const [apps, setapps] = useState([])
    useEffect(() => {
        (getData('appointments').then((allApps)=>{
            setapps(allApps)
        }));
    }, [])
    /*  DATE Region */
    const [date, setDate] = useState(new Date());
    const [displayDate, SetdisplayDate] = useState(false);
    const [showSelectedDate, SetshowSelectedDate] = useState(true);

    const [branchClosed, SetbranchClosed] = useState();
    Moment.locale('en');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        SetDay(currentDate.getDate())
        SetMonth(currentDate.getMonth()+1);
        SetYear(currentDate.getFullYear())
        SetdisplayDate(false)
        SetshowSelectedDate(true)
    };
    
    // SetselectedOrgID(route.params.userInput.providerinfo.orgID)
    let splitHours = ()=>
    {
        var startTime,middleStartMin,endTime,middleEndMin;
        var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        var dayName = days[date.getDay()];
        var workhoursArr = selectedServiceWorkHours;
        {Object.entries(workhoursArr).map((arr)=>{
            if(arr[1].day == dayName){
                /* convert from string start hour to integer number  */ 
                startTime = arr[1].start
                var array = startTime.split(":");
                var hours = (parseInt(array[0], 10))
                startTime = hours
                hours = (parseInt(array[1], 10))
                middleStartMin = hours
                /* convert from string close hours to integer number  */ 
                endTime = arr[1].end
                var array = endTime.split(":");
                var hours = (parseInt(array[0], 10))
                endTime = hours
                hours = (parseInt(array[1], 10))
                middleEndMin = hours
            }
        })}

        var arr = [], i, j;
        for(i=startTime*60+middleStartMin; i<endTime*60+middleEndMin; i=i+selectedServiceDuration) {
            arr.push({id:Math.random()*56 , hour: Math.floor(i/60) + ":" + i%60} );
        }

        const bookedUpAppointments ={};
         apps.map(availableApp=>{
             if (availableApp.orgID == route.params.userInput.providerinfo.orgID && 
                availableApp.serviceID == selectedServiceID &&
                availableApp.appDate == ''+day+''+'/'+month){
                    bookedUpAppointments[availableApp.appHour] =true
                }
         })

        const notReservedArr = arr.filter(element => {
            return !(bookedUpAppointments[element.hour])
        });

        return notReservedArr;
    }


    // [{hour : "hour : mins"}]

    /******************************************* */

    let Availableappointments = (
        <View style={styles.selecAppointmentContainer}>
            <View>
                <Text style={styles.selecAppointmentText}>Select Appointment From The List</Text>
                <FlatList
                // data={route.params.userInput.services}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={splitHours()}
                renderItem={({item}) => 
                    <TouchableOpacity key={item.id} style={styles.listItemStyle} onPress={()=> {
                        navigation.navigate('ProvideSite',{userInput:{orgname:route.params.userInput.orgname,img:route.params.userInput.img,services:route.params.userInput.services,date:''+day+''+'/'+month,hour:item.hour,orgID:selectedOrgID,serviceID:selectedServiceID,serviceName:selectedServiceName,img:route.params.userInput.img}})
                    }}>
                        <MaterialIcons name="date-range" size={24} color="white" />
                        <Text style={styles.datetimePicker}>{day}/{month}       </Text>
                        <MaterialIcons name="access-time" size={24} color="white" />
                        <Text style={styles.datetimePicker}>{item.hour}</Text>
                    </TouchableOpacity>}
                />
            </View>
        </View>
    )

    let chooseSerivce = (
        <View>
            <Text style={styles.twoSectionsText}>Service Type</Text>
            <FlatList style={styles.flatListStyle}
            data={route.params.userInput.services}
            renderItem={({item}) => <TouchableOpacity key={item.id} style={styles.listItemStyle}
            onPress={()=> {
                // navigation.navigate('ProvideSite',{userInput:{orgname:route.params.userInput.orgname,img:route.params.userInput.img}}) 
                SetselectedServiceID(item.id)
                SetselectedServiceName(item.name)
                SetselectedOrgID(route.params.userInput.providerinfo.orgID)
                SetselectedServiceDuration(item.duration)
                SetselectedServiceWorkHours(route.params.userInput.wHours)
                SetpreviousSection("chooseSerivce")
                SetsectionToShow("chooseDate")
                }}>
                {/* <Ionicons name="cut-sharp" size={24} color="white" /> */}
                <Text style={styles.textStyle2}>{item.name}</Text>
                </TouchableOpacity>}
            />
        </View>
    )

    let chooseDate = (
        <View>
            <Text style={styles.twoSectionsText}>Appointment Date</Text>
            <View style={styles.dateViewContainer}>
                <Fontisto name="date" style={styles.dateView} onPress={()=> { 
                    SetdisplayDate(true)
                }} />
                <Pressable style={styles.selectedateStyle} onPress={()=>{
                    SetdisplayDate(true)
                    }}>
                    {
                        day == "" ?
                            <Text style={styles.presstylecolor}>{new Date().getDate()}-{new Date().getMonth() + 1}-{new Date().getFullYear()}</Text>
                        :
                            <Text style={styles.presstylecolor}>{day}-{month}-{year}</Text>
                    }
                </Pressable>
            </View>
            {
            displayDate ?
                    <View style={styles.twoSectionsText}>
                        <DateTimePicker
                            value={date}
                            onChange={onChange}
                        />
                    </View>
                        
                    :
                        showSelectedDate ?

                            Availableappointments
                        :
                            null
            }
        </View>
        )

    /******************************************* */
    
    // let showAvailableAppointments = (<View><Button onPress={()=> { 
    //     // SetpreviousSection("chooseDate")
    //     }}
    //     title='show available'
    //     > </Button></View>)

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
    // flatListStyleDatetime:{
    // },
    listItemStyle:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        // justifyContent:'center',
        borderColor:"#1877F2",
        borderWidth:2,
        borderRadius:4,
        padding:10,
        marginBottom:10,
        marginRight:10,
    },
    phoneContainer:{
        margin:"30%",
        alignItems: 'center',
        backgroundColor:'red',
    },
    selecAppointmentContainer:{
        padding:"5%",
        display:'flex',
        height:"36%",
        justifyContent:'center',
        alignItems:'center',
    },
    arrow:{
        paddingTop:'1.5%',
        paddingRight:"85%",
        fontSize:28,
        color:"#1877F2",
    },
    dateViewContainer:{
        // backgroundColor:'red',
        alignItems:"center",
        textAlign:'center',
    },
    dateView:{
        // backgroundColor:'red',
        // paddingTop:'1.5%',
        alignItems:"center",
        textAlign:'center',
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
        color:'#1877F2',
        fontSize:28,
        fontWeight: "bold",
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 20
    },
    selecAppointmentText:{
        paddingBottom:"5%",
        textAlign:'center',
        alignItems:'center',
        color:'white',
        fontSize:20,
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
    selectedateStyle:{
        alignItems:'center',
        justifyContent:'center',
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
        color:'white',
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
    datetimePicker:{
        marginLeft:5,
        fontSize:16,
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
