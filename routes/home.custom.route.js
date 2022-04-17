import React from 'react';
import { Image, View, TouchableOpacity, Text, Button, Share, AsyncStorage, Alert } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Geocoder from 'react-native-geocoding';
import MarqueeText from 'react-native-marquee';
// 
const Stack = createStackNavigator();

// device screen 
import HomeScreen from '../apps/screens/HomeScreen';

const HomeRoutes = () => {

    // const Drawer = createDrawerNavigator();
    const navigation = useNavigation();
    const [HERE_API_KEY, setHERE_API_KEY] = React.useState('AIzaSyA0ewrYbiWkqro7lC3V2jzk9efnQD4EqwQ');
    const [LocationDone, setLocationDone] = React.useState('New york, USA');
    const [LocationType, setLocationType] = React.useState('');
    const [LocationAddress, setLocationAddress] = React.useState('');

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Initialize the module (needs to be done only once)
            Geocoder.init(HERE_API_KEY); // use a valid API key
            getCurrentLocation();
        });
        return unsubscribe;
    }, [navigation]);

    async function getCurrentLocation() {
        const Locationkey = await AsyncStorage.getItem('@MySuperStore:SkipType');
        const value = await AsyncStorage.getItem('@MySuperStore:Locationkey');
        console.log('getCurrentLocation', value + ' \ ' + Locationkey);
        if (!value) {
            goToBarcodeScreen();
        } else {
            setLocationType(Locationkey);
            setLocationDone(value);
            getAddressFromCoordinates(value);
        }
    }

    async function IfLoginGoToNotification() {
        const SkipType = await AsyncStorage.getItem('@MySuperStore:SkipType');
        if (SkipType === 'true') {
            Alert.alert('Login Required!');
        } else {
            navigation.navigate('Notifications');
        }
    }

    function HomeAppScreen({ navigation }) {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    onPress={() => IfLoginGoToNotification()}
                    title="Go to notifications"
                />
            </View>
        );
    }

    function NotificationsScreen({ navigation }) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button onPress={() => navigation.goBack()} title="Go back home" />
            </View>
        );
    }

    // function goToNaviagte() {
    //     return (
    //         <NavigationContainer>
    //             <Drawer.Navigator initialRouteName="Home">
    //                 <Drawer.Screen name="Home" component={HomeAppScreen} />
    //                 <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    //             </Drawer.Navigator>
    //         </NavigationContainer>
    //     )
    // }

    // function open() {
    //     navigation.openDrawer();
    //     //navigation.closeDrawer();
    // }

    // const sharePost = async () => {
    //     try {
    //         const result = await Share.share({
    //             title: 'INFINITAP',
    //             message: 'Please install INFINITAP app and stay safe , AppLink :https://play.google.com/store/apps/details?id=',
    //             url: 'https://play.google.com/store/apps/details?id='
    //         });
    //         if (result.action === Share.sharedAction) {
    //             if (result.activityType) {
    //                 // shared with activity type of result.activityType
    //             } else {
    //                 // shared
    //             }
    //         } else if (result.action === Share.dismissedAction) {
    //             // dismissed
    //         }
    //     } catch (error) {
    //         alert(error.message);
    //     }
    // };

    function goToBarcodeScreen() {
        navigation.navigate('MapLocationChoose')
    }

    function getAddressFromCoordinates(latitude) {
        console.log(latitude);
        // 
        Geocoder.from(latitude) //26.8467088, 80.9461592)
            .then(json => {
                var addressComponent = json.results[0].address_components[0];
                var addressComponent1 = json.results[0].formatted_address;
                setLocationAddress(addressComponent1);
                console.log('getAddressFromCoordinates', JSON.stringify(addressComponent) + ' / ' + JSON.stringify(addressComponent1));
            })
            .catch(error => console.warn(error));
    }

    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    title: '', //Set Header Title
                    headerStyle: {
                        backgroundColor: '#00CCFF', //Set Header color
                    },
                    headerTintColor: 'white', //Set Header text color
                    headerTitleStyle: {
                        textAlign: 'center',
                        headerLayoutPreset: 'center',
                        fontWeight: 'bold', //Set Header text style
                    },

                    headerLeft: () =>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                                <Image source={require('../assets/images/hamburger_menu.png')} style={{ width: 25, height: 20, marginLeft: 10, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => goToBarcodeScreen()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('../assets/images/pin_icon.png')} style={{ width: 25, height: 20, marginLeft: 10, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                                <MarqueeText
                                    style={{ fontSize: 14, color: '#FFFFFF', width: 200 }}
                                    duration={1000}
                                    marqueeOnStart
                                    loop
                                    marqueeDelay={100}
                                    marqueeResetDelay={8000}
                                >
                                    {LocationType === 'Location' ? LocationAddress : LocationDone}
                                </MarqueeText>
                            </TouchableOpacity>
                        </View>
                    ,
                    headerRight: () =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('SearchSingle')}>
                                <Image
                                    source={require('../assets/images/search_icon.png')}
                                    style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('NotifictionScreen')}>
                                <Image source={require('../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </View>
                }} >
            </Stack.Screen>
        </Stack.Navigator>
    );
}
// onPress={() => navigation.openDrawer()}
export default HomeRoutes;
