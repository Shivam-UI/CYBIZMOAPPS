import React from 'react';
import { SafeAreaView, View, Text, Image, Dimensions, ScrollView, TouchableOpacity, AsyncStorage, } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Pie from 'react-native-pie'
import { DASHBOARD_COUNT_API } from '../../../configApi';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

const DashboardScreen = () => {

    const navigation = useNavigation();
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const [UnreadMessage, setUnreadMessage] = React.useState('');
    const [ServiceCount, setServiceCount] = React.useState('');
    const [JobCount, setJobCount] = React.useState('');
    const [MyToken, setMyToken] = React.useState('');
    const [Review, setReview] = React.useState('');
    const [Rating, setRating] = React.useState('');

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoadingDone(true);
            getDashboardDetails();
        });
        return unsubscribe;
    }, [navigation]);

    async function getDashboardDetails() {

        // do something
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        console.log(value);

        if (value) {
            axios({
                method: "GET",
                url: DASHBOARD_COUNT_API,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                    'Authorization': value
                }
            })
                .then(function (response) {
                    //handle success
                    if (response.data.status === true) {
                        console.log('DASHBOARD_COUNT_API: ', JSON.stringify(response.data));
                        setUnreadMessage(response.data.my_unread_message);
                        setServiceCount(response.data.service_count);
                        setJobCount(response.data.job_count);
                        setMyToken(response.data.my_token);
                        setReview(response.data.review);
                        setRating(response.data.rating);
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
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>{"My Dashboard"}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('SearchSingle')}>
                    <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                    <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: Dimensions.get('screen').width / 2, padding: 10 }}>
                            <View style={{ backgroundColor: 'white', paddingTop: 45, paddingBottom: 45, alignItems: 'center', borderRadius: 5 }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 2, fontSize: 16 }}>Total Product</Text>
                                <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 16 }}>Listing</Text>
                                <Text style={{ fontWeight: 'bold' }}>{ServiceCount}</Text>
                            </View>
                        </View>
                        <View style={{ width: Dimensions.get('screen').width / 2, padding: 10, }}>
                            <View style={{ backgroundColor: 'white', paddingTop: 45, paddingBottom: 45, alignItems: 'center', borderRadius: 5 }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 2, fontSize: 16 }}>Total Business</Text>
                                <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 16 }}>Listing</Text>
                                <Text style={{ fontWeight: 'bold' }}>{JobCount}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: Dimensions.get('screen').width / 2, padding: 10 }}>
                            <View style={{ backgroundColor: 'white', paddingTop: 45, paddingBottom: 45, alignItems: 'center', borderRadius: 5 }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 2, fontSize: 16 }}>Review</Text>
                                <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 16 }}></Text>
                                <Text style={{ fontWeight: 'bold' }}>( {Review} Reviews )</Text>
                            </View>
                        </View>
                        <View style={{ width: Dimensions.get('screen').width / 2, padding: 10, }}>
                            <View style={{ backgroundColor: 'white', paddingTop: 45, paddingBottom: 45, alignItems: 'center', borderRadius: 5 }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 2, fontSize: 16 }}>My Token</Text>
                                <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 16 }}>Balance</Text>
                                <Text style={{ fontWeight: 'bold' }}>{MyToken}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                        <View style={{ width: Dimensions.get('screen').width / 2, padding: 10, }}>
                            <View style={{ backgroundColor: 'white', paddingTop: 45, paddingBottom: 45, alignItems: 'center', borderRadius: 5 }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 2, fontSize: 16 }}>Total View</Text>
                                <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 16 }}>Of Products</Text>
                                <Text style={{ fontWeight: 'bold' }}>{UnreadMessage}</Text>
                            </View>
                        </View>
                        <View style={{ width: Dimensions.get('screen').width / 2, padding: 10 }}>
                            <View style={{ backgroundColor: 'white', paddingTop: 45, paddingBottom: 45, alignItems: 'center', borderRadius: 5 }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 2, fontSize: 16 }}>Total Business</Text>
                                <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 16 }}>View</Text>
                                <Text style={{ fontWeight: 'bold' }}>{Rating}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', backgroundColor: 'white', padding: 50, marginBottom: 15 }}>
                        <Pie
                            radius={80}
                            innerRadius={60}
                            sections={[
                                {
                                    percentage: 50,
                                    color: '#00ccff',
                                },
                                {
                                    percentage: 50,
                                    color: '#404fcd',
                                }
                            ]}
                            dividerSize={2}
                            strokeCap={'butt'}
                        />
                        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 20, height: 20, backgroundColor: '#00ccff', borderRadius: 50, marginRight: 5 }}></View>
                            <Text style={{ marginRight: 20 }}>Products</Text>
                            <View style={{ width: 20, height: 20, backgroundColor: '#404fcd', borderRadius: 50, marginRight: 5 }}></View>
                            <Text>Intrested Buyers</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', backgroundColor: 'white', padding: 20 }}>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ width: 45, height: 300, padding: 20, marginBottom: 30, marginRight: 30 }}>
                                <View style={{ height: '100%', width: 45, backgroundColor: '#f2f2f2', borderRadius: 5 }}>
                                    <View style={{ width: 45, height: 110, backgroundColor: '#00ccff', marginTop: 190 }}>

                                    </View>
                                </View>
                            </View>
                            <View style={{ width: 45, height: 300, padding: 20, marginBottom: 30, marginRight: 30 }}>
                                <View style={{ height: '100%', width: 45, backgroundColor: '#f2f2f2', borderRadius: 5 }}>
                                    <View style={{ width: 45, height: 130, backgroundColor: '#404fcd', marginTop: 170 }}>

                                    </View>
                                </View>
                            </View>
                            <View style={{ width: 45, height: 300, padding: 20, marginBottom: 30, marginRight: 30 }}>
                                <View style={{ height: '100%', width: 45, backgroundColor: '#f2f2f2', borderRadius: 5 }}>
                                    <View style={{ width: 45, height: 170, backgroundColor: '#00ccff', marginTop: 130 }}>

                                    </View>
                                </View>
                            </View>
                            <View style={{ width: 45, height: 300, padding: 20, marginBottom: 30, marginRight: 30 }}>
                                <View style={{ height: '100%', width: 45, backgroundColor: '#f2f2f2', borderRadius: 5 }}>
                                    <View style={{ width: 45, height: 130, backgroundColor: '#404fcd', marginTop: 170 }}>

                                    </View>
                                </View>
                            </View>
                            <View style={{ width: 45, height: 300, padding: 20, marginBottom: 30, marginRight: 30 }}>
                                <View style={{ height: '100%', width: 45, backgroundColor: '#f2f2f2', borderRadius: 5 }}>
                                    <View style={{ width: 45, height: 100, backgroundColor: '#00ccff', marginTop: 200 }}>

                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 20, height: 20, backgroundColor: '#00ccff', borderRadius: 50, marginRight: 5 }}></View>
                            <Text style={{ marginRight: 20 }}>Products</Text>
                            <View style={{ width: 20, height: 20, backgroundColor: '#404fcd', borderRadius: 50, marginRight: 5 }}></View>
                            <Text>Intrested Buyers</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DashboardScreen;