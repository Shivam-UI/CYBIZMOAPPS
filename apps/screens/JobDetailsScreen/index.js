import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, Dimensions, FlatList, AsyncStorage, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { MY_SERVICE_LIST_API } from '../../../configApi';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const JobSingleDetailsScreens = () => {

    const navigation = useNavigation();
    const [isLodingDone, setLoadingDone] = React.useState(true);
    const [AddressData, setADData] = React.useState([{ id: 1 }]);
    const [isHaveData, setNoData] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAddressData();
        });
        return unsubscribe;
    }, [navigation]);

    async function getAddressData() {
        setLoadingDone(true);
        // do something 
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        console.log(value);
        axios({
            method: "GET",
            url: MY_SERVICE_LIST_API,
            headers: {
                'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                'Authorization': value
            }
        })
            .then(function (response) {
                //handle success
                console.log('response: ', response.data);
                if (response.data.status === true) {
                    setADData(response.data.data);
                    // setNoData(true);
                    setLoadingDone(false);
                } else {
                    Alert.alert(response.data.message);
                    setLoadingDone(false);
                    // setNoData(false);
                }
            })
            .catch(function (error) {
                //handle error
                setLoadingDone(false);
                // console.log('error: ', error);
            });
    }

    const conformDelete = () => {
        Alert.alert(
            'Delete',
            'Are you sure',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('cancel'),
                    style: 'cancel',
                },
                { text: 'Continue', onPress: () => console.log('Continue') },
            ]
        );
    }

    const renderBlog = (items) => {

        console.log(items);

        return (
            <TouchableOpacity onPress={() => navigation.push('JobSingleDetails')} style={{ alignContent: 'center', backgroundColor: '#FFFFFF', padding: 10, margin: 5, borderRadius: 5, borderColor: '#f3f3f3', borderWidth: 1, marginBottom: 5 }}>
                <View style={{ flexDirection: 'column', borderBottomColor: '#aaaaaa', borderBottomWidth: 0 }}>
                    <Text style={{ marginBottom: 6 }}>Job Category Goes Here</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }} >Job Title Goes Here</Text>
                    <Text style={{ marginBottom: 10, marginTop: 8, color: '#aaaaaa' }}>In Publishing And Graphic Design, Lorem Ipsum Is A Placeholder Text Commonly In Publishing And Graphic Design, Lorem Ipsum.</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                        <Text style={{ flex: 1 }} >Position : Marketing Manager</Text>
                        <Text>Experience : 2 - 5 Years</Text>
                    </View>
                    <View>
                        <Text>Salary - 15,000 To 35,000</Text>
                    </View>
                    <View>
                        <Text style={{ color: '#00ccff', marginTop: 5 }}>Company Name Goes Here</Text>
                        <Text style={{ marginTop: 5 }}>www.example.com</Text>
                    </View>
                    <TouchableOpacity style={{ padding: 20, borderRadius: 5, borderColor: '#00ccff', borderWidth: 1, marginTop: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: '#00ccff', textAlign: 'center' }}>SAVE JOB</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }



    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', height: 55, alignItems: 'center', backgroundColor: '#00CCff' }}>
                <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.goBack()}>
                    <Image source={require('../../../assets/images/back_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>{"Job Title Gose Here"}</Text>
                </View>
                <TouchableOpacity >
                    <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                    <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={{ marginBottom: 50, backgroundColor: '#ffffff' }}>
                    <Spinner
                        visible={isLodingDone}
                        textContent={'Loading...'}
                        textStyle={{ color: '#FFF' }}
                    />
                    <View style={{ padding: 13, color: '#ffffff' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, flex: 1 }}>Job Title Goes Here</Text>
                            <Text>12 March, 2021</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{ flex: 1 }} >Position : Marketing Manager</Text>
                            <Text style={{ fontWeight: 'bold' }}>Intrested</Text><Text> 200 People</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{ flex: 1 }}>Salary - 15,000 To 35,000</Text>
                            <Image style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: '#00ccff', marginRight: 5 }} source={require('../../../assets/images/icons/eyes_icon.png')} />
                            <Text>1K View</Text>
                        </View>
                        <Text style={{ marginBottom: 10 }}>Experience : 2 - 5 Years</Text>
                        <Text style={{ marginBottom: 10 }}>Expire By 21 March, 2021</Text>
                        <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Job Description</Text>
                        <Text style={{ marginBottom: 10, justifyContent: 'space-around' }}>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.
                            Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.
                            Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.
                            Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.</Text>
                    </View>
                    <TouchableOpacity onPress={() => Alert.alert('Download Complete')} style={{ flexDirection: 'row', alignItems: 'center', padding: 20, borderColor: '#aaaaaa', borderWidth: 1, borderRadius: 5, margin: 10 }}>
                        <Image style={{ width: 40, height: 40, resizeMode: 'contain', tintColor: '#00ccff', marginRight: 20 }} source={require('../../../assets/images/pdf_icon.png')} />
                        <Text style={{ fontWeight: 'bold', fontSize: 16, flex: 1 }}>Document.Pdf</Text>
                        <Image style={{ width: 40, height: 40, resizeMode: 'contain', tintColor: '#000000', }} source={require('../../../assets/images/down_arrow_icon.png')} />
                    </TouchableOpacity>
                    <View style={{ alignContent: 'center', backgroundColor: '#FFFFFF', paddingTop: 15, margin: 5, borderRadius: 5 }}>
                        <View style={{ flexDirection: 'column', borderBottomColor: '#aaaaaa', borderBottomWidth: 0 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{}} source={require('../../../assets/images/lion_business.png')} />
                                <View>
                                    <Text style={{ color: '#00ccff', fontWeight: 'bold', marginBottom: 10 }} >Company Name Goes Here</Text>
                                    <Text style={{ marginBottom: 5 }}>www.example.com</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Alex</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6, marginBottom: 6 }}>
                                        <Text style={{ color: '#aaaaaa' }} >example@example.com</Text>
                                    </View>
                                    <Text style={{ color: '#aaaaaa' }} >+1 854-457-8956</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, marginBottom: 20 }}>
                                <TouchableOpacity style={{ flex: 1, padding: 16, margin: 15, backgroundColor: '#00ccff' }}>
                                    <Text style={{ alignSelf: 'center', color: '#ffffff', fontWeight: 'bold', letterSpacing: 5 }}>SAVE THIS JOB</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View>
                        {isHaveData ?
                            <FlatList
                                data={AddressData}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => renderBlog(item)}
                            /> : (<View style={{ marginTop: Dimensions.get('screen').width }}>
                                <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>No Jobs Found</Text>
                            </View>)}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default JobSingleDetailsScreens;