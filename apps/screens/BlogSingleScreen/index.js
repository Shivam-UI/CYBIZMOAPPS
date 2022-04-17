import React from 'react';
import { SafeAreaView, View, Text, Image, Dimensions, ScrollView, TouchableOpacity, AsyncStorage, FlatList, Share, Alert, ToastAndroid, AlertIOS } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';
import Spinner from 'react-native-loading-spinner-overlay';
import Carousel from 'react-native-banner-carousel';
import { BLOG_DETAILS_API } from '../../../configApi';
import axios from 'axios';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 280;

const BlogSingleScreen = () => {

    // description,price,create_date,keywords,city
    const routes = useRoute();
    const navigation = useNavigation();
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const [Categoryid, setCategoryid] = React.useState(null);
    const [Content, setContent] = React.useState(null);
    const [CreatedDate, setCreatedDate] = React.useState(null);
    const [CreatedTime, setCreatedTime] = React.useState(null);
    const [Title, setTitle] = React.useState(null);
    const [AuthorName, setAuthorName] = React.useState(null);
    const [AndroidImage, setAndroidImage] = React.useState(null);

    navigation.setOptions({ title: routes.params.category_name })

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log(JSON.stringify(routes));
            getCategoryData();
        });
        return unsubscribe;
    }, [navigation]);

    async function getCategoryData() {

        setLoadingDone(true);

        const value = await AsyncStorage.getItem('@MySuperStore:key');

        if (value) {
            var body = new FormData();
            body.append('blog_id', routes.params.tbl_blog_category_id);
            console.log(body);
            axios({
                method: "POST",
                url: BLOG_DETAILS_API,
                data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                }
            }).then(function (response) {
                //handle success
                console.log('response: ', JSON.stringify(response));
                if (response.data.status === true) {
                    console.log('response: ', JSON.stringify(response.data));
                    setCategoryid(response.data.data[0].category_id);
                    setContent(response.data.data[0].content);
                    setCreatedDate(response.data.data[0].created_date);
                    setCreatedTime(response.data.data[0].created_time);
                    setTitle(response.data.data[0].title);
                    setAuthorName(response.data.data[0].author_name);
                    setAndroidImage(response.data.data[0].android_image);
                    setLoadingDone(false);
                } else {
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
        <SafeAreaView>
            <ScrollView>
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
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>{routes.params.category_name}</Text>
                    </View>
                    <TouchableOpacity >
                        <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                        <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 5 }}>
                    <View>
                        <Image style={{ width: '100%', height: 350 }} source={{ uri: AndroidImage }} />
                        <View style={{ position: 'absolute', right: 0, bottom: 0, padding: 5, backgroundColor: '#aaaaaa' }}>
                            <Text>{Categoryid}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 4 }}>
                        <Text style={{ flex: 1, color: '#aaaaaa' }}>{CreatedTime}</Text>
                        <Text style={{ color: '#aaaaaa' }}>{CreatedDate}</Text>
                    </View>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>{AuthorName}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 5 }}>{Title}</Text>
                        <Text>{Content}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BlogSingleScreen;
