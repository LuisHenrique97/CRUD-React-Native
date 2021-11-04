import React from 'react';
import { View, StyleSheet } from 'react-native';
import {Picker as RNPickerSelect} from '@react-native-picker/picker';

export default function PickerSelect({onChange, tipo}){
    return(
        <View style={styles.pickerView}>
            <RNPickerSelect
                style={{
                    color: '#A3A3A3',
                    width: '100%'
                }}
                selectedValue={tipo}
                onValueChange={(valor) => onChange(valor)}
            >
                <RNPickerSelect.Item label="Selecionar opção" color="#A3A3A3"/>
                <RNPickerSelect.Item label="Masculino" value="Masculino" color="#6C2D93"/>
                <RNPickerSelect.Item label="Feminino" value="Feminino" color="#6C2D93"/>
            </RNPickerSelect>
        </View>
    )
}

const styles = StyleSheet.create({
    pickerView: {
        marginHorizontal: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        marginLeft: 20,
        marginRight: 20,
    },
})