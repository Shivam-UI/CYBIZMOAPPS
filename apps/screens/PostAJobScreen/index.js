import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput, Alert, AsyncStorage, StyleSheet, Picker, Platform, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ADD_NEW_JOBS_API, JOB_CATEGORY_LIST, CATEGORY_LIST_API, SEARCH_PAID_AND_FREE_API } from '../../../configApi';
import GetLocation from 'react-native-get-location';
import ToggleSwitch from 'toggle-switch-react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';

const AddAJobsScreen = () => {

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
    const Experience = ['Select Experience', '6 Month`s', '1 Years', '2 Years', '3 Years', '4 Years', '5 Years', '6 Years', '7 Years']
    const Salarys = ['Salary', '3LPA', '4LPA', '8LPA', '10LPA']
    const Position = ['Employment Type', 'Full-Time', 'Part-Time', 'Contract Internship']
    const JobPostedBy = ['Job Posted By', 'Owner', 'Recruiter'];
    const [isLodingDone, setLoadingDone] = React.useState(false);
    // fields 
    const [isHaveImage, setHaveImage] = React.useState(false);
    const [ImagePath, setImagePath] = React.useState('');
    const [Categroy, setCategroy] = React.useState(null);
    const [JobTitle, setJobTitle] = React.useState(null);
    const [JobDiscripition, setJobDiscripition] = React.useState(null);
    const [PositionType, setPositionType] = React.useState(null);
    const [ExperienceCount, setExperience] = React.useState(null);
    const [Salary, setSalary] = React.useState(null);
    const [CompanyName, setCompanyName] = React.useState(null);
    const [WebSite, setWebSite] = React.useState(null);
    const [Name, setName] = React.useState(null);
    const [Email, setEmail] = React.useState(null);
    const [Number, setNumber] = React.useState(null);
    const [NonProfit, setNonProfit] = React.useState(null);
    const [WorkFromHome, setWorkFromHome] = React.useState(null);
    const [ContactVisible, setContactVisible] = React.useState(null);
    const [JobPostBy, setJobPostBy] = React.useState(null);
    const [EmploymentType, setEmploymentType] = React.useState(null);
    const [Keyword, setKeyword] = React.useState(null);
    const [Tags, setTags] = React.useState(null);
    const [tokenAmount, setTokenAmount] = React.useState(null);
    const [listingType, setListingType] = React.useState(null);
    const [validityDays, setValidityDays] = React.useState(null);
    const [submitType, setSubmitType] = React.useState(null);
    // ends
    const [selectedcat, setselectedcat] = React.useState(null);
    const [CategoryData, setCategoryData] = React.useState([]);
    const [SubCategoryDataList, setSubCategoryDataList] = React.useState([]);
    const [selectCategory, dropdownonSelect] = React.useState(null);
    const [Latitude, setLatitude] = React.useState(null);
    const [Longitude, setLongitude] = React.useState(null);
    let controller;

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoadingDone(true);
            GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
            })
                .then(location => {
                    console.log(location);
                    setLatitude(location.latitude);
                    setLongitude(location.longitude);
                    console.log('location saved');
                })
                .catch(error => {
                    const { code, message } = error;
                    console.warn(code, message);
                })
            getCategoryData();
        });
        return unsubscribe;
    }, [navigation]);

    async function getCategoryData() {
        setLoadingDone(true);
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        if (value) {
            var body = new FormData();
            body.append('category_type', 'Job');
            axios({
                method: "POST",
                url: CATEGORY_LIST_API,
                data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                }
            }).then(function (response) {
                // handle success
                console.log('response: ', JSON.stringify(response.data));
                if (response.data.status === true) {
                    console.log('response: ', JSON.stringify(response.data.data));
                    setCategoryData(response.data.data);
                    previewData(response.data.data);
                } else {
                    Alert.alert(response.data.message);
                    setLoadingDone(false);
                }
            }).catch(function (error) {
                setLoadingDone(false);
                console.log('error: ', error);
            }
            );
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
        if (Categroy === null) {
            alert('Enter Categroy');
            return false
        }
        if (JobTitle === null) {
            alert('Enter Job Title');
            return false
        }
        if (JobDiscripition === null) {
            alert('Enter Job Discripition');
            return false
        }
        if (PositionType === null) {
            alert('Select Position Type');
            return false
        }
        if (ExperienceCount === null) {
            alert('Select Experience Count');
            return false
        }
        if (Salary === null) {
            alert('Select Salary');
            return false
        }
        if (CompanyName === null) {
            alert('Enter Company Name');
            return false
        }
        if (WebSite === null) {
            alert('Enter Valide WebSite');
            return false
        }
        if (Name === null) {
            alert('Enter Valide Name');
            return false
        }
        if (Email === null) {
            alert('Enter Email Address');
            return false
        }
        if (Number === null) {
            alert('Enter Valide Number');
            return false
        }
        UploadJobDetails();
    }

    // category_id
    // job_title
    // description
    // position_type
    // experience
    // salary
    // employment_type
    // job_posted_by
    // non_profit
    // work_from_home
    // contact_visibility
    // website_url
    // company_name
    // contact_person_name
    // contact_email
    // contact_number
    // Keywords
    // tags
    // address
    // city
    // state
    // state
    // country
    // latitude
    // longitude
    // pincode
    // submit_type
    // tokenamount
    // listing_type
    // validity_days
    // Image
    // addtional_file

    async function UploadJobDetails() {
        setLoadingDone(true);
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        var today = Math.round((new Date()).getTime() / 1000);
        var imageName = 'image_' + today + '.jpg';
        console.log(value);
        if (value) {
            var body = new FormData();
            body.append('category_id', Categroy);
            body.append('job_title', JobTitle);
            body.append('decription', JobDiscripition);
            body.append('position_type', PositionType);
            body.append('experience', ExperienceCount);
            body.append('salary', Salary);
            body.append('employment_type', EmploymentType);
            body.append('job_posted_by', JobPostBy);
            body.append('non_profit', NonProfit);
            body.append('work_from_home', WorkFromHome);
            body.append('contact_visibility', ContactVisible);
            body.append('website_url', WebSite);
            body.append('company_name', CompanyName);
            body.append('contact_person_name', Name);
            body.append('contact_email', Email);
            body.append('contact_number', Number);
            body.append('keybords', Keyword);
            body.append('tags', Tags);
            body.append('address', 'Model Town');
            body.append('city', 'Delhi');
            body.append('state', 'Delhi');
            body.append('pincode', '110009');
            body.append('city', 'Delhi');
            body.append('latitude', Latitude);
            body.append('longitude', Longitude);
            body.append('pincode', '110009');
            body.append('submit_type', submitType);
            body.append('tokenamount', tokenAmount);
            body.append('listing_type', listingType);
            body.append('validity_days', validityDays);
            let imageData = {
                uri: ImagePath,
                type: 'image/jpeg',
                name: imageName,
            }
            body.append('Image', imageData);
            body.append('addtional_file', imageData);
            console.log('response: ', JSON.stringify(body));

            axios({
                method: "POST",
                url: ADD_NEW_JOBS_API,
                data: body,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                    'Authorization': value
                }
            })
                .then(function (response) {
                    //handle success
                    console.log('response: ', JSON.stringify(response.data));
                    if (response.data.status === true) {
                        Alert.alert('successfully', 'Job Posted Successfully',
                            [
                                { text: 'OK', onPress: () => navigation.replace('Jobs') },

                            ],
                            { cancelable: false });
                        // resetDataAfterUploadJob();
                        setLoadingDone(false);
                    } else {
                        Alert.alert('Successfully', 'Job Posted Successfully',
                            [
                                { text: 'OK', onPress: () => navigation.replace('Jobs') },

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

    const resetDataAfterUploadJob = () => {
        setJobTitle('');
        setPositionType('');
        setSalary('');
        setEmploymentType('');
        setJobPostBy('');
        setNonProfit('');
        setWorkFromHome('');
        setContactVisible('');
        setCompanyName('');
        setWebSite('');
        setName('');
        setEmail('');
        setNumber('');
        setJobDiscripition('');
        setKeyword('');
        setTags('');
        setEmail('');
    }

    const AadharImageBack = () => {
        ImagePicker.openPicker({
            width: 600,
            height: 600,
            cropping: true,
            // multiple: true,
            // maxSelect: 4,
            mediaType: 'image',
        }).then(response => {
            console.log("responseimage-------", JSON.stringify(response.path));
            setImagePath(response.path);
            setHaveImage(true);
        });
    }

    async function selectImageOrVideos() {
        console.log('select image');
    }

    const foundSubCategory = () => {
        return (<View>
            {SubCategoryDataList.map((data, idx) => {
                return <Picker.Item label={data.sub_category_name} value={data.tbl_sub_category_id} />
            })}
        </View>)
    }

    const checkPainOrFree = (category_id) => {
        setLoadingDone(true);
        setCategroy(category_id);
        var body = new FormData();
        body.append('category_id', category_id);
        axios({
            method: "POST",
            url: SEARCH_PAID_AND_FREE_API,
            data: body,
            headers: {
                'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
            }
        }).then(function (response) {
            // handle success
            if (response.data.status === true) {
                Alert.alert(response.data.message + ' '
                    + response.data.category_type + ' '
                    + response.data.listing_type + ' Amount: '
                    + response.data.token_amount + ' Validity Days: '
                    + response.data.validity_days);
                // save data
                setTokenAmount(response.data.category_type);
                setListingType(response.data.listing_type);
                setValidityDays(response.data.token_amount);
                setSubmitType(response.data.validity_days);
            } else {
                console.log('response: ', JSON.stringify(response.data));
            }
            setLoadingDone(false);
        }).catch(function (error) {
            setLoadingDone(false);
            console.log('error: ', error);
        }
        );
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
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>{"Post A Job"}</Text>
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
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginBottom: 5, }}>
                        <Picker
                            style={{}}
                            selectedValue={Categroy}
                            onValueChange={(value) => {
                                checkPainOrFree(value);
                            }} >
                            {CategoryData.map((data, idx) => {
                                return <Picker.Item label={data.category_name} value={data.tbl_category_id} />
                            })}
                        </Picker>
                    </View>
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15, flex: 1 / 2, marginRight: 0 }}>
                        <Picker
                            style={{}}
                            selectedValue={ExperienceCount}
                            onValueChange={(value) => {
                                setExperience(value);
                            }} >
                            {Experience.map((data, idx) => {
                                return <Picker.Item label={data} value={data} />
                            })}
                        </Picker>
                        {/* <SelectDropdown
                            data={Experience}
                            dropdownStyle={{ backgroundColor: '#ffffff' }}
                            rowStyle={{ backgroundColor: '#ffffff', }}
                            rowTextStyle={{ backgroundColor: '#ffffff' }}
                            // placeholder={'Select Experience'}
                            defaultValueByIndex={0} // use default value by index or default value
                            // defaultValue={'Canada'} // use default value by index or default value
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index);
                                setExperience(selectedItem);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item;
                            }}
                        /> */}
                    </View>
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                        <TextInput
                            style={{ height: 45, padding: 15 }}
                            ref={chatInput3}
                            placeholder={'Job Title *'}
                            onChangeText={(title) => setJobTitle(title)}
                            maxLength={60}
                            keyboardType={'email-address'}
                        />
                    </View>
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                        <TextInput
                            style={{ height: 45, padding: 15 }}
                            ref={chatInput3}
                            placeholder={'Position Type *'}
                            onChangeText={(title) => setPositionType(title)}
                            maxLength={60}
                            keyboardType={'default'}
                        />
                    </View>
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                        <TextInput
                            style={{ height: 45, padding: 15 }}
                            ref={chatInput3}
                            placeholder={'Salary'}
                            onChangeText={(title) => setSalary(title)}
                            maxLength={60}
                            keyboardType={'default'}
                        />
                    </View>
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                        <Picker
                            style={{}}
                            selectedValue={EmploymentType}
                            onValueChange={(value) => {
                                console.log('EmploymentType', value);
                                setEmploymentType(value);
                            }} >
                            {Position.map((data, idx) => {
                                return <Picker.Item label={data} value={data} />
                            })}
                        </Picker>
                        {/* <SelectDropdown
                            data={Position}
                            dropdownStyle={{ backgroundColor: '#ffffff' }}
                            rowStyle={{ backgroundColor: '#ffffff' }}
                            rowTextStyle={{ backgroundColor: '#ffffff' }}
                            // defaultValueByIndex={1} // use default value by index or default value
                            // defaultValue={'Canada'} // use default value by index or default value
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index);
                                setPositionType(selectedItem);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item;
                            }} 
                        /> */}
                    </View>
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                        <Picker
                            style={{}}
                            selectedValue={JobPostBy}
                            onValueChange={(value) => {
                                console.log(value);
                                setJobPostBy(value);
                            }} >
                            {JobPostedBy.map((data, idx) => {
                                return <Picker.Item label={data} value={data} />
                            })}
                        </Picker>
                        {/* <SelectDropdown
                            data={Position}
                            dropdownStyle={{ backgroundColor: '#ffffff' }}
                            rowStyle={{ backgroundColor: '#ffffff' }}
                            rowTextStyle={{ backgroundColor: '#ffffff' }}
                            // defaultValueByIndex={1} // use default value by index or default value
                            // defaultValue={'Canada'} // use default value by index or default value
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index);
                                setPositionType(selectedItem);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item;
                            }}
                        /> */}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <Text style={{ color: '#aaaaaa', marginTop: 10, flex: 1 }}>Non Profit Organization</Text>
                        <ToggleSwitch
                            isOn={NonProfit}
                            onColor="#00CCFF"
                            offColor="#aaaaaa"
                            labelStyle={{ color: "black", fontWeight: "900" }}
                            size='small'
                            onToggle={isOn => setNonProfit(isOn)}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <Text style={{ color: '#aaaaaa', marginTop: 10, flex: 1 }}>Work from home / Remote</Text>
                        <ToggleSwitch
                            isOn={WorkFromHome}
                            onColor="#00CCFF"
                            offColor="#aaaaaa"
                            labelStyle={{ color: "black", fontWeight: "900" }}
                            size='small'
                            onToggle={isOn => setWorkFromHome(isOn)}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 10 }}>
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
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                        <TextInput
                            style={{ height: 45, padding: 15 }}
                            ref={chatInput7}
                            placeholder={'Company Name'}
                            onChangeText={(name) => setCompanyName(name)}
                            maxLength={120}
                            secureTextEntry={false}
                        />
                    </View>
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                        <TextInput
                            style={{ height: 45, padding: 15 }}
                            ref={chatInput7}
                            placeholder={'Website Url'}
                            onChangeText={(site) => setWebSite(site)}
                            maxLength={120}
                            secureTextEntry={false}
                        />
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Contact Information</Text>
                    </View>
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 10 }}>
                        <TextInput
                            style={{ height: 45, padding: 15 }}
                            ref={chatInput7}
                            placeholder={'Name'}
                            onChangeText={(names) => setName(names)}
                            maxLength={120}
                            secureTextEntry={false}
                        />
                    </View>
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                        <TextInput
                            style={{ height: 45, padding: 15 }}
                            ref={chatInput7}
                            placeholder={'Email'}
                            onChangeText={(email) => setEmail(email)}
                            maxLength={120}
                            secureTextEntry={false}
                        />
                    </View>
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                        <TextInput
                            style={{ height: 45, padding: 15 }}
                            ref={chatInput7}
                            placeholder={'Contact Number'}
                            onChangeText={(number) => setNumber(number)}
                            maxLength={20}
                            keyboardType={'number-pad'}
                            secureTextEntry={false}
                        />
                    </View>
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                        <TextInput
                            style={{ height: 145, padding: 15 }}
                            ref={chatInput4}
                            placeholder={'Job Discription'}
                            multiline={true}
                            numberOfLines={13}
                            onChangeText={(pass) => setJobDiscripition(pass)}
                            maxLength={200}
                            secureTextEntry={false}
                        />
                    </View>
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 10 }}>
                        <TextInput
                            style={{ height: 45, padding: 15 }}
                            ref={chatInput7}
                            placeholder={'Keywords'}
                            onChangeText={(names) => setKeyword(names)}
                            maxLength={120}
                            secureTextEntry={false}
                        />
                    </View>
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15 }}>
                        <TextInput
                            style={{ height: 45, padding: 15 }}
                            ref={chatInput7}
                            placeholder={'Tags'}
                            onChangeText={(email) => setTags(email)}
                            maxLength={120}
                            secureTextEntry={false}
                        />
                    </View>
                    {/* <View style={{ flexDirection: 'row' }}>
                        <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15, flex: 1 / 2, marginRight: 10 }}>
                            <SelectDropdown
                                data={Experience}
                                dropdownStyle={{ backgroundColor: '#ffffff' }}
                                rowStyle={{ backgroundColor: '#ffffff' }}
                                rowTextStyle={{ backgroundColor: '#ffffff' }}
                                // placeholder={'Select Experience'}
                                defaultValueByIndex={0} // use default value by index or default value
                                // defaultValue={'Canada'} // use default value by index or default value
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index);
                                    setExperience(selectedItem);
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem;
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item;
                                }}
                            />
                        </View>
                        <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa', marginTop: 15, flex: 1 / 2 }}>
                            <SelectDropdown
                                data={Salarys}
                                dropdownStyle={{ backgroundColor: '#ffffff' }}
                                rowStyle={{ backgroundColor: '#ffffff' }}
                                rowTextStyle={{ backgroundColor: '#ffffff' }}
                                // defaultValueByIndex={1} // use default value by index or default value
                                // defaultValue={'Canada'} // use default value by index or default value
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index);
                                    setSalary(selectedItem);
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem;
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item;
                                }}
                            />
                        </View>
                    </View> */}
                    <View style={{}}>
                        <Text style={{ color: '#aaaaaa', marginTop: 10 }}>Imges & Videos</Text>
                        <TouchableOpacity onPress={() => AadharImageBack()} style={{ width: 155, height: 155, borderRadius: 5, borderColor: '#aaaaaa', marginTop: isHaveImage ? 5 : 5, borderWidth: isHaveImage ? 0 : 1 }}>
                            {isHaveImage ?
                                <ScrollView>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ padding: 5 }}>
                                            <Image style={{ width: 70, height: 70, resizeMode: 'cover', borderRadius: 5 }} source={{ uri: ImagePath }} />
                                        </View>
                                    </View>
                                </ScrollView>
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

export default AddAJobsScreen;