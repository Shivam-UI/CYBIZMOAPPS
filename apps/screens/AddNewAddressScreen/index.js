import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, AsyncStorage, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import SelectDropdown from "react-native-select-dropdown";
import { useRoute, useNavigation } from '@react-navigation/core';
import Toast from 'react-native-simple-toast';
import { ADD_NEW_ADDRESS_API } from '../../../configApi';
import axios from 'axios';

const AddNewAddressScreen = () => {

    const navigation = useNavigation();
    const countries = ["India", "Canada", "Australia", "Ireland"];
    const states = ["Delhi", "Agra", "Hariyana", "Faridabaad"];
    const [isLodingDone, setLoadingDone] = React.useState(false);
    // data
    const [Street, setStreet] = React.useState(null);
    const [City, setCity] = React.useState(null);
    const [State, setState] = React.useState(null);
    const [Zip, setZipCode] = React.useState(null);
    const [MobileNo, setMobileNo] = React.useState(null);
    const [Email, setEmail] = React.useState(null);
    // refrence
    const chatInput1 = React.createRef();
    const chatInput2 = React.createRef();
    const chatInput3 = React.createRef();
    const chatInput4 = React.createRef();

    async function AddNewAddress() {
        console.log('AddNewAddress');
        if (Street === null) {
            alert('Enter Street Name');
            return false
        }
        if (City === null) {
            alert('Enter City Name');
            return false
        }
        if (State === null) {
            alert('Enter State Name');
            return false
        }
        if (Zip === null) {
            alert('Enter Zip Code');
            return false
        }
        if (MobileNo === null) {
            alert('Enter Mobile Number');
            return false
        }
        if (Email === null) {
            alert('Enter Email Address');
            return false
        }
        getCategoryData();
    }

    async function getCategoryData() {
        setLoadingDone(true);
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        if (value) {
            var body = new FormData();
            body.append('street', Street);
            body.append('city', City);
            body.append('state', State);
            body.append('zipcode', Zip);
            body.append('mobile_number', MobileNo);
            body.append('email', Email);
            axios({
                method: "POST",
                url: ADD_NEW_ADDRESS_API,
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
                        Toast.showWithGravity(response.data.message, Toast.LONG, Toast.BOTTOM);
                        setLoadingDone(false);
                        // console.log('response: ', JSON.stringify(response.data.data));
                    } else {
                        Toast.showWithGravity(response.data.message, Toast.LONG, Toast.BOTTOM);
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
        <SafeAreaView style={{ backgroundColor: '#ffffff' }}>
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
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>{"NEW ADDRESS"}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('SearchSingle')} >
                    <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                    <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
            </View>
            <View style={{ padding: 15 }}>

                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginBottom: 5 }}>
                    <TextInput
                        style={{ height: 45, padding: 15 }}
                        ref={chatInput1}
                        placeholder={'Street'}
                        onChangeText={(street) => setStreet(street)}
                        maxLength={300}
                    />
                </View>
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginBottom: 5, backgroundColor: '#f3f3f3' }}>
                    <SelectDropdown
                        data={countries}
                        dropdownStyle={{ backgroundColor: '#ffffff' }}
                        rowStyle={{ backgroundColor: '#ffffff' }}
                        rowTextStyle={{ backgroundColor: '#ffffff' }}
                        // defaultValueByIndex={1} // use default value by index or default value
                        // defaultValue={'Canada'} // use default value by index or default value
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                            setCity(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item;
                        }}
                    />
                </View>
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginBottom: 5, backgroundColor: '#f3f3f3' }}>
                    <SelectDropdown
                        data={states}
                        dropdownStyle={{ backgroundColor: '#ffffff' }}
                        rowStyle={{ backgroundColor: '#ffffff' }}
                        rowTextStyle={{ backgroundColor: '#ffffff' }}
                        // defaultValueByIndex={1} // use default value by index or default value
                        // defaultValue={'Canada'} // use default value by index or default value
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                            setState(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item;
                        }}
                    />
                </View>
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginBottom: 5 }}>
                    <TextInput
                        style={{ height: 45, padding: 15 }}
                        ref={chatInput2}
                        placeholder={'Zip Code'}
                        onChangeText={(zipcode) => setZipCode(zipcode)}
                        maxLength={6}
                        keyboardType={'numeric'}
                        secureTextEntry={false}
                    />
                </View>
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginBottom: 5 }}>
                    <TextInput
                        style={{ height: 45, padding: 15 }}
                        ref={chatInput3}
                        placeholder={'Mobile Number'}
                        onChangeText={(number) => setMobileNo(number)}
                        maxLength={10}
                        keyboardType={'numeric'}
                        secureTextEntry={false}
                    />
                </View>
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginBottom: 5 }}>
                    <TextInput
                        style={{ height: 45, padding: 15 }}
                        ref={chatInput4}
                        placeholder={'Email'}
                        onChangeText={(email) => setEmail(email)}
                        keyboardType={'email-address'}
                        maxLength={120}
                        secureTextEntry={false}
                    />
                </View>

                <TouchableOpacity onPress={() => AddNewAddress()} style={{ backgroundColor: '#00CCFF', padding: 17, marginTop: 18 }}>
                    <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center', letterSpacing: 5 }}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


export default AddNewAddressScreen;