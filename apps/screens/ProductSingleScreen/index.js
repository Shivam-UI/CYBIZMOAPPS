import React from 'react';
import { SafeAreaView, View, Text, Image, Dimensions, ScrollView, TouchableOpacity, AsyncStorage, FlatList, Share, TextInput, ToastAndroid, AlertIOS, StatusBar } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';
import MapView, { Marker } from 'react-native-maps';
import Modal from "react-native-modal";
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-loading-spinner-overlay';
import Carousel from 'react-native-banner-carousel';
import {
    HOME_PRODUCT_DETAILS_API,
    HOME_SUB_Product_View_Count,
    HOME_ADD_WISHLIST,
    USER_PROFILE_API,
} from '../../../configApi';
import axios from 'axios';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 280;

const ProductSingleScreen = () => {

    const routes = useRoute();
    const chatInput1 = React.createRef();
    const chatInput2 = React.createRef();
    const chatInput3 = React.createRef();
    const chatInput4 = React.createRef();
    const navigation = useNavigation();
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const [product_name, setProductName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [ProductUserID, setProductUserID] = React.useState('');
    const [UserProfileId, setUserProfileId] = React.useState('');
    const [ExpiredDate, setExpiredDate] = React.useState('');
    const [ProductID, setProductID] = React.useState('');
    const [Tags, setTags] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [create_date, setCreateDate] = React.useState('');
    const [keywords, setKeyword] = React.useState('');
    const [city, setCity] = React.useState('');
    const [Latitude, setLatitude] = React.useState('');
    const [Longitude, setLongitude] = React.useState('');
    const [ContactPersonName, setContactPersonName] = React.useState('');
    const [ContactPersonRating, setContactPersonRating] = React.useState('');
    const [VisitCount, setVisitCount] = React.useState('');
    const [WishingStatus, setWishingStatus] = React.useState('');
    const [ContactPersonImage, setContactPersonImage] = React.useState('');
    const [ContactPersonAddress, setContactPersonAddress] = React.useState('');
    const [product_image_list, setProductSlider] = React.useState([]);
    const [YouMayAlsoLike, setYouMayAlsoLike] = React.useState([]);
    const [isModalVisible, setModalVisible] = React.useState(false);
    // profile 
    const [Name, setName] = React.useState(false);
    const [email, setEmail] = React.useState(false);
    const [number, setNumber] = React.useState(false);
    const [image, setImage] = React.useState(false);
    navigation.setOptions({ title: routes.params.name })

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoadingDone(false);
            getHomeDetails();
            getCategoryData();
            AddProductViewCount();
            console.log('refresh_again', routes);
        });
        return unsubscribe;
    }, [navigation]);

    async function StartChat() {
        const value = await AsyncStorage.getItem('@MySuperStore:keyId');
        const ChatData = {
            SenderId: value,
            RecieverId: ProductUserID,
            UserName: ContactPersonName,
        }
        navigation.navigate('SingleMessageScreen', ChatData);
    }

    async function AddProductViewCount() {
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        if (value) {
            var body = new FormData();
            body.append('product_id', routes.params.tbl_products_id);
            console.log(body);
            axios({
                method: "POST",
                url: HOME_SUB_Product_View_Count,
                data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                    'Authorization': '' + value
                }
            }).then(function (response) {
                //handle success
                console.log('HOME_SUB_Product_View_Count: ', JSON.stringify(response.data.user_id));
                if (response.data.status === true) {
                    // console.log('response: ', JSON.stringify(response.data));
                    setLoadingDone(false);
                } else {
                    console.log('response: ', JSON.stringify(response.data));
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

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const renderBannerSingle = (items) => {

        return (
            <TouchableOpacity
                onPress={() => navigation.push('ProductSingle', items)}
                style={{
                    alignContent: 'center', padding: 5, shadowColor: "#aaaaaa",
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    shadowOffset: {
                        height: 1,
                        width: 1
                    },
                    backgroundColor: '#ffffff',
                    margin: 4,
                }} >
                <FastImage
                    style={{ width: 140, height: 140, resizeMode: 'cover', borderRadius: 0 }}
                    source={{
                        uri: items.android_image,
                        headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 80 }}>
                        <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 15, marginTop: 5, textTransform: 'capitalize' }}>{items.product_name.substring(0, 25)}</Text>
                    </View>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>${items.price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    async function getCategoryData() {
        setLoadingDone(true);
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        if (true) {
            var body = new FormData();
            body.append('latitude', '26.8467088');
            body.append('longitude', '80.9461592');
            body.append('product_id', routes.params.tbl_products_id);
            console.log(body);
            axios({
                method: "POST",
                url: HOME_PRODUCT_DETAILS_API,
                data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                }
            }).then(function (response) {
                //handle success
                console.log('response: ', JSON.stringify(response));
                if (response.data.status === true) {
                    console.log('response: ', JSON.stringify(response.data));
                    setProductName(response.data.product_name);
                    setProductID(response.data.product_ID);
                    setProductUserID(response.data.user_id);
                    setProductSlider(response.data.product_image_list)
                    setYouMayAlsoLike(response.data.you_may_also_like)
                    setTags(response.data.tags)
                    setExpiredDate(response.data.expired_date)
                    setDescription(response.data.description)
                    setContactPersonName(response.data.contact_person_name)
                    setContactPersonAddress(response.data.contact_person_address)
                    setContactPersonImage(response.data.contact_person_image)
                    setContactPersonRating(response.data.contact_person_rating)
                    setVisitCount(response.data.visiting_count)
                    setWishingStatus(response.data.whising_status)
                    setPrice(response.data.price)
                    setCreateDate(response.data.create_date)
                    setKeyword(response.data.keywords)
                    setCity(response.data.city)
                    setLatitude(response.data.latitude);
                    setLongitude(response.data.longitude);
                    setLoadingDone(false);
                } else {
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

    async function addToWishList() {
        setLoadingDone(true);
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        if (value) {
            var body = new FormData();
            body.append('product_or_service_id', routes.params.tbl_products_id);
            body.append('wishlist_type', 'Product');
            console.log(body);
            axios({
                method: "POST",
                url: HOME_ADD_WISHLIST,
                data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                    'Authorization': '' + value
                }
            }).then(function (response) {
                //handle success
                console.log('addToWishList: ', JSON.stringify(response.data));
                if (response.data.status === true) {
                    console.log('addToWishList: ', JSON.stringify(response.data));
                    if (Platform.OS === 'android') {
                        ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
                    } else {
                        AlertIOS.alert(response.data.message);
                    }
                    getCategoryData();
                    setLoadingDone(false);
                } else {
                    console.log('addToWishList: ', JSON.stringify(response.data));
                    if (Platform.OS === 'android') {
                        ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
                    } else {
                        AlertIOS.alert(response.data.message);
                    }
                    setLoadingDone(false);
                }
            })
                .catch(function (error) {
                    setLoadingDone(false);
                    // console.log('addToWishListError: ', error);
                }
                );
        }
    }

    const shareWithOthers = async () => {
        try {
            const result = await Share.share({
                title: 'Cybzimo',
                message: 'Please install Cybzimo app, AppLink :https://play.google.com/store/apps/details?id=&hl=en',
                url: 'https://play.google.com/store/apps/details?id==en'
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const renderPage = (image, index) => {

        return (
            <View key={index} style={{ height: BannerHeight }}>
                <FastImage
                    style={{ width: BannerWidth, height: BannerHeight, borderRadius: 0 }}
                    source={{
                        uri: image.android_image,
                        headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover} />
            </View>
        );
    }

    async function getHomeDetails() {

        // do something
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        console.log('user_id', value);
        if (value !== null) {
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
                    console.log('response_profile: ', JSON.stringify(response));
                    if (response.data.status === true) {
                        // set to session
                        setName(response.data.data[0].user_name);
                        setUserProfileId(response.data.data[0].tbl_users_id);
                        setEmail(response.data.data[0].email);
                        setImage(response.data.data[0].user_image);
                        setNumber(response.data.data[0].mobile);
                    } else {
                        Alert.alert(response.data.message);
                    }
                })
                .catch(function (error) {
                    //handle error
                    setLoadingDone(false);
                    console.log('error: ', error);
                });
        }
    }

    return (
        <SafeAreaView>
            <StatusBar barStyle={'dark-content'} backgroundColor={'#00CCFF'} />
            <ScrollView>
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
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>{"List Your Business"}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('SearchSingle')}>
                        <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                        <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ height: BannerHeight }}>
                    <Carousel
                        autoplay
                        autoplayTimeout={50000}
                        loop
                        index={0}
                        pageSize={BannerWidth} >
                        {product_image_list.map((image, index) => renderPage(image, index))}
                    </Carousel>
                    <View style={{ position: 'absolute', flexDirection: 'row', right: 0, top: 10 }}>
                        <TouchableOpacity onPress={() => addToWishList()} style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 45, marginRight: 10 }}>
                            <Image style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: WishingStatus === 'No' ? 'black' : 'red' }} source={require('../../../assets/images/icons/like.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => shareWithOthers()} style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 45, marginRight: 10 }}>
                            <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../../assets/images/icons/share.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: 'absolute', bottom: 0, right: 0, flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginRight: 10 }}>
                        <View style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 45, marginRight: 10 }}>
                            <Image style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: '#00CCFF' }} source={require('../../../assets/images/icons/eyes_icon.png')} />
                        </View>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>155 Live</Text>
                    </View>
                </View>
                <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ width: 33, height: 33, tintColor: '#00CCFF' }} source={require('../../../assets/images/pin_icon.png')} />
                        <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{city}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>{create_date}</Text>
                    </View>
                </View>
                <View style={{ paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', width: 280, color: 'grey' }}>PUI: {ProductID}</Text>
                </View>
                <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontWeight: 'bold', width: 280 }}>{product_name}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ width: 20, height: 20, tintColor: '#00CCFF', marginRight: 5 }} source={require('../../../assets/images/icons/eyes_icon.png')} />
                        <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{VisitCount} View</Text>
                    </View>
                </View>
                <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Intrested <Text style={{ color: '#aaaaaa' }}>{VisitCount} People</Text></Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Expire By {ExpiredDate}</Text>
                    </View>
                </View>
                <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontWeight: 'bold', color: '#00CCFF', fontSize: 26 }}>$ <Text style={{ color: '#00CCFF' }}>{price}</Text></Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ width: 25, height: 25, tintColor: '#000000', marginRight: 5 }} source={require('../../../assets/images/icons/flag_icon.png')} />
                    </View>
                </View>
                <View style={{ padding: 10, flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Text style={{ justifyContent: 'center', textAlign: 'justify', marginBottom: 5 }}>{description}</Text>
                </View>
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <View style={{ padding: 5, backgroundColor: '#AAAAAA', marginRight: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>keywords: {keywords}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                    <View style={{ padding: 5, backgroundColor: '#AAAAAA', marginRight: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>Tags: {Tags}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <MapView
                        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={{ height: 200, width: '100%', marginBottom: 10 }}
                        region={{
                            latitude: Number(Latitude),
                            longitude: Number(Longitude),
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                        mapType={'standard'} >
                        <Marker
                            coordinate={{ latitude: Number(Latitude), longitude: Number(Longitude) }}
                            title={'Store Location'}
                            description={ContactPersonAddress}
                        />
                    </MapView>
                </View>
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <TouchableOpacity disabled={ProductUserID === UserProfileId ? true : false} onPress={() => StartChat()} style={{ backgroundColor: ProductUserID === UserProfileId ? 'grey' : '#152238', flex: 1, padding: 20 }}>
                        <Text style={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center', letterSpacing: 4 }}>CHAT</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <TouchableOpacity onPress={toggleModal} style={{ backgroundColor: '#00CCFF', flex: 1, padding: 20 }}>
                        <Text style={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center', letterSpacing: 4 }}>CONTACT SELLER</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <Modal isVisible={isModalVisible}>
                        <View style={{ height: 400, zIndex: 999, backgroundColor: '#FFFFFF', borderRadius: 9, paddingTop: 32, paddingLeft: 15, paddingRight: 15 }}>
                            <View style={{ position: 'absolute', right: 3, top: 3 }}>
                                <TouchableOpacity onPress={toggleModal}>
                                    <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={require('../../../assets/images/close_icon.png')} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa' }}>
                                    <TextInput
                                        style={{ height: 40, padding: 5 }}
                                        ref={chatInput1}
                                        value={Name}
                                        placeholder={'Name'}
                                        maxLength={20}
                                        editable={false}
                                        onChangeText={(name) => setUserName(name)}
                                    />
                                </View>
                                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                    <TextInput
                                        style={{ height: 40, padding: 5 }}
                                        ref={chatInput2}
                                        value={number}
                                        placeholder={'Mobile'}
                                        maxLength={10}
                                        editable={false}
                                        onChangeText={(email) => setUserNumber(email)}
                                        keyboardType={'number-pad'}
                                    />
                                </View>
                                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                    <TextInput
                                        style={{ height: 40, padding: 5 }}
                                        ref={chatInput3}
                                        value={email}
                                        placeholder={'Email'}
                                        editable={false}
                                        onChangeText={(num) => setUserEmail(num)}
                                        maxLength={30}
                                        keyboardType={'email-address'}
                                    />
                                </View>
                                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                    <TextInput
                                        style={{ height: 110, padding: 5 }}
                                        ref={chatInput4}
                                        placeholder={'Message'}
                                        multiline={true}
                                        onChangeText={(num) => setUserEmail(num)}
                                        maxLength={30}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                    <TouchableOpacity onPress={toggleModal} style={{ backgroundColor: '#00CCFF', flex: 1, padding: 15 }}>
                                        <Text style={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center', letterSpacing: 4 }}>SUBMIT</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('GlobalProfile', name)} style={{ flexDirection: 'row', padding: 30, alignItems: 'center' }}>
                    <View>
                        <Image source={{ uri: ContactPersonImage }} style={{ width: 105, height: 105, marginRight: 15, borderRadius: 100 }} />
                    </View>
                    <View style={{}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{ContactPersonName}</Text>
                        <Image style={{ width: 100, height: 20, resizeMode: 'contain' }} source={require('../../../assets/images/icons/review.png')} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Image style={{ width: 20, height: 20, tintColor: '#00CCFF' }} source={{ uri: 'https://www.iconpacks.net/icons/1/free-pin-icon-48-thumb.png' }} />
                            <Text style={{ color: '#AAAAAA', marginTop: 5, fontWeight: 'bold' }}>{ContactPersonAddress}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'column', backgroundColor: '#ffffff', padding: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>You May Also Like</Text>
                        <View style={{ flex: 1 }}></View>
                        <Image style={{ width: 25, height: 25 }} source={require('../../../assets/images/icons/right_arrow.png')} />
                    </View>
                    <FlatList
                        horizontal
                        data={YouMayAlsoLike}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => renderBannerSingle(item)}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProductSingleScreen;
