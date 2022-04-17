import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, FlatList, Dimensions, StyleSheet, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ALL_NOTIFICATION_API } from '../../../configApi';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

const DATAUSERS = [
    {
        id: 1,
        user_name: 'alex',
        messages: ' message you.',
        time: '3:15 pm',
        isOnline: true,
    }, {
        id: 2,
        user_name: 'alex',
        messages: 'Wants to follow you.',
        time: '3:16 pm',
        isOnline: false,
    }, {
        id: 3,
        user_name: '',
        messages: 'Your job has been posted.',
        time: '3:24 pm',
        isOnline: true,
    }
];

const NotifictionScreen = () => {

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
        console.log(ALL_NOTIFICATION_API);

        if (value) {
            axios({
                method: "GET",
                url: ALL_NOTIFICATION_API,
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

    const renderCategorys = (items) => {

        console.log(items);

        return (
            <TouchableOpacity onPress={() => navigation.navigate('SingleMessageScreen', items.name)} style={{ flexDirection: 'row', padding: 10, alignItems: 'center', borderColor: '#AAAAAA', borderBottomWidth: 1 }} >
                <View style={{ width: Dimensions.get('screen').width - 20, padding: 10, alignContent: 'flex-end' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <View>
                            <View style={{ flexDirection: 'row', }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.title, { color: '#000000', }]} ><Text style={{ fontWeight: 'bold', fontSize: 15 }}>{items.name}</Text> {items.message}</Text>
                                </View>
                                <View >
                                    <Text style={[styles.title, { color: items.isOnline ? '#000000' : '#000000' }]} >{items.time}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView>
            <Spinner
                visible={isLodingDone}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <View>
                <View style={{ flexDirection: 'row', height: 55, alignItems: 'center', backgroundColor: '#00CCff' }}>
                    <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.goBack()}>
                        <Image source={require('../../../assets/images/back_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', marginRight: 20 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>Notification</Text>
                    </View>
                    {/* <TouchableOpacity >
                        <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity> */}
                </View>
                <View style={{ padding: 10, backgroundColor: '#FFFFFF', height: '100%' }}>
                    <FlatList
                        data={Data}
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
        fontWeight: '600',
        textTransform: 'capitalize',
        marginBottom: 5,
        flex: 1
    }
});

export default NotifictionScreen;