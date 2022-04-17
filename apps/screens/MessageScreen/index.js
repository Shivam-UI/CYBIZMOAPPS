import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, FlatList, Dimensions, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { LOAD_All_CHATS_USERS_API } from '../../../configApi';
import axios from 'axios';

const MessageListOfUser = () => {

    const navigation = useNavigation();
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const [MessageData, setData] = React.useState([]);

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
        const keyId = await AsyncStorage.getItem('@MySuperStore:keyId');
        console.log(keyId);

        var body = new FormData();
        body.append('sender_id', keyId);

        if (value) {
            axios({
                method: "POST",
                url: LOAD_All_CHATS_USERS_API,
                data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                    'Authorization': value
                }
            })
                .then(function (response) {
                    //handle success
                    console.log('DASHBOARD_COUNT_API: ', JSON.stringify(response.data));
                    if (response.data.status === true) {
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

    function GoToSingleChatReply(data) {
        console.log('GoToSingleChatReply', JSON.stringify(data));
        navigation.navigate('AdminMessageReply', data);
    }

    const renderCategorys = (items) => {

        console.log('renderCategorys', items);

        return (
            <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: '#AAA', padding: 10, alignItems: 'center' }} >
                <View style={{ backgroundColor: '#ffffff', flex: 1, padding: 15 }}>
                    <Text style={styles.title} >Reagarding To:  {items.regarding_to}</Text>
                    <Text style={styles.title} >Regarding Details:  {items.regarding_details}</Text>
                    <Text style={styles.title} >Regarding To: {items.regarding_to}</Text>
                    <Text numberOfLines={2} style={[styles.title, { width: '80%' }]} >Message: {items.message}</Text>
                    <Text style={{ color: '#AAAAAA', }}>Date:  {items.created_date} {items.created_time}</Text>
                </View>
                <View style={{ marginRight: 10 }}>
                    <TouchableOpacity onPress={() => GoToSingleChatReply(items)} disabled={items.replied_status === 'Yes' ? false : true} style={{ backgroundColor: items.replied_status === 'Yes' ? 'green' : 'yellow', padding: 10, borderRadius: 5 }}>
                        {items.replied_status === 'Yes' ? <Text style={{ fontWeight: 'bold', color: '#FFFFFF' }} >View Reply</Text> : <Text style={{ color: '#000000', fontWeight: 'bold' }} >Pending</Text>}
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
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
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>Message</Text>
                    </View>
                    <TouchableOpacity >
                        <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                        <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 10, backgroundColor: '#FFFFFF', marginBottom: 150 }}>
                    <FlatList
                        data={MessageData}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => renderCategorys(item)}
                    />
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
        textTransform: 'capitalize',
        marginBottom: 5,
        flex: 1
    }
});

export default MessageListOfUser;