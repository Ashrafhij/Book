import React, { useState, useEffect } from 'react';
import {LogBox, Button, Image,StyleSheet, Text ,View, Platform,Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadImageAsync } from '../Firebase/firebase';
import { MaterialIcons } from '@expo/vector-icons';

LogBox.ignoreLogs(['Setting a timer']);

export default function ExpoImagePicker({saveImageDetails}) {
    const [image, setImage] = useState(null);


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
        // uploadImage("image name ",result.uri)
        console.log("uploadImageAsync(result.uri)" +uploadImageAsync(result.uri));
      //  console.log(" saveImageDetails()++>>>", saveImageDetails.toString());
      saveImageDetails(result.uri)
    }


  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <View style={{flexDirection: 'row'}}>
          <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />}
      </View>
    </View>
  );
}