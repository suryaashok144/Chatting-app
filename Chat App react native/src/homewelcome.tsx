import React from "react";
import { Text,View,TouchableOpacity } from "react-native";
import { NativeScreenContainer } from "react-native-screens";

let Home=({navigation}:any)=>{
    
    return(
    <View style={{backgroundColor:"white",flex:1}}>
                <View style={{backgroundColor:"#d2e0cc",alignItems:"center",justifyContent:"center",borderWidth:1}}>
                    <Text style={{color:"#5e4e4d",fontSize:30,margin:20}}>WELL COME </Text>
                </View>
                <View style={{backgroundColor:"white",flex:1,alignItems:"center",justifyContent:"center"}}>
                    <Text style={{color:"#5e4e4d",fontSize:30,margin:20,backgroundColor:"#d2e0cc"}}>WELL COME TO OUR CHATING APP</Text>
                    <Text style={{fontSize:30}}>😍</Text>
                </View>
                <View>           
                    <TouchableOpacity style={{borderWidth:1,borderColor:"black",position:"absolute",bottom:0,width:"50%",alignItems:"center",justifyContent:"center",height:50,backgroundColor:"#90e072"}}><Text style={{color:"#5b666b",fontSize:18}}>Profile</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("Search Your Friend")} style={{borderWidth:1,borderColor:"black",position:"absolute",bottom:0,right:0,width:"50%",alignItems:"center",justifyContent:"center",height:50,backgroundColor:"#90e072"}}><Text style={{color:"#5b666b",fontSize:18}}>Chat</Text></TouchableOpacity>            
                </View> 
            </View>
            
    )
}

export default Home;