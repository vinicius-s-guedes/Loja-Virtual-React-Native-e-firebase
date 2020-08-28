import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack= createStackNavigator()
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import RedefinePass from './pages/RedefinePass'
import Index from './pages/Index'
import Message from './pages/Message'
import Product from './pages/Product'
import CadProduto from './pages/Vendedor/CadProduto'
import EditProd from './pages/Vendedor/EditProd'
import Perfil from './pages/Perfil'
import EditProfile from './pages/Perfil/EditProfile'
import Security from './pages/Perfil/Security'
import Comunication from './pages/Perfil/Comunication'
import Chat from './pages/Chat'

import firebase from './services/firebase'

const optionsHeader = () => ({
    headerStyle: {
        backgroundColor: "#5ca935",
    },headerTintColor:"#000",
    headerTitleStyle: {fontWeight: 'bold'},
})

export default function Routes(){
    return (


        <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
        name="Index"
        component={Index}
        options={{ headerShown: false }}/>
        <Stack.Screen
        name="Home"
        component={Home}
        options={optionsHeader}
        />   
        <Stack.Screen
        name="Login"
        component={Login}
        options={optionsHeader}
        />   
        <Stack.Screen
        name="Signup"
        component={Signup}
        options={optionsHeader}
        />
        <Stack.Screen
        name="RedefinePass"
        component={RedefinePass}
        options={optionsHeader}
        />
        

        <Stack.Screen
        name="Message"
        component={Message}
        options={optionsHeader}
        />        
        <Stack.Screen
        name="Chat"
        component={Chat}
        options={optionsHeader}
        />
        <Stack.Screen
        name="CadProduto"
        component={CadProduto}
        options={optionsHeader}
        />        
        <Stack.Screen
        name="EditProd"
        component={EditProd}
        options={optionsHeader}
        />

        <Stack.Screen
        name="Product"
        component={Product}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={optionsHeader}
        />
                <Stack.Screen
        name="Security"
        component={Security}
        options={optionsHeader}
        />
                <Stack.Screen
        name="Comunication"
        component={Comunication}
        options={optionsHeader}
        />
                <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={optionsHeader}
        />
        </Stack.Navigator>
        </NavigationContainer>

        )
}