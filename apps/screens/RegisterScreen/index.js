import React from 'react';
import { View, Text, SafeAreaView, Image, Dimensions, TouchableOpacity, Alert, AsyncStorage, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {

    const navigation = useNavigation();
    // refrence
    const chatInput1 = React.createRef();
    const chatInput2 = React.createRef();
    // login fields
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const [user_email, setUserEmail] = React.useState('');
    const [user_password, setUserPassword] = React.useState('');
    const [TYPE_LOGIN, setTYPE_LOGIN] = React.useState('');
    const url = 'https://codersinn.club/api/login';


    function MultipleLogin(params) {
        if (params === 'apple') {
            console.log(params);
            setTYPE_LOGIN('SOCIAL');
            // onAppleButtonPress();
        } else if (params === 'google') {
            console.log(params);
            setTYPE_LOGIN('SOCIAL');
            // signIn();
        } else if (params === 'facebook') {
            console.log(params);
            setTYPE_LOGIN('SOCIAL');
            // signInFacebook();
        } else if (params === 'SignIn') {
            setTYPE_LOGIN('NORMAL');
            if (user_email === '') {
                alert('Enter valid email');
                return false
            }
            if (user_password === '') {
                alert('Enter valid Password');
                return false
            }

            if (user_password.length < 4) {
                alert('Enter 8 Digit Password');
                return false
            }
            _loginUser();
        }
    }

    async function _loginUser() {
        setLoadingDone(true);
        var body = new FormData();
        body.append('email', user_email);
        body.append('type', 'NORMAL');
        body.append('password', user_password);

        axios({
            method: "post",
            url: url,
            data: body,
            headers: {
                'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2'
            }
        })
            .then(function (response) {
                //handle success
                console.log('response: ', JSON.stringify(response.data));
                if (response.data.status === true) {
                    AsyncStorage.setItem('@MySuperStore:key', `${response.data.token}`);
                    AsyncStorage.setItem('@MySuperStore:SkipEnable', 'false');
                    AsyncStorage.setItem('@MySuperStore:keyId', `${response.data.userid}`);
                    GoToHome();
                } else {
                    setLoadingDone(false);
                    Alert.alert(response.data.message);
                }
            })
            .catch(function (error) {
                //handle error
                setLoadingDone(false);
                console.log('error: ', error);
            });
    };

    const GoToHome = () => {
        ClearData();
        setLoadingDone(false);
        navigation.navigate('HomeScreen');
    }

    async function ClearData() {
        chatInput1.current.clear();
        chatInput2.current.clear();
    }


    return (
        <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
            <Spinner
                visible={isLodingDone}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <View style={{ padding: 20 }}>
                <View style={{ position: 'absolute', right: 25, top: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MapLocationChoose')} style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, borderColor: '#0c1e40', borderWidth: 1, borderRadius: 5 }}>
                        <View style={{}}>
                            <Text style={{ color: '#0c1e40', fontWeight: 'bold', letterSpacing: 3, }}>SKIP</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Image style={{ width: 210, height: 120, resizeMode: 'contain', marginTop: Dimensions.get('screen').width / 3.5, alignSelf: 'center' }} source={require('../../../assets/images/logo.jpg')} />
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, backgroundColor: '#3B5998' }}>
                    <Image style={{ width: 25, height: 25, resizeMode: 'contain', marginRight: 10, tintColor: '#fff', borderRadius: 30 }} source={require('../../../assets/images/facebook_icon.png')} />
                    <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 16, letterSpacing: 4, color: '#fff' }}>FACEBOOK</Text>
                </View>
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12 }}>
                    <Image style={{ width: 25, height: 25, resizeMode: 'contain', marginRight: 10 }} source={require('../../../assets/images/google_icon.jpg')} />
                    <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 16, letterSpacing: 4 }}>GOOGLE</Text>
                </View>
                <View style={{ alignSelf: 'center', padding: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Or</Text>
                </View>
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 0 }}>
                    <TextInput
                        ref={chatInput1}
                        style={{ height: 45, padding: 15 }}
                        placeholder={'Email Or Mobile'}
                        maxLength={30}
                        onChangeText={(email) => setUserEmail(email)}
                    />
                </View>
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                    <TextInput
                        ref={chatInput2}
                        style={{ height: 45, padding: 15 }}
                        placeholder={'Password'}
                        maxLength={40}
                        onChangeText={(pass) => setUserPassword(pass)}
                        secureTextEntry={true}
                    />
                </View>
                <View style={{ paddingTop: 15, flexDirection: 'row', }}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('ForgetScreen')}>
                        <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>Forget Password</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => MultipleLogin('SignIn')} style={{ backgroundColor: '#0c1e40', padding: 17, marginTop: 18 }}>
                    <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}>SIGN - IN</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>)
}

export default RegisterScreen;