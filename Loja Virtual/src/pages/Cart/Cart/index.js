import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { Container, Title, Description,
 ProdContainer,Prodimage,Proddescription,
ProdTitle,ProdtitleName,ProdBtn,FlatList,Text,Button2} from './styles';

import { useSelector, useDispatch } from 'react-redux';
import firebase from '../../../services/firebase'



export default function Cart({ navigation }) {


  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `Carrinho (${courses.length})`,
    });
  }, courses);


var db = firebase.firestore();

const handleChat = async () => {

db.collection(`ChatID`).doc(firebase.auth().currentUser.uid).set({
Name:firebase.auth().currentUser.displayName,date: new Date,
})
.then(function(docRef) {
	console.log('Chat Atualizado')
	navigation.navigate('Chat')
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

}


    function Item({item}){
        return(
		<ProdContainer >
			<Prodimage source={{ uri: `${item.result.downloadUrl}` }} />
			<Proddescription >
				<ProdTitle>{item.result.titulo}</ProdTitle>
				<ProdtitleName >{item.result.preco}R$</ProdtitleName>
			</Proddescription>
			<ProdBtn  onPress={()=>deleteCourse(item.id)}>
				<MaterialIcons name="remove-shopping-cart" color="#ff0000" size={24} />
			</ProdBtn>
		</ProdContainer>
)


    }

function deleteCourseAction(product) {
	return { type: 'DELETET_COURSE', product }
}

	function deleteCourse(produto) {
		dispatch(deleteCourseAction(produto))
	}

  const courses = useSelector(state => state.data);
  const dispatch = useDispatch();
      	console.log(courses)

    return (

        <>
           
			{courses.length > 0 ? (
				<>
			<FlatList
					style={{ padding: 10 }}
					keyExtractor={(item) => String(item.id)}
					data={courses}
					renderItem={({ item }) => (
                        <Item
                            item={item}
                        />
                    )}
				/>
			<Button2 onPress={()=> handleChat()}><Text>Finalizar compra</Text>
		</Button2>
</>

			  ) : (

			   <Container>
 				<Title>O seu carrinho está vazio</Title>
                <Description>Não sabe o que comprar?</Description>
                <Description>Milhares de produtos esperam por você!</Description>
			  </Container>

			)}
        </>
    );
}






