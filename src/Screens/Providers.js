import React , { useState, useEffect }  from 'react'
import { View, Text,Image,TouchableOpacity,ScrollView ,StyleSheet,
    SafeAreaView,
    StatusBar,
    FlatList,
    TextInput,
    Pressable} from 'react-native'
import Searchbar from '../Components/SearchBar'
import { getData } from '../Firebase/firebase';
export default function Providers({navigation}) {

    const [value, setValue] = useState();
    const [query, setQuery] = useState();
    const [filteredProviders,setfilteredProviders] = useState([]);

    function updateSearch(value="") {
        setfilteredProviders(providers.filter(provider => {
            return provider.name.toLowerCase().includes(value.toLowerCase())
        }   ))
    }
       
    // var tempProvider={
    //     id:Math.random()*1000,
    //     name:'barber',
    //     image:'data:image/jpeg;base64,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',
    //     location :'',
    //     workingHours :[ {start:"07:00",break:"12:00",endbreak:"12:30",end:"17:00",day:'sunday'},
    //                     {start:"08:00",break:"12:00",endbreak:"12:30",end:"17:00",day:'monday'},
    //                     {start:"09:15",break:"12:00",endbreak:"12:30",end:"17:00",day:'tuesday'},
    //                     {start:"10:00",break:"12:00",endbreak:"12:30",end:"17:00",day:'wednesday'},
    //                     {start:"11:00",break:"12:00",endbreak:"12:30",end:"17:00",day:'thursday'}],
    //     services:[{id:5,name:'Man hairCut',duration:10},{id:56,name:'Woman HairCut',duration:30}],
    // }
    // var tempProvider2={
    //     id:Math.random()*1000,
    //     name:'FB',
    //     image:'https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg',
    //     location :'',
    //     workingHours :[ {start:"07:00",break:"12:00",endbreak:"12:30",end:"17:00",day:'sunday'},
    //                     {start:"08:00",break:"12:00",endbreak:"12:30",end:"17:00",day:'monday'},
    //                     {start:"09:15",break:"12:00",endbreak:"12:30",end:"13:45",day:'tuesday'},
    //                     {start:"10:00",break:"12:00",endbreak:"12:30",end:"17:00",day:'wednesday'},
    //                     {start:"11:00",break:"12:00",endbreak:"12:30",end:"17:00",day:'thursday'}],
    //     services:[{id:1,name:'Man hairCut',duration:10},{id:2,name:'Woman HairCut',duration:30}],
    // }
    // var providers = [
    //     tempProvider,tempProvider2,tempProvider2,tempProvider,tempProvider,tempProvider,tempProvider,
    //     tempProvider,tempProvider,tempProvider,tempProvider,tempProvider,tempProvider,tempProvider
    // ];

    // var providers2 =[]

    // Get all Organizations from the DB
    const [providers, setproviders] = useState([])
    useEffect(() => {
        (getData('organization').then((allProviders)=>{
            setproviders(allProviders)
            setfilteredProviders(allProviders)
        }));
    }, [])

    const [userInput, setUserInput] = useState({orgname:''})
      
    return (
        <ScrollView style={styles.pageContainer}>
            <Searchbar
                value={value}
                updateSearch={updateSearch}
                style={{ marginTop: '15%' }}
            />
            {
                <View style={styles.provideContainer}>
                {
                    filteredProviders.map(provider=>{
                    return(
                        <Pressable key={Math.random()*1000} style={styles.providerStyle}
                        
                        onPress={()=> {
                         navigation.navigate('AppointmentDetails',{userInput:{orgname:provider.name,img:provider.image,services:provider.services,wHours:provider.workingHours,providerinfo:provider}})} }>
                            <View style={styles.content}>
                                 <Image source={{uri:provider.image}} style={{width :120,height:140,borderRadius:10}}/>
                                 <Text style={{textAlign:'center',fontWeight:'bold',fontSize:20 , color:'#1877F2'}}>{provider.name}</Text>
                            </View>
                        </Pressable>
                    )
                })}
                </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red', height: '100%', width: '100%' 
    },
    pageContainer :{
        flex:1,
        position:'relative',
        width:414,
        height:736,
        backgroundColor:'#343434',
        // backgroundColor: 'rgb(45, 45, 45)',
    },
    provideContainer:{
        // backgroundColor:'red',
        backgroundColor:'#343434',
        // backgroundColor: 'rgb(35, 35, 35)',
        paddingLeft:'10%',
        paddingRight:'10%',
        paddingBottom:'10%',
        // paddingLeft:'10%',
        flexDirection:'row',
        flexWrap:"wrap",
    },
    providerStyle:{
        // flexWrap:"wrap",
        backgroundColor:'#1877F2',
        // backgroundColor:'red',
        margin:20,
        marginBottom:40,
        width :120,
        height:140,
        borderRadius:10,
    },
    content:{
        // backgroundColor:'red',
        // flexWrap:"wrap",
    },
})
