
import React, { useState ,useEffect} from 'react';
import { View, FlatList,Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import database from '@react-native-firebase/database'
import { firebase } from '@react-native-firebase/database';
import *as ImagePicker  from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';


const Chatt1 = ({navigation}:any) => {
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
  }, []);

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

    if (inputText|| photo) {
     
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
        <TouchableOpacity onPress={()=>selectImage()}><Image style={styles.logo}  source={require('./assets/download2.png')}/></TouchableOpacity>
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


export default Chatt1;