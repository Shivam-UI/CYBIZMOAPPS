import React from 'react';
import { View, Text, SafeAreaView, Image, Dimensions, TouchableOpacity, TextInput, Alert } from 'react-native';
import { FORGET_PASSWORD_API } from '../../../configApi';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const ForgetPasswordScreen = () => {

    const navigation = useNavigation();
    const [EmailOrNumber, setUserEmailOrNumber] = React.useState('');
    const [isLodingDone, setLoadingDone] = React.useState(false);

    const GoToRegister = () => {

        if (EmailOrNumber === '') {
            alert('Please Enter Register Email Or Number');
        } else {
            var body = new FormData();
            body.append('mobile_or_email', EmailOrNumber);

            axios({
                method: "post",
                url: FORGET_PASSWORD_API,
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
                        navigation.navigate('RegisterScreen');
                    } else {
                        setLoadingDone(false);
                        Alert.alert(response.data.message);
                        navigation.navigate('RegisterScreen');
                    }
                });
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
            <View style={{ padding: 20 }}>
                <Image style={{ width: 210, height: 120, resizeMode: 'contain', marginTop: Dimensions.get('screen').width / 3.5, alignSelf: 'center', marginBottom: 40 }} source={require('../../../assets/images/logo.jpg')} />
                <View style={{ padding: 20 }}>
                    <Text style={{ textAlign: 'center' }}>Please enter your email or mobile number to get verification code to change/create your password.</Text>
                </View>
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 0 }}>
                    <TextInput
                        style={{ height: 45, padding: 15 }}
                        placeholder={'Email Or Mobile'}
                        maxLength={40}
                        onChangeText={(value) => setUserEmailOrNumber(value)}
                    />
                </View>
                <TouchableOpacity onPress={() => GoToRegister()} style={{ backgroundColor: '#0c1e40', padding: 17, marginTop: 18 }}>
                    <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center', letterSpacing: 3 }}>VERIFY</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ForgetPasswordScreen;