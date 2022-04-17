import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet, TextInput, FlatList, Dimensions, AsyncStorage } from 'react-native';
import { useRoute } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AutoScrollFlatList } from "react-native-autoscroll-flatlist";
import { SEND_CHAT_MESSAGE_API, LOAD_PREVIOUS_CHATS_API } from '../../../configApi';
import axios from 'axios';

// dablo@gmail.com / 123456

const SingleMessageScreen = () => {

    let flatListRef;

    const routes = useRoute();
    const navigation = useNavigation();
    const chatInput = React.createRef();
    const flatlistRef = React.createRef();
    const [sendingMessage, setSendingMessage] = React.useState('');
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const [MessageData, setMessageData] = React.useState([]);
    console.log('refresh again', routes);
    navigation.setOptions({ title: routes.params.UserName })

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            RerenderChats();
            console.log('refresh again', routes);
        });
        return unsubscribe;
    }, [navigation]);

    async function RerenderChats() {
        setTimeout(() => {
            RenderPreviousChats();
        }, 500);
    }

    async function RenderPreviousChats() {
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        if (value) {
            var body = new FormData();
            body.append('sender_id', routes.params.SenderId);
            body.append('receiver_id', routes.params.RecieverId);
            console.log(body);
            axios({
                method: "POST",
                url: LOAD_PREVIOUS_CHATS_API,
                data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                }
            }).then(function (response) {
                //handle success
                console.log('response: ', JSON.stringify(response.data));
                if (response.data.status === true) {
                    setMessageData(response.data.data);
                    RerenderChats();                    
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

    async function SendChatMessage() {

        if (sendingMessage.length < 1) {
            alert('Enter Message');
            return false
        }

        const value = await AsyncStorage.getItem('@MySuperStore:key');
        if (value) {
            var body = new FormData();
            body.append('sender_id', routes.params.SenderId);
            body.append('receiver_id', routes.params.RecieverId);
            body.append('message', sendingMessage);
            console.log(body);
            axios({
                method: "POST",
                url: SEND_CHAT_MESSAGE_API,
                data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                }
            }).then(function (response) {
                //handle success
                console.log('response: ', JSON.stringify(response.data));
                if (response.data.status === true) {
                    setMessageData(response.data.data);
                    setSendingMessage('');
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

    const renderConversession = (items) => {
        console.log(items);
        return (
            <TouchableOpacity onPress={() => navigation.navigate('SingleMessageScreen', items.name)} style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }} >
                <View style={{ width: Dimensions.get('screen').width - 160, backgroundColor: items.msg_from === 'Me' ? '#00CCFF' : '#f3f3f3', padding: 15, alignSelf: items.msg_from === 'Me' ? 'flex-start' : 'flex-end', borderRadius: 5 }}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <Text style={[styles.title, { color: '#FFFFFF', color: items.msg_from === 'Me' ? '#FFFFFF' : '#AAAAAA' }]} >{items.message}</Text>
                        </View>
                        <View >
                            <Text style={[styles.title, { color: items.msg_from === 'Me' ? '#000000' : '#AAAAAA' }]} >{items.created_time}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const GoToLastChat = () => {
        flatListRef.scrollToEnd({ animated: false });
    }

    return (
        <SafeAreaView>
            <View>
                <Spinner
                    visible={isLodingDone}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />
                <View style={{ flexDirection: 'row', height: 55, alignItems: 'center', backgroundColor: '#00CCff' }}>
                    <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.goBack()}>
                        <Image source={require('../../../assets/images/back_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: 20, height: 20, backgroundColor: '#FFFFFF', borderRadius: 60, marginRight: 10 }}>
                            <View style={{ width: 15, height: 15, borderRadius: 60, backgroundColor: 'green', marginTop: 2.5, marginLeft: 2.5 }}></View>
                        </View>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>{routes.params.UserName}</Text>
                    </View>
                    <TouchableOpacity >
                        <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 15, backgroundColor: '#FFFFFF', height: '95%', }}>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            ref={(ref) => { flatListRef = ref }}
                            contentContainerStyle={{ flexDirection: 'column-reverse' }}
                            style={{ marginBottom: 105 }}
                            data={MessageData}
                            keyExtractor={item => item.id}
                            inverted={false}
                            renderItem={({ item }) => renderConversession(item)}
                        />
                        <View style={{ position: 'absolute', right: 5, top: 5 }}>
                            <TouchableOpacity onPress={() => GoToLastChat()} style={{ padding: 10, backgroundColor: '#00ccff' }}>
                                <Text style={{ color: 'white',fontWeight:'bold' }}>Go Down</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 10, backgroundColor: '#f3f3f3', alignSelf: 'center', position: 'absolute', bottom: 50 }}>
                        <TextInput
                            value={sendingMessage}
                            placeholder={'Type Here'}
                            style={{ height: 35, flex: 1, marginLeft: 10 }}
                            ref={chatInput}
                            onChangeText={(message) => setSendingMessage(message)}
                            keyboardType={'default'}
                            onSubmitEditing={() => SendChatMessage()}
                            blurOnSubmit={false}
                        />
                        <TouchableOpacity onPress={() => SendChatMessage()}>
                            <Image style={{ height: 30, width: 30, tintColor: '#00CCFF', marginTop: 5 }} source={require('../../../assets/images/share_icon.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
    }
});

export default SingleMessageScreen;