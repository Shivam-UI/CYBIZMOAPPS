import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput, Alert, AsyncStorage, StyleSheet, Picker, Platform, FlatList, ToastAndroid } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { PRODUCT_LIST_API } from '../../../configApi';
import { useNavigation, useRoute } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-simple-toast';
import axios from 'axios';

const MyProductsScreens = () => {

    const navigation = useNavigation();
    const routes = useRoute();
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const [CategoryInnerProducts, setCategoryInnerProducts] = React.useState([]);
    const [isHaveData, setNoData] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAddressData();
        });
        return unsubscribe;
    }, [navigation]);

    async function getAddressData() {
        setLoadingDone(true);
        // do something 
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        console.log(value);
        axios({
            method: "GET",
            url: PRODUCT_LIST_API,
            headers: {
                'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                'Authorization': value
            }
        })
            .then(function (response) {
                //handle success
                console.log('response: ', JSON.stringify(response.data));
                if (response.data.status === true) {
                    setCategoryInnerProducts(response.data.data);
                    setNoData(true);
                    setLoadingDone(false);
                } else {
                    Alert.alert(response.data.message);
                    setLoadingDone(false);
                    setNoData(false);
                }
            })
            .catch(function (error) {
                //handle error
                setLoadingDone(false);
                // console.log('error: ', error);
            });
    }

    async function conformDelete() {
        Alert.alert(
            'Delete Product',
            'You want to delete this Product?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                { text: 'OK', onPress: () => console.log('Ok Pressed!') },

            ],
            { cancelable: false }
        )
    }

    async function conformEdit() {
        Toast.showWithGravity('Comming Soon', Toast.LONG, Toast.BOTTOM);
    }

    const renderBannerSingle = (items) => {

        console.log('PRODUCTS_SINGLE:', JSON.stringify(items));

        return (
            <View
                style={{ backgroundColor: 'white', elevation: 5, shadowColor: "#000000", shadowOpacity: 0.8, shadowRadius: 2, shadowOffset: { height: 1, width: 1 }, marginBottom: 4 }}>
                <View style={{ alignItems: 'center', padding: 5, flexDirection: 'row', backgroundColor: '#FFFFFF', }}>
                    <Image
                        style={{ position: 'absolute', right: 0, top: 8, width: 45, height: 30, resizeMode: 'contain', borderRadius: 0, marginRight: 5 }}
                        source={require('../../../assets/images/sold_icon.png')} />
                    <View>
                        <FastImage
                            style={{ width: 120, height: 120, resizeMode: 'cover', borderRadius: 0 }}
                            source={{
                                uri: items.android_image,
                                headers: { Authorization: 'someAuthToken' },
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover} />
                    </View>
                    <View style={{ flexDirection: 'column', marginTop: 0, padding: 5, alignItems: 'flex-start', marginLeft: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 0 }}>
                            <Image style={{ width: 20, height: 20, resizeMode: 'cover', borderRadius: 0, tintColor: '#00CCff' }} source={require('../../../assets/images/pin_icon.png')} />
                            <Text style={{ marginRight: 20, fontWeight: 'bold', fontSize: 12, color: '#aaa', width: 180 }} numberOfLines={1}>{items.address}</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('ProductSingle', items)} style={{ flex: 1 }}>
                            <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 10, marginTop: 5, width: 140, color: 'grey' }}>#{items.product_ID}</Text>
                            <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 14, marginTop: 2, width: 140 }}>{items.product_name}</Text>
                        </TouchableOpacity>
                        <View style={{ width: 280 }}>
                            <Text numberOfLines={2} style={{ fontWeight: 'bold', fontSize: 13, color: '#aaa', marginTop: 5, marginRight: 40 }}>{items.description}</Text>
                        </View>
                        <View style={{ marginTop: 5, alignItems: 'flex-end' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>$ {items.price}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff', }}>
                    <TouchableOpacity
                        onPress={() => conformEdit()}
                        style={{ flex: 1 / 2, backgroundColor: '#f1f1f1', padding: 10, borderRadius: 10, marginRight: 10 }}>
                        <Image
                            style={{ width: 20, height: 20, tintColor: '#00CCFF', alignSelf: 'center', resizeMode: 'contain' }}
                            source={require('../../../assets/images/icons/edit.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => conformDelete()}
                        style={{ flex: 1 / 2, backgroundColor: '#00CCFF', padding: 10, borderRadius: 10 }}>
                        <Image
                            style={{ width: 20, height: 20, tintColor: '#FFFFFF', alignSelf: 'center', resizeMode: 'contain' }}
                            source={require('../../../assets/images/icons/delete.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#FFFFFF', }}>
            <Spinner
                visible={isLodingDone}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <View style={{ flexDirection: 'row', height: 55, alignItems: 'center', backgroundColor: '#00CCff' }}>
                <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.goBack()}>
                    <Image source={require('../../../assets/images/back_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>{'My Products'}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('SearchSingle')}>
                    <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                    <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#f1f1f1', padding: 5 }}>
                <FlatList
                    style={{ height: '92%' }}
                    data={CategoryInnerProducts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => renderBannerSingle(item)}
                />
            </View>
        </SafeAreaView>
    )
}

export default MyProductsScreens;