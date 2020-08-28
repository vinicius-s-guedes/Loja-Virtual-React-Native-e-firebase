import React,{useEffect, useState} from 'react'

import { MaterialIcons,AntDesign } from '@expo/vector-icons';
import { Container, Title, Description,
	ProdContainer,Prodimage,Proddescription,
	ProdTitle,ProdtitleName,ProdBtn,FlatList,Text} from './styles';

	import firebase from '../../../services/firebase'

import { useSelector, useDispatch } from 'react-redux';



	export default function Cart({ navigation , route }) {

		const [incidents,setIncidents] = useState([]);
		React.useLayoutEffect(() => {
			navigation.setOptions({
				title: `Salvos (${incidents.length})`,
			});
		}, [incidents]);


		var db = firebase.firestore();

		useEffect (() => {
			db.collection("LikeProd").where('like', '==', true)
			.get()
			.then((querySnapshot) => {
				var produto=[];

				let id=""
				querySnapshot.forEach((doc) => {
					let result=JSON.parse(JSON.stringify(doc.data()));
					id=result.idProd;
					produto.push({id,result});

				});
				setIncidents(produto);
			}).catch(err => {
				console.log('Error getting documents', err);
			});


		},[]);


		const DeleteSalve = async (idProd) => {

			db.collection('LikeProd').doc(firebase.auth().currentUser.uid+''+idProd).delete();

		}

function addCourseAction(product) {
	return { type: 'ADD_COURSE', product }
}

	function addCourse(produto) {
		dispatch(addCourseAction(produto))
	}
	const dispatch = useDispatch();

		function Item({item}){
			return(
				<ProdContainer >
				<Prodimage source={{ uri: `${item.result.downloadUrl}` }} />
				<Proddescription >
				<ProdTitle>{item.result.titulo}</ProdTitle>
				<ProdtitleName >{item.result.preco}R$</ProdtitleName>
				</Proddescription>
				<ProdBtn  onPress={()=>addCourse(item)}>
				
				<MaterialIcons name="add-shopping-cart" size={24} color="black" />

				</ProdBtn>
				<ProdBtn  onPress={()=>DeleteSalve(item.result.idProd)}>
				
				<AntDesign name="heart" size={24} color="red" />

				</ProdBtn>
				</ProdContainer>
				)


		}





		return (

			<>

			{incidents.length > 0 ? (
				<>
				<FlatList
				style={{ padding: 10 }}
				keyExtractor={(item) => String(item.result.idProd)}
				data={incidents}
				renderItem={({ item }) => (
					<Item
					item={item}
					/>
					)}
				/>

				</>

				) : (


				<Container>
				<Title>Você não tem produtos salvos</Title>

				<Description>Se ainda não decidiu comprar algum prodruto</Description>
				<Description>do seu carrinho, você pode deixá-lo aqui.</Description>
				</Container>

				)}
				</>
				);
		}









