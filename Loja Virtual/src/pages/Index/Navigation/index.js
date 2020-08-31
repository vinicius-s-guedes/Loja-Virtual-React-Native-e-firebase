import React,{useState} from 'react'
import { TouchableOpacity, TextInput,Input_search } from './styles'
import {Alert} from 'react-native'

import { createStackNavigator } from "@react-navigation/stack";
import { EvilIcons, Feather } from "@expo/vector-icons";

import firebase from '../../../services/firebase'

import Main from '../Main'
import List from '../List'

const Stack = createStackNavigator()


export default function Navigation({ navigation }) {

	const SearchBarHeader = ( props ) => {
		const [pesquisa, setPesquisa] = useState();

		return (
			<Input_search>
			<EvilIcons
			name="search"
			size={22}
			color="#CDCDCD"
			onPress={() => props.navigation.navigate('List',{pesquisa:pesquisa})}
			style={{ marginRight: 5 }}
			/>
			<TextInput
			placeholder="Buscar no mercadinho "
			autoCapitalize="none"

			onChangeText ={(pesquisar) => setPesquisa(pesquisar)}
			/>
			</Input_search>
			);
		};

		const optionHeader = () => (
		{

			headerStyle: {
				backgroundColor: "#5ca935",
				elevation: 0,
			},
			headerTintColor: "#000",
			headerTitle: () => (<SearchBarHeader navigation={navigation} />),
			headerLeft: () => (
			<TouchableOpacity
			style={{ marginLeft: 10 }}
			onPress={() => navigation.toggleDrawer()}
			title="Info"
			>
			<Feather name="align-left" size={24} color="black" />
			</TouchableOpacity>
			),
			headerRight: () => (
			<TouchableOpacity
			style={{ marginRight: 10 }}
			onPress={() => isLogout()}
			title="Info"
			>
			<EvilIcons name="cart" size={24} color="#0D0D0D" />
			</TouchableOpacity>
			),
			headerTitleContainerStyle: {
				flex: 1,
			},
		});


		function isLogout(){
			if(firebase.auth().currentUser){
				navigation.navigate('Cart')
			}else{
				navigation.navigate('Home')
			} 
		}
		return (
		<Stack.Navigator>
		<Stack.Screen
		component={Main}
		name="Main"
		options={optionHeader}
		/>
		<Stack.Screen
		component={List}
		name="List"
		options={optionHeader}
		/>
		</Stack.Navigator>
		);
	}
