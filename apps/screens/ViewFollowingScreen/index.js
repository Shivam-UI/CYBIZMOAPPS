import React from 'react';
import { SafeAreaView, View, Text, Image, Dimensions, ScrollView, TouchableOpacity, AsyncStorage, FlatList, Share, TextInput, ToastAndroid, AlertIOS } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';
import { MY_FOLLOWING_LIST_API } from '../../../configApi';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

const ViewFollowerScreen = () => {

    const navigation = useNavigation();
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const [Data, setData] = React.useState([{ id: 1 }]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoadingDone(true);
            getDashboardDetails();
        });
        return unsubscribe;
    }, [navigation]);

    async function getDashboardDetails() {

        // do something
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        console.log(value);
        console.log(MY_FOLLOWING_LIST_API);

        if (value) {
            axios({
                method: "GET",
                url: MY_FOLLOWING_LIST_API,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                    'Authorization': value,
                }
            })
                .then(function (response) {
                    if (response.data.status === true) {
                        console.log('DASHBOARD_COUNT_API: ', JSON.stringify(response.data));
                        setData(response.data.data);
                        setLoadingDone(false);
                    } else {
                        Alert.alert(response.data.message);
                        setLoadingDone(false);
                    }
                })
                .catch(function (error) {
                    setLoadingDone(false);
                    console.log('error: ', error);
                }
                );
        }
    }

    const renderBlog = (items) => {

        return (
            <View style={{
                margin: 2,
                backgroundColor: '#ffffff',
                marginBottom: 5, shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 1,
                padding: 5
            }} >
                <View style={{ flexDirection: 'row', borderBottomColor: '#aaaaaa', borderBottomWidth: 0, alignItems: 'center' }}>
                    <View style={{ alignSelf: 'center', width: '20%' }}>
                        <Image style={{ width: 40, height: 40, resizeMode: 'cover', borderRadius: 60, alignSelf: 'center' }} source={{ uri: 'https://codersinn.club/uploads/user_image/1633160565243.jpeg' }} />
                        <Text numberOfLines={1} style={{ textAlign: 'center', fontWeight: 'bold' }}>Dablo</Text>
                    </View>
                    <View style={{ padding: 10, width: '80%', flexDirection: 'row' }}>
                        <Text numberOfLines={1} style={{ marginTop: 15, fontWeight: 'bold', flex: 1 }}>Start Following you</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <TouchableOpacity style={{ backgroundColor: '#aaa', padding: 15, marginRight: 10, width: 100, borderRadius: 5 }}>
                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Unfollow</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
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
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>{"View Follower"}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('SearchSingle')} >
                    <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                    <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View>
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

export default ViewFollowerScreen;