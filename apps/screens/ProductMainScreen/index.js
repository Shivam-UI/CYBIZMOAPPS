import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, AsyncStorage, FlatList, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import { CATEGORY_AND_PRODUCTS_API } from '../../../configApi';
import axios from 'axios';

const ProductMainScreen = () => {

    const navigation = useNavigation();
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const [DataProducts, setDataProducts] = React.useState([]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoadingDone(true);
            getCategoryData();
        });
        return unsubscribe;
    }, [navigation]);

    async function getCategoryData() {
        setLoadingDone(true);

        const value = await AsyncStorage.getItem('@MySuperStore:keyId');
        const LocationRadiouskey = await AsyncStorage.getItem('@MySuperStore:LocationRadiouskey');
        const SkipType = await AsyncStorage.getItem('@MySuperStore:SkipType');
        const location = await AsyncStorage.getItem('@MySuperStore:Locationkey');

        if (!location) {
            navigation.navigate('MapLocationChoose');
        }

        if (true) {
            var body = new FormData();
            if (SkipType === 'Location') {
                body.append('latitude', '26.8467088');
                body.append('longitude', '80.9461592');
                body.append('radius', '' + LocationRadiouskey);
            }
            if (SkipType === 'City') {
                body.append('userid', '' + value);
                body.append('city', '' + location);
            }
            if (SkipType === 'Pincode') {
                body.append('pincode', '' + location);
            }

            console.log(JSON.stringify(body));

            axios({
                method: "POST",
                url: CATEGORY_AND_PRODUCTS_API,
                data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                }
            }).then(function (response) {
                //handle success
                if (response.data.status === true) {
                    console.log('CATEGORY_AND_PRODUCTS_API: ', JSON.stringify(response.data));
                    setDataProducts(response.data.category_data);
                    setLoadingDone(false);
                } else {
                    console.warn(response.data)
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

        return (
            <View style={{ alignContent: 'center', padding: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, textTransform: 'uppercase' }}>{items.category_name}</Text>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity style={{}} >
                        <Image style={{ width: 25, height: 25 }} source={require('../../../assets/images/icons/right_arrow.png')} />
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        horizontal
                        data={items.product_list}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => renderInnerBlog(item)}
                    />
                </View>
            </View>
        )
    }

    const renderInnerBlog = (items) => {

        return (
            <TouchableOpacity
                style={{
                    alignContent: 'center', margin: 5,
                    backgroundColor: '#ffffff',
                    shadowColor: "#aaaaaa",
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    shadowOffset: {
                        height: 1,
                        width: 1,
                    }
                }}
                onPress={() => navigation.navigate('ProductSingle', items)} >
                <View style={{ alignContent: 'center', padding: 5 }}>
                    <Image style={{ width: 140, height: 140, resizeMode: 'cover', borderRadius: 0 }} source={{ uri: items.android_image }} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginTop: 5, alignSelf: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 13, width: 140, textTransform: 'uppercase' }} numberOfLines={1} ellipsizeMode={'tail'} >{items.product_name}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
            <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', height: 55, alignItems: 'center', backgroundColor: '#00CCff' }}>
                    <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.openDrawer()}>
                        <Image source={require('../../../assets/images/hamburger_menu.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>Products</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('SearchSingle')}>
                        <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                        <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Spinner
                        visible={isLodingDone}
                        textContent={'Loading...'}
                        textStyle={{ color: '#FFF' }}
                    />
                    <View>
                        <FlatList
                            style={{ marginBottom: 100 }}
                            data={DataProducts}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => renderBlog(item)}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProductMainScreen;