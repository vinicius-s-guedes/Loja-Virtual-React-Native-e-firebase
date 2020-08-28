import React,{useEffect, useState} from 'react'

import {View,FlatList,Item_condition,Item_subdivision_detach,Item_subdivision,
    Item_price,Item_title,Item_container,Picture,Text_results,Container_item,Container} from './styles'

    const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

var db = firebase.firestore();

export default  function Incidents({ navigation, route }){

    const [incidents,setIncidents] = useState([]);

    useEffect (() => {


let palavra=route.params.pesquisa
let letra= (palavra [palavra.length-1])
var allLetras =['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0']
let ultima=allLetras[allLetras.indexOf(`${letra}`)+1]
let semUltima=palavra.substr(0,palavra.length-1)
var produto=[];

db.collection("produtos").where('titulo', '>=', `${palavra}`).where('titulo', '<', `${semUltima+ultima}`).get()
.then((querySnapshot) => {
    var produto=[];

    let id=""
    querySnapshot.forEach((doc) => {
        let result=JSON.parse(JSON.stringify(doc.data()));
        id=doc.id;
   produto.push({id,result});

    });
            setIncidents(produto);
console.log(incidents)

}).catch(err => {
    console.log('Error getting documents', err);
  });


    },[]);
  


    function Item({item}){
        return(

<Item_container  onPress={()=> navigation.navigate('Product',{item})}>
            <Picture source={{uri:`${item.result.downloadUrl}`}}/>
            <View>
            <Item_title >{item.result.titulo}</Item_title>
            <Item_price >R${item.result.preco}</Item_price>
            <Item_subdivision >
            Parcelamento em 12x <Item_subdivision_detach>
            R${(item.result.preco/12).toFixed(2)}
            </Item_subdivision_detach>
            </Item_subdivision>
            <Item_condition>{item.result.uso}</Item_condition>
            </View>
            </Item_container>)


    }


    return( 
        <>
            <Text_results>
                Produtos encontrados para {route.params.pesquisa}: {incidents.length}
            </Text_results>
            <Container_item>
                            <FlatList
                    data={incidents}
                    renderItem={({ item }) => (
                        <Item
                            item={item}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
                            

            </Container_item>

        </>
        );
}

