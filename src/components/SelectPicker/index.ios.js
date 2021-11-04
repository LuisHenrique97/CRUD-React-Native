import React from 'react';
import { View, StyleSheet } from 'react-native';
import {Picker as RNPickerSelect} from '@react-native-picker/picker';

export default function PickerSelect({onChange, tipo}){
    return(
        <View style={styles.pickerView}>
            <RNPickerSelect
                style={{
                    color: '#A3A3A3',
                }}
                selectedValue={tipo}
                onValueChange={(valor) => onChange(valor)}
            >
                <RNPickerSelect.Item label="Sexo" />
                <RNPickerSelect.Item label="Masculino" value="Masculino"/>
                <RNPickerSelect.Item label="Feminino" value="Feminino"/>
            </RNPickerSelect>
        </View>
    )
}

const styles = StyleSheet.create({
    pickerView: {
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 5,
        marginHorizontal: 10,
        backgroundColor: '#dee2e6',
        height: 50,
        justifyContent: 'center'
    },
})