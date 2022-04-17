import React from 'react';
import { SafeAreaView, View, Text, Image, Alert, ScrollView, TouchableOpacity, AsyncStorage, FlatList, Share, TextInput, ToastAndroid, AlertIOS } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';
import Modal from "react-native-modal";
import { MY_REVIEW_API, MY_REPLY_TO_REVIEW_API } from '../../../configApi';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

const MyReviewScreen = () => {

    const navigation = useNavigation();
    const chatInput1 = React.createRef();
    const chatInput2 = React.createRef();
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [replyComments, setReplyComments] = React.useState('');
    const [SendId, setSendId] = React.useState('');
    const [Data, setData] = React.useState([]);

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

        if (value) {
            axios({
                method: "GET",
                url: MY_REVIEW_API,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                    'Authorization': value
                }
            })
                .then(function (response) {
                    //handle success
                    if (response.data.status === true) {
                        // console.log('DASHBOARD_COUNT_API: ', JSON.stringify(response.data.data));
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

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const openReply = (have_id) => {
        console.log(have_id);
        setSendId(have_id);
        toggleModal();
    };

    async function UploadReview() {

        if (replyComments === '') {
            alert('Enter your Comments!')
        } else {
            setLoadingDone(true);
            console.log(replyComments, SendId);
            const value = await AsyncStorage.getItem('@MySuperStore:key');
            if (true) {
                var body = new FormData();
                body.append('review_id', SendId);
                body.append('message', replyComments);
                axios({
                    method: "POST",
                    url: MY_REPLY_TO_REVIEW_API,
                    data: body,
                    headers: {
                        'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                        'Authorization': value
                    }
                })
                    .then(function (response) {
                        //handle success
                        console.log('response: ', JSON.stringify(response.data));
                        if (response.data.status === true) {
                            Alert.alert(response.data.message);
                            getDashboardDetails();
                            setReplyComments('');
                            setSendId('');
                            setLoadingDone(false);
                            toggleModal();
                            // console.log('response: ', JSON.stringify(response.data.data));
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
    };

    const renderBlog = (items) => {

        console.log(JSON.stringify(items));

        return (
            <TouchableOpacity
                style={{
                    margin: 2,
                    backgroundColor: '#ffffff',
                    marginBottom: 5, shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 1,
                    padding: 10,
                }} >
                <View style={{ flexDirection: 'row', borderBottomColor: '#aaaaaa', borderBottomWidth: 0 }}>
                    <View style={{ alignSelf: 'center', width: '20%' }}>
                        <Image style={{ width: 60, height: 60, resizeMode: 'cover', borderRadius: 60 }} source={{ uri: items.user_image }} />
                        <Text numberOfLines={1} style={{ marginLeft: 5 }}>{items.user_name}</Text>
                    </View>
                    <View style={{ padding: 10, width: '60%', flexDirection: 'column' }}>
                        <Text numberOfLines={1}>From : {items.review}</Text>
                        <FlatList
                            data={items.reply_review_list}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <Text><Text numberOfLines={2} style={{ fontWeight: 'bold' }}>Reply: </Text> {item.message}</Text>}
                        />
                    </View>
                    <View style={{ width: '20%', }}>
                        <TouchableOpacity onPress={() => openReply(items.tbl_user_review_and_rating_id)} style={{ backgroundColor: '#aaa', padding: 10, marginTop: 20 }}>
                            <Text numberOfLines={1} style={{ textAlign: 'center' }}>Reply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>{"My Review"}</Text>
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
                    <FlatList
                        style={{}}
                        data={Data}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => renderBlog(item)}
                    />
                </View>
            </ScrollView>
            <View style={{ flex: 1 }}>
                <Modal isVisible={isModalVisible}>
                    <View style={{ height: 300, zIndex: 999, backgroundColor: '#FFFFFF', borderRadius: 9, paddingTop: 32, paddingLeft: 15, paddingRight: 15 }}>
                        <View style={{ position: 'absolute', right: 3, top: 3 }}>
                            <TouchableOpacity onPress={toggleModal}>
                                <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={require('../../../assets/images/close_icon.png')} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Reply {SendId}</Text>
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 140, padding: 5 }}
                                    value={replyComments}
                                    placeholder={'Enter Your Comments'}
                                    multiline={true}
                                    onChangeText={(email) => setReplyComments(email)}
                                />
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => UploadReview()} style={{ backgroundColor: '#00ccff', padding: 15, marginTop: 10, borderRadius: 5 }}>
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', fontSize: 18 }}>Send</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

export default MyReviewScreen;