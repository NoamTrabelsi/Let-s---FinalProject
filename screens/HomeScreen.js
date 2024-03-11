import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, Platform, TouchableOpacity, Modal} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

function HomeScreen() {
    const [city, setCity] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(true);
    const [showEndDatePicker, setShowEndDatePicker] = useState(true);

    const [modalVisible, setModalVisible] = useState(false);

    const [ageRange, setAgeRange] = useState([18, 24]);

    const handleStartDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowStartDatePicker(Platform.OS === 'ios');
        setStartDate(currentDate);
    };

    const handleEndDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShowEndDatePicker(Platform.OS === 'ios');
        setEndDate(currentDate);
    };

    const handleSearch = () => {
        // Handle search functionality here
        console.log("Searching for:", city);
        console.log("Start Date:", startDate.toISOString().split('T')[0]);
        console.log("End Date:", endDate.toISOString().split('T')[0]);
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row'}}>
            <TextInput
                style={styles.input}
                placeholder="Enter City"
                onChangeText={text => setCity(text)}
                value={city}
            />
            <TouchableOpacity style={styles.filterButton} onPress={toggleModal}>
                <Ionicons name="filter" size={24} color="black" />
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {/* Ваше содержимое модального окна */}
                        <Text>Choose age and gender</Text>
                        {/* Add age scale */}
                        <Text>Age: </Text>
                            <Slider
                                style={{width: 200, height: 40}}
                                minimumValue={1}
                                maximumValue={100}
                                minimumTrackTintColor="#000000"
                                maximumTrackTintColor="#000000"
                                step={1}
                                values={ageRange}
                                onValueChange={(values) => setAgeRange(values)}
                            />

                        
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={toggleModal}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            </View>
            <View style={styles.datePickerContainer}>
                <Text style={styles.dateLabel}>From:</Text>                
                {showStartDatePicker && (
                    <DateTimePicker
                        value={startDate}
                        mode="date"
                        display="default"
                        minimumDate = {new Date()}
                        onChange={handleStartDateChange}
                    />
                )}
                <Text style={styles.dateLabel}>To:</Text>
                {showEndDatePicker && (
                    <DateTimePicker
                        value={endDate}
                        mode="date"
                        display="default"
                        minimumDate={startDate}
                        onChange={handleEndDateChange}
                    />
                )}
            </View>
            
            <TouchableOpacity style={styles.button} onPress={handleSearch}>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '30%'
    },
    input: {
        alignSelf: 'flex-start',
        height: 40,
        width: '50%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10
    },
    datePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    dateLabel: {
        marginRight: 10
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        width: '60%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',    
    },
    filterButton: {
        padding: 10,
        borderRadius: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
});

export default HomeScreen;
