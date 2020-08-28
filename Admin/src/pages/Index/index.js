import React from 'react'
import {Alert} from 'react-native'
import {createDrawerNavigator,DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import { AntDesign,Ionicons,EvilIcons } from "@expo/vector-icons";

import {Drawer_content,Drawer_header,Drawer_body,Mercado_pago,Mercado_pago_text,
    User,View,Image,Text,Profile} from './styles'

    import Navigation from './Navigation'
    import firebase from '../../services/firebase'

    const Drawer = createDrawerNavigator();
export default function Index({ navigation, route }) {



    const ImageUser=()=>{
            return(<>
                {firebase.auth().currentUser.photoURL != null
                    ?(
            <Profile source={{ uri: `${firebase.auth().currentUser.photoURL}` }} />
                        ):(
                        <EvilIcons name="user" size={60} color="black" />)}
                <View>
                <Text>{firebase.auth().currentUser.displayName}</Text>
                <Text>{firebase.auth().currentUser.email}</Text>
                </View>
                </>)
            };
            
            const HeaderDrawer = () => {
                const logado=(
                <View>
                <User>
                <ImageUser/>
                </User>
                </View>) 

                const deslogado=(

                <User  onPress={()=> navigation.navigate('Home')}>
                <EvilIcons name="user" size={60} color="black"/>

                <View>
                <Text >Acesse sua conta agora!</Text>
                <Text onPress={()=> navigation.navigate('Home')}>clique aqui</Text>
                </View>
                </User>



                )

                return (

                <Drawer_header>
                {firebase.auth().currentUser ? logado  : deslogado}

                </Drawer_header>
                );

            };


            const DrawerContent = () => {

                function handlesignOut(){
                    firebase.auth().signOut().then(function() {
                        console.log('Sign-out successful.')
                        navigation.navigate('Home')

                    }).catch(function(error) {
                        console.log('An error happened.')
                    });
                }
                const listMenuDrawer = [
                {
                    id: 1,
                    name: "Home",
                    action: "Main",
                    icon: <AntDesign name="home" size={24} color="black" />,
                },
                {
                    id: 2,
                    name: "Cadastrar produto",
                    action: "CadProduto",
                    icon: <AntDesign name="plus" size={24} color="black" />,
                },
                {
                    id: 3,
                    name: "Meu Perfil",
                    action: "Perfil",
                    icon: <AntDesign name="profile" size={24} color="black" />,
                }
                ];

                return (
                <Drawer_content >
                <HeaderDrawer />
                <Drawer_body>
                <DrawerContentScrollView>
                {listMenuDrawer.map((menu) => (
                    <DrawerItem
                    label={menu.name}
                    key={menu.id}
                    icon={() => menu.icon}
                    onPress={() => navigation.navigate(menu.action)}
                    />
                    ))}
                    <DrawerItem
                    label='Sair'
                    key='3'
                    icon={() => <Ionicons name="md-exit"  size={24} color="black" />}
                    onPress={handlesignOut}
                    />

                    </DrawerContentScrollView>
                    </Drawer_body>
                    </Drawer_content>
                    );
                };

                    return (
                    <Drawer.Navigator drawerContent={DrawerContent}>
                    <Drawer.Screen
                    name="Navigation"
                    component={Navigation}
                    />
                    </Drawer.Navigator>
                    );
                }


