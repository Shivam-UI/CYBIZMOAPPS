import React from 'react';
import { View, Text, SafeAreaView, Image, Dimensions, TouchableOpacity, TextInput, Alert, AsyncStorage } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { REGISTER_FINAL_API } from '../../../configApi';
import axios from 'axios';


const VerificationPasswordScreen = () => {

    const routes = useRoute();
    const navigation = useNavigation();
    const [isLodingDone, setLoadingDone] = React.useState(false);
    // OTP
    const [OtpOne, setOtpOne] = React.useState('');
    const [OtpTwo, setOtpTwo] = React.useState('');
    const [OtpThree, setOtpThree] = React.useState('');
    const [OtpFour, setOtpFour] = React.useState('');

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log(routes);
        });
        return unsubscribe;
    }, [navigation]);

    const GoToRegister = () => {
        // navigation.navigate('ChangePassword');
        if (OtpOne === '') {
            alert('Enter valid OTP');
            return false
        }

        if (OtpTwo === '') {
            alert('Enter valid OTP');
            return false
        }

        if (OtpThree === '') {
            alert('Enter valid OTP');
            return false
        }

        if (OtpFour === '') {
            alert('Enter valid OTP');
            return false
        }

        const OTP_FINAL = `${OtpOne}${OtpTwo}${OtpThree}${OtpFour}`;

        console.log(OTP_FINAL, routes.params.otp);

        if (routes.params.otp === OTP_FINAL) {
            _registerUser();
        } else {
            alert('Otp not valid!');
        }

    }

    async function _registerUser() {

        setLoadingDone(true);
        var body = new FormData();
        body.append('username', routes.params.username);
        body.append('email', routes.params.email);
        body.append('mobile', routes.params.mobile);
        body.append('password', routes.params.password);
        body.append('firebase_token', ''); //

        axios({
            method: "POST",
            url: REGISTER_FINAL_API,
            data: body,
            headers: {
                'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2'
            }
        })
            .then(function (response) {
                // handle success tmanna,rashi,sapna,kittu,kvya,vanshu,madhuri,yogesh, 
                console.log('response: ', JSON.stringify(response.data));
                if (response.data.status === true) {
                    AsyncStorage.setItem('@MySuperStore:key', `${response.data.token}`);
                    AsyncStorage.setItem('@MySuperStore:keyId', `${response.data.token}`);
                    GoToHome();
                } else {
                    setLoadingDone(false);
                    Alert.alert(response.data.message);
                }
            })
    };

    const GoToHome = () => {
        setLoadingDone(false);
        navigation.navigate('HomeScreen');
    }


    return (
        <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
            <View style={{ padding: 20 }}>
                <Image style={{ width: 210, height: 120, resizeMode: 'contain', marginTop: Dimensions.get('screen').width / 3.5, alignSelf: 'center', marginBottom: 40 }} source={require('../../../assets/images/logo.jpg')} />
                <View style={{ padding: 20 }}>
                    <Text style={{ textAlign: 'center' }}>Enter your verification code.</Text>
                </View>
                <View style={{ marginTop: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', width: 45, marginRight: 10 }}>
                        <TextInput
                            style={{ height: 45, padding: 15, alignSelf: 'center' }}
                            placeholder={'*'}
                            maxLength={1}
                            onChangeText={(one) => setOtpOne(one)}
                        />
                    </View>
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', width: 45, marginRight: 10 }}>
                        <TextInput
                            style={{ height: 45, padding: 15, alignSelf: 'center' }}
                            placeholder={'*'}
                            maxLength={1}
                            onChangeText={(two) => setOtpTwo(two)}
                        />
                    </View>
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', width: 45, marginRight: 10 }}>
                        <TextInput
                            style={{ height: 45, padding: 15, alignSelf: 'center' }}
                            placeholder={'*'}
                            maxLength={1}
                            onChangeText={(three) => setOtpThree(three)}
                        />
                    </View>
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', width: 45, marginRight: 10 }}>
                        <TextInput
                            style={{ height: 45, padding: 15, alignSelf: 'center' }}
                            placeholder={'*'}
                            maxLength={1}
                            onChangeText={(four) => setOtpFour(four)}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={() => GoToRegister()} style={{ backgroundColor: '#0c1e40', padding: 17, marginTop: 18 }}>
                    <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center', letterSpacing: 3 }}>VERIFY</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default VerificationPasswordScreen;