import React,{useEffect,useState} from "react";
import { View,Text,TouchableOpacity ,TextInput,Image,StyleSheet} from "react-native";
import firestore from '@react-native-firebase/firestore';
let Chatentrance=({navigation}:any)=>{
            
           const [user,setuser]=useState([])
            // firestore().collection('users').doc("sLgQzhty0dZfTSEzTIXnaFAX0uW2").get().then((data)=>
            // console.log(data.id))
                       
             firestore()
            .collection('users')
            .get()
            .then(querySnapshot => {
                let document=[];
                //console.log('Total users: ', querySnapshot.size);
                querySnapshot.forEach(documentSnapshot => {
                //console.log('user ID: ', documentSnapshot.id);
                document.push(documentSnapshot.data())
                });
                setuser(document);
            });
            let chatpage=(username,userid)=>{
                navigation.navigate("CHAT BOX")
            }

    return(

        <View style={{flex:1,backgroundColor:"white"}}>
            <View>
            <TextInput  placeholderTextColor={"#57564b"} placeholder="Enter Name" style={styles.input}></TextInput>
            <TouchableOpacity  style={{backgroundColor:"red"}}><Text style={{color:"white"}}>Select</Text></TouchableOpacity>
            </View>
            <View style={{backgroundColor:"black"}}>
                {user.map((user) => (
                            
             <TouchableOpacity key={user.id} onPress={()=>chatpage(user.name,user.id)}>
            <Text style={{color:"red",fontSize:40,borderColor:"white",borderWidth:2,paddingLeft:40,padding:10}}>{user.name}</Text>
            </TouchableOpacity>
                ))}
                
            </View>
            <View>
                 <Text></Text>           
                    
                  

                
            </View>
        </View>

    )
};

let styles=StyleSheet.create({
    input:{
        backgroundColor:"#f0efe9",
        borderColor:"black",
        borderWidth:2,
        width:250,
        height:30,
        marginVertical:10,
        fontSize:20,
        padding:3,
        color:"blue",
        fontWeight:"bold",
        borderRadius:10}})
export default Chatentrance;