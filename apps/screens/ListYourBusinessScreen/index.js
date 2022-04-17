import React from 'react';
import { View, Text, SafeAreaView, Picker, ScrollView, TouchableOpacity, TextInput, Alert, AsyncStorage, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import CheckBox from '@react-native-community/checkbox';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ADD_NEW_SERVICES_API, JOB_CATEGORY_LIST, CATEGORY_LIST_API, SUB_CATEGORY_LIST_API } from '../../../configApi';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-simple-toast';
import axios from 'axios';

const ListYourBusiness = () => {

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
    const [isLodingDone, setLoadingDone] = React.useState(false);
    const [CategoryData, setCategoryData] = React.useState([]);
    const [SubCategoryDataList, setSubCategoryDataList] = React.useState([]);
    // days & open close type
    const [SelectDays, setSelectDays] = React.useState([{ id: '0', days_name: 'Monday' }, { id: '1', days_name: 'Tuesday' }, { id: '1', days_name: 'Tuesday' }, { id: '1', days_name: 'Wednesday' }, { id: '1', days_name: 'Thuesday' }, , { id: '1', days_name: 'Friday' }, { id: '1', days_name: 'Saturday' }, { id: '1', days_name: 'Sunday' }]);
    const [OpenCloseData, setOpenCloseData] = React.useState([{ id: '0', type: 'Open' }, { id: '1', type: 'Close' }]);
    const [Categroy, setCategroy] = React.useState('');
    const [SubCategroy, setSubCategroy] = React.useState('');
    // drop down
    const [Description, setDescription] = React.useState('');
    const [Keywords, setKeywords] = React.useState('');
    const [Tags, setTags] = React.useState('');
    // const [Categroy, setCategroy] = React.useState(null);
    // const [BusinessName, setBusinessName] = React.useState(null);
    const [OpenDays, setOpenDays] = React.useState('');
    const [OpenHours, setOpenHours] = React.useState('');
    // const [ContactPersonName, setContactPersonName] = React.useState(null);
    const [WebSite, setWebSite] = React.useState('');
    const [ServiceKeyword, setServiceKeyword] = React.useState('');
    const [ContactNum, setContactNum] = React.useState('');
    const [ServicAddTitle, setServicAddTitle] = React.useState('');
    const [ContactVisible, setContactVisible] = React.useState('');
    const [OnlineOrOffline, setOnlineOrOffline] = React.useState('');
    const [MultiImagePath, setMultiImagePath] = React.useState([]);
    const [isHaveImage, setHaveImage] = React.useState(false);
    const [toggleCheckBox, setToggleCheckBox] = React.useState(false);
    // date picker
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = React.useState(false);
    const [DateValue, setDateValue] = React.useState('');
    const [TimeValue, setTimeValue] = React.useState('');
    // new fields
    const [EntryType, setEntryType] = React.useState('');
    const [EntryDate, setEntryDate] = React.useState('');
    const [EntryTime, setEntryTime] = React.useState('');
    const [Title, setTitle] = React.useState('');
    const [Price, setPrice] = React.useState('');
    const [Pets, setPets] = React.useState('');
    const [Deposit, setDeposit] = React.useState('');
    const [YearBuild, setYearBuild] = React.useState('');
    const [HowManyStories, setHowManyStories] = React.useState('');
    const [SquareFootage, setSquareFootage] = React.useState('');
    const [LotSize, setLotSize] = React.useState('');
    const [Bedrooms, setBedrooms] = React.useState('');
    const [Bathroom, setBathroom] = React.useState('');
    const [GarageParking, setGarageParking] = React.useState('');
    const [Laundry, setLaundry] = React.useState('');
    const [Availibilty, setAvailibilty] = React.useState('');
    const [ListedBy, setListedBy] = React.useState('');
    const [AvailableOn, setAvailableOn] = React.useState('');
    // date and time / opening and closing
    const [OpeningData, setOpeningData] = React.useState('');
    const [OpeningTime, setOpeningTime] = React.useState('');
    const [ClosingDate, setClosingDate] = React.useState('');
    const [ClosingTime, setClosingTime] = React.useState('');
    // true false
    const [isCatsAllow, setCatsAllow] = React.useState(false);
    const [isDogsAllow, setDogsAllow] = React.useState(false);
    const [isFurnished, setFurnished] = React.useState(false);
    const [isNoSmoking, setNoSmoking] = React.useState(false);
    const [isWheelChair, setWheelChair] = React.useState(false);
    const [isAirConditioning, setAirConditioning] = React.useState(false);
    const [isEvCharging, setEvCharging] = React.useState(false);
    // term & conditions 
    const [TermsAndconditions, setTermsAndconditions] = React.useState('');
    // business 
    const [BusinessName, setBusinessName] = React.useState('');
    const [ServiceAdTitle, setServiceAdTitle] = React.useState('');
    const [Days, setDays] = React.useState('');
    const [OpeningDays, setOpeningDays] = React.useState('');
    // 
    const [OperatingHoursFrom, setOperatingHoursFrom] = React.useState('');
    const [OperatingHoursTo, setOperatingHoursTo] = React.useState('');
    const [BusinessLicense, setBusinessLicense] = React.useState('');
    const [ContactPersonName, setContactPersonName] = React.useState('');
    const [Website, setWebsite] = React.useState('');
    const [ContactNo, setContactNo] = React.useState('');
    // 
    const [isContactVisibility, setContactVisibility] = React.useState(false);
    const [isOperationMode, setOperationMode] = React.useState(false);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoadingDone(true);
            getCategoryData();
            getSubCategoryData(null);
        });
        return unsubscribe;
    }, [navigation]);

    // date
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    // time
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };
    // date
    const handleDateConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setDateValue(date);
        hideDatePicker();
    };
    // time
    const handleTimeConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setTimeValue(date);
        hideDatePicker();
    };


    async function getCategoryData() {
        setLoadingDone(true);
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        if (value) {
            var body = new FormData();
            body.append('category_type', 'Service');
            axios({
                method: "POST",
                url: CATEGORY_LIST_API,
                data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                }
            })
                .then(function (response) {
                    // handle success
                    console.log('response: ', JSON.stringify(response.data));
                    if (response.data.status === true) {
                        console.log('response: ', JSON.stringify(response.data.data));
                        setCategoryData(response.data.data);
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

    async function AddNewBusiness() {

        console.log('this is test function')

        // if (Categroy === null) {
        //     alert('Enter Categroy');
        //     return false
        // }
        // if (BusinessName === null) {
        //     alert('Enter Business Name');
        //     return false
        // }
        // if (OpenDays === null) {
        //     alert('Enter Open Days');
        //     return false
        // }
        // if (OpenHours === null) {
        //     alert('Enter Open Hours');
        //     return false
        // }
        // if (ContactPersonName === null) {
        //     alert('Enter Contact Person Name');
        //     return false
        // }
        // if (WebSite === null) {
        //     alert('Enter Web Site');
        //     return false
        // }
        // if (ServiceKeyword === null) {
        //     alert('Enter Service Keyword');
        //     return false
        // }
        // if (ContactNum === null) {
        //     alert('Enter Contact Number');
        //     return false
        // }
        // if (ServicAddTitle === null) {
        //     alert('Enter Servic Add Title');
        //     return false
        // }
        // if (ContactVisible === null) {
        //     alert('Enter Contact Visible');
        //     return false
        // }
        // if (OnlineOrOffline === null) {
        //     alert('Enter Online Or Offline');
        //     return false
        // }
        // if (MultiImagePath.length === 0) {
        //     alert('Please add Image');
        //     return false
        // }
        AddBusiness();
    }

    async function AddBusiness() {
        
        setLoadingDone(true);
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        var today = Math.round((new Date()).getTime() / 1000);
        var imageName = 'image_' + today + '.jpg';

        if (value) {
            var body = new FormData();
            body.append('category_id', Categroy);
            body.append('sub_category_id', SubCategroy);
            body.append('business_name', 'BusinessName');
            body.append('description', 'Description');
            // body.append('pets', Pets);
            // body.append('deposit', Deposit);
            // body.append('year_built', YearBuild);
            // body.append('how_many_stories', HowManyStories);
            // body.append('square_footage', SquareFootage);
            // body.append('plot_size', LotSize);
            // body.append('bedrooms', Bedrooms);
            // body.append('bathrooms', Bathroom);
            // body.append('garage_parking', GarageParking);
            // body.append('laundry', Laundry);
            // body.append('avalibility', Availibilty);
            // body.append('listed_by', ListedBy);
            // body.append('available_on', AvailableOn);
            // body.append('opening_date', OpeningData);
            // body.append('opening_time', OpeningTime);
            // body.append('closing_date', ClosingDate);
            // body.append('closing_time', ClosingTime);
            // body.append('cat_allowed', isCatsAllow);
            // body.append('dogs_allowed', isDogsAllow);
            // body.append('furnished', isFurnished);
            // body.append('no_smoking', isNoSmoking);
            // body.append('wheelchair_accessible', isWheelChair);
            // body.append('air_conditioning', isAirConditioning);
            // body.append('EV_charging', isEvCharging);
            // body.append('terms_condtions', TermsAndconditions);
            body.append('lease[0]', 'week');
            body.append('price[0]', '70');
            body.append('tokenamount', '0');
            body.append('listing_type', 'Free');
            body.append('validity_days', '0');
            // body.append('operating_days', OpeningDays);
            // body.append('operating_hours', OperatingHoursTo);
            // body.append('hours_to', '');
            // body.append('contact_person_name', ContactPersonName);
            // body.append('website_url', Website);
            // body.append('contact_number', ContactNo);
            // body.append('service_add_title', ServiceAdTitle);
            // body.append('service_keyword', '');
            // body.append('licence', BusinessLicense);
            // body.append('entry_type', EntryType);
            // body.append('date', '');
            // body.append('time', '');
            // body.append('service_keywords', ServiceKeyword);
            // body.append('contact_number', ContactNum);
            // body.append('service_title', ServicAddTitle);
            // body.append('contact_visibility', ContactVisible);
            // body.append('operation_mode', isOperationMode);
            // body.append('address', '21st Street, Main Road, Model Town 3rd, New Delhi, 110009');
            // body.append('pincode', '110009');
            // body.append('city', 'Delhi');
            // body.append('state', '');
            // body.append('country', '');
            // body.append('pincode', '');
            body.append('submit_type', 'Submit');
            // body.append('pincode', '');
            // body.append('latitude', '23.09387493');
            // body.append('longitude', '58,928476211');
            // body.append('about_services', 'Service');
            // body.append('service_type', 'Service');
            body.append('video[0]', '');
            MultiImagePath.forEach((element, i) => {
                let imageData = {
                    uri: element,
                    type: 'image/jpeg',
                    name: imageName,
                }
                body.append('Image[' + i + ']', imageData);
            });

            console.log(JSON.stringify(body));

            axios({
                method: "POST",
                url: ADD_NEW_SERVICES_API,
                data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                    'Authorization': value,
                }
            })
                .then(function (response) {
                    // handle success
                    console.log('response: ', JSON.stringify(response.data));
                    if (response.data.status === true) {
                        setLoadingDone(false);
                        Alert.alert(response.data.message);
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

    const AadharImageBack = () => {
        ImagePicker.openPicker({
            includeBase64: true,
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
            setMultiImagePath(tempArray);
            setHaveImage(true);
        });
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
                    'Authorization': value,
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
                        Toast.showWithGravity(response.data.message, Toast.LONG, Toast.TOP);
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

    // onPress={() => navigation.goBack()}

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
                <View style={{ flex: 1, alignItems: 'center', marginLeft: 15 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>List Your Business</Text>
                </View>
                <TouchableOpacity >
                    <Image source={require('../../../assets/images/search_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
                <TouchableOpacity >
                    <Image source={require('../../../assets/images/bell_icon.png')} style={{ width: 25, height: 25, marginRight: 15, resizeMode: 'contain', tintColor: '#FFFFFF' }} />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ padding: 20, marginBottom: 0 }}>
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa' }}>
                    <Picker
                        style={{}}
                        selectedValue={Categroy}
                        onValueChange={(value) => {
                            console.log(value);
                            getSubCategoryData(value);
                            setCategroy(value);
                        }} >
                        <Picker.Item label={'Select Category'} value={''} />
                        {CategoryData.map((data, idx) => {
                            return <Picker.Item label={data.category_name} value={data.tbl_category_id} />
                        })}
                    </Picker>
                </View>
                <View>
                    {Categroy.length !== 0 ?
                        <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                            <Picker
                                style={{}}
                                selectedValue={SubCategroy}
                                onValueChange={(value) => {
                                    console.log(value);
                                    setSubCategroy(value);
                                }} >
                                <Picker.Item label={'Select Sub Category'} value={''} />
                                {SubCategoryDataList.map((data, idx) => {
                                    return <Picker.Item label={data.sub_category_name} value={data.tbl_sub_category_id} />
                                })}
                            </Picker>
                        </View>
                        :
                        null
                    }
                </View>
                <View>
                    {Categroy === '7' ?
                        <View style={{ marginTop: 5 }}>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput2}
                                    placeholder={'$ Price'}
                                    maxLength={5}
                                    onChangeText={(name) => setPrice(name)}
                                    keyboardType={'numeric'}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput2}
                                    placeholder={'Title'}
                                    maxLength={50}
                                    onChangeText={(name) => setBusinessName(name)}
                                    keyboardType={'default'}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput2}
                                    placeholder={'Pets'}
                                    maxLength={50}
                                    onChangeText={(name) => setPets(name)}
                                    keyboardType={'default'}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput2}
                                    placeholder={'Deposit'}
                                    maxLength={50}
                                    onChangeText={(name) => setDeposit(name)}
                                    keyboardType={'default'}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput2}
                                    placeholder={'Year Built'}
                                    maxLength={4}
                                    onChangeText={(name) => setYearBuild(name)}
                                    keyboardType={'numeric'}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput2}
                                    placeholder={'How Many Stories/Levels'}
                                    onChangeText={(name) => setHowManyStories(name)}
                                    maxLength={50}
                                    keyboardType={'default'}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput2}
                                    placeholder={'Square Footage'}
                                    onChangeText={(name) => setSquareFootage(name)}
                                    maxLength={50}
                                    keyboardType={'default'}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput2}
                                    placeholder={'Lot size'}
                                    onChangeText={(name) => setLotSize(name)}
                                    maxLength={50}
                                    keyboardType={'default'}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput2}
                                    placeholder={'Bedrooms'}
                                    onChangeText={(name) => setBedrooms(name)}
                                    maxLength={2}
                                    keyboardType={'numeric'}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput2}
                                    placeholder={'Bathrooms'}
                                    onChangeText={(name) => setBathroom(name)}
                                    maxLength={50}
                                    keyboardType={'numeric'}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput2}
                                    placeholder={'Garage/Parking'}
                                    onChangeText={(name) => setGarageParking(name)}
                                    maxLength={50}
                                    keyboardType={'default'}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput2}
                                    placeholder={'Laundry'}
                                    onChangeText={(name) => setLaundry(name)}
                                    keyboardType={'default'}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput2}
                                    placeholder={'Availibity'}
                                    onChangeText={(name) => setAvailibilty(name)}
                                    maxLength={50}
                                    keyboardType={'default'}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput2}
                                    placeholder={'Listed By'}
                                    onChangeText={(name) => setListedBy(name)}
                                    keyboardType={'default'}
                                />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput2}
                                    placeholder={'Available On'}
                                    onChangeText={(name) => setAvailableOn(name)}
                                    keyboardType={'default'}
                                />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15, flex: 1 / 2, marginRight: 10 }}>
                                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#f2f2f2', marginTop: 0 }}>
                                        <TouchableOpacity style={{ height: 45, padding: 15 }} onPress={showDatePicker}>
                                            <Text style={{ color: '#b3b3b3' }}>Opening Date {isDatePickerVisible ? JSON.stringify(DateValue) : null}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15, flex: 1 / 2 }}>
                                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#f2f2f2', marginTop: 0 }}>
                                        <TouchableOpacity style={{ height: 45, padding: 15 }} onPress={showDatePicker}>
                                            <Text style={{ color: '#b3b3b3' }}>Opening Time {isDatePickerVisible ? JSON.stringify(DateValue) : null}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15, flex: 1 / 2, marginRight: 10 }}>
                                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#f2f2f2', marginTop: 0 }}>
                                        <TouchableOpacity style={{ height: 45, padding: 15 }} onPress={showDatePicker}>
                                            <Text style={{ color: '#b3b3b3' }}>Closing Date {isDatePickerVisible ? JSON.stringify(DateValue) : null}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15, flex: 1 / 2 }}>
                                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#f2f2f2', marginTop: 0 }}>
                                        <TouchableOpacity style={{ height: 45, padding: 15 }} onPress={showDatePicker}>
                                            <Text style={{ color: '#b3b3b3' }}>Closing Time {isDatePickerVisible ? JSON.stringify(DateValue) : null}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 / 4 }}>
                                    <CheckBox
                                        disabled={false}
                                        value={toggleCheckBox}
                                        onValueChange={(newValue) => setCatsAllow(newValue)}
                                    />
                                    <Text style={{ fontSize: 10, fontWeight: 'bold', marginTop: 6 }}>Cats Allowed</Text>
                                </View>
                                <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 / 4 }}>
                                    <CheckBox
                                        disabled={false}
                                        value={toggleCheckBox}
                                        onValueChange={(newValue) => setDogsAllow(newValue)}
                                    />
                                    <Text style={{ fontSize: 10, fontWeight: 'bold', marginTop: 6 }}>Dogs Allowed</Text>
                                </View>
                                <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 / 4 }}>
                                    <CheckBox
                                        disabled={false}
                                        value={toggleCheckBox}
                                        onValueChange={(newValue) => setFurnished(newValue)}
                                    />
                                    <Text style={{ fontSize: 10, fontWeight: 'bold', marginTop: 6 }}>Furnished</Text>
                                </View>
                                <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 / 4 }}>
                                    <CheckBox
                                        disabled={false}
                                        value={toggleCheckBox}
                                        onValueChange={(newValue) => setNoSmoking(newValue)}
                                    />
                                    <Text style={{ fontSize: 10, fontWeight: 'bold', marginTop: 6 }}>No Smoking</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 / 4 }}>
                                    <CheckBox
                                        disabled={false}
                                        value={toggleCheckBox}
                                        onValueChange={(newValue) => setWheelChair(newValue)}
                                    />
                                    <Text style={{ fontSize: 10, fontWeight: 'bold', marginTop: 6 }}>Wheelchair Accessible</Text>
                                </View>
                                <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 / 4 }}>
                                    <CheckBox
                                        disabled={false}
                                        value={toggleCheckBox}
                                        onValueChange={(newValue) => setAirConditioning(newValue)}
                                    />
                                    <Text style={{ fontSize: 10, fontWeight: 'bold', marginTop: 6 }}>Air Conditioning</Text>
                                </View>
                                <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 / 4 }}>
                                    <CheckBox
                                        disabled={false}
                                        value={toggleCheckBox}
                                        onValueChange={(newValue) => setEvCharging(newValue)}
                                    />
                                    <Text style={{ fontSize: 10, fontWeight: 'bold', marginTop: 6 }}>EV Charging</Text>
                                </View>
                                <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 / 4 }} />
                            </View>
                            <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                <TextInput
                                    style={{ height: 45, padding: 15 }}
                                    ref={chatInput2}
                                    placeholder={'Terms and Conditions'}
                                    onChangeText={(name) => setTermsAndconditions(name)}
                                    keyboardType={'default'}
                                />
                            </View>
                        </View>
                        : Categroy === '8' ?
                            <View>
                                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                    <TextInput
                                        style={{ height: 45, padding: 15 }}
                                        ref={chatInput2}
                                        placeholder={'Business Name *'}
                                        onChangeText={(name) => setBusinessName(name)}
                                        keyboardType={'default'}
                                    />
                                </View>
                                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                    <TextInput
                                        style={{ height: 45, padding: 15 }}
                                        ref={chatInput2}
                                        placeholder={'Service Ad Title'}
                                        onChangeText={(name) => setServiceAdTitle(name)}
                                        keyboardType={'default'}
                                    />
                                </View>
                                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                    <Picker
                                        style={{}}
                                        selectedValue={SelectDays}
                                        onValueChange={(value) => {
                                            console.log(value);
                                            setSelectDays(value);
                                        }} >
                                        <Picker.Item label={'Select Days'} value={''} />
                                        {SelectDays.map((data, idx) => {
                                            return <Picker.Item label={data.days_name} value={data.days_name} />
                                        })}
                                    </Picker>
                                </View>
                                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                    <Picker
                                        style={{}}
                                        selectedValue={OpenCloseData}
                                        onValueChange={(value) => {
                                            console.log(value);
                                            setOpenCloseData(value);
                                        }} >
                                        <Picker.Item label={'Select Open/Closed'} value={''} />
                                        {OpenCloseData.map((data, idx) => {
                                            return <Picker.Item label={data.type} value={data.type} />
                                        })}
                                    </Picker>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15, flex: 1 / 2, marginRight: 10 }}>
                                        <TextInput
                                            style={{ height: 45, padding: 15 }}
                                            ref={chatInput4}
                                            placeholder={'Operating Hours From'}
                                            onChangeText={(pass) => setOperatingHoursFrom(pass)}
                                            maxLength={2}
                                        />
                                    </View>
                                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15, flex: 1 / 2 }}>
                                        <TextInput
                                            style={{ height: 45, padding: 15 }}
                                            ref={chatInput4}
                                            placeholder={'Operating Hours To'}
                                            onChangeText={(pass) => setOperatingHoursTo(pass)}
                                            maxLength={3}
                                        />
                                    </View>
                                </View>
                                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                    <TextInput
                                        style={{ height: 45, padding: 15 }}
                                        ref={chatInput3}
                                        placeholder={'Business License'}
                                        onChangeText={(num) => setContactPersonName(num)}
                                    />
                                </View>
                                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                    <TextInput
                                        style={{ height: 45, padding: 15 }}
                                        ref={chatInput4}
                                        placeholder={'Contact Person Name'}
                                        onChangeText={(pass) => setContactPersonName(pass)}
                                    />
                                </View>
                                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                    <TextInput
                                        style={{ height: 45, padding: 15 }}
                                        ref={chatInput4}
                                        placeholder={'Website'}
                                        onChangeText={(pass) => setServiceKeyword(pass)}
                                    />
                                </View>
                                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                    <TextInput
                                        style={{ height: 45, padding: 15 }}
                                        ref={chatInput4}
                                        placeholder={'Contact No'}
                                        onChangeText={(pass) => setContactNum(pass)}
                                        maxLength={10}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                    <Text style={{ color: '#aaaaaa', marginTop: 10, flex: 1 }}>Contact Visiblity</Text>
                                    <ToggleSwitch
                                        isOn={ContactVisible}
                                        onColor="#00CCFF"
                                        offColor="#aaaaaa"
                                        labelStyle={{ color: "black", fontWeight: "900" }}
                                        size='small'
                                        onToggle={isOn => setContactVisible(isOn)}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <Text style={{ color: '#aaaaaa', marginTop: 10, flex: 1 }}>Operation Mode (Online Or Offline)</Text>
                                    <ToggleSwitch
                                        isOn={OnlineOrOffline}
                                        onColor="00CCFF"
                                        offColor="#aaaaaa"
                                        labelStyle={{ color: "black", fontWeight: "900" }}
                                        size="small"
                                        onToggle={isOn => setOnlineOrOffline(isOn)}
                                    />
                                </View>
                            </View>
                            : Categroy === '10' ?
                                <View>
                                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                        <TextInput
                                            style={{ height: 45, padding: 15, textAlign: 'auto' }}
                                            ref={chatInput2}
                                            placeholder={'Title *'}
                                            onChangeText={(name) => setBusinessName(name)}
                                            keyboardType={'default'}
                                        />
                                    </View>
                                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                        <TextInput
                                            style={{ height: 45, padding: 15, textAlign: 'auto' }}
                                            ref={chatInput2}
                                            placeholder={'Entry Type'}
                                            onChangeText={(name) => setEntryType(name)}
                                            keyboardType={'default'}
                                        />
                                    </View>
                                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                        <TouchableOpacity style={{ height: 45, padding: 15 }} onPress={showDatePicker}>
                                            <Text style={{ color: '#b3b3b3' }}>Event Date {isDatePickerVisible ? JSON.stringify(DateValue) : null}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                                        <TouchableOpacity style={{ height: 45, padding: 15 }} onPress={showDatePicker}>
                                            <Text style={{ color: '#b3b3b3' }}>Event Time {isTimePickerVisible ? JSON.stringify(TimeValue) : null}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <DateTimePickerModal
                                        isVisible={isDatePickerVisible}
                                        mode="date"
                                        onConfirm={handleDateConfirm}
                                        onCancel={hideDatePicker}
                                    />
                                    <DateTimePickerModal
                                        isVisible={isTimePickerVisible}
                                        mode="time"
                                        onConfirm={handleTimeConfirm}
                                        onCancel={hideTimePicker}
                                    />
                                </View>
                                :
                                null
                    }
                </View>
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                    <TextInput
                        style={{ height: 155, padding: 15, textAlign: 'auto' }}
                        ref={chatInput2}
                        placeholder={'Description *'}
                        onChangeText={(name) => setDescription(name)}
                        keyboardType={'default'}
                    />
                </View>
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                    <TextInput
                        style={{ height: 45, padding: 15 }}
                        ref={chatInput2}
                        placeholder={'Keywords'}
                        onChangeText={(name) => setKeywords(name)}
                        keyboardType={'default'}
                    />
                </View>
                <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                    <TextInput
                        style={{ height: 45, padding: 15 }}
                        ref={chatInput2}
                        placeholder={'Tags'}
                        onChangeText={(name) => setTags(name)}
                        keyboardType={'default'}
                    />
                </View>
                <View style={{}}>
                    <Text style={{ color: '#aaaaaa', marginTop: 10 }}>Imges & Videos</Text>
                    <TouchableOpacity onPress={() => AadharImageBack()} style={{ width: 155, height: 155, borderRadius: 5, borderColor: '#aaaaaa', margin: isHaveImage ? 0 : 5, borderWidth: isHaveImage ? 0 : 1, marginTop: 10 }}>
                        {isHaveImage ?
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {MultiImagePath.map((image) => {
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
                <TouchableOpacity onPress={() => AddNewBusiness()} style={{ backgroundColor: '#00CCFF', padding: 17, marginTop: 18, marginBottom: 30 }}>
                    <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center', letterSpacing: 5 }}>SUBMIT</Text>
                </TouchableOpacity>
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
    }
});

export default ListYourBusiness;