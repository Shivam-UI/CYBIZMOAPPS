import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView, Alert, AsyncStorage, Platform, Dimensions } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import { USER_PROFILE_API, UPLOAD_USER_PHOTO_PROFILE_API } from '../../../configApi';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';

const MyProfileScreen = () => {

    const navigation = useNavigation();
    const [isLodingDone, setLoadingDone] = React.useState(true);
    const [name, setName] = React.useState(false);
    const [email, setEmail] = React.useState(false);
    const [number, setNumber] = React.useState(false);
    const [image, setImage] = React.useState(false);
    const [NotLoginYet, setIfLogin] = React.useState('');
    const [ImagePath, setImagePath] = React.useState(false);
    const [isHaveImage, setHaveImage] = React.useState(false);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoadingDone(true);
            getHomeDetails();
        });
        return unsubscribe;
    }, [navigation]);

    async function getHomeDetails() {

        const SkipEnable = await AsyncStorage.getItem('@MySuperStore:SkipEnable');
        if (SkipEnable) {
            setIfLogin(SkipEnable);
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
                    console.log('response: ', JSON.stringify(response.data));
                    // Alert.alert(response.data.message);
                    setName(response.data.data[0].user_name);
                    setEmail(response.data.data[0].email);
                    setImage(response.data.data[0].user_image);
                    setNumber(response.data.data[0].mobile);
                    // set to session
                    AsyncStorage.setItem('@MySuperStore:keyName', `${response.data.data[0].user_name}`);
                    AsyncStorage.setItem('@MySuperStore:keyEmail', `${response.data.data[0].email}`);
                    AsyncStorage.setItem('@MySuperStore:keyNumber', `${response.data.data[0].mobile}`);
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

    async function AddProfileImage(imagePath) {

        const value = await AsyncStorage.getItem('@MySuperStore:key');
        var today = Math.round((new Date()).getTime() / 1000);
        var imageName = value + '_image_' + today + '.jpg';
        console.log(imageName);

        if (value) {
            var body = new FormData();
            // body.append('product_name', 'Testing Products');
            // body.append('price', '99');
            body.append('android_image', {
                uri: Platform.OS === 'android' ? imagePath : imagePath,
                type: 'image/jpeg',
                name: imageName,
            });

            console.log('TEST_IMAGE_SINGLE_API: ', JSON.stringify(body));

            axios({
                method: "POST",
                url: UPLOAD_USER_PHOTO_PROFILE_API,
                data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                    'Authorization': value
                }
            })
                .then(function (response) {
                    // handle success
                    console.log('TEST_IMAGE_SINGLE_API: ', JSON.stringify(response.data));
                    if (response.data.status === true) {
                        Alert.alert(response.data.message);
                        getHomeDetails();
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

    const AadharImageBack = () => {
        ImagePicker.openPicker({
            width: 600,
            height: 800,
            cropping: true,
            mediaType: 'image',
        }).then(image => {
            console.log(image.path);
            AddProfileImage(image.path);
            // setHaveImage(true);
            // setImagePath(image.path);
        });
    }

    const onPressLogout = () => {
        Alert.alert(
            'Sign Out',
            'Are you sure',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('cancel'),
                    style: 'cancel',
                },
                { text: 'Continue', onPress: () => signOut() },
            ]
        );
    }

    const signOut = async () => {
        await AsyncStorage.clear();
        try {
            navigation.navigate('Auth');
            alert("You have signed out");
        } catch (error) {
            console.log("err", error);
        }
    };

    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'column', backgroundColor: '#FFFFFF', height: '100%' }}>
                <Spinner
                    visible={isLodingDone}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />
                <View style={{ flexDirection: 'row', height: 55, alignItems: 'center', backgroundColor: '#00CCff' }}>
                    <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.openDrawer()}>
                        <Image source={require('../../../assets/images/hamburger_menu.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>My Profile</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('SearchSingle')}>
                        <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                        <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                </View>
                {NotLoginYet === 'true' ?
                    <View style={{ padding: 10, marginTop: Dimensions.get('screen').width - 100 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Auth')} style={{ backgroundColor: '#00ccff', padding: 15, borderRadius: 8 }}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#ffffff', fontSize: 16 }}>Go Login / Registraton</Text>
                        </TouchableOpacity>
                    </View> :
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen')} style={{ flexDirection: 'row', padding: 20, alignItems: 'center' }}>
                            <View>
                                <Image source={{ uri: image }} style={{ width: 125, height: 125, marginRight: 15, borderRadius: 100 }} />
                                <TouchableOpacity style={{ position: 'absolute', right: 0, }} onPress={() => AadharImageBack()}>
                                    <Image source={require('../../../assets/images/camera_icon.png')} style={{ width: 35, height: 35, marginRight: 5 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{}}>
                                <Text style={{ fontWeight: '600', fontSize: 18 }}>{name}</Text>
                                <Text style={{ marginTop: 5 }}>{email}</Text>
                                <Text style={{ marginTop: 5 }}>{number}</Text>
                                <Text style={{ color: '#00CCFF', marginTop: 5 }}>Edit profile</Text>
                            </View> 
                        </TouchableOpacity>
                        <View style={{marginBottom:30}}>
                            <ScrollView style={{ padding: 20, width: '100%', height: '72%',marginBottom:15 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('DashboardScreen')} style={{ padding: 15, borderBottomColor: '#AAAAAA', borderBottomWidth: 1 }}>
                                    <Text>My Dashboard</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('GlobalProfile', name)} style={{ padding: 15, borderBottomColor: '#AAAAAA', borderBottomWidth: 1 }}>
                                    <Text>My Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('WishListScreen')} style={{ padding: 15, borderBottomColor: '#AAAAAA', borderBottomWidth: 1 }}>
                                    <Text>My Wishlist</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('MyProducts')} style={{ padding: 15, borderBottomColor: '#AAAAAA', borderBottomWidth: 1 }}>
                                    <Text>My Product</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('MyBusiness')} style={{ padding: 15, borderBottomColor: '#AAAAAA', borderBottomWidth: 1 }}>
                                    <Text>My Business</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Jobs')} style={{ padding: 15, borderBottomColor: '#AAAAAA', borderBottomWidth: 1 }}>
                                    <Text>My Jobs</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('AddressListScreen')} style={{ padding: 15, borderBottomColor: '#AAAAAA', borderBottomWidth: 1 }}>
                                    <Text>My Address</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('ProductAdManager')} style={{ padding: 15, borderBottomColor: '#AAAAAA', borderBottomWidth: 1 }}>
                                    <Text>Product Ads Manager</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('ServiceAdManager')} style={{ padding: 15, borderBottomColor: '#AAAAAA', borderBottomWidth: 1 }}>
                                    <Text>Service Ads Manager</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('JobAdManager')} style={{ padding: 15, borderBottomColor: '#AAAAAA', borderBottomWidth: 1 }}>
                                    <Text>Job Ads Manager</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('NotifictionScreen')} style={{ padding: 15, borderBottomColor: '#AAAAAA', borderBottomWidth: 1 }}>
                                    <Text>Notification</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('MessageListUser')} style={{ padding: 15, borderBottomColor: '#AAAAAA', borderBottomWidth: 1 }}>
                                    <Text>My Chat</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('MyReviewScreen')} style={{ padding: 15, borderBottomColor: '#AAAAAA', borderBottomWidth: 1 }}>
                                    <Text>My Review</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('MyFollowerScreen')} style={{ padding: 15, borderBottomColor: '#AAAAAA', borderBottomWidth: 1 }}>
                                    <Text>My Following</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('ViewFollowerScreen')} style={{ padding: 15, borderBottomColor: '#AAAAAA', borderBottomWidth: 1 }}>
                                    <Text>View Followers</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('MyWalletScreen')} style={{ padding: 15, borderBottomColor: '#AAAAAA', borderBottomWidth: 1 }}>
                                    <Text>My Wallet</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('PasswordScreen')} style={{ padding: 15, borderBottomColor: '#AAAAAA', borderBottomWidth: 1 }}>
                                    <Text>Change Password</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('ContactToAdministrator')} style={{ padding: 15, borderBottomColor: '#AAAAAA', borderBottomWidth: 1 }}>
                                    <Text>Contact To Administrator</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('ViewAdministratorMessage')} style={{ padding: 15, borderBottomColor: '#AAAAAA', borderBottomWidth: 1 }}>
                                    <Text>View Administrator Messages</Text>
                                </TouchableOpacity>
                                {/* <View style={{ padding: 15, borderBottomColor: '#AAAAAA', borderBottomWidth: 1 }}>
                                    <Text>Account Setting</Text>
                                </View> */}
                                {/* <View style={{ padding: 15, borderBottomColor: '#AAAAAA', borderBottomWidth: 1 }}>
                                    <Text>Location</Text>
                                </View> */}
                                {NotLoginYet === 'true' ? <View></View> :
                                    <TouchableOpacity onPress={() => onPressLogout()} style={{ padding: 15, borderBottomColor: '#AAAAAA', borderBottomWidth: 1,marginBottom:15 }}>
                                        <Text>Logout</Text>
                                    </TouchableOpacity>
                                }
                            </ScrollView>
                        </View>
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}

export default MyProfileScreen;