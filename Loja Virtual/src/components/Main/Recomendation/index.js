import React,{useState,useEffect} from 'react';

import { Container, Title, Product, Description,
    Value, Plots, Freight, Image,
    AreaTitle, AreaFreight, ImageView
} from './styles';


import { FlatList, View } from "react-native";
const firebase = require("firebase");

export default function Recomendation({ navigation }){
    var db = firebase.firestore();



    const [incidents,setIncidents] = useState([]);

    useEffect (() => {

        db.collection("produtos").get()
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


    return (
        <>



        <Container>

        <AreaTitle>
        <Title>Os mais procurados</Title>
        </AreaTitle>

        <FlatList
        data={incidents}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item }) => {
            return (

                <ImageView onPress={()=> navigation.navigate('Product',{item})}>
                <Image 
                style={{ width: 100, height: 100 }}
                source={{uri:`${item.result.downloadUrl}`}}
                />
                <Product >{item.result.titulo}</Product>
                <Description>Dual 5 16gb Preto</Description>

                <Value>R${item.result.preco}</Value>
                <Plots>12x R${(item.result.preco/12).toFixed(2)}</Plots>
                <AreaFreight>
                <Freight>Frete grátis FULL {item.result.uso}</Freight>
                </AreaFreight>
                </ImageView>

                );
        }}
        />
        </Container>
        </>
        );
    }