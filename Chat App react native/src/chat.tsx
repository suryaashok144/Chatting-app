// import React, { useState, useEffect } from 'react';
// import { SafeAreaView, FlatList, View, TextInput, Button, Image, StyleSheet ,Text,TouchableOpacity} from 'react-native';
// import storage from "@react-native-firebase/firestore"
// import database from "@react-native-firebase/database"
// //import { firebase } from '@react-native-firebase/auth';
// import auth from "@react-native-firebase/auth"
// import * as ImagePicker from "react-native-image-picker"
// import { firebase } from '@react-native-firebase/firestore';



// const db =database();


// const Chatt = () => {
  
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState('');
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     db.ref('messages').on('value', (snapshot) => {
//       if (snapshot.exists()) {
//         const messageData = snapshot.val();
//         const messageList = Object.keys(messageData).map((key) => ({ ...messageData[key], id: key }));
//         setMessages(messageList);
//       }
//     });
//   }, []);

//   const handleSend = async () => {

//     if (text || image) {
//       const messageRef = db.ref('messages').push();
//       const messageData = {
//         text,
//         timestamp: firebase.database.ServerValue.TIMESTAMP,
//         uid: firebase.auth().currentUser?.uid,
//       };
//       await messageRef.set(messageData);

//       if (image) {
        
//         //     const { uri } = image;
//         // const filename = uri.substring(uri.lastIndexOf('/') + 1);
//         // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri ;
//        // setUploading(true);
//         //setTransferred(0);
//         //  storage()
//         //   .ref(filename)
//         //   .putFile(uploadUri);
//       //   const fileExtension = image.split('.').pop();
//       //   const storageRef = storage().ref(`images/${messageRef.key}.${fileExtension}`);
//       //   await storageRef.putFile(image);
//       //   const downloadURL = await storageRef.getDownloadURL();
//       //   await messageRef.update({ image: downloadURL });
//       // 
//     }
      

//       setText('');
//       setImage(null);
//     }
//   };

//   const handleImagePick = async () => {   
    
//      const options = {
//         maxWidth: 2000,
//         maxHeight: 2000,
//         storageOptions: {
//           skipBackup: true,
//           path: 'images'
//         }
//       }
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
//     }
  

//   const renderItem = ({ item }) => (
//     <View style={styles.message}>
//       {/* {item.image && <Image source={{ uri: item.image }} style={styles.image} />} */}
//       <Text>{item.text}</Text>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={messages}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         style={styles.messages}
//         inverted
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           placeholder="Type a message"
//           value={text}
//           onChangeText={setText}
//           style={styles.input}
//         />
//         <TouchableOpacity onPress={handleImagePick} ><Text>📷</Text></TouchableOpacity>
//         <TouchableOpacity onPress={handleSend} ><Text>📤</Text></TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#abdbb8',
//   },
//   messages: {
//     flex: 1,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderTopWidth: 1,
//     borderTopColor: '#ccc',
//     padding: 10,
//   },
//   input: {
//     flex: 1,
//     backgroundColor:"#ada08b",
//     borderWidth: 1,
//     borderColor: '#ada08b',
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     marginRight: 10,
//     color:"#fafffa",
//     fontSize:20
//   },
//   message: {
//     marginVertical: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     backgroundColor: '#a83434',
//     borderRadius: 10,
//     fontSize:30
//   }})


import React, { useState ,useEffect} from 'react';
import { View, FlatList,Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import database from '@react-native-firebase/database'
import { firebase } from '@react-native-firebase/database';
import *as ImagePicker  from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';


const Chatt = ({navigation}:any) => {
  const [message, setMessage] = useState([]);
  const [inputText, setInputText] = useState('');
  const [photo,setphoto]=useState();

const db=database();
  
  useEffect(() => {
    db.ref('chats').on('value', (snapshot) => {
      if (snapshot.exists()) {
        const messageData = snapshot.val();
        const messageList = Object.keys(messageData).map((key) => ({ ...messageData[key], id: key }));
        setMessage(messageList);
      }
    });
  }, [5000]);

const selectImage = () => {
  const options = {
    maxWidth: 2000,
    maxHeight: 2000,
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };
  ImagePicker.launchImageLibrary(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = { uri: response.assets[0].uri };
      console.log(source);
      setphoto(source);
    }
  });
};

  const sendMessage = async () => {

    if (inputText !=="" || photo) {
     
      const messagestore = db.ref('chats').push();
      const messageData = {
        inputText,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        uid: firebase.auth().currentUser?.uid,
      };
      console.log("hello");
      setInputText("");
      await messagestore.set(messageData);
     
   
      if (photo) {
        console.log('hellow');
             const { uri } = photo;
         const filename = uri.substring(uri.lastIndexOf('/') + 1);
         const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri ;
  
         let storageRef =await storage().ref(`images/${messagestore.key}${filename}`)
      
           .putFile(uploadUri).then((snapshot) => {
           
             console.log("image has been successfully uploaded.");
           })
           .catch((e) => console.log('uploading image error => ', e));

          
      const url = await storage()
      .ref(`images/${messagestore.key}${filename}`)
      .getDownloadURL()
      console.log(url)
      await messagestore.update({ photo : url });
      setInputText("");
      setphoto("");
      }
    }
  }


  const renderItem=({item})=>{
    console.log(item);
  return  (
    
    <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
    <Text style={[styles.message]}>{item.inputText} </Text>
    { item.photo && <Image source={ {uri: item.photo}} style={styles.img} />}
    </View>
 
  )
}

  return (
    
    <View style={styles.container}>

        <FlatList
        data={message}
        keyExtractor={(item) => item.id}
        renderItem={renderItem} 
        inverted={true}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={"black"}
          value={inputText}
          onChangeText={(text)=>{setInputText(text)}}
        />
        <TouchableOpacity onPress={()=>selectImage()}><Image style={styles.logo}  source={require("'./assets/download2.png'")}/></TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={()=>sendMessage()}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor:"gray"
  },
  message: {
    
    padding:10,
    backgroundColor:"lightgreen",
    flexDirection: 'row',
    marginVertical: 5,
    maxWidth:"70%",
    padding: 10,
    borderRadius: 10,
    color:'gray',
    fontSize:20,
  
    justifyContent:"flex-end"
  },
  me: {
    
    justifyContent: 'flex-end',
  },
  img:{
    
    margin:5,
    width: 200,
     height: 200 ,
     alignItems:'center',
     borderRadius:10,
  },
  logo:{
    height:45,
    width:50,
    margin:5,
    marginRight:10,
    borderRadius:10
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messageContent: {
    color:'black',
    backgroundColor:'lightgreen',
  
    maxWidth: '80%',
  
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex:1,
    height: 50,
    borderWidth: 1,
    backgroundColor:"white",
    borderColor: '#CCCCCC',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginRight: 10,
    color:'black',
    width:"60%"
  },
  sendButton: {
    justifyContent:'center',
    backgroundColor: '#0099FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    height:50
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

//export default ChatScreen;


export default Chatt;