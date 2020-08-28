import React,{useEffect, useState} from 'react'

import {View,FlatList,
    Item_title,Item_container,Picture,Container_item} from './styles'

    const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

var db = firebase.firestore();

export default  function Main({ navigation }){

    const [incidents,setIncidents] = useState([]);

    useEffect (() => {

db.collection("ChatID").get()
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
      let id= item.id;
        return(

<Item_container  onPress={()=> navigation.navigate('Chat',{id})}>
            <Picture source={{uri:`${item.result.downloadUrl}`}}/>
            <View>
            <Item_title >{item.result.Name}</Item_title>
            </View>
            </Item_container>)


    }


    return( 
        <>
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

