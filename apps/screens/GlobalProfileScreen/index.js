import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput, Alert, AsyncStorage, StyleSheet, Picker, Platform, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { USER_PROFILE_API } from '../../../configApi';
import Spinner from 'react-native-loading-spinner-overlay';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Modal from "react-native-modal";
import axios from 'axios';

const GlobalProfileScreen = () => {

    const navigation = useNavigation();
    const routes = useRoute();
    // input field 
    const chatInput3 = React.createRef();
    const chatInput4 = React.createRef();
    // loader
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const [name, setName] = React.useState(false);
    const [email, setEmail] = React.useState(false);
    const [number, setNumber] = React.useState(false);
    const [image, setImage] = React.useState(false);
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [CategoryInnerProducts, setCategoryInnerProducts] = React.useState([{ id: 1 }, { id: 2 }, { id: 3 }]);
    const WATER_IMAGE = require('../../../assets/images/stars.png')
    let controller;

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoadingDone(true);
            console.log(routes);
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
                console.log('response: ', JSON.stringify(response));
                if (response.data.status === true) {
                    // Alert.alert(response.data.message);
                    setName(response.data.data[0].user_name);
                    setEmail(response.data.data[0].email);
                    setImage(response.data.data[0].user_image);
                    setNumber(response.data.data[0].mobile);
                    setLoadingDone(false);
                } else {
                    Alert.alert(response.data.message);
                    setLoadingDone(false);
                }
            })
            .catch(function (error) {
                //handle error
                setLoadingDone(false);
                // console.log('error: ', error); .substring(0, 25)
            });
    }

    const renderBannerSingle = () => {

        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProductSingle', items)} style={{ alignContent: 'center', padding: 5, flexDirection: 'row', backgroundColor: '#FFFFFF', padding: 10, marginBottom: 8, borderBottomColor: '#aaaaaa', borderBottomWidth: 1 }}>
                <View>
                    <Image style={{ width: 140, height: 140, resizeMode: 'cover', borderRadius: 0 }} source={{ uri: 'https://codersinn.club/uploads/user_image/1633160565243.jpeg' }} />
                    <View style={{ position: 'absolute', padding: 5, backgroundColor: 'black' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Featured</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'column', marginTop: 0, flex: 1, padding: 10, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 20, height: 20, resizeMode: 'cover', borderRadius: 0, tintColor: '#00CCff' }} source={require('../../../assets/images/pin_icon.png')} />
                        <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#aaa' }}>{'items.address'}</Text>
                    </View>
                    <View style={{}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: 5 }}>{'items.product_name'}</Text>
                    </View>
                    <View style={{}}>
                        <Text numberOfLines={4} style={{ fontWeight: 'bold', fontSize: 15, color: '#aaa', marginTop: 5 }}>{'items.description'}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'column', paddingTop: 20 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={{ width: 30, height: 30, resizeMode: 'contain', borderRadius: 0, tintColor: '#00CCff' }} source={require('../../../assets/images/icons/like.png')} />
                    </View>
                    <View style={{ marginTop: 15, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>${'66666'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                        <Image style={{ width: 20, height: 20, resizeMode: 'contain', borderRadius: 0, tintColor: '#00CCff', marginRight: 5 }} source={require('../../../assets/images/icons/eyes_icon.png')} />
                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#aaa' }}>20 Visited</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const renderReviewSingle = () => {

        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProductSingle', items)} style={{ alignContent: 'center', padding: 5, flexDirection: 'row', backgroundColor: '#FFFFFF', padding: 10, marginBottom: 0, borderBottomColor: '#aaaaaa', borderBottomWidth: 1 }}>
                <View>
                    <Image style={{ width: 90, height: 90, resizeMode: 'cover', borderRadius: 70 }} source={{ uri: 'https://codersinn.club/uploads/user_image/1633160565243.jpeg' }} />
                </View>
                <View style={{ flexDirection: 'column', marginTop: 0, flex: 1, padding: 10, alignItems: 'flex-start' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: 5, flex: 1 }}>{'Jane'}</Text>
                        <View>
                            <Rating
                                type='custom'
                                ratingImage={WATER_IMAGE}
                                ratingColor='#ffffff'
                                ratingBackgroundColor='#FFFFFF'
                                ratingCount={5}
                                imageSize={10}
                                onFinishRating={this.ratingCompleted}
                                style={{ paddingVertical: 5 }}
                            />
                        </View>
                    </View>
                    <View style={{}}>
                        <Text numberOfLines={2} style={{ fontWeight: 'bold', fontSize: 14, color: '#aaa', marginTop: 5 }}>{'Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.'}</Text>
                    </View>
                </View>
                <View style={{ padding: 10, }}>

                </View>
            </TouchableOpacity>
        )
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
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
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>{routes.params}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('SearchSingle')}>
                    <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                    <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
            </View>
            <ScrollView style={{}}>
                <View>
                    <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 0, paddingTop: 15, alignItems: 'center' }}>
                        <View>
                            <Image source={{ uri: image }} style={{ width: 120, height: 120, marginRight: 15, borderRadius: 100 }} />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                <Text style={{ fontWeight: '600', fontSize: 14, flex: 1 }}>{name}</Text>
                                <Rating
                                    type='custom'
                                    ratingImage={WATER_IMAGE}
                                    ratingColor='#00CCFF'
                                    ratingBackgroundColor='#FFFFFF'
                                    ratingCount={5}
                                    imageSize={8}
                                    onFinishRating={this.ratingCompleted}
                                    style={{ paddingVertical: 5 }}
                                />
                                <Text style={{ marginLeft: 5, color: '#aaaaaa' }}>(3.5)</Text>
                            </View>
                            {/* <Text style={{ marginTop: 5 }}>{email}</Text> */}
                            <Text style={{ marginTop: 2 }}>+91 {number}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                <Image style={{ width: 20, height: 20, resizeMode: 'center', marginRight: 4, tintColor: '#00CCFF' }} source={require('../../../assets/images/pin_icon.png')} />
                                <Text style={{ marginTop: 5 }}>Los Angeles, Califoria </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginTop: 5, flex: 1 }}>5 Following</Text>
                                <Text style={{ marginTop: 5 }}>2 Followers</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={{ backgroundColor: '#00ccff', margin: 10, padding: 17, borderRadius: 3 }}>
                            <Text style={{ textAlign: 'center', color: '#FFFFFF', fontWeight: 'bold', letterSpacing: 5, textTransform: 'uppercase' }}>Follow</Text>
                        </View>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Product By {name}</Text>
                    </View>
                    <View style={{ backgroundColor: '#f4f4f4', padding: 5 }}>
                        <FlatList
                            data={CategoryInnerProducts}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => renderBannerSingle(item)}
                        />
                        <View style={{ padding: 15, alignSelf: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: '#00ccff' }}>
                                View All Products
                            </Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#ffffff', paddingTop: 25, paddingLeft: 10, paddingRight: 10 }}>
                        <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                            <Text style={{ flex: 1, fontWeight: 'bold' }}>Reviews</Text>
                            <TouchableOpacity onPress={toggleModal}>
                                <Text style={{ fontWeight: 'bold', color: '#00ccff' }}>Post Review</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={CategoryInnerProducts}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => renderReviewSingle(item)}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Modal isVisible={isModalVisible}>
                            <View style={{ height: 320, zIndex: 999, backgroundColor: '#FFFFFF', borderRadius: 9, paddingTop: 32, paddingLeft: 15, paddingRight: 15 }}>
                                <View style={{ position: 'absolute', right: 3, top: 3 }}>
                                    <TouchableOpacity onPress={toggleModal}>
                                        <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={require('../../../assets/images/close_icon.png')} />
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <View style={{ marginTop: 0 }}>
                                        <Text style={{fontWeight:'bold',marginBottom:10}}>Post a review</Text>
                                        <Rating
                                            type='custom'
                                            ratingImage={WATER_IMAGE}
                                            ratingColor='#ffffff'
                                            ratingBackgroundColor='#FFFFFF'
                                            ratingCount={5}
                                            imageSize={28}
                                            onFinishRating={this.ratingCompleted}
                                            style={{ paddingVertical: 5, alignItems: 'flex-start' }}
                                        />
                                    </View>
                                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                        <TextInput
                                            style={{ height: 110, padding: 5 }}
                                            ref={chatInput4}
                                            placeholder={'Review Here'}
                                            multiline={true}
                                            onChangeText={(num) => setUserEmail(num)}
                                            maxLength={30}
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                        <TouchableOpacity onPress={toggleModal} style={{ backgroundColor: '#00CCFF', flex: 1, padding: 15 }}>
                                            <Text style={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center', letterSpacing: 4 }}>POST</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    headingText: {
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#AAA',
        marginTop: 15,
        fontSize: 16
    }, boxWithShadow: {
        flex: 1 / 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,
        padding: 10,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        margin: 5,
        borderRadius: 10,
    }, title: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
        marginBottom: 5,
        flex: 1
    }, viewStyle: {
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        width: "92%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    itemStyle: {
        fontSize: 10,
        color: "#007aff"
    },
    pickerStyle: {
        width: "100%",
        height: 40,
        color: "#007aff",
        fontSize: 14,
    },
    textStyle: {
        fontSize: 14,
    }, iosPicker: {
        backgroundColor: 'rgba(178,181,189,0.1)',
        borderColor: 'rgb(178,181,189)',
        borderTopWidth: 1,
        padding: 0,
    },
    androidBoxStyle: {
        flex: 1,
        flexDirection: 'column',
    },
    androidPicker: {
        flex: 1,
        alignItems: 'center'
    },
    androidPickerWrapper: {
        borderBottomWidth: 1,
        borderColor: 'rgb(178,181,189)'
    },
    toggleBox: {
        borderColor: 'rgb(178,181,189)',
        borderBottomWidth: 1,
    }
});

export default GlobalProfileScreen;