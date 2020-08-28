import React, {useState, useEffect} from  'react';

import {View, Text} from  'react-native';

import firebase from '../../services/firebase'

import {GiftedChat, Bubble} from  'react-native-gifted-chat';

function  Chat({ navigation: { goBack },navigation, route }) {

  const [user, setUser] =  useState({
    firstName:firebase.auth().currentUser.displayName,
      id:firebase.auth().currentUser.uid
    });

  const [messages, setMessages] =  useState([]);

  useEffect(() => {


var db = firebase.firestore();

    db.collection('groupChat')

.where('user.CHAT_ID', '==',route.params.id)

    .orderBy('createdAt', 'desc')

    .onSnapshot(function(doc) {

      let receivedMessages = [];

      doc.docs.map(doc => {
        receivedMessages.push({

          _id: doc.id,

          ...doc.data(),

        });

      });

    setMessages(GiftedChat.append(messages, receivedMessages));

});

}, [user]);



function  onSend([messages]) {

  firebase.firestore()

  .collection('groupChat')

  .add(messages,);

}

function  renderBubble(props) {
  
  return (

    <View>

    <Text  style={{left:  90}}>{props.currentMessage.user.name}</Text>

    <Bubble

    {...props}

    />

    </View>

    );

}
let image=firebase.auth().currentUser.photoURL
console.log(image)

return (
  <>
  {firebase.auth().currentUser.photoURL != null?(

  <GiftedChat
  dateFormat={'DD-MM-YYYY'}
  timeFormat={'h:mm'}
  renderBubble={renderBubble}
  messages={messages}
  onSend={messages =>  onSend(messages)}
  user={{
    id: user.id,
          avatar: firebase.auth().currentUser.photoURL,
    name: user.firstName,
    CHAT_ID:`${firebase.auth().currentUser.uid}`,
  }}
  />
):(

  <GiftedChat
  dateFormat={'DD-MM-YYYY'}
  timeFormat={'h:mm'}
  renderBubble={renderBubble}
  messages={messages}
  onSend={messages =>  onSend(messages)}
  user={{
    id: user.id,
    name: user.firstName,
    CHAT_ID:`${firebase.auth().currentUser.uid}`,
  }}
  />
)}
</>
  );

}

Chat.navigationOptions = {

  title:  'Chat',

};

export  default Chat;