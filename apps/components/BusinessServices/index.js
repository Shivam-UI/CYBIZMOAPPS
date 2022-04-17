import React from 'react';
import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, TextInput, Alert, AsyncStorage, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { MY_WISH_LIST_API } from '../../../configApi';
import axios from 'axios';

const BusinessListScreen = () => {

    const navigation = useNavigation();
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const [DataProducts, setDataProducts] = React.useState([]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoadingDone(true);
            getBlogCategorys();
        });
        return unsubscribe;
    }, [navigation]);

    async function getBlogCategorys() {
 
        // do something
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        console.log(value);

        if (true) {
            axios({
                method: "GET",
                url: MY_WISH_LIST_API,
                // data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                    'Authorization': value
                }
            })
                .then(function (response) {
                    //handle success
                    if (response.data.status === true) {
                        console.log('BusinessListScreen: ', JSON.stringify(response.data));
                        setDataProducts(response.data.product_wishlist);
                        setLoadingDone(false);
                    } else {
                        console.log('BusinessListScreen: ', JSON.stringify(response.data));
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

        console.log(items);

        return (
            <TouchableOpacity style={{
                margin: 2,
                backgroundColor: '#ffffff',
                marginBottom: 10, shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 1,
                padding: 10
            }} onPress={() => navigation.navigate('JobSingleDetails')} >
                <View style={{ flexDirection: 'row', borderBottomColor: '#aaaaaa', borderBottomWidth: 0 }}>
                    <Image style={{ width: '40%', height: 150, resizeMode: 'contain' }} source={{ uri: items.android_image }} />
                    <View style={{ paddingTop: 20, paddingLeft: 10, flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                <Image style={{ width: 20, height: 20 }} source={require('../../../assets/images/pin_icon.png')} />
                                <Text numberOfLines={2} style={{ maxWidth: 150 }}> {items.address}</Text>
                            </View>
                            <Image style={{}} source={require('../../../assets/images/heart_fill.png')} />
                        </View>
                        <Text style={{ marginBottom: 6, fontWeight: 'bold' }}>{items.product_name}</Text>
                        <Text style={{ marginBottom: 6 }}>{items.city}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', flex: 1, fontSize: 18 }}> $ {items.price}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 5 }} source={require('../../../assets/images/icons/eyes_icon.png')} />
                                <Text style={{ fontWeight: 'bold' }}>{items.visited}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
            <Spinner
                visible={isLodingDone}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <View style={{ padding: 2 }}>
                <FlatList
                    style={{}}
                    data={DataProducts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => renderBlog(item)}
                />
            </View>
        </SafeAreaView>
    )

}

export default BusinessListScreen;