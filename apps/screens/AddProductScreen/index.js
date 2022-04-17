import React from 'react';
import { SafeAreaView, View, Text, Image, Dimensions, ScrollView, TouchableOpacity, AsyncStorage, FlatList, Share, TextInput, ToastAndroid, AlertIOS } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core'; 
import { MY_PRODUCT_ADS_API } from '../../../configApi';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

const ProductAdManager = () => {

    const navigation = useNavigation();
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const [Data, setData] = React.useState([{ id: 1 }]);

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
                url: MY_PRODUCT_ADS_API,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                    'Authorization': value
                }
            })
                .then(function (response) {
                    //handle success
                    if (response.data.status === true) {
                        // console.log('DASHBOARD_COUNT_API: ', JSON.stringify(response.data));
                        setData(response.data.data);
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

    const renderBlog = (items) => {

        console.log('DASHBOARD_COUNT_API: ', JSON.stringify(items));

        return (
            <TouchableOpacity style={{
                margin: 2,
                backgroundColor: '#ffffff',
                marginBottom: 10, shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 1,
                padding: 10
            }} >
                <View style={{ flexDirection: 'column', borderBottomColor: '#aaaaaa', borderBottomWidth: 0 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Product Id : </Text>
                        <Text>{items.product_ID}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Category : </Text>
                        <Text>{items.category_name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Sub Category : </Text>
                        <Text>{items.sub_category_name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Product Name : </Text>
                        <Text>{items.product_name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Expiry Date : </Text>
                        <Text>{items.featured_expiry_date}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <View style={{ flex: 1, marginRight: 5 }}>
                            <TouchableOpacity style={{ padding: 15, alignSelf: 'center', backgroundColor: '#aaa', width: '100%' }}>
                                <Text style={{ alignSelf: 'center' }}>Active</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={{ padding: 15, alignSelf: 'center', backgroundColor: '#aaa', width: '100%' }}>
                                <Text style={{ alignSelf: 'center' }}>Live</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
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
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>{"Product Ads Manager"}</Text>
                </View>
                <TouchableOpacity  onPress={() => navigation.navigate('SearchSingle')}>
                    <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                    <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View>
                    <FlatList
                        style={{}}
                        data={Data}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => renderBlog(item)}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProductAdManager;