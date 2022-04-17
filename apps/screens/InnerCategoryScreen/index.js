import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image, FlatList, Dimensions, Alert, AsyncStorage } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';
import Spinner from 'react-native-loading-spinner-overlay';
import { HOME_SUB_CATEGORY_LIST_API } from '../../../configApi';
import axios from 'axios';


const InnerCategoryScreen = () => {

    const routes = useRoute();
    const navigation = useNavigation();
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const [NoData, setNoDataFound] = React.useState(false);
    const [CategoryAndProductList, setCategoryAndProductList] = React.useState([]);
    const [sub_category_and_product_list, setCategoryProductList] = React.useState([]);
    const [sub_category_list, setCategoryList] = React.useState([]);
    navigation.setOptions({ title: routes.params.category_name });

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoadingDone(false);
            getCategoryData();
            console.log('refresh again', routes);
        });
        return unsubscribe;
    }, [navigation]);

    async function getCategoryData() {
        setLoadingDone(true);
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        console.log('refresh again', value);
        if (value) {
            var body = new FormData();
            body.append('latitude', '26.8467088');
            body.append('longitude', '80.9461592');
            body.append('category_id', routes.params.tbl_category_id);
            axios({
                method: "POST",
                url: HOME_SUB_CATEGORY_LIST_API,
                data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                    'Authorization': value
                }
            }).then(function (response) {
                //handle success
                if (response.data.status === true) {
                    console.log('InnerCategoryScreen: ', response.data);
                    if (response.data.sub_category_list.length === 0) {
                        console.log('response: ', response.data.sub_category_list.length);
                        setNoDataFound(true);
                        setLoadingDone(false);
                    } else {
                        setCategoryAndProductList(response.data.sub_category_and_product_list);
                        setCategoryList(response.data.sub_category_list);
                        setCategoryProductList(response.data.sub_category_and_product_list)
                        setLoadingDone(false);
                    }
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

    const renderBlog = (items) => {

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('ProductCategory', items)}
                style={{
                    alignContent: 'center', padding: 2, shadowColor: "#aaaaaa",
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    shadowOffset: {
                        height: 1,
                        width: 1
                    },
                    backgroundColor: '#ffffff',
                    margin: 4,
                }}>
                <Image
                    style={{ width: Dimensions.get('screen').width / 3 - 12, height: 120, resizeMode: 'cover', borderRadius: 0 }}
                    source={{ uri: items.android_image }} />
                <View style={{ flexDirection: 'row' }}>
                    <View
                        style={{ marginTop: 5, alignItems: 'center', flex: 1 }}>
                        <Text
                            numberOfLines={1}
                            style={{ fontWeight: 'bold', fontSize: 14, textAlign: 'center', flex: 1, elevation: 'tail' }}>{items.sub_category_name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const renderInnerCategoryProducts = (items) => {

        console.log('inside_category', items);

        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProductSingle', items)} style={{ alignContent: 'center', padding: 5 }}>
                <Image style={{ width: 140, height: 140, resizeMode: 'cover', borderRadius: 0 }} source={{ uri: items.android_image }} />
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ width: 80 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{items.product_name.substring(0, 25)}</Text>
                    </View>
                    <View style={{}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 26 }}>${items.price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const renderBannerSingle = (items) => {
        return (
            <View>
                <View style={{ justifyContent: 'center', marginTop: 0, padding: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{items.sub_category_name}</Text>
                        <View style={{ flex: 1 }}></View>
                        <Image style={{ width: 25, height: 25 }} source={require('../../../assets/images/icons/right_arrow.png')} />
                    </View>
                    <FlatList
                        horizontal
                        data={items.product_list}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => renderInnerCategoryProducts(item)} />
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#ffffff', height: '100%' }}>
            <Spinner
                visible={isLodingDone}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <View style={{ flexDirection: 'row', height: 55, alignItems: 'center', backgroundColor: '#00CCff' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
                    <Image source={require('../../../assets/images/back_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>{routes.params.category_name}</Text>
                </View>
                <TouchableOpacity >
                    <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                    <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
                {NoData ?
                    <View style={{ marginTop: Dimensions.get('screen').width }}>
                        <Text style={{ fontWeight: 'bold', alignSelf: 'center', fontSize: 18 }}>No Data Found</Text>
                    </View> :
                    (<View>
                        <View
                            style={{ justifyContent: 'center', marginTop: 0, padding: 5 }}>
                            <FlatList
                                numColumns={3}
                                data={sub_category_list}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => renderBlog(item)} />
                        </View>
                        <View>
                            <FlatList
                                data={sub_category_and_product_list}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => renderBannerSingle(item)}
                            />
                        </View>
                    </View>)}
            </ScrollView>
        </SafeAreaView>
    )
}

export default InnerCategoryScreen;