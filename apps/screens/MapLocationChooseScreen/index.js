import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, Alert, AsyncStorage, SafeAreaView, TextInput, TouchableOpacity, Image, Dimensions
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import GetLocation from 'react-native-get-location';
import CheckBox from '@react-native-community/checkbox';
import SelectDropdown from 'react-native-select-dropdown';
import Spinner from 'react-native-loading-spinner-overlay';
import { FEATURED_CITIES_API, SEARCH_ZIPCODE_API } from '../../../configApi';
import SeekBar from '../../../assets/config/SeekBarMain';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import Autocomplete from 'react-native-autocomplete-input';
// 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    location: {
        color: '#333333',
        marginBottom: 5,
    },
    button: {
        marginBottom: 8,
    }, dropdown: {
        width: 200,
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
// 
const countries = ["Select City", "California", "Lucknow", "Australia", "USA"];
// 
export default class MapLocationScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            location: null,
            loading: false,
            isDataSave: false,
            checkboxValue: [],
            setSelectedAmt: '',
            setLatitude: '',
            setLongitude: '',
            setCity: '',
            setPincode: '',
            selectedItems: '',
            CityiesData: [],
            ZipCodeData: [],
            setZipAreaName: '',
            checkboxValue: [{ label: 'Current Location', value: 'Location', checked: false },
            { label: 'City', value: 'City', checked: false },
            { label: 'Pincode', value: 'Pincode', checked: false }],
        }
    }

    componentDidMount() {
        Geocoder.init("$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2");
        this._getLocationByLatitude();
        this.searchCity();
        this.searchZipCode();
        // this._requestLocation();
    }

    _getLocationByLatitude() {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                console.log(location);
                this.setState({ setLatitude: location.latitude, setLongitude: location.longitude });
                console.log('location saved');
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            });
    }

    _requestLocation = () => {
        this.setState({ loading: true, location: null });

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 10000,
        })
            .then(location => {
                this.setState({
                    location,
                    loading: false,
                });
            })
            .catch(ex => {
                const { code, message } = ex;
                console.warn(code, message);
                if (code === 'CANCELLED') {
                    Alert.alert('Location cancelled by user or by another request');
                }
                if (code === 'UNAVAILABLE') {
                    Alert.alert('Location service is disabled or unavailable');
                }
                if (code === 'TIMEOUT') {
                    Alert.alert('Location request timed out');
                }
                if (code === 'UNAUTHORIZED') {
                    Alert.alert('Authorization denied');
                }
                this.setState({
                    location: null,
                    loading: false,
                });
            });
    }

    checkboxHandler = (value, index) => {
        const newValue = this.state.checkboxValue.map((checkbox, i) => {
            if (i !== index)
                return {
                    ...checkbox,
                    checked: false,
                }
            if (i === index) {
                const item = {
                    ...checkbox,
                    checked: !checkbox.checked,
                }
                return item
            }
            return checkbox
        })
        this.setState({ checkboxValue: newValue });
        console.log(newValue);
    }

    setCurrentPositionRadious(currentRadious) {
        // const MYPOS = currentRadious.split('.', '');
        this.setState({ setSelectedAmt: currentRadious });
    }

    saveLocationByUser() {
        if (this.state.checkboxValue[0].checked) {
            console.log('setSelectedAmt' + this.state.setSelectedAmt);
            if (this.state.setSelectedAmt != 0) {
                console.log('Location_radius' + this.state.setSelectedAmt);
                AsyncStorage.setItem('@MySuperStore:SkipType', 'Location');
                AsyncStorage.setItem('@MySuperStore:Locationkey', `${this.state.setLatitude + ',' + this.state.setLongitude}`);
                AsyncStorage.setItem('@MySuperStore:LocationRadiouskey', `${this.state.setSelectedAmt}`);
                this.props.navigation.replace('HomeScreen');
                this.setState({ isDataSave: true });
            } else {
                Alert.alert('Please Select Location Radius.');
            }
        } else if (this.state.checkboxValue[1].checked) {
            console.log('City');
            if (this.state.setCity != '') {
                console.log('Location_City: ' + this.state.setCity);
                AsyncStorage.setItem('@MySuperStore:SkipType', 'City');
                AsyncStorage.setItem('@MySuperStore:Locationkey', `${this.state.setCity}`);
                this.props.navigation.replace('HomeScreen');
                this.setState({ isDataSave: true });
            } else {
                Alert.alert('Please Select Your City.');
            }
        } else if (this.state.checkboxValue[2].checked) {
            console.log('Pincode');
            if (this.state.setPincode != '') {
                console.log('Location_City: ' + this.state.setPincode);
                AsyncStorage.setItem('@MySuperStore:SkipType', 'Pincode');
                AsyncStorage.setItem('@MySuperStore:Locationkey', `${this.state.setZipAreaName + ' - ' + this.state.setPincode}`);
                this.props.navigation.replace('HomeScreen');
                this.setState({ isDataSave: true });
            } else {
                Alert.alert('Please Enter Pincode.');
            }
        } else {
            Alert.alert('Please Select Preferred Location.');
        }

        // console.log('Location_City: ' + this.state.setCity);
        // if (this.state.isDataSave) {
        //     this.props.navigation.replace('HomeScreen');
        // }

    }

    searchCity() {
        var self = this;
        if (true) {
            axios({
                method: "GET",
                url: FEATURED_CITIES_API,
                // data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                }
            })
                .then(function (response) {
                    //handle success
                    if (response.data.status === true) {
                        console.log('searchCity: ', JSON.stringify(response.data.data));
                        // setBlogsCategoryData(response.data.data)
                        self.setState({ CityiesData: response.data.data })
                        // setLoadingDone(false);
                    } else {
                        Alert.alert(response.data.message);
                        // setLoadingDone(false);
                    }
                })
                .catch(function (error) {
                    // setLoadingDone(false);
                    console.log('error: ', error);
                }
                );
        }
    }

    searchZipCode() {
        var self = this;
        var body = new FormData();
        body.append('keywords', '11');

        if (true) {
            axios({
                method: "POST",
                url: SEARCH_ZIPCODE_API,
                data: body,
                headers: {
                    'x-api-key': '$2y$10$sSVsoEEO5gz6EYzD3wtrbexWtR3sdzv/OFKAC.UPFoGUekAb8jjB2',
                }
            })
                .then(function (response) {
                    //handle success
                    if (response.data.status === true) {
                        console.log('searchZipCode: ', JSON.stringify(response.data.data));
                        self.setState({ ZipCodeData: response.data.data })
                        // setBlogsCategoryData(response.data.data)
                        // setLoadingDone(false);
                    } else {
                        Alert.alert(response.data.message);
                        // setLoadingDone(false);
                    }
                })
                .catch(function (error) {
                    // setLoadingDone(false);
                    console.log('error: ', error);
                }
                );
        }
    }

    renderItem = (item) => {
        return (
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold', color: '#000000' }}>{item.area_name} - {item.zip_code}</Text>
            </View>
        );
    };

    renderCityItem = (item) => {

        console.log(item)

        return (
            <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#aaa' }}>
                <Text style={{ fontWeight: 'bold', color: '#000000' }}>{item.city}</Text>
            </View>
        );
    };

    render() {
        const { location, loading } = this.state;
        const { query } = this.state;
        //         const data = filterData(query);

        return (
            <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
                <View style={{ height: 45, padding: 10, borderBottomColor: '#aaaaaa', borderBottomWidth: 1 }}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Select Location</Text>
                </View>
                <Spinner
                    visible={loading}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />
                <View style={{ marginTop: Dimensions.get('screen').width / 2, padding: 70, justifyContent: 'center' }}>
                    <View style={{ padding: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>Select Location By Your Prefrence</Text>
                    </View>
                    {this.state.checkboxValue.map((checkbox, i) => (
                        <View style={{ borderColor: '#aaaaaa', borderWidth: 1, padding: 10, marginBottom: 5, alignItems: 'flex-start', borderRadius: 5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 0, }} key={i}>
                                <CheckBox
                                    style={{}}
                                    tintColors={{ true: '#00ccff', false: 'black' }}
                                    value={checkbox.checked}
                                    onValueChange={(value) => this.checkboxHandler(value, i)}
                                />
                                <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>{checkbox.label}</Text>
                            </View>
                        </View>
                    ))}
                    <View style={{ marginTop: 0, paddingLeft: 20, alignSelf: 'center' }}>
                        {this.state.checkboxValue[0].checked ? <View style={{ width: Dimensions.get('screen').width / 1.4 }}>
                            <SeekBar trackLength={this.state.setSelectedAmt} currentPosition={50} onSeek={(pos) => this.setCurrentPositionRadious(Number(pos))} onSlidingStart={0} />
                        </View> : <View></View>}
                        {this.state.checkboxValue[1].checked ? <View>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={this.state.CityiesData}
                                // search
                                maxHeight={300}
                                // labelField="label"
                                // valueField="zip_code"
                                placeholder={this.state.setCity === "" ? "Select City" : '' + this.state.setCity}
                                searchPlaceholder="Search..."
                                value={this.state.setCity}
                                onChange={item => {
                                    console.log(item)
                                    this.setState({
                                        setCity: item.city,
                                    });
                                }}
                                renderItem={this.renderCityItem}
                            />
                        </View> : <View></View>
                        }
                        {this.state.checkboxValue[2].checked ?
                            <View>
                                <View>
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={this.state.ZipCodeData}
                                        // search
                                        maxHeight={300}
                                        // labelField="label"
                                        // valueField="zip_code"
                                        placeholder={this.state.setPincode === "" ? "Select Zipcode" : '' + this.state.setZipAreaName + ' - ' + this.state.setPincode}
                                        searchPlaceholder="Search..."
                                        value={this.state.setPincode}
                                        onChange={item => {
                                            console.log(item)
                                            this.setState({
                                                setPincode: item.zip_code,
                                                setZipAreaName: item.area_name
                                            });
                                        }}
                                        renderItem={this.renderItem}
                                    />
                                </View>
                            </View> : <View></View>}
                    </View>
                </View>
                <View style={{ alignSelf: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, width: '100%' }}>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ backgroundColor: '#00ccff', padding: 18, borderRadius: 5, marginRight: 5 }}>
                                <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => this.saveLocationByUser()} style={{ backgroundColor: '#00ccff', padding: 18, borderRadius: 5, marginRight: 5 }}>
                                <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>Save Changes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* <View style={{ padding: 20 }}>
                    <View style={{ borderRadius: 2, borderWidth: 1, borderColor: '#aaa' }}>
                        <Text style={{ height: 50, alignItems: 'center', paddingTop: 15, marginLeft: 20 }}>Location</Text>
                    </View>
                    {loading ? (
                        <ActivityIndicator />
                    ) : null}
                    {location ? (
                        <Text style={styles.location}>
                            {JSON.stringify(location, 0, 2)}
                        </Text>
                    ) : null}
                </View> */}
            </SafeAreaView>
        );
    }

}