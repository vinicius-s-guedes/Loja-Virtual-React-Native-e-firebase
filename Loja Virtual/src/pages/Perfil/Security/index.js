import React from 'react';
import { Image,Text,ScrollView,Option } from './styles';
    const firebase = require("firebase");
import { AntDesign,Ionicons,EvilIcons } from "@expo/vector-icons";


export default function Perfil({ navigation }) { 

	return(
		<ScrollView>

		<Option  onPress={()=>navigation.navigate('DeleteAccount')}><Text>Mudar senha</Text></Option>
		<Option onPress={()=>navigation.navigate('DeleteAccount')}><Text>Deletar Conta</Text></Option>


		</ScrollView>
		)}
