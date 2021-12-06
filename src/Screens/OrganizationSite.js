import React , { useState, useEffect }  from 'react'
import { View, Text,Image,TouchableOpacity,ScrollView ,StyleSheet,
    SafeAreaView,
    StatusBar,
    FlatList,
    TextInput,
    Pressable} from 'react-native'


export default function OrganizationSite({navigation}) {
    return (
        <View style={styles.pageContainer}>
            <View style={styles.container}>
                <Text>helloo oragnization site</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer:{
        flex:1,
        position:'relative',
        alignItems: 'center',
        backgroundColor:'#343434',
    },
    container:{
        flex:1,
        backgroundColor:'red',
        margin:"10%",
    },
})