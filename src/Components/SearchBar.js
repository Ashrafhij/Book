import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
    TouchableOpacity,
    TextInput, Image
} from 'react-native';

export default function Searchbar({ value, updateSearch, style }) {

    const [query, setQuery] = useState("");
    const [error, setError] = useState()
    
    return (
        <View style={[styles.container, style]}>
            <View style={styles.searchContainer}>
                <View style={styles.vwSearch}>
                    <Image
                        style={styles.icSearch}
                        source={require('../assets/search.png')} />
                </View>

                <TextInput
                    value={query}
                    placeholder="Search"
                    placeholderTextColor='white'
                    style={styles.textInput}
                    onChangeText={(text) => {
                        // var letters = /^$|^[a-zA-Z._\b ]+$/;
                        if (text.length > 30)
                            setError("Query too long.")
                        else
                            setQuery(text)
                            updateSearch(text)
                        // else if (text.match(letters)) {
                        //     setQuery(text)
                        //     updateSearch(text)
                        //     if (error)
                        //         setError(false)
                        // }
                        // else setError("Please only enter alphabets")
                    }}
                />
                {
                    // query ?
                        <TouchableOpacity
                            onPress={() =>{
                                updateSearch('')
                                 setQuery('')
                                 setError(false)}}
                            style={styles.vwClear}>
                            <View>
                            <Image
                                style={{height:'100%',width:30}}
                                source={require('../assets/delete.png')} />
                            </View>
                        </TouchableOpacity>
                        // : <View style={styles.vwClear} />
                }
            </View>
            {
                error &&
                <Text style={styles.txtError}>
                    {error}
                </Text>
            }
        </View >
    )
}
const styles = StyleSheet.create({
    txtError: {
        marginTop: '2%',
        width: '89%',
        color:'white',
    },
    vwClear: {
        flex: 0.2,
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:'#1877F2',
        borderWidth:3,
        backgroundColor:'#1877F2',
    },
    textInput: {
        // backgroundColor: 'green',
        paddingLeft:10,
        borderColor:'#1877F2',
        borderWidth:3,
        color:'white',
        flex: 1,
    },

    vwSearch: {
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:'#1877F2',
        borderWidth:3,
        // width: 40,
        // backgroundColor: '#1877F2'
    },
    icSearch: {
        height: '100%', width: '100%',
        backgroundColor: '#1877F2',
    },
    searchContainer:
    {
        // backgroundColor: 'white',
        width: '90%',
        height: '50%',
        flexDirection: 'row'

    },
    container: {
        height: 80,
        alignItems: 'center',
        color:'red',
        // height: '100%', width: '100%' 
    },
});