import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

const GenderFilter = ({ onValueChange, defaultValue }) => {
    const [selectedGender, setSelectedGender] = useState(defaultValue);

    const handleValueChange = (value) => {
        setSelectedGender(value);
        if (onValueChange) {
            onValueChange(value);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Gender:</Text>
            <View style={styles.radioGroup}>
                <View style={styles.radioButton}>
                    <RadioButton.Item
                        value="all"
                        label="all"
                        status={selectedGender === 'all' ? 'checked' : 'unchecked'}
                        onPress={() => handleValueChange('all')}
                    />
                </View>
                <View style={styles.radioButton}>
                    <RadioButton.Item
                        value="male"
                        label="male"
                        status={selectedGender === 'male' ? 'checked' : 'unchecked'}
                        onPress={() => handleValueChange('male')}
                    />
                </View>
                <View style={styles.radioButton}>
                    <RadioButton.Item
                        value="female"
                        label='female'
                        status={selectedGender === 'female' ? 'checked' : 'unchecked'}
                        onPress={() => handleValueChange('female')}
                    />
                </View>

                </View>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',     
        marginHorizontal: 10,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 0,
    },
});

export default GenderFilter;
