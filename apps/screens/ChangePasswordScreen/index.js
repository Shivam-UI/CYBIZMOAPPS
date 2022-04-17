import React from 'react';
import { View, Text, SafeAreaView, Image, AsyncStorage, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UPDATE_PASSWORD_API } from '../../../configApi';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';


const PasswordScreen = () => {

    const navigation = useNavigation();
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const [oldPassword, setoldPassword] = React.useState('');
    const [NewPassword, setNewPassword] = React.useState('');
    const [RepeatPassword, setRepeatPassword] = React.useState('');


    async function ChangePasswordApi() {
        if (!oldPassword.trim()) {
            alert('Enter Valid Password');
            return;
        }
        if (!NewPassword.trim()) {
            alert('Enter New Password');
            return;
        }
        if (!RepeatPassword.trim()) {
            alert('Enter Repeat Password');
            return;
        }
        if (RepeatPassword !== NewPassword) {
            alert('Password Did Not Match!');
            return;
        }

        const value = await AsyncStorage.getItem('@MySuperStore:key');
        console.log(value);

        if (value) {

            var body = new FormData();
            body.append('old_password', oldPassword);
            body.append('new_password', NewPassword);

            console.log('response: ', JSON.stringify(body));

            axios({
                method: "POST",
                url: UPDATE_PASSWORD_API,
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
                            'Successful Changed Password',
                            response.data.message, // <- this part is optional, you can pass an empty string
                            [
                                { text: 'OK', onPress: () => navigation.goBack() },
                            ],
                            { cancelable: false },
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


    const GoToRegister = () => {
        navigation.navigate('HomeScreen');
    }

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
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>{"Change Password"}</Text>
                </View>
                <TouchableOpacity >
                    <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                    <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
            </View>
            <View style={{ padding: 20 }}>
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 0 }}>
                    <TextInput
                        style={{ height: 45, padding: 15 }}
                        placeholder={'Old Password'}
                        onChangeText={(ids) => setoldPassword(ids)} />
                </View>
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                    <TextInput
                        style={{ height: 45, padding: 15 }}
                        placeholder={'New Password'}
                        onChangeText={(ids) => setNewPassword(ids)} />
                </View>
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                    <TextInput
                        style={{ height: 45, padding: 15 }}
                        placeholder={'Conform Password'}
                        onChangeText={(ids) => setRepeatPassword(ids)} />
                </View>
                <TouchableOpacity onPress={() => ChangePasswordApi()} style={{ backgroundColor: '#0c1e40', padding: 17, marginTop: 18 }}>
                    <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center', letterSpacing: 3 }}>CHANGE PASSWORD</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default PasswordScreen;