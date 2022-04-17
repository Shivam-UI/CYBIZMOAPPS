import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';


const BLOGLIST = [
    {
        id: 1,
        image: require('../../../assets/images/16.jpg'),
        name: 'Appliances',
        price: '45',
    }, {
        id: 1,
        image: require('../../../assets/images/17.jpg'),
        name: 'Art And Craft',
        price: '45',
    }, {
        id: 1,
        image: require('../../../assets/images/18.jpg'),
        name: 'Automotive Items',
        price: '45',
    }, {
        id: 1,
        image: require('../../../assets/images/19.jpg'),
        name: 'Collectable',
        price: '45',
    }, {
        id: 1,
        image: require('../../../assets/images/21.jpg'),
        name: 'Games',
        price: '45',
    }, {
        id: 1,
        image: require('../../../assets/images/23.jpg'),
        name: 'Kitchen',
        price: '45',
    }
];
const PRODUCTLIST = [
    {
        id: 1,
        image: require('../../../assets/images/4.jpg'),
        name: 'Title Goes Here',
        price: '45',
    }, {
        id: 1,
        image: require('../../../assets/images/5.webp'),
        name: 'Title Goes Here',
        price: '45',
    }, {
        id: 1,
        image: require('../../../assets/images/6.jpg'),
        name: 'Title Goes Here',
        price: '45',
    }
];
const PRODUCTLISTTWO = [
    {
        id: 1,
        image: require('../../../assets/images/1.jpg'),
        name: 'Title Goes Here',
        price: '45',
    }, {
        id: 1,
        image: require('../../../assets/images/3.jpg'),
        name: 'Title Goes Here',
        price: '45',
    }, {
        id: 1,
        image: require('../../../assets/images/6.jpg'),
        name: 'Title Goes Here',
        price: '45',
    }
];
const PRODUCTLISTTHREE = [
    {
        id: 1,
        image: require('../../../assets/images/7.jpg'),
        name: 'Title Goes Here',
        price: '45',
    }, {
        id: 1,
        image: require('../../../assets/images/8.jpg'),
        name: 'Title Goes Here',
        price: '45',
    }, {
        id: 1,
        image: require('../../../assets/images/9.jpg'),
        name: 'Title Goes Here',
        price: '45',
    }
]; 

const CategorySinglePage = () => {

    const routes = useRoute();
    const navigation = useNavigation();
    const [isLodingDone, setLoadingDone] = React.useState(false);
    
    // navigation.setOptions({ title: routes.params.categoryName })
    
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoadingDone(false);
            console.log('refresh again');
        });
        return unsubscribe;
    }, [navigation]);

    const renderBlog = (items) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProductCategory', items)} style={{ alignContent: 'center', padding: 5 }}>
                <Image style={{ width: Dimensions.get('screen').width / 3 - 12, height: 120, resizeMode: 'cover', borderRadius: 0 }} source={items.image} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginTop: 5, alignItems: 'center', flex: 1 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14, textAlign: 'center', flex: 1 }}>{items.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const renderBannerSingle = (items) => {

        return (
            <TouchableOpacity style={{ alignContent: 'center', padding: 5 }}>
                <Image style={{ width: 140, height: 140, resizeMode: 'cover', borderRadius: 0 }} source={items.image} />
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ width: 80 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{items.name}</Text>
                    </View>
                    <View style={{}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 26 }}>${items.price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView>
            <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
                <View>
                    <View style={{ justifyContent: 'center', marginTop: 0, padding: 10 }}>
                        <FlatList
                            numColumns={3}
                            data={BLOGLIST}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => renderBlog(item)}
                        />
                    </View>
                    <View style={{ justifyContent: 'center', marginTop: 0, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Appliances</Text>
                            <View style={{ flex: 1 }}></View>
                            <Image style={{ width: 25, height: 25 }} source={require('../../../assets/images/icons/right_arrow.png')} />
                        </View>
                        <FlatList
                            horizontal
                            data={PRODUCTLIST}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => renderBannerSingle(item)}
                        />
                    </View>
                    <View style={{ justifyContent: 'center', marginTop: 0, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Art And Craft</Text>
                            <View style={{ flex: 1 }}></View>
                            <Image style={{ width: 25, height: 25 }} source={require('../../../assets/images/icons/right_arrow.png')} />
                        </View>
                        <FlatList
                            horizontal
                            data={PRODUCTLISTTWO}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => renderBannerSingle(item)}
                        />
                    </View>
                    <View style={{ justifyContent: 'center', marginTop: 0, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Automotive Items</Text>
                            <View style={{ flex: 1 }}></View>
                            <Image style={{ width: 25, height: 25 }} source={require('../../../assets/images/icons/right_arrow.png')} />
                        </View>
                        <FlatList
                            horizontal
                            data={PRODUCTLISTTHREE}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => renderBannerSingle(item)}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CategorySinglePage;