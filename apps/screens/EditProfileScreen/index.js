import React, { useRef } from 'react';
import { View, Text, SafeAreaView, Image, AsyncStorage, TouchableOpacity, TextInput, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { USER_PROFILE_API, EDIT_PROFILE_API } from '../../../configApi';
import Spinner from 'react-native-loading-spinner-overlay';
import Geolocation from '@react-native-community/geolocation';
import RBSheet from "react-native-raw-bottom-sheet";
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const EditProfileScreen = () => {

    const navigation = useNavigation();
    const refRBSheet = useRef();
    const [name, setName] = React.useState(false);
    const [email, setEmail] = React.useState(false);
    const [number, setNumber] = React.useState(false);
    const [address, setAddress] = React.useState(false);
    const [LastName, setLastName] = React.useState(false);
    const [AlertnetMobile, setAlertnetMobile] = React.useState(false);
    const [AlertnetEmail, setAlertnetEmail] = React.useState(false);
    const [ShotDescription, setShotDescription] = React.useState(false);
    const [image, setImage] = React.useState('https://i.pinimg.com/236x/ee/0e/70/ee0e70b2ae91f7209f3a78247986e280--disney-princes-disney-cruiseplan.jpg');
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const [oldPassword, setoldPassword] = React.useState('');
    const [NewPassword, setNewPassword] = React.useState('');
    const [RepeatPassword, setRepeatPassword] = React.useState('');
    const [MyLocation, setMyLocation] = React.useState({
        "latitude": 28.7507953998541,
        "longitude": 77.17380761516745
    });

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoadingDone(false);
            getCurrentLocation();
            getProfileDetails();
        });
        return unsubscribe;
    }, [navigation]);

    async function ChangePasswordApi() {

    }

    const handleMarkerPress = (event) => {
        console.log(event)
        setMyLocation(event);
    }

    async function getProfileDetails() {

        const SkipEnable = await AsyncStorage.getItem('@MySuperStore:SkipEnable');
        if (SkipEnable) {
            console.log('we have skip key');
        }

        // do something
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        console.log(value);

        axios({
            method: "GET",
            url: USER_PROFILE_API,
            headers: {
                'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                'Authorization': value
            }
        })
            .then(function (response) {
                //handle success
                if (response.data.status === true) {
                    console.log('getProfileDetails: ', JSON.stringify(response.data));
                    // Alert.alert(response.data.message);
                    setName(response.data.data[0].user_name);
                    setEmail(response.data.data[0].email);
                    setImage(response.data.data[0].user_image);
                    setNumber(response.data.data[0].mobile);
                    setAddress(response.data.data[0].address);
                    setLastName(response.data.data[0].last_name);
                    setAlertnetMobile(response.data.data[0].alternate_mobile);
                    setAlertnetEmail(response.data.data[0].alternate_email);
                    setShotDescription(response.data.data[0].short_desacription);
                    // set to session
                    setLoadingDone(false);
                } else {
                    setLoadingDone(false);
                }
            })
            .catch(function (error) {
                //handle error
                setLoadingDone(false);
                // console.log('error: ', error);
            });
    }

    async function getCurrentLocation() {
        Geolocation.getCurrentPosition((position) => {
            setMyLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
        },
            (error) => {
                console.log(error);
                alert("Couldn't get GPS location. Please try again or choose pickup point manually.");
            },
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000, showLocationDialog: true, forceRequestLocation: true });
    }

    const deleteProfilePhoto = () => {
        Alert.alert(
            'Conform Delete',
            'You Want Delete Profile Picture!',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => refRBSheet.current.close()
                },
            ],
            { cancelable: false },
        );
    }

    const ProfilePhoto = () => {
        Alert.alert(
            'Select Upload',
            'Select Any One',
            [
                {
                    text: 'Gallery',
                    onPress: () => console.log('Ask me later pressed')
                },
                {
                    text: 'Cancel',
                    onPress: () => refRBSheet.current.close(),
                    style: 'cancel',
                },
                {
                    text: 'Camera',
                    onPress: () => console.log('OK Pressed')
                },
            ],
            { cancelable: false },
        );
    }

    async function UpdateEditProfile() {

        const value = await AsyncStorage.getItem('@MySuperStore:key');
        console.log(value);

        if (value) {

            var body = new FormData();
            body.append('first_name', name);
            body.append('last_name', LastName);
            body.append('mobile', number);
            body.append('alternate_mobile', AlertnetMobile);
            body.append('email', email);
            body.append('alternate_email', AlertnetEmail);
            body.append('short_desacription', ShotDescription);
            console.log('response: ', JSON.stringify(body));

            axios({
                method: "POST",
                url: EDIT_PROFILE_API,
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
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF', marginRight: 40 }}>Edit Profile</Text>
                </View>
            </View>
            <ScrollView style={{ padding: 20 }}>
                <View style={{ width: 150, height: 180, marginTop: 20, alignSelf: 'center', }}>
                    <TouchableOpacity style={{ position: 'absolute', right: 0 }} onPress={() => refRBSheet.current.open()} >
                        <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={require('../../../assets/images/settings_icon.png')} />
                    </TouchableOpacity>
                    <Image style={{ width: 120, height: 120, resizeMode: 'cover', marginTop: 20, alignSelf: 'center', marginBottom: 30, borderColor: '#000000', borderWidth: 1, borderRadius: 60 }}
                        source={{ uri: image }} />
                </View>
                <View style={{ borderRadius: 2, marginTop: 0, flexDirection: 'row' }}>
                    <TextInput
                        style={{ height: 45, padding: 15, flex: 1 / 2, borderWidth: 1, borderColor: '#aaa', marginRight: 10 }}
                        placeholder={'First Name'}
                        value={name}
                        onChangeText={(ids) => setName(ids)} />
                    <TextInput
                        style={{ height: 45, padding: 15, flex: 1 / 2, borderWidth: 1, borderColor: '#aaa', }}
                        placeholder={'Last Name'}
                        value={LastName}
                        onChangeText={(ids) => setLastName(ids)} />
                </View>
                <View style={{ borderRadius: 2, marginTop: 20, flexDirection: 'row' }}>
                    <TextInput
                        style={{ height: 45, padding: 15, flex: 1 / 2, borderWidth: 1, borderColor: '#aaa', marginRight: 10 }}
                        placeholder={'Mobile Number*'}
                        value={number}
                        onChangeText={(ids) => setNumber(ids)} />
                    <TextInput
                        style={{ height: 45, padding: 15, flex: 1 / 2, borderWidth: 1, borderColor: '#aaa', }}
                        placeholder={'Alternet Mobile Number*'}
                        value={AlertnetMobile}
                        onChangeText={(ids) => setAlertnetMobile(ids)} />
                </View>
                <View style={{ borderRadius: 2, marginTop: 20, flexDirection: 'row' }}>
                    <TextInput
                        style={{ height: 45, padding: 15, flex: 1 / 2, borderWidth: 1, borderColor: '#aaa', marginRight: 10 }}
                        placeholder={'Email Id'}
                        value={email}
                        onChangeText={(ids) => setEmail(ids)} />
                    <TextInput
                        style={{ height: 45, padding: 15, flex: 1 / 2, borderWidth: 1, borderColor: '#aaa', }}
                        placeholder={'Alternet Email Id'}
                        value={AlertnetEmail}
                        onChangeText={(ids) => setAlertnetEmail(ids)} />
                </View>
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                    <TextInput
                        style={{ height: 145, padding: 15, textAlign: 'justify' }}
                        placeholder={'Short Description'}
                        value={ShotDescription}
                        numberOfLines={14}
                        onChangeText={(ids) => setShotDescription(ids)} />
                </View>
                <TouchableOpacity onPress={() => UpdateEditProfile()} style={{ backgroundColor: '#0c1e40', padding: 17, marginTop: 18 }}>
                    <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center', letterSpacing: 3 }}>UPDATE PROFILE</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', padding: 10, alignSelf: 'center', marginTop: 15 }}>
                    <MapView
                        style={{ height: 250, width: '100%', marginBottom: 10 }}
                        region={{
                            latitude: Number(28.7509204),
                            longitude: Number(77.1613463),
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                        onPress={(e) => handleMarkerPress(e.nativeEvent.coordinate)}
                        mapType={'standard'}
                        zoomEnabled={true}
                        pitchEnabled={true}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        showsCompass={true}
                        showsBuildings={true}
                        showsTraffic={true}
                        showsIndoors={true} >
                        <Marker
                            draggable
                            coordinate={MyLocation} //{ latitude: Number(28.7509204), longitude: Number(77.1613463) }}
                            title={'Store Location'}
                            description={'ContactPersonAddress'}
                        />
                    </MapView>
                </View>
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                    <TextInput
                        style={{ height: 45, padding: 15, textAlign: 'justify' }}
                        placeholder={'Address'}
                        value={address}
                        numberOfLines={1}
                        onChangeText={(ids) => setRepeatPassword(ids)} />
                </View>
                <TouchableOpacity
                    onPress={() => ChangePasswordApi()}
                    style={{ backgroundColor: '#0c1e40', padding: 17, marginTop: 18, marginBottom: 60 }}>
                    <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center', letterSpacing: 3 }}>UPDATE LOCATION</Text>
                </TouchableOpacity>
            </ScrollView>
            <RBSheet
                ref={refRBSheet}
                height={200}
                openDuration={250}
                customStyles={{
                    container: {
                        justifyContent: "center",
                        alignItems: "center"
                    }
                }}
            >
                <View>
                    <View style={{}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Upload Profile Picture</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 30 }}>
                        <TouchableOpacity onPress={() => deleteProfilePhoto()} style={{ alignItems: 'center', marginRight: 25 }}>
                            <Image style={{ width: 60, height: 60, resizeMode: 'contain', tintColor: 'red', marginBottom: 5 }} source={require('../../../assets/images/delete_image_icon.png')} />
                            <Text style={{ fontWeight: 'bold' }}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => ProfilePhoto()} style={{ alignItems: 'center', marginRight: 25 }}>
                            <Image style={{ width: 55, height: 55, resizeMode: 'contain', marginBottom: 5 }} source={require('../../../assets/images/edit_image_icon.png')} />
                            <Text style={{ fontWeight: 'bold' }}>Upload</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => refRBSheet.current.close()} style={{ alignItems: 'center', marginRight: 25 }}>
                            <Image style={{ width: 60, height: 60, resizeMode: 'contain', marginBottom: 5 }} source={require('../../../assets/images/close_icon.png')} />
                            <Text style={{ fontWeight: 'bold' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </RBSheet>
        </SafeAreaView>
    )
}

export default EditProfileScreen;