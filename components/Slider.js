import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const Slider = ({onValuesChange}) => {
  const [values, setValues] = useState([18, 60]); // Example range
  const heandleValuesChange = (values) => {
    setValues(values);
    onValuesChange(values);
  };

  return (
    <View>
        <View style={styles.container}>
            <Text>Age Rangee:</Text>
            <Text>
                {values[0]} - {values[1]}
            </Text>
        </View>
      <MultiSlider
        values={values}
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