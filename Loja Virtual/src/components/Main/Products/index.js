import React, { useState, useEffect } from 'react';
import { Image, View, Dimensions, Animated } from 'react-native';

import {  List } from './styles';
import {ScrollView,RefreshControl} from 'react-native';

import Offers from '../Offers';



const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function Products( {navigation}) {
    const [refreshing, setRefreshing] = React.useState(false);
    const [OffersView, setOffersView] = useState(<Offers navigation={navigation} />);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(500).then(() =>{ 
            setOffersView(false)
            setOffersView(<Offers navigation={navigation} />)
             setRefreshing(false)

            });
    }, []);

    return (
        <>


        <ScrollView
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >  
       {OffersView}
        </ScrollView>
        </>
        );
}

