import React from 'react';
import { SafeAreaView, View, Text, Image, Dimensions, ScrollView, TouchableOpacity, AsyncStorage, Alert, Share, TextInput, ToastAndroid, AlertIOS } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';
import { MY_CONTACT_TO_ADMIN_API } from '../../../configApi';
import Spinner from 'react-native-loading-spinner-overlay';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';

const ContactToAdministratorScreen = () => {

    const navigation = useNavigation();
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const [Data, setData] = React.useState([{ id: 1 }, { id: 2 }]);
    const [Ponits, setPonits] = React.useState('');
    const [SelectIds, setSelectIds] = React.useState('');
    const [EnterSubjects, setEnterSubjects] = React.useState('');
    const [Ids, setIds] = React.useState('');
    const [EnterMessage, setEnterMessage] = React.useState('');
    const [DropDown, setDropDown] = React.useState(['', 'Product', 'Service', 'Job', 'Review', 'Token', 'Other']);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // setLoadingDone(true);
            // const events = DropDown[Ponits];
            // if (events === 'undefined') {
            //     setIds('');
            // } else {
            //     setIds(DropDown[Ponits]);
            // }
            // getDashboardDetails();
        });
        return unsubscribe;
    }, [navigation]);

    async function ContactToAdministrator() {

        if (Ponits === '') {
            alert('Please Select Regarding To First');
            return;
        }

        if (SelectIds === '') {
            alert('Please Select Regarding Ids!');
            return;
        }

        if (EnterSubjects === '') {
            alert('Please Enter Subject');
            return;
        }

        if (!EnterMessage.trim()) {
            alert('Please Enter Message');
            return;
        }


        // do something
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        console.log(value);

        if (value) {

            var body = new FormData();
            body.append('regarding_to', DropDown[Ponits]);
            body.append('regarding_ids', SelectIds);
            body.append('subject', EnterSubjects);
            body.append('message', EnterMessage);

            console.log('response: ', JSON.stringify(body));

            axios({
                method: "POST",
                url: MY_CONTACT_TO_ADMIN_API,
                data: body,
                headers: {
                    Accept: 'application/json',
                    // 'Content-Type': 'multipart/form-data',
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                    'Authorization': value
                }
            })
                .then(function (response) {
                    //handle success
                    console.log('response: ', JSON.stringify(response.data));
                    if (response.data.status === true) {
                        Alert.alert(
                            'Successful Submit',
                            response.data.message, // <- this part is optional, you can pass an empty string
                            [
                              {text: 'OK', onPress: () => navigation.goBack()},
                            ],
                            {cancelable: false},
                          );
                        setLoadingDone(false);
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


    async function getDashboardDetails() {

        // do something
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        console.log(value);

        if (value) {
            axios({
                method: "GET",
                url: MY_CONTACT_TO_ADMIN_API,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                    'Authorization': value
                }
            })
                .then(function (response) {
                    //handle success
                    if (response.data.status === true) {
                        console.log('DASHBOARD_COUNT_API: ', JSON.stringify(response.data));
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
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>{"Contact To Administrator"}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('SearchSingle')}>
                    <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                    <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={{ padding: 20, }}>
                    <View style={{ height: 45, backgroundColor: '#ffffff', padding: 15, marginBottom: 10 }}>
                        <ModalDropdown
                            options={DropDown}
                            isFullWidth={true}
                            onSelect={(data) => setPonits(data)} />
                    </View>
                    <View>
                        <TextInput
                            style={{ height: 45, backgroundColor: '#ffffff', padding: 15, marginBottom: 10 }}
                            placeholder={'Enter ' + DropDown[Ponits] + ' Ids'}
                            onChangeText={(ids) => setSelectIds(ids)}
                        />
                    </View>
                    <View>
                        <TextInput
                            style={{ height: 45, backgroundColor: '#ffffff', padding: 15, marginBottom: 10 }}
                            placeholder={'Enter Subject'}
                            onChangeText={(Subjects) => setEnterSubjects(Subjects)}
                        />
                    </View>
                    <View>
                        <TextInput
                            style={{ height: 145, backgroundColor: '#ffffff', padding: 15, marginBottom: 15 }}
                            placeholder={'Enter Message'}
                            onChangeText={(pass) => setEnterMessage(pass)}
                            multiline={true}
                            numberOfLines={10}
                        />
                    </View>
                    <TouchableOpacity onPress={() => ContactToAdministrator()} style={{ padding: 20, backgroundColor: '#00ccff' }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
                            Send
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ContactToAdministratorScreen;