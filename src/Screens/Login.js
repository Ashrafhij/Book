import React,{useState} from 'react'
import { View,StyleSheet, Text,Button,TextInput,Pressable } from 'react-native'

export default function Login({navigation,route}) {
    const [userInput, setUserInput] = useState({password:'' , username:'' })
    return (
        <View style={styles.pageContainer}>
            <Text style={styles.textBook}>Book</Text>
            <View style={styles.container}>
                {/* <Text>{JSON.stringify(route.params.userInput.password)}</Text> */}
                
                <TextInput style={styles.textInput} placeholderTextColor='#8a8a8a' placeholder='Phone number or email' />
                <TextInput style={styles.textInput} secureTextEntry={true} placeholderTextColor='#8a8a8a' placeholder='Password'/>

                <Pressable style={styles.btnStyle1} onPress={()=>{
                    navigation.navigate('HomePage')
                    }}>
                    <Text style={styles.textStyle}>Log In</Text>
                </Pressable>
                <Pressable style={styles.presstyle1} onPress={()=>{
                    navigation.navigate('HomePage')
                    }}>
                    <Text style={styles.presstylecolor}>Forgot Password?</Text>
                </Pressable>
                <Pressable style={styles.presstyle2} onPress={()=>{
                    navigation.navigate('HomePage')
                    }}>
                    <Text style={styles.presstylecolor}>Back</Text>
                </Pressable>

                <View style={{flexDirection: 'row', alignItems: 'center',margin:30, }}>
                    <View style={{flex: 1, height: 1, backgroundColor: '#8a8a8a'}} />
                        <View>
                            <Text style={{width: 50, textAlign: 'center' , color:'white' }}>OR</Text>
                        </View>
                    <View style={{flex: 1, height: 1, backgroundColor: '#8a8a8a'}} />
                </View>

                <Pressable style={styles.btnStyle2} onPress={()=>{
                    navigation.navigate('Signup')
                    }}>
                    <Text style={styles.textStyle2}>Sign Up</Text>
                </Pressable>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:70,
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
    btnStyle1 :{
        marginTop:10,
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
        width:50,
        height:40,
        marginLeft:150,
        marginTop:5,
    },
    presstylecolor:{
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
        backgroundColor:'#353839',
        color:'white',
        width:350,
        height:50,
        borderRadius:2.1,
        // textAlign:'center',
        // color:'red',
        padding:15,
        borderColor:'#8a8a8a',
        borderWidth:1,
    },
    or:{
        color:'white',
    }
})
