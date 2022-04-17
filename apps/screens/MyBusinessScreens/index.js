import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, Dimensions, FlatList, AsyncStorage, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { MY_SERVICE_LIST_API } from '../../../configApi';
import axios from 'axios';

const MyBusinessScreens = () => {


    const navigation = useNavigation();
    const [isLodingDone, setLoadingDone] = React.useState(true);
    const [AddressData, setADData] = React.useState([]);
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
            url: MY_SERVICE_LIST_API,
            headers: {
                'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                'Authorization': value
            }
        })
            .then(function (response) {
                //handle success
                console.log('response: ', response.data);
                if (response.data.status === true) {
                    setADData(response.data.data);
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

    const conformDelete = () => {
        Alert.alert(
            'Delete',
            'Are you sure',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('cancel'),
                    style: 'cancel',
                },
                { text: 'Continue', onPress: () => console.log('Continue') },
            ]
        );
    }

    const renderBlog = (items) => {

        console.log('MY_BUSINESS_DATA_ITEMS:', items);

        return (
            <View style={{ alignContent: 'center', backgroundColor: '#FFFFFF', paddingTop: 15, margin: 5, borderRadius: 5 }}>
                <View style={{ flexDirection: 'column', borderBottomColor: '#aaaaaa', borderBottomWidth: 0 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 140, height: 140, resizeMode: 'contain', }} source={{ uri: items.android_image }} />
                        <View>
                            <Text style={{ color: '#00ccff', fontWeight: 'bold', marginBottom: 5 }} >{items.business_name}</Text>
                            <Text style={{ color: '#000000', fontWeight: 'bold', marginBottom: 5 }}>{items.category_name}</Text>
                            <Text style={{ color: '#000000', fontWeight: 'bold', marginBottom: 5 }}>{items.rating} rating</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ flex: 1 }}>{items.contact_person_name} </Text>
                                <Image style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: '#00ccff', marginRight: 5 }} source={require('../../../assets/images/icons/eyes_icon.png')} />
                                <Text>{items.visited} Visited</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                                <Image style={{ width: 20, height: 20, tintColor: '#00CCFF', marginRight: 5 }} source={{ uri: 'https://www.iconpacks.net/icons/1/free-pin-icon-48-thumb.png' }} />
                                <Text style={{ width: 200 }}>{items.address}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <View style={{ flex: 1 / 3 }}></View>
                        <TouchableOpacity style={{ flex: 1 / 3, borderRightColor: '#aaaaaa', borderRightWidth: 1 }}>
                            <Image style={{ width: 20, height: 20, tintColor: '#00CCFF', alignSelf: 'center', resizeMode: 'contain' }} source={require('../../../assets/images/icons/edit.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => conformDelete()} style={{ flex: 1 / 3 }}>
                            <Image style={{ width: 20, height: 20, tintColor: '#00CCFF', alignSelf: 'center', resizeMode: 'contain' }} source={require('../../../assets/images/icons/delete.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', height: 55, alignItems: 'center', backgroundColor: '#00CCff' }}>
                <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.goBack()}>
                    <Image source={require('../../../assets/images/back_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>{"MY Business"}</Text>
                </View>
                <TouchableOpacity >
                    <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                    <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
            </View>
            <View style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }}>
                <Spinner
                    visible={isLodingDone}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />
                <View>
                    {isHaveData ?
                        <FlatList
                            data={AddressData}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => renderBlog(item)}
                        /> : (<View style={{ marginTop: Dimensions.get('screen').width }}>
                            <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>No Address Found</Text>
                        </View>)}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default MyBusinessScreens;