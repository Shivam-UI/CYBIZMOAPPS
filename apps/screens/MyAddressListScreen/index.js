import React from 'react';
import { TouchableOpacity, View, Image, Text, SafeAreaView, Dimensions, FlatList, Alert, AsyncStorage, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { LIST_ADDRESS_API } from '../../../configApi';
import Toast from 'react-native-simple-toast';
import axios from 'axios';

const MyAddressListScreen = () => {

    const BlogListData = [{ "android_image": "https://codersinn.club/uploads/blog_category_image/1626336453223.jpeg", "category_name": "Covid 19", "tbl_blog_category_id": "4" }, { "android_image": "https://codersinn.club/uploads/blog_category_image/1626336453223.jpeg", "category_name": "Covid 19", "tbl_blog_category_id": "4" }, { "android_image": "https://codersinn.club/uploads/blog_category_image/1626336453223.jpeg", "category_name": "Covid 19", "tbl_blog_category_id": "4" }, { "android_image": "https://codersinn.club/uploads/blog_category_image/1626336453223.jpeg", "category_name": "Covid 19", "tbl_blog_category_id": "4" }];
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
            url: LIST_ADDRESS_API,
            headers: {
                'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                'Authorization': value
            }
        })
            .then(function (response) {
                //handle success
                console.log('response: ', JSON.stringify(response.data));
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

    async function conformDelete() {
        Alert.alert(
            'Delete Address',
            'You want to delete this address?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                { text: 'OK', onPress: () => console.log('Ok Pressed!') },

            ],
            { cancelable: false }
        )
    }

    async function EditAddress() {
        // Alert.alert('You want to Edit this address?');
        Toast.showWithGravity('Comming Soon', Toast.LONG, Toast.BOTTOM);
    }


    const renderBlog = (items) => {

        console.log(items);

        return (
            <View style={{ alignContent: 'center', backgroundColor: '#FFFFFF', padding: 10, margin: 5, borderRadius: 5 }}>
                <View style={{ flexDirection: 'column', borderBottomColor: '#aaaaaa', borderBottomWidth: 0 }}>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>{items.city} - {items.state}</Text>
                        <Text style={{ fontSize: 14, color: '#aaaaaa', marginBottom: 5 }}>{items.street} , {items.zipcode}</Text>
                        <Text style={{ fontSize: 14, color: '#aaaaaa', marginBottom: 5 }}>M - {items.mobile_number}</Text>
                        <Text style={{ fontSize: 14, color: '#aaaaaa', marginBottom: 10 }}>E - {items.email}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <TouchableOpacity onPress={() => EditAddress()} style={{ flex: 1 / 2, borderRightColor: '#aaaaaa', borderRightWidth: 1 }}>
                            <Image style={{ width: 20, height: 20, tintColor: '#00CCFF', alignSelf: 'center', resizeMode: 'contain' }} source={require('../../../assets/images/icons/edit.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => conformDelete()} style={{ flex: 1 / 2 }}>
                            <Image style={{ width: 20, height: 20, tintColor: '#00CCFF', alignSelf: 'center', resizeMode: 'contain' }} source={require('../../../assets/images/icons/delete.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView>
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
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>{"ALL ADDRESS"}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('SearchSingle')} >
                    <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                    <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
            </View>
            <View style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }}>
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
                <TouchableOpacity
                    onPress={() => navigation.navigate('NewAddressScreen')}
                    style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 60,
                        position: 'absolute',
                        bottom: 120,
                        right: 20,
                        height: 60,
                        backgroundColor: '#00CCFF',
                        borderRadius: 100,
                    }} >
                    <Image style={{ width: 25, height: 25, tintColor: '#FFFFFF' }} source={require('../../../assets/images/icons/edit.png')} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default MyAddressListScreen;