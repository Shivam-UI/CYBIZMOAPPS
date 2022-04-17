import React from 'react';
import { View, Text, SafeAreaView, Image, Dimensions, TouchableOpacity, TextInput, Alert, AsyncStorage, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

const LoginScreen = () => {

    const navigation = useNavigation();
    const chatInput1 = React.createRef();
    const chatInput2 = React.createRef();
    const chatInput3 = React.createRef();
    const chatInput4 = React.createRef();
    const [isLodingDone, setLoadingDone] = React.useState(false);
    // register fields
    const [user_name, setUserName] = React.useState('');
    const [user_email, setUserEmail] = React.useState('');
    const [user_number, setUserNumber] = React.useState('');
    const [user_password, setUserPassword] = React.useState('');

    const url = 'https://codersinn.club/api/register';

    const GoToSignIn = () => {
        navigation.navigate('RegisterScreen');
    }

    function multipleLogin(params) {
        if (params === 'Signup') {

            if (user_name === '') {
                alert('Enter valid Name');
                return false
            }

            if (user_email === '') {
                alert('Enter valid Email');
                return false
            }

            if (user_number.length < 10) {
                alert('Enter 10 Digit Number');
                return false
            }

            if (user_password.length < 4) {
                alert('Enter 8 Digit Password');
                return false
            }
            _registerUser();
        }
    }

    async function _registerUser() {
        setLoadingDone(true);
        var body = new FormData();
        body.append('username', user_name);
        body.append('email', user_email);
        body.append('mobile', user_number);
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
                    Alert.alert(response.data.message);
                    const DataToSend = {
                        username: user_name,
                        email: user_email,
                        mobile: user_number,
                        password: user_password,
                        otp: response.data.otp,
                    }
                    setLoadingDone(false);
                    navigation.navigate('VerificationScreen', DataToSend);
                    // GoToHome();
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
    }

    async function chooseMapLocation(){
        AsyncStorage.setItem('@MySuperStore:SkipEnable', 'true');
        navigation.navigate('MapLocationChoose');
        console.log('SkipKeySaved')
    }

    async function ClearData() {
        chatInput1.current.Clear();
        chatInput2.current.Clear();
        chatInput3.current.Clear();
        chatInput4.current.Clear();
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
            <Spinner
                visible={isLodingDone}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <View style={{ position: 'absolute', right: 25, top: 70, zIndex: 999 }}>
                <TouchableOpacity onPress={() => chooseMapLocation()} style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, borderColor: '#0c1e40', borderWidth: 1, borderRadius: 5 }}>
                    <View style={{}}>
                        <Text style={{ color: '#0c1e40', fontWeight: 'bold', letterSpacing: 3, }}>SKIP</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ padding: 20 }}>
                <Image style={{ width: 210, height: 120, resizeMode: 'contain', marginTop: Dimensions.get('screen').width / 4, alignSelf: 'center' }} source={require('../../../assets/images/logo.jpg')} />
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa' }}>
                    <TextInput
                        style={{ height: 45, padding: 15 }}
                        ref={chatInput1}
                        placeholder={'Name'}
                        maxLength={20}
                        onChangeText={(name) => setUserName(name)}
                    />
                </View>
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                    <TextInput
                        style={{ height: 45, padding: 15 }}
                        ref={chatInput2}
                        placeholder={'Mobile'}
                        maxLength={10}
                        onChangeText={(email) => setUserNumber(email)}
                        keyboardType={'number-pad'}
                    />
                </View>
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                    <TextInput
                        style={{ height: 45, padding: 15 }}
                        ref={chatInput3}
                        placeholder={'Email'}
                        onChangeText={(num) => setUserEmail(num)}
                        maxLength={30}
                        keyboardType={'email-address'}
                    />
                </View>
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                    <TextInput
                        style={{ height: 45, padding: 15 }}
                        ref={chatInput4}
                        placeholder={'Create Password'}
                        onChangeText={(pass) => setUserPassword(pass)}
                        maxLength={20}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity onPress={() => multipleLogin('Signup')} style={{ backgroundColor: '#0c1e40', padding: 17, marginTop: 18 }}>
                    <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}>SIGN UP</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignSelf: 'center',marginTop:40 }}>
                   
                        <Text style={{ fontWeight: 'bold',color:'#aaaaaa' }}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => GoToSignIn()} style={{}}>
                            <Text style={{ color: 'black', fontWeight: 'bold', }}> Sign in here.</Text>
                        </TouchableOpacity>
                   
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen;