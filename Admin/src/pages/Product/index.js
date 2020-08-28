import React from 'react';
import { Container, Title,Image,Content,Text,Button,ScrollView,View,Button2,Button3 } from './styles';
import { Feather,MaterialIcons,FontAwesome } from '@expo/vector-icons'; 

	import firebase from '../../services/firebase'



export default function Product({ navigation: { goBack },navigation, route }) {
		let produto=route.params.item
		var db = firebase.firestore();

	const DeleteProd = async () => {
		db.collection('produtos').doc(produto.id).delete();

		
	}


	console.log(produto)
	return (
		<>

		<Container>
		<Content>

		<Image source={{uri:`${produto.result.downloadUrl}`}} />
		<Button onPress={()=> goBack()}><Feather name="x" size={24} color="#5ca935" /></Button>
			<Button3 onPress={()=> DeleteProd()}><FontAwesome name = "trash-o" size = {24} color = "black" /></Button3>

		<ScrollView>


		<Title>{produto.result.titulo}</Title>
		<Text>Descrição:</Text>

		<Text>{produto.result.descricao}</Text>
		<Text>Condição:</Text>

		<Text>{produto.result.uso}</Text>
		<Text>Valor:</Text>

		<Text>{produto.result.preco}R$</Text>
		<Text>Localização:</Text>

		<Text>{produto.result.cep}</Text>
		<Text >
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
		eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
		minim veniam, quis nostrud exercitation ullamco laboris nisi ut
		aliquip ex ea commodo consequat. Duis aute irure dolor in
		reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
		pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
		culpa qui officia deserunt mollit anim id est laborum.
		</Text>
		<Text >
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
		eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
		minim veniam, quis nostrud exercitation ullamco laboris nisi ut
		aliquip ex ea commodo consequat. Duis aute irure dolor in
		reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
		pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
		culpa qui officia deserunt mollit anim id est laborum.
		</Text>
				<View></View>

		</ScrollView>
		<Button2 onPress={()=>navigation.navigate('EditProd',{produto})}>
		<Text style={{color:'#5ca935'}}>Editar Produto</Text>
		<MaterialIcons name="add-shopping-cart" size={24} color="black" />
		</Button2>
		</Content>
		</Container>


		</>
		);
	}



