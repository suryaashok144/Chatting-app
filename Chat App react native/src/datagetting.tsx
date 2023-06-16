
import React, { useState,useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image,FlatList,TextInput
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import database from "@react-native-firebase/database"
import { firebase } from '@react-native-firebase/auth';

const db =database();


const Chatt = () => {
  
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [url2, seturl2] = useState(null);
  

  useEffect(() => {
    db.ref('messages').on('value', (snapshot) => {
      if (snapshot.exists()) {
        const messageData = snapshot.val();
        const messageList = Object.keys(messageData).map((key) => ({ ...messageData[key], id: key }));
        setMessages(messageList);
      }
    });
  }, []);

  const handleSend = async () => {

    if (text || image) {
      const messageRef = db.ref('messages').push();
      const messageData = {
        text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        uid: firebase.auth().currentUser?.uid,
      };
      await messageRef.set(messageData);

      if (image) { 
        
             const { uri } = image;
         const filename = uri.substring(uri.lastIndexOf('/') + 1);
         const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri ;
      //   //setUploading(true);
      //   //setTransferred(0);
         let storageRef =await storage().ref(`images/${messageRef.key}${filename}`)
      //  //let storageRef=storage()
      //     // .ref(filename)
           .putFile(uploadUri).then((snapshot) => {
             //You can check the image is now uploaded in the storage bucket
             console.log("image has been successfully uploaded.");
           })
           .catch((e) => console.log('uploading image error => ', e));


       // const fileExtension = image.split('.').pop();
      // storageRef = storage().ref(`images/${messageRef.key}${fileExtension.}`);
       //  await storageRef.putFile(image);
      // const downloadURL = await storageRef.getDownloadURL();
      //await messageRef.update({ image: downloadURL });



      //  let imageRef =storage().ref(`images/${messageRef.key}${filename}`);
      // imageRef
      // .getDownloadURL()
      // .then((url) => {
      //   //from url you can fetched the uploaded image easily
      //    messageRef.update ({uri: url});
      // })

      
      const url1 = await storage()
      .ref(`images/${messageRef.key}${filename}`)
      .getDownloadURL()
      console.log(url1)
      seturl2(url1)
     await messageRef.update({ image: url1 });
      setText("")
      3214
      setImage("")
    
      
    
      }
      
          }

        }
  


  const handleImagePick = async () => {   
    
     const options = {
        maxWidth: 2000,
        maxHeight: 2000,
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.assets[0].uri };
        console.log(source,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        setImage(source);
      }
    })
  }
  
    
  

  const renderItem = ({ item }) => (
    <View style={styles.message}>
        {item.image && <Image source={{uri:item.image}} style={styles.image} />} 
      {/* // item.image uri:`${url2}` */}
      <Text>{item.text}</Text>
    </View>
  );

  return (
    
    <SafeAreaView style={styles.container}>
      {/* <Image source={{uri:"https://firebasestorage.googleapis.com/v0/b/loginpage2-ca854.appspot.com/o/images?alt=media&token=63d20506-efa7-4487-9c62-d5e278164c48"}} style={styles.image} /> */}
      <FlatList 
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.messages}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message"
          value={text}
          onChangeText={setText}
          style={styles.input}
        />
        <TouchableOpacity style={{margin:5}} onPress={handleImagePick} ><Image
        source={require('./assets/download2.png')}
        style={{width: 30, height: 30}}/></TouchableOpacity>
        <TouchableOpacity style={{margin:5}} onPress={handleSend} ><Image
        source={require('./assets/download4.png')}
        style={{width: 30, height: 30}}
      /></TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#abdbb8',
  },
  messages: {
    position:"relative",
    right:10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 10,
    
    
  },
  input: {
    flex: 1,
    backgroundColor:"#ada08b",
    borderWidth: 1,
    borderColor: '#ada08b',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    color:"#fafffa",
    fontSize:20
  },
  message: {
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#a83434',
    borderRadius: 10,
    fontSize:30

  },
image:{
  height:100,
  width:100
}})

  export default Chatt;













// export default function Gett() {
//   const [image, setImage] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [transferred, setTransferred] = useState(0);
//   const selectImage = () => {
//     const options = {
//       maxWidth: 2000,
//       maxHeight: 2000,
//       storageOptions: {
//         skipBackup: true,
//         path: 'images'
//       }
//     };
//     ImagePicker.launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       } else {
//         const source = { uri: response.assets[0].uri };
//         console.log(source);
//         setImage(source);
//       }
//     });
//   };



//   const uploadImage = async () => {
//     const { uri } = image;
//     const filename = uri.substring(uri.lastIndexOf('/') + 1);
//     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri ;
//     setUploading(true);
//     //setTransferred(0);
//     const task = storage()
//       .ref(filename)
//       .putFile(uploadUri);
//    // set progress state
//     //task.on('state_changed', snapshot => {
//       // setTransferred(
//       //   Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
//      //  );
//     // });
//     try {
//       await task;
//     } catch (e) {
//       console.error(e);
//     }
//     setUploading(false);
//     Alert.alert(
//       'Photo uploaded!',
//       'Your photo has been uploaded to Firebase Cloud Storage!'
//     );
//     setImage(null);
//   };
// return(
// <SafeAreaView style={styles.container}>
//       <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
//         <Text style={styles.buttonText}>Pick an image</Text>
//       </TouchableOpacity>
//       <View style={styles.imageContainer}>
//         {image !== null ? (
//           <Image source={{ uri: image.uri }} style={styles.imageBox} />
//         ) : null}
//         {uploading ? (
//           <View style={styles.progressBarContainer}>
//             <Progress.Bar progress={transferred} width={300} />
//           </View>
//         ) : (
//           <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
//             <Text style={styles.buttonText}>Upload image</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </SafeAreaView>
// )

//         }



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#bbded6'
//   },
//   selectButton: {
//     borderRadius: 5,
//     width: 150,
//     height: 50,
//     backgroundColor: '#8ac6d1',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   uploadButton: {
//     borderRadius: 5,
//     width: 150,
//     height: 50,
//     backgroundColor: '#ffb6b9',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold'
//   },
//   imageContainer: {
//     marginTop: 30,
//     marginBottom: 50,
//     alignItems: 'center'
//   },
//   progressBarContainer: {
//     marginTop: 20
//   },
//   imageBox: {
//     width: 300,
//     height: 300
//   }
// });

