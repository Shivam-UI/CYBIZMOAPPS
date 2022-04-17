import React from 'react';
import { TouchableOpacity, View, Image, Text, SafeAreaView, Dimensions, FlatList, Alert, AsyncStorage, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { MY_JOBS_LIST_API } from '../../../configApi';
import axios from 'axios';

const MyJobsListScreen = () => {

    const navigation = useNavigation();
    const [isLodingDone, setLoadingDone] = React.useState(true);
    const [AddressData, setADData] = React.useState([]);
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
            url: MY_JOBS_LIST_API,
            headers: {
                'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                'Authorization': value
            }
        })
            .then(function (response) {
                //handle success
                console.log('response: ', JSON.stringify(response.data));
                if (response.data.status === true) {
                    setADData(response.data.data);
                    setNoData(true);
                    setLoadingDone(false);
                } else {
                    Alert.alert(response.data.message);
                    setLoadingDone(false);
                    setNoData(false);
                }
            })
            .catch(function (error) {
                //handle error
                setLoadingDone(false);
                // console.log('error: ', error);
            });
    }

    async function conformDelete() {
        Alert.alert('You want to delete this address?');
    }

    async function EditAddress() {
        Alert.alert('You want to Edit this address?');
        // navigation.navigate('NewAddressScreen');
    }

    function openPdf(address) {
        console.log(address);
    }


    const renderBlog = (items) => {

        console.log('JOBSDATALISTITEMS:', items);

        return (
            <TouchableOpacity onPress={() => navigation.navigate('JobSingleDetails')} style={{ alignContent: 'center', backgroundColor: '#FFFFFF', padding: 10, margin: 5, borderRadius: 5, borderColor: '#f3f3f3', borderWidth: 1, marginBottom: 5 }}>
                <View style={{ flexDirection: 'column', borderBottomColor: '#aaaaaa', borderBottomWidth: 0 }}>
                    <Text style={{ marginBottom: 6 }}>{items.category_name}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }} >{items.job_title}</Text>
                    <Text style={{ marginBottom: 10, marginTop: 8, color: '#aaaaaa' }}>In Publishing And Graphic Design, Lorem Ipsum Is A Placeholder Text Commonly In Publishing And Graphic Design, Lorem Ipsum.</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                        <Text style={{ flex: 1 }} >Position : {items.job_type}</Text>
                        <Text>Experience : {items.experience} Years</Text>
                    </View>
                    <View>
                        <Text>Salary - {items.salary_from} To {items.salary_to}</Text>
                    </View>
                    <View>
                        <Text style={{ color: '#00ccff', marginTop: 5 }}>{items.company_name}</Text>
                        <Text style={{ marginTop: 5 }}>www.example.com</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => openPdf(items.category_name)}
                        style={{ display: 'none', padding: 20, borderRadius: 5, borderColor: '#00ccff', borderWidth: 1, marginTop: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: '#00ccff', textAlign: 'center' }}>SAVE JOB</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView>
            <View style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }}>
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
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>{"Jobs"}</Text>
                    </View>
                    <TouchableOpacity >
                        <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                        <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
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
                {/* <TouchableOpacity
                    onPress={() => EditAddress()}
                    style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 60,
                        position: 'absolute',
                        bottom: 120,
                        right: 20,
                        height: 60,
                        backgroundColor: '#00CCFF',
                        borderRadius: 100,
                    }} >
                    <Image style={{ width: 25, height: 25, tintColor: '#FFFFFF' }} source={require('../../../assets/images/icons/edit.png')} />
                </TouchableOpacity> */}
            </View>
        </SafeAreaView>
    )
}

export default MyJobsListScreen;