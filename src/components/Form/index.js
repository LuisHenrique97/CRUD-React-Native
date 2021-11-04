import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import PickerSelect from "../SelectPicker/index.android";
import DateTimePicker from '@react-native-community/datetimepicker'

import api from "../../services/api";

import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

export default function Forms(){

    const [curso, setCurso] = useState({ })
    const [nome, setNome] = useState('')
    const [sex, setSex] = useState('')
    const [idade, setIdade] = useState('')
    const [dataNasc, setDataNasc] = useState(new Date())
    const [hobby, setHobby] = useState('')
 
    useEffect(() => {
      api.get('/developers').then((response) => {
        setCurso(response)
      })
    }, [])

    // Get All - OK
    const handleGet = () => {
      api.get('/developers').then((response) => {
        setCurso(response)
        console.log(response.data)
      })
    }

    // Get Selected - OK
    const handleGetSelected = () => {
      api.get('/developers/1').then((response) => {
        setCurso(response)
        console.log(response.data.nome)
      })
    }
    
    // Post Register - OK
    const handlePost = () => { 
      api.post('developers', {
        name: {
          nome: nome,
          sexo: sexo,
          idade: idade,
          dataNasc: format(date , 'dd-MM-yyyy', {locate: pt}),
          hobby: hobby
        }
        
      })
      .then(({ data }) => console.log(data))
    }

    // Put Register - OK
    const handlePut = () => { 
      api.put('developers/1', {
        name: {
          nome: 'Pedro',
          sexo: 'Masculino',
          idade: 24,
          dataNasc: '10-10-1997',
          hobby: 'Viajar'
        } 
      })
      .then(({ data }) => console.log(data))
    }

    // Delete Register - OK
    const handleDelete = () => { 
      api.delete('developers/0', {
         
      })
      .then(({ data }) => console.log(data))
    }

    
    const [sexo, setSexo] = useState(null)
    const [show, setShow] = useState(false)
    const [mode, setMode] = useState('date');
    const [date, setDate] = useState(new Date())
    

    const onChange = (event, dateSelected) => {
        const currentDate = dateSelected || date
        setShow(Platform.OS === 'ios')
        setDate(currentDate)
        
    }

    function showDate(){
        showMode('date')
    }

    function showMode(currentDate){
        setShow(true)
        setMode(currentDate)
    }


    return(
        <View style={styles.container}>

          <View style={styles.viewForm}>
            <Text style={styles.textLabel}>Nome Completo</Text>
            <TextInput style={styles.formText} placeholder ="Digite seu nome" 
              value={nome}
              onChangeText={(text)=> setNome(text)}
            />
            
            <Text style={styles.textLabel}>Sexo</Text>
            <PickerSelect onChange={setSexo} tipo={sexo}/>

            <Text style={styles.textLabel}>Idade</Text>
            <TextInput style={styles.formText} placeholder ="Qual a sua idade ?" keyboardType='numeric'
              value={idade}
              onChangeText={(text)=> setIdade(text)}
            /> 

            <Text style={styles.textLabel}>Data de Nascimento</Text> 
            <TouchableOpacity style={styles.data} onPress={showDate}>
                <Text style={styles.formText}>
                    {format(date , 'dd/MM/yyyy', {locate: pt})}
                </Text>
            </TouchableOpacity>

            <Text style={styles.textLabel}>Hobby</Text>
            <TextInput style={styles.formText} placeholder ="Ex: Leitura"
              value={hobby}
              onChangeText={(text)=> setHobby(text)}
            /> 
          </View>
          
          <View style={styles.viewButton}>
            <TouchableOpacity style={styles.button} onPress={handlePost}>
                <Text style={styles.textButtom}>Adicionar Desenvolvedor</Text>
            </TouchableOpacity>
          </View>
          

        
          {show && 
              <DateTimePicker 
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  display="default"
                  onChange={onChange}
              />

          }
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  formText: {
    marginHorizontal: 10,
    color: '#A3A3A3',
    padding: 10,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    fontSize: 17,
    marginLeft: 20,
    marginRight: 20,
  },
  data:{
    marginTop: 5,
  },
  viewButton: {
    marginTop: '40%',
    marginHorizontal: '2%'
  },  
  viewForm: {
    marginTop: 30,
  },
  button: {
    backgroundColor: '#6C2D93',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 5,
    marginTop: 6
  },
  textLabel: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 10,
    marginBottom: -10,
    marginLeft: 30
  },
  textButtom: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  }
})