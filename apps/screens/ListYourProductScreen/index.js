import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput, Alert, AsyncStorage, StyleSheet, Picker, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ADD_NEW_PRODUCTS_API, SUB_CATEGORY_LIST_API, JOB_CATEGORY_LIST, CATEGORY_LIST_API } from '../../../configApi';
import ImagePicker from 'react-native-image-crop-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';

const ListYourProductScreen = () => {

    const navigation = useNavigation();
    // input field
    const chatInput1 = React.createRef();
    const chatInput2 = React.createRef();
    const chatInput3 = React.createRef();
    const chatInput4 = React.createRef();
    const chatInput5 = React.createRef();
    const chatInput6 = React.createRef();
    const chatInput7 = React.createRef();
    // loader
    const DropDown = [];
    const Years = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const countries = ["Egypt", "Canada", "Australia", "Ireland"];
    const [selected, setValue] = React.useState(null);
    // fields
    const [Categroy, setCategroy] = React.useState(null);
    const [SubCategoryFound, setSubCategoryFound] = React.useState(false);
    const [SubCategory, setSubCategory] = React.useState(null);
    const [ProductName, setProductName] = React.useState(null);
    const [ProductDiscripition, setProductDiscripition] = React.useState(null);
    const [Price, setPrice] = React.useState(null);
    const [Year, setYear] = React.useState(null);
    const [Keywords, setKeywords] = React.useState(null);
    const [ImageOrVideos, setImageOrVideos] = React.useState(null);
    const [ImagePath, setImagePath] = React.useState([]);
    const [isHaveImage, setHaveImage] = React.useState(false);
    // new fields
    const [Brand, setBrand] = React.useState(null);
    const [Conditions, setConditions] = React.useState(null);
    const [Models, setModels] = React.useState(null);
    const [EstimatedShipping, setEstimatedShipping] = React.useState(null);
    const [RealEstateLicense, setRealEstateLicense] = React.useState(null);
    const [YearBuilt, setYearBuilt] = React.useState(null);
    const [HowManyStories, setHowManyStories] = React.useState(null);
    const [SquareFootage, setSquareFootage] = React.useState(null);
    const [PlotSize, setPlotSize] = React.useState(null);
    const [Bedrooms, setBedrooms] = React.useState(null);
    const [Bathrooms, setBathrooms] = React.useState(null);
    const [GarageParking, setGarageParking] = React.useState(null);
    const [Availibity, setAvailibity] = React.useState(null);
    const [Condition, setCondition] = React.useState(null);
    const [Cylinders, setCylinders] = React.useState(null);
    const [FuelType, setFuelType] = React.useState(null);
    const [Odometer, setOdometer] = React.useState(null);
    const [Transmission, setTransmission] = React.useState(null);
    const [MakeBrand, setMakeBrand] = React.useState(null);
    const [MFGYear, setMFGYear] = React.useState(null);
    // ends
    const [selectedcat, setselectedcat] = React.useState(null);
    const [CategoryData, setCategoryData] = React.useState([]);
    const [SubCategoryDataList, setSubCategoryDataList] = React.useState([]);
    const [selectCategory, dropdownonSelect] = React.useState(null);
    const [HERE_API_KEY, setHERE_API_KEY] = React.useState('AIzaSyA0ewrYbiWkqro7lC3V2jzk9efnQD4EqwQ');
    const [LocationDone, setLocationDone] = React.useState('New york, USA');
    const [LocationType, setLocationType] = React.useState('');
    const [LocationAddress, setLocationAddress] = React.useState('');
    let controller;

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoadingDone(true);
            Geocoder.init(HERE_API_KEY); // use a valid API key
            getCurrentLocation();
            getCategoryData();
        });
        return unsubscribe;
    }, [navigation]);

    async function getCurrentLocation() {
        const Locationkey = await AsyncStorage.getItem('@MySuperStore:SkipType');
        const value = await AsyncStorage.getItem('@MySuperStore:Locationkey');
        console.log('getCurrentLocation', value + ' \ ' + Locationkey);
        if (!value) {
            goToBarcodeScreen();
        } else {
            setLocationType(Locationkey);
            setLocationDone(value);
            getAddressFromCoordinates(value);
        }
    }

    function getAddressFromCoordinates(latitude) {
        console.log(latitude);
        // 
        Geocoder.from(latitude) //26.8467088, 80.9461592)
            .then(json => {
                var addressComponent = json.results[0].address_components[0];
                var addressComponent1 = json.results[0].formatted_address;
                setLocationAddress(addressComponent1);
                console.log('getAddressFromCoordinates', JSON.stringify(addressComponent) + ' / ' + JSON.stringify(addressComponent1));
            })
            .catch(error => console.warn(error));
    }

    async function getCategoryData() {
        setLoadingDone(true);
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        if (value) {
            var body = new FormData();
            body.append('category_type', 'Product');
            axios({
                method: "POST",
                url: CATEGORY_LIST_API,
                data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                }
            })
                .then(function (response) {
                    //handle success
                    // console.log('response: ', JSON.stringify(response.data));
                    if (response.data.status === true) {
                        // console.log('response: ', JSON.stringify(response.data.data));
                        setCategoryData(response.data.data)
                        previewData(response.data.data);
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

    async function getSubCategoryData(selectedItems) {
        setLoadingDone(true);
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        if (value) {
            var body = new FormData();
            body.append('category_id', selectedItems);
            console.log('response: ', JSON.stringify(body));
            axios({
                method: "POST",
                url: SUB_CATEGORY_LIST_API,
                data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                    'Authorization': value
                }
            })
                .then(function (response) {
                    //handle success
                    // console.log('response: ', JSON.stringify(response.data));
                    if (response.data.status === true) {
                        console.log('response: ', JSON.stringify(response.data.data));
                        setSubCategoryDataList(response.data.data)
                        // previewSubData(response.data.data);
                        setLoadingDone(false);
                    } else {
                        Alert.alert(response.data.message);
                        setSubCategoryDataList([])
                        setLoadingDone(false);
                    }
                })
                .catch(function (error) {
                    setLoadingDone(false);
                    console.log('error: ', error);
                });
        }
    }

    async function previewData(mData) {
        mData.map((data, idx) => {
            console.log(data.category_name)
            DropDown.push(data.category_name);
            // { name: data.category_name, value: data.tbl_category_id }
        });
        console.log(DropDown);
        setLoadingDone(false);
    }

    async function handleChange(value) {
        console.log(value)
        setValue(value);
        getSubCategoryData(value);
        console.log('Called: Sub');
    }

    async function onValueChangeCat(value) {
        this.setState({ selectedcat: value });
    }

    async function AddProductServices() {
        // if (Categroy === null) {
        //     alert('Enter Categroy');
        //     return false
        // }
        // if (SubCategory === null) {
        //     alert('Enter Sub Category');
        //     return false
        // }
        // if (ProductName === null) {
        //     alert('Enter Product Name');
        //     return false
        // }
        // if (ProductDiscripition === null) {
        //     alert('Enter Product Discripition');
        //     return false
        // }
        // if (Price === null) {
        //     alert('Enter Price');
        //     return false
        // }
        // if (Year === null) {
        //     alert('Enter Year');
        //     return false
        // }
        // if (Keywords === null) {
        //     alert('Enter Keywords');
        //     return false
        // }
        // if (ImagePath === null) {
        //     alert('Select Image Or Videos');
        //     return false
        // }
        AddNewBusiness();
    }

    async function AddNewBusiness() {
        setLoadingDone(true);
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        console.log(value);
        if (value) {
            var today = Math.round((new Date()).getTime() / 1000);
            var imageName = 'image_' + today + '.jpg';
            console.log(imageName);
            var body = new FormData();
            body.append('category_id', Categroy);
            body.append('sub_category_id', SubCategory);
            body.append('product_name', ProductName);
            body.append('description', ProductDiscripition);
            body.append('price', Price);
            body.append('year', Year);
            body.append('tags', '');
            body.append('cylinders', Cylinders);
            body.append('fuel_type', FuelType);
            body.append('odometer', Odometer);
            body.append('transmission', Transmission);
            body.append('licence', RealEstateLicense);
            body.append('condition', Condition);
            body.append('other_condition', Conditions);
            body.append('tokenamount', '0');
            body.append('check_listing_type', 'Free');
            body.append('validity_days', '0');
            body.append('submit_type', 'Submit');
            body.append('avalibility', Availibity);
            body.append('garage_parking', GarageParking);
            body.append('bathrooms', Bathrooms);
            body.append('bedrooms', Bedrooms);
            body.append('plot_size', PlotSize);
            body.append('square_footage', SquareFootage);
            body.append('how_many_stories', HowManyStories);
            body.append('year_built', YearBuilt);
            body.append('estimating_shiping_cost', EstimatedShipping);
            body.append('mxg_year', '');
            body.append('model', Models);
            body.append('brand', Brand);
            body.append('state', '');
            body.append('country', '');
            body.append('Response', '');
            body.append('keywords', '');
            body.append('product_type', '');
            body.append('address', LocationType === 'Location' ? LocationAddress : LocationDone);
            body.append('pincode', '');
            body.append('city', '');
            body.append('latitude', '23.09387493');
            body.append('longitude', '58.928476211');
            body.append('video[' + 0 + ']', '');

            ImagePath.forEach((element, i) => {
                let imageData = {
                    uri: element,
                    type: 'image/jpeg',
                    name: imageName,
                }
                body.append('product_image[' + i + ']', imageData);
            });

            console.log(JSON.stringify(body));

            axios({
                method: "POST",
                url: ADD_NEW_PRODUCTS_API,
                data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                    'Authorization': value,
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(function (response) {
                    // handle success
                    console.log('response: ', JSON.stringify(response.data));
                    if (response.data.status === true) {
                        setLoadingDone(false);
                        Alert.alert('successful', 'THANK YOU FOR POSTING AN AD.Make this AD featured. It will help users find you on top',
                            [
                                { text: 'Check Products', onPress: () => navigation.replace('MyProducts') },

                            ],
                            { cancelable: false });
                    } else {
                        Alert.alert('Successful', 'THANK YOU FOR POSTING AN AD.Make this AD featured. It will help users find you on top',
                            [
                                { text: 'Check Products', onPress: () => navigation.replace('MyProducts') },

                            ],
                            { cancelable: false });
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

    async function setMainCategoryForSubCategory(MainCategory) {
        setCategroy(MainCategory);
        getSubCategoryData(MainCategory);
    }

    async function selectImageOrVideos() {
        console.log('select image');
        ImagePicker.openPicker({
            width: 600,
            height: 800,
            cropping: true,
            multiple: true,
            mediaType: 'image',
        }).then(response => {
            let tempArray = []
            console.log("responseimage-------", JSON.stringify(response));
            response.forEach((item) => {
                tempArray.push(item.path);
            })
            setImagePath(tempArray);
            setHaveImage(true);
        });
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
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
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>{"List Your Products"}</Text>
                </View>
                <TouchableOpacity >
                    <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={() => navigation.navigate('NotifictionScreen')} >
                    <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
            </View>
            <ScrollView style={{}}>
                <View style={{ padding: 20, flexDirection: 'column' }}>
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa' }}>
                        <Picker
                            style={{}}
                            selectedValue={Categroy}
                            onValueChange={(value) => {
                                console.log(value);
                                setMainCategoryForSubCategory(value);
                            }} >
                            <Picker.Item label={'Select Category'} value={''} />
                            {CategoryData.map((data, idx) => {
                                return <Picker.Item label={data.category_name} value={data.tbl_category_id} />
                            })}
                        </Picker>
                    </View>
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                        {CategoryData.length > 0 ?
                            <Picker
                                style={{}}
                                selectedValue={SubCategory}
                                onValueChange={(value) => {
                                    console.log(value);
                                    setSubCategory(value);
                                }} >
                                <Picker.Item label={'Select Sub Category'} value={''} />
                                {SubCategoryDataList.map((data, idx) => {
                                    return <Picker.Item label={data.sub_category_name} value={data.tbl_sub_category_id} />
                                })}
                            </Picker> : (<View></View>)}
                    </View>
                    {Categroy === '3' ?
                        <View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Title'}
                                    onChangeText={(num) => setProductName(num)}
                                    maxLength={30}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Price'}
                                    keyboardType='number-pad'
                                    onChangeText={(num) => setPrice(num)}
                                    maxLength={10}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Brand'}
                                    onChangeText={(brand) => setBrand(brand)}
                                    maxLength={30}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Condition'}
                                    onChangeText={(num) => setConditions(num)}
                                    maxLength={50}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Model'}
                                    onChangeText={(num) => setModels(num)}
                                    maxLength={30}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Estimated Shipping Cost'}
                                    onChangeText={(num) => setEstimatedShipping(num)}
                                    maxLength={30}
                                />
                            </View>
                        </View> :
                        <View></View>
                    }
                    {Categroy === '4' ?
                        <View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Title *'}
                                    onChangeText={(num) => setProductName(num)}
                                    maxLength={30}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Price *'}
                                    keyboardType='number-pad'
                                    onChangeText={(num) => setPrice(num)}
                                    maxLength={10}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Real Estate License *'}
                                    onChangeText={(num) => setRealEstateLicense(num)}
                                    maxLength={30}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Year Built'}
                                    keyboardType='number-pad'
                                    onChangeText={(num) => setYearBuilt(num)}
                                    maxLength={4}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'How Many Stories/Levels'}
                                    onChangeText={(num) => setHowManyStories(num)}
                                    maxLength={100}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Square Footage'}
                                    onChangeText={(num) => setSquareFootage(num)}
                                    maxLength={30}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Plot size'}
                                    keyboardType='number-pad'
                                    onChangeText={(num) => setPlotSize(num)}
                                    maxLength={10}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Bedrooms'}
                                    keyboardType='number-pad'
                                    onChangeText={(num) => setBedrooms(num)}
                                    maxLength={2}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Bathrooms'}
                                    keyboardType='number-pad'
                                    onChangeText={(num) => setBathrooms(num)}
                                    maxLength={2}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Garage/Parking'}
                                    keyboardType='number-pad'
                                    onChangeText={(num) => setGarageParking(num)}
                                    maxLength={3}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Availibity'}
                                    onChangeText={(num) => setAvailibity(num)}
                                    maxLength={30}
                                />
                            </View>
                        </View> :
                        <View></View>
                    }
                    {Categroy === '5' ?
                        <View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Title *'}
                                    onChangeText={(num) => setProductName(num)}
                                    maxLength={30}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Price *'}
                                    keyboardType='number-pad'
                                    onChangeText={(num) => setPrice(num)}
                                    maxLength={10}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Condition'}
                                    onChangeText={(num) => setCondition(num)}
                                    maxLength={30}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Cylinders'}
                                    onChangeText={(num) => setCylinders(num)}
                                    maxLength={30}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Fuel Type'}
                                    onChangeText={(num) => setFuelType(num)}
                                    maxLength={30}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Odometer'}
                                    onChangeText={(num) => setOdometer(num)}
                                    maxLength={30}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Transmission'}
                                    onChangeText={(num) => setTransmission(num)}
                                    maxLength={30}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'Make/Brand'}
                                    onChangeText={(num) => setMakeBrand(num)}
                                    maxLength={30}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput3}
                                    placeholder={'MFG. Year'}
                                    keyboardType='number-pad'
                                    onChangeText={(num) => setMFGYear(num)}
                                    maxLength={4}
                                />
                            </View>
                        </View> :
                        <View></View>
                    }
                    {/* <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                        <TextInput 
                            style={{ height: 45, padding: 15 }}
                            ref={chatInput3}
                            placeholder={'Product Name'}
                            onChangeText={(num) => setProductName(num)}
                            maxLength={30}
                        />
                    </View> */}
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                        <TextInput
                            style={{ height: 145, padding: 15 }}
                            ref={chatInput4}
                            placeholder={'Product Discription'}
                            multiline={true}
                            numberOfLines={13}
                            onChangeText={(pass) => setProductDiscripition(pass)}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {/* <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15, flex: 1 / 2, marginRight: 10 }}>
                            <TextInput
                                style={{ height: 45, padding: 15 }}
                                ref={chatInput5}
                                placeholder={'Price'}
                                onChangeText={(pass) => setPrice(pass)}
                                maxLength={5}
                            />
                        </View> */}
                        {/* <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15, flex: 1 / 2 }}>
                            <ModalDropdown
                                defaultValue='Years'
                                style={{ height: 45, padding: 15, color: '#aaaaaa' }}
                                options={Years}
                                onSelect={(year) => setYear(year)} />
                        </View> */}
                    </View>
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                        <TextInput
                            style={{ height: 45, padding: 15 }}
                            ref={chatInput7}
                            placeholder={'Keywords'}
                            onChangeText={(pass) => setKeywords(pass)}
                        />
                    </View>
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                        <TextInput
                            style={{ height: 45, padding: 15 }}
                            ref={chatInput7}
                            placeholder={'Tags'}
                            onChangeText={(pass) => setKeywords(pass)}
                        />
                    </View>
                    <View style={{}}>
                        <Text style={{ color: '#aaaaaa', marginTop: 10 }}>Imges & Videos</Text>
                        <TouchableOpacity onPress={() => selectImageOrVideos()} style={{ width: 155, height: 155, borderRadius: 5, borderColor: '#aaaaaa', margin: isHaveImage ? 0 : 5, borderWidth: isHaveImage ? 0 : 1 }}>
                            {isHaveImage ?
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {ImagePath.map((image) => {
                                        console.log(image)
                                        return (
                                            <View style={{ padding: 5 }}>
                                                <Image style={{ width: 70, height: 70, resizeMode: 'cover', borderRadius: 5 }} source={{ uri: image }} />
                                            </View>
                                        );
                                    })
                                    }
                                </View>
                                :
                                <Image style={{ width: 150, height: 150, tintColor: '#aaaaaa', resizeMode: 'contain' }} source={require('../../../assets/images/add_image_icon.png')} />}
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => AddProductServices()} style={{ backgroundColor: '#00CCFF', padding: 17, marginTop: 18 }}>
                        <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center', letterSpacing: 5 }}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    headingText: {
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#AAA',
        marginTop: 15,
        fontSize: 16
    }, boxWithShadow: {
        flex: 1 / 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,
        padding: 10,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        margin: 5,
        borderRadius: 10,
    }, title: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
        marginBottom: 5,
        flex: 1
    }, viewStyle: {
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        width: "92%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    itemStyle: {
        fontSize: 10,
        color: "#007aff"
    },
    pickerStyle: {
        width: "100%",
        height: 40,
        color: "#007aff",
        fontSize: 14,
    },
    textStyle: {
        fontSize: 14,
    }, iosPicker: {
        backgroundColor: 'rgba(178,181,189,0.1)',
        borderColor: 'rgb(178,181,189)',
        borderTopWidth: 1,
        padding: 0,
    },
    androidBoxStyle: {
        flex: 1,
        flexDirection: 'column',
    },
    androidPicker: {
        flex: 1,
        alignItems: 'center'
    },
    androidPickerWrapper: {
        borderBottomWidth: 1,
        borderColor: 'rgb(178,181,189)'
    },
    toggleBox: {
        borderColor: 'rgb(178,181,189)',
        borderBottomWidth: 1,
    }
});

export default ListYourProductScreen;