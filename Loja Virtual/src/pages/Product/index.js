import React,{useEffect, useState} from 'react'
import { Container, Title,Image,Content,Text,Button,ScrollView,View,Button2,Button3 } from './styles';
import { Feather,MaterialIcons,AntDesign } from '@expo/vector-icons'; 

import { useSelector, useDispatch } from 'react-redux';
import firebase from '../../services/firebase'




export default function Product({ navigation: { goBack }, route }) {
	const [incidents,setIncidents] = useState([]);
	const [like, setLile]= useState();


	let produto=route.params.item
	console.log(produto)
	let idProd=produto.id


	var db = firebase.firestore();

	useEffect (() => {
		console.log('refresh')
		db.collection("LikeProd").doc(firebase.auth().currentUser.uid+''+idProd)
		.get()
		.then(doc => {
			if (!doc.exists) {
				console.log('No such document!');
			} else {
				console.log()
				setLile(doc.data().like)

			}

		})
		.catch(err => {
			console.log('Error getting document', err);
		});


	},[]);







	const likeProd = async () => {
		var teste=true
		if(like == true){
			setLile(false)
			teste=false
			db.collection('LikeProd').doc(firebase.auth().currentUser.uid+''+idProd).delete();

		}else{
			setLile(true);
			teste=true


			const {categoria, cep, descricao, downloadUrl, preco,telefone,titulo,uso} = produto.result;
			console.log(categoria)
			let user = firebase.auth().currentUser.uid;
			db.collection(`LikeProd`).doc(firebase.auth().currentUser.uid+''+idProd)
			.set({idProd,like:teste,user,categoria, cep, descricao, downloadUrl, preco,telefone,titulo,uso,
			})
			.then(function(docRef) {
				console.log('Like')
			})
			.catch(function(error) {
				console.error("Error adding document: ", error);
			});
		}
	}


function addCourseAction(product) {
	return { type: 'ADD_COURSE', product }
}
	function addCourse() {
		dispatch(addCourseAction(route.params.item))
		setLile(false)
console.log(route.params.item)
	}
	const dispatch = useDispatch();


	return (
		<>

		<Container>
		<Content>

		<Image source={{uri:`${produto.result.downloadUrl}`}} />
		<Button onPress={()=> goBack()}><Feather name="x" size={24} color="#5ca935" /></Button>
		{like== true?		
			<Button3 onPress={()=> likeProd()}><AntDesign name="heart" size={24} color="red" /></Button3>
			:
			<Button3 onPress={()=> likeProd()}><AntDesign name="heart" size={24} color="black" /></Button3>

		}
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
		<Button2 onPress={()=>addCourse()}>
		<Text style={{color:'#5ca935'}}>Adicionar ao carrinho</Text>
		<MaterialIcons name="add-shopping-cart" size={24} color="black" />
		</Button2>
		</Content>
		</Container>


		</>
		);
	}



