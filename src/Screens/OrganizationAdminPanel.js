import React from 'react'
import { View, Text ,StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function OrganizationAdminPanel({navigation,route}) {
    return (
        <ScrollView>
            <Text>{JSON.stringify(route)}</Text>
            <View style={styles.appointmentCard}>
                <Text style={styles.textCard}>Ashraf hijazy</Text>
                <Text style={styles.textCard}>0542283102</Text>
                <Text style={styles.textCard}>12:45</Text>
                <Text style={styles.textCard}>General Service</Text>
            </View>
        </ScrollView>
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
    appointmentCard:{
        borderLeftWidth:12,
        borderLeftColor:'green',
        padding:10,
        height:145,
        width:"85%",
        borderWidth:1,
        justifyContent:"center",
        alignSelf:'center',
        marginTop:20,
        borderRadius:10,
    },
    textCard:{
        fontSize:20,
    }
})
