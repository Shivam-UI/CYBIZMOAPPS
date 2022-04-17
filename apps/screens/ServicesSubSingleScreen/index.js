import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList, AsyncStorage, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';
import { HOME_SUB_Category_product_list, SUB_CATEGORY_SERVICES_LIST } from '../../../configApi';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

const ServiceSubCategoryScreen = () => {

    const routes = useRoute();
    const navigation = useNavigation();
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const [SubCategoryData, setCategoryInnerProducts] = React.useState([]);
    navigation.setOptions({ title: routes.params.sub_category_name });

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoadingDone(false);
            console.log('refresh_again_sub', routes);
            getInnerCategoryData();
        });
        return unsubscribe;
    }, [navigation]);

    async function getInnerCategoryData() {
        setLoadingDone(true);
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        console.log('refresh again', value);
        if (value) {
            var body = new FormData();
            body.append('latitude', '26.8467088');
            body.append('longitude', '80.9461592');
            body.append('sub_category_id', routes.params.sub_category_id);
            axios({
                method: "POST",
                url: SUB_CATEGORY_SERVICES_LIST,
                data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                }
            }).then(function (response) {
                console.log('response_sigle_data: ', response.data);
                if (response.data.status === true) {
                    setCategoryInnerProducts(response.data.data);
                    setLoadingDone(false);
                } else {
                    Alert.alert('' + response.data.message);
                    setLoadingDone(false);
                }
            }).catch(function (error) {
                setLoadingDone(false);
                console.log('error: ', error);
            }
            );
        }
    }

    const renderBannerSingle = (items) => {

        console.log('renderBannerSingle: ', items);

        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProductSingle', items)} style={{ alignContent: 'center', padding: 5, flexDirection: 'row', backgroundColor: '#FFFFFF', padding: 10 }}>
                <View>
                    <Image style={{ width: 140, height: 140, resizeMode: 'cover', borderRadius: 0 }} source={{ uri: items.android_image }} />
                </View>
                <View style={{ flexDirection: 'column', marginTop: 0, flex: 1, padding: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 20, height: 20, resizeMode: 'cover', borderRadius: 0, tintColor: '#00CCff' }} source={require('../../../assets/images/pin_icon.png')} />
                        <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#aaa' }}>{items.address.substring(0, 25)}</Text>
                    </View>
                    <View style={{}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: 5 }}>{items.business_name}</Text>
                    </View>
                    <View style={{}}>
                        <Text numberOfLines={4} style={{ fontWeight: 'bold', fontSize: 15, color: '#aaa', marginTop: 5 }}>{items.description}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'column', paddingTop: 20 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={{ width: 30, height: 30, resizeMode: 'contain', borderRadius: 0, tintColor: '#00CCff' }} source={require('../../../assets/images/icons/like.png')} />
                    </View>
                    <View style={{ marginTop: 15, alignItems: 'center' }}>
                        <View>
                            <Image style={{ width: 30, height: 30, resizeMode: 'contain', borderRadius: 0, tintColor: '#00CCff' }} source={require('../../../assets/images/icons/like.png')} />
                        </View>
                        <Text style={{ fontWeight: 'bold', fontSize: 26 }}>${items.total_rating}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                        <Image style={{ width: 20, height: 20, resizeMode: 'contain', borderRadius: 0, tintColor: '#00CCff', marginRight: 5 }} source={require('../../../assets/images/icons/eyes_icon.png')} />
                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#aaa' }}>{items.visiting_count} Visited</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView>
            <View>
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
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>Service Sub Category</Text>
                    </View>
                    <TouchableOpacity >
                        <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                        <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center', marginTop: 0, padding: 0 }}>
                    <FlatList
                        data={SubCategoryData}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => renderBannerSingle(item)}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ServiceSubCategoryScreen;