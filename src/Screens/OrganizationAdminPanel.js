import React , { useState, useEffect }  from 'react'
import { View,Linking ,Text ,Pressable,StyleSheet ,Dimensions,TouchableOpacity,Image} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import {getAppsOfSpecificOrg} from '../Firebase/firebase'
import {deleteThisDoc} from '../Firebase/firebase'
import { Fontisto } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function OrganizationAdminPanel({navigation,route}) {

  /*  DATE Region */
  const [date, setDate] = useState(new Date());
  const [displayDate, SetdisplayDate] = useState(false);
  const [showSelectedDate, SetshowSelectedDate] = useState(true);
  const [day, SetDay] = useState('');
  const [month, SetMonth] = useState('');
  const [year, SetYear] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    SetDay(currentDate.getDate())
    SetMonth(currentDate.getMonth()+1);
    SetYear(currentDate.getFullYear())
    updateSearch(currentDate.getDate(),currentDate.getMonth()+1)
    SetdisplayDate(false)
    SetshowSelectedDate(true)
    setselectedServiceFilter('All')
};

  const [appsExist,setappsExist] = useState(false);
  const [apps,setapps] = useState([]);
  const [selectedServiceFilter, setselectedServiceFilter] = useState("All");

  // Get all appointments of this specific Organization from the DB
  useEffect(() => {
    getAppsOfSpecificOrg(route.params?.orgID).then(res=>{
          setapps(res)
          updateSearch(new Date().getDate(),new Date().getMonth() + 1,res)
          // console.log("orgID=>",route.params?.orgID)
          // console.log("res=>",apps.length)
      })
}, [])

let makeCall = (phoneNum='0542283102') => {

  let phoneNumber = '';

  if (Platform.OS === 'android') {
    phoneNumber = `tel:${phoneNum}`;
  } else {
    phoneNumber = `telprompt:${phoneNum}`;
  }

  Linking.openURL(phoneNumber);
};

let ifAppointmentPassed = (appointmentHour,appointmentDate) => {
  var arrayHour = appointmentHour.split(":");
  var arrayDate = appointmentDate.split("/");
  let apphour = arrayHour[0]
  let appMin = arrayHour[1]
  let appday = arrayDate[0]
  let appmonth = arrayDate[1]
  const thisMonth=new Date().getMonth() + 1;
  const thisDay = new Date().getDate();
  let todayDate = new Date();
  let tempDate = `${new Date().getFullYear()}-${appmonth}-${appday}T${apphour}:${appMin<9?'0'+appMin : appMin}:00`
  let appDate = new Date(tempDate)

  if(appmonth < thisMonth ){
    return true
  }
  if(appmonth == thisMonth && appday < thisDay){
    return true
  }
  
  if( dateInPast(appDate,todayDate)){
    return true
  }
  else{
      if(thisDay == Number(appday) && thisMonth == Number(appmonth)  && ( Number(apphour) < new Date().getHours())){
          return true
      }else{
        return false
      }
  }
};

var dateInPast = function(firstDate, secondDate) {
  if (firstDate.getTime() <= secondDate.getTime()) {
     return true;
  }
  return false;
};



function deleteApp(appID,currDay,currMonth) {
    deleteThisDoc(appID,'appointments')
    getAppsOfSpecificOrg(route.params?.orgID).then(res=>{
      setapps(res)
      updateSearch(currDay,currMonth,res)
  })
}

const [filteredApps,setfilteredApps] = useState([]);


function updateSearch(day=new Date().getDate(),month=new Date().getMonth() + 1,appsTemp,selectedService='All') {
    let allapps = appsTemp || apps
    setappsExist(true);
    setfilteredApps( allapps.filter(app => {
      var array = app.appDate.split("/");
      var arrayTime = app.appHour.split(":")
      var hour = arrayTime[0]
      var min = arrayTime[1]
      var mon = array[1]
      var da = array[0]
      if( (month == mon && day == da) && ((app.serviceID==selectedService) || (selectedService=='All')) ){
          setappsExist(false);
          return app
      }
    }   ))
}

let appointmentsofSpecificDate = (
  <ScrollView style={styles.pageContainer}>
                {
                    filteredApps.map(app=>{
                    return(
                        <TouchableOpacity key={app.appID} style={ {...styles.card,backgroundColor:ifAppointmentPassed(app.appHour,app.appDate)? 'tomato':'white'} } onPress={() => {}}>
                        <Image style={styles.image} source={{uri: route.params?.orgDetails.image}}/>
                          <View style={styles.cardContent}>
                              <Text style={styles.name}>{app.cusName}</Text>
                              <Text style={styles.serviceStyle}>{app.serviceName}</Text>
                              {/* <Text style={styles.serviceStyle}>{app.appID}</Text> */}
                              <Text style={styles.serviceStyle}>{app.appDate}</Text>
                              <Text style={styles.position}>{app.appHour}</Text>
                              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                  
                                  <TouchableOpacity style={styles.callButton} onPress={()=> {
                                    makeCall(app.cusPhone)
                                  }}>
                                  <Feather name="phone-call" size={24} color="white" />
                                  {/* <Text style={styles.callButtonText}>Call</Text>   */}
                                  </TouchableOpacity>
      
                                  <TouchableOpacity style={styles.followButton} onPress={()=> {
                                    deleteApp(app.appID,day,month)
                                  }}>
                                  <Ionicons name="checkmark-done" size={24} color="white" />
                                  {/* <Text style={styles.followButtonText}>Done</Text>   */}
                                  </TouchableOpacity>
                              </View>
                          </View>
                      </TouchableOpacity>
                    )
                })}
            </ScrollView>
)

let noAppointmentsAvailable = (
  <View style={styles.noAppscontainer}>
    <Text style={styles.noappsTextStyle}>No Appointments Available Today</Text>
  </View>
)

    return (
          <View style={styles.container}>
              <View>
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
                            null
                }
            </View>
            <View style={{flexDirection: 'row'}}>
            <Text style={{color:'green',fontSize:17,paddingLeft:"18%",marginLeft:"0%",marginTop:"7%",paddingRight:"3%"}}>Show :</Text>
            <View style={{borderColor:'green',textAlign:'center',position:'relative',width:150,display:"flex",alignItems:'center',marginTop:15,borderWidth:1,opacity:0.5}}>
              <Picker
                selectedValue={selectedServiceFilter}
                style={{height: 50, width: 150 ,justifyContent:'center',textAlign:'center',alignItems:'center'}}
                onValueChange={(itemValue, itemIndex) => {
                  setselectedServiceFilter(itemValue)
                  updateSearch(day || new Date().getDate(),month || new Date().getMonth()+1,null,itemValue)
                }}
              >
                <Picker.Item key='All' label="All" value="All" />
                {route.params?.orgDetails.services.map(service=>{
                  return <Picker.Item key={service.id} label={service.name} value={service.id} /> 
                })}
                
              </Picker>
            </View>
            </View>
            {
              appsExist ?
                  noAppointmentsAvailable
              :
                  appointmentsofSpecificDate
            }
        </View>
    )
}

const styles = StyleSheet.create({

    pageContainer :{
        marginTop:"5%",
    },
    container:{
        flex:1,
        // marginTop:20,
        backgroundColor:"#eeeeee"
      },
      noAppscontainer:{
        flex:1,
        marginTop:"30%",
        alignItems: 'center',

        backgroundColor:"#eeeeee"
      },
      header:{
        backgroundColor: "#00CED1",
        height:200
      },
      headerContent:{
        padding:30,
        alignItems: 'center',
        flex:1,
      },
      detailContent:{
        top:80,
        height:500,
        width:Dimensions.get('screen').width - 90,
        marginHorizontal:30,
        flexDirection: 'row',
        position:'absolute',
        backgroundColor: "#ffffff"
      },
      userList:{
        flex:1,
      },
      cardContent: {
        marginLeft:20,
        marginTop:10
      },
      image:{
        width:90,
        height:90,
        borderRadius:45,
      },
    
    
    
      card:{
        // shadowColor: '#00000021',
        shadowColor: 'green',
        // borderTopWidth:12,
        // borderTopColor:'green',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,    
        marginVertical: 10,
        marginHorizontal:20,
        backgroundColor:"white",
        borderRadius:10,
        flexBasis: '46%',
        padding: 10,
        flexDirection:'row'
      },
    
      name:{
        fontSize:18,
        flex:1,
        alignSelf:'center',
        color:"#008080",
        fontWeight:'bold'
      },
      serviceStyle:{
        fontSize:14,
        flex:1,
        alignSelf:'center',
        color:"#696969"
      },
      position:{
        fontSize:14,
        flex:1,
        alignSelf:'center',
        color:"#696969"
      },
      about:{
        marginHorizontal:10
      },
    
      followButton: {
        marginTop:10,
        height:35,
        width:75,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30,
        backgroundColor: "#00BFFF",
      },
      callButton: {
        marginTop:10,
        height:35,
        width:75,
        marginRight:15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30,
        backgroundColor: "green",
      },
      followButtonText:{
        color: "#FFFFFF",
        fontSize:20,
      },
      callButtonText:{
        paddingRight:15,
        color: "#FFFFFF",
        fontSize:20,
      },
      datetimePicker:{
        marginLeft:5,
        fontSize:16,
        color:'#00BFFF',
    },
    twoSectionsText:{
      // paddingBottom:"5%",
      textAlign:'center',
      color:'#1877F2',
      fontSize:28,
      fontWeight: "bold",
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 20
  },
  presstylecolor:{
    paddingTop:15,
    // color:'#00BFFF',
    color:'green',
    fontSize:22,
    fontWeight:'bold',
  },
  dateViewContainer:{
    alignItems:"center",
    textAlign:'center',
  },
  selectedateStyle:{
    alignItems:'center',
    justifyContent:'center',
    height:40
  },
  dateViewContainer:{
    marginTop:"15%",
    alignItems:"center",
    textAlign:'center',
  },
  dateView:{
      alignItems:"center",
      textAlign:'center',
      fontSize:70,
      // color:"#00BFFF",
      color:'green'
  },
  noappsTextStyle:{
    color:'black',
    fontSize:25,
  },

})
