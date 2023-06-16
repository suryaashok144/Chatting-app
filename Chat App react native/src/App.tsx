import React from "react";
//import { Text, TextInput, View ,StyleSheet,Button,SafeAreaView, Pressable} from "react-native";
//import { useState } from "react";
import Login from "./loginpage";
import Home from "./homewelcome";
import Recovery from "./Recovery";
import Setnew from "./setnewpassword";
import Sign from "./Creatnewaccout";
import Passchanged from "./passwordchanged";
import Accountcreated from "./registired";
import Chatentrance from "./chatEntrance";
// import Calculator from "./src/calculator";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Firebaseapp from "./testfirestore";
import Chatt from "./datagetting";
//import Gett from "./storingdataindb";
//import Chatt from "./chat";
//import Chatt1 from "./chat3";
const Stack=createNativeStackNavigator();
let App=()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="RECOVERY" component={Recovery} />
                <Stack.Screen name="SET NEW PASSWORD" component={Setnew} />
                <Stack.Screen name="REGISTER" component={Sign} />
                <Stack.Screen  name="WELLCOME" component={Home}/>
                <Stack.Screen  name="PasswordRecovery" component={Passchanged}/>
                <Stack.Screen  name="NewAccount Created" component={Accountcreated}/>
                <Stack.Screen  name="Search Your Friend" component={Chatentrance}/>
                <Stack.Screen  name="CHAT BOX" component={Chatt}/>
                {/* <Stack.Screen  name="CHAT BOX" component={Chatt1}/> */}
            </Stack.Navigator>
        </NavigationContainer>
        // // //<Login/>
        //<Chatentrance/>
         //<Home/>
        //<Recovery/>
        //<Setnew/>
        //<Calculator/>
       //<Sign/>
        //<Firebaseapp/>
        //<Chatt/>
       // <Chatt1/>
    //<Gett/>
    )
}
     
export default App;