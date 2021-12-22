// // import ImagePicker from 'react-native-image-picker';
// // import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// import React,{useState} from 'react'
// import { View, Text, Button, Pressable } from 'react-native'
// import ImageResizer from 'react-native-image-resizer';

// import ImagePicker from 'react-native-image-crop-picker';

// export default function UploadImage() {

// const [selectedPicture, setselectedPicture] = useState({})
// const [state, setstate] = useState({})

// const options = {
//   title: 'Add Image',
//   storageOptions: {
//     skipBackup: true,
//     path: 'images',
//   },
// };

// // ImagePicker.showImagePicker(options, (response) => {
// //   console.log('Response = ', response);

// //   if (response.didCancel) {
// //     console.log('User cancelled image picker');
// //   } else if (response.error) {
// //     console.log('ImagePicker Error: ', response.error);
// //   } else {
// //     const uri = response.uri;
// //     setselectedPicture({uri:uri})
// //     setstate({...state,uri:uri})
// //     // this.setState({
// //     //   selectedPictureUri: uri,
// //     // });
// //   }
// // });

// let newWidth = 40;
// let newHeight = 40;
// let compressFormat = 'PNG';
// let quality = 100;
// let rotation = 0;
// let outputPath = null;
// let imageUri = selectedPicture.uri;
// ImageResizer.createResizedImage(
//   imageUri,
//   newWidth,
//   newHeight,
//   compressFormat,
//   quality,
//   rotation,
//   outputPath,
// )
//   .then((response) => {
//     // response.uri is the URI of the new image that can now be displayed, uploaded...
//     //resized image uri
//     let uri = response.uri;
//     //generating image name
//     let imageName = 'profileImage' + Math.random()*1000;
//     //to resolve file path issue on different platforms
//     let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
//     //setting the image name and image uri in the state
//     setstate({...state,uploaduri:uploadUri,imageName:imageName})
//     // this.setState({
//     //   uploadUri,
//     //   imageName,
//     // });
//   })
//   .catch((err) => {
//     console.log('image resizing error => ', err);
//   });


//     return (
//         <View>
//             <Pressable style={{borderColor:"red",padding:'5%'}} onPress={()=>{
//               /*  launchImageLibrary(options, (response) => {
//                     console.log('Response = ', response);
                  
//               /*      if (response.didCancel) {
//                       console.log('User cancelled image picker');
//                     } else if (response.error) {
//                       console.log('ImagePicker Error: ', response.error);
//                     } else {
//                       const uri = response.uri;
//                       setselectedPicture({uri:uri})
//                       setstate({...state,uri:uri})
//                       // this.setState({
//                       //   selectedPictureUri: uri,
//                       // });
//                     }*/
//                 //   })*/

//                 ImagePicker.openPicker({
//                     width: 300,
//                     height: 400,
//                     cropping: true
//                   }).then(image => {
//                     console.log("image ",image);
//                   });
                  
//                 // You can also use as a promise without 'callback':
//                 // const result = await launchImageLibrary(options,(response)=>{console.log(response)});
//             }}>
//                 <Text style={{color:"red"}}>Upload Image*</Text>
//             </Pressable>
//         </View>
//     )
// }
