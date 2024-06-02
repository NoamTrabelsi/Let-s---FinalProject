import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const Slider = ({onValuesChange, defaultValues}) => {

  const heandleValuesChange = (values) => {
    defaultValues[0] = values[0];
    defaultValues[1] = values[1];
    onValuesChange(values);
  };

  return (
    <View>
        <View style={styles.container}>
            <Text>Age Rangee:</Text>
            <Text>
                {defaultValues[0]} - {defaultValues[1]}
            </Text>
        </View>
      <MultiSlider
        values={[defaultValues[0], defaultValues[1]]}
        sliderLength={200}
        onValuesChange={heandleValuesChange}
        min={18}
        max={60}
        step={1}
      />
    </View>
  );
};

const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
    },
};

export default Slider;