import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import firebase from '../../services/firebase'
const Tab = createMaterialTopTabNavigator();

import Cart from './Cart';
import Saves from './Saves';

import { useSelector } from 'react-redux';

export default function TabNavigator() {
    const courses = useSelector(state => state.data);




    return (
        <Tab.Navigator
        tabBarPosition="bottom"
        tabBarOptions={{
            tabStyle: {
                backgroundColor: '#5ca935',

            }
        }}
        >
        <Tab.Screen name="Cart" component={Cart} options={{ title: `Carrinho (0)` }} />
        <Tab.Screen name="Saves" component={Saves}  options={{ title: 'Salvos (0)' }} />
        </Tab.Navigator>
        );
    }