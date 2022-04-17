import React from 'react';
import { SafeAreaView, View, Text, Image, Dimensions, ScrollView, TouchableOpacity, AsyncStorage, FlatList, Share, TextInput, ToastAndroid, AlertIOS } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';
import Pie from 'react-native-pie'
import { USER_PROFILE_API } from '../../../configApi';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

const MyWalletScreen = () => {

    const navigation = useNavigation();
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const [Data, setData] = React.useState([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
    const [WalletData, setWalletData] = React.useState('');


    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoadingDone(true);
            getHomeDetails();
        });
        return unsubscribe;
    }, [navigation]);

    async function getHomeDetails() {

        // do something
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        console.log(value);

        axios({
            method: "GET",
            url: USER_PROFILE_API,
            headers: {
                'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                'Authorization': value
            }
        })
            .then(function (response) {
                //handle success
                console.log('response: ', JSON.stringify(response.data));
                if (response.data.status === true) {
                    // Alert.alert(response.data.message);
                    setWalletData(response.data.data[0].wallet_amount);
                    setLoadingDone(false);
                } else {
                    Alert.alert(response.data.message);
                    setLoadingDone(false);
                }
            })
            .catch(function (error) {
                //handle error
                setLoadingDone(false);
                // console.log('error: ', error);
            });
    }

    const renderBlog = (items) => {

        return (
            <TouchableOpacity style={{
                margin: 10,
                backgroundColor: '#ffffff',
                marginBottom: 5, shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 1,
                padding: 10
            }} >
                <View style={{ flexDirection: 'row', borderBottomColor: '#aaaaaa', borderBottomWidth: 0 }}>
                    <View style={{ padding: 0, width: '50%', flexDirection: 'column' }}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Paid for Order Adult</Text>
                        <Text style={{ fontSize: 10 }}>Order Id: MIMW190213179336</Text>
                    </View>
                    <View style={{ padding: 0, width: '50%', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>₹ 253.00</Text>
                        <Text style={{ fontSize: 10 }}>Thu, 14 Feb 2019, 06:30 PM</Text>
                    </View>
                </View>
                <Text style={{ marginTop: 10, color: 'green' }}>TRANSACTION SUCCESSFUL</Text>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#f5f5f5', flex: 1 }}>
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
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>{"My Wallet"}</Text>
                </View>
                <TouchableOpacity >
                    <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                    <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View>
                    <View style={{}}>
                        <View style={{
                            margin: 20, padding: 20, backgroundColor: '#ffffff',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 1,
                        }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 30 }} >Wallet Balance</Text>
                            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>$ {WalletData}</Text>
                        </View>
                        <Text style={{ fontWeight: 'bold', color: '#aaa', marginLeft: 10, marginBottom: 10 }}>Latest Transaction</Text>
                    </View>
                    <FlatList
                        style={{}}
                        data={Data}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => renderBlog(item)}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MyWalletScreen;