import React, { useEffect, useState } from "react";
import { StyleSheet, Text, FlatList, View, TouchableOpacity, Modal, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

import api from "../../services/api";

import PickerSelect from "../SelectPicker/index.android";
import DateTimePicker from '@react-native-community/datetimepicker'

import { format } from 'date-fns';
import { pt } from 'date-fns/locale';


export default function List(){

    const [dev, setDev] = useState([{}])
    const [modalVisible, setModalVisible] = useState(false)
    const [show, setShow] = useState(false)
    const [mode, setMode] = useState('date');
    const [date, setDate] = useState(new Date())

    const [newName, setNewName] = useState('')
    const [newSexo, setNewSexo] = useState(null)
    const [newIdade, setNewIdade] = useState('')
    const [newDate, setNewDate] = useState(new Date())
    const [newHobby, setNewHobby] = useState('')

    const openModal = (id, nome, sexo, idade, dataNasc, hobby) => {
        api.get(`developers/${id}`,{
           
        })
        .then(({ data }) => console.log(data))
            console.log(`Valor ID: ${id}`)
            console.log(`Nome: ${nome}`)
            console.log(`Sexo: ${sexo}`)
            console.log(`Idade: ${idade}`)
            console.log(`Data de Nascimento: ${dataNasc}`)
            console.log(`Hobby: ${hobby}`)
            console.log('----------------------------------')

        // api.put(`developers/${id}`, {
        //      dev: {
        //          nome: 'Jaine Oliveira',
        //          sexo: 'Feminino',
        //          idade: 25,
        //          dataNasc: '10-09-1995',
        //          hobby: 'Viajar'
        //      } 
        //  }).then(({ data }) => console.log(data))
              
        setModalVisible(true)
        setNewName(nome)
        setNewSexo(sexo)
        setNewIdade(idade)
        setNewDate(dataNasc)
        setNewHobby(hobby)
    }

    function showDate(){
        showMode('date')
    }

    function showMode(currentDate){
        setShow(true)
        setMode(currentDate)
    }

    const onChange = (event, dateSelected) => {
        const currentDate = dateSelected || date
        setShow(Platform.OS === 'ios')
        setDate(currentDate)
        
    }

     
    useEffect(() => {
        api.get('/developers').then((response) => {
          setDev(response.data)
          console.log("Requisição Concluida")
        })
      }, [])

    // Get All
    const handleGet = () => {
        api.get('/developers').then((response) => {
          setDev(response)
          console.log(response.data)
        })
    }

    const selectedParams = () => { 
        api.get(`developers`,{
           
        })
        .then(({ data }) => console.log(data))
    }

    const updateDevelopers = (id) => {
        api.put(`developers/${id}`, {
            dev: {
                nome: newName,
                sexo: newSexo,
                idade: newIdade,
                dataNasc: date,
                hobby: newHobby
            } 
        }).then(({ data }) => console.log(data))
    }
    
    const handleDelete = (id) => { 
        api.delete(`developers/${id}`,{
           
        })
        .then(({ data }) => console.log(data))
        console.log(id)
    }

    return(
        <View style={styles.container}>

            <View style={styles.viewSearch}>
                <TextInput placeholder="Quem você procura ?" style={styles.search}/>

                <TouchableOpacity>
                    <Ionicons name="search-outline" size={30} style={styles.iconSearch}/>
                </TouchableOpacity>
            </View>

            <FlatList 
                data={dev}
                renderItem={
                    ({item}) =>
                    <View style={styles.viewAll}>
                        <View style={styles.viewText}>
                            <Text style={styles.textSub}>Nome</Text>
                            <Text style={styles.text}>{item.nome}</Text>

                            <Text style={styles.textSub}>Sexo</Text>
                            <Text style={styles.text}>{item.sexo}</Text>

                            <Text style={styles.textSub}>Idade</Text>
                            <Text style={styles.text}>{item.idade} anos</Text>

                            <Text style={styles.textSub}>Data de Nascimento</Text>
                            <Text style={styles.text}>{item.dataNasc}</Text>

                            <Text style={styles.textSub}>Hobby</Text>
                            <Text style={styles.text}>{item.hobby}</Text>
                        </View>

                        <View style={styles.viewIcons}>
                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                <Ionicons name="trash-outline" size={20} style={styles.icons}/>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={() => 
                                openModal(item.id, item.nome, item.sexo, item.idade, item.dataNasc, item.hobby)}>
                                
                                <Ionicons name="create-outline" size={20} style={styles.icons}/>
                            </TouchableOpacity>
                        </View>
                                                
                    </View>
                    
                }
                keyExtractor={(item,index) => index.toString()}
            />

            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>

                    <View style={styles.viewForm}>
                        <Text style={styles.textLabel}>Nome Completo</Text>
                        <TextInput style={styles.formText} placeholder="Digite seu nome" 
                            value={newName}
                            onChangeText={(text)=> setNewName(text)}
                        />
                                    
                        <Text style={styles.textLabel}>Sexo</Text>
                        <PickerSelect onChange={setNewSexo} tipo={newSexo}/>

                        <Text style={styles.textLabel}>Idade</Text>
                        <TextInput style={styles.formText} placeholder="Qual a sua idade ?" keyboardType='numeric'
                            value={newIdade}
                            onChangeText={(text)=> setNewIdade(text)}
                        /> 

                        <Text style={styles.textLabel}>Data de Nascimento</Text> 
                        <TouchableOpacity style={styles.data} onPress={showDate}>
                            <Text style={styles.formText}>
                                    {format(date , 'dd/MM/yyyy', {locate: pt})}
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.textLabel}>Hobby</Text>
                        <TextInput style={styles.formText} placeholder="Ex: Leitura"
                            value={newHobby}
                            onChangeText={(text)=> setNewHobby(text)}
                        /> 
                    </View>

                    <View style={styles.viewButtons}>
                        <TouchableOpacity onPress={(id) => updateDevelopers(id)} style={styles.modalButtomUpdate}>
                            <Text style={styles.textButtonUpdate}>Atualizar Registro</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButtomClose}>
                            <Text style={styles.textButtons}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

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
        flex: 1,
        justifyContent: 'center'
    },
    viewAll: {
        flexDirection: 'row',
    },
    viewText: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        marginLeft: '5%',
        marginTop: 10,
        padding: 5,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        width: '80%',
        justifyContent: 'center',
        borderBottomColor: '#6C2D93',
        borderBottomWidth: 1,
    },
    text: {
        marginLeft: 10,
        fontSize: 17,
        fontWeight: 'bold'
    },
    textSub: {
        fontSize: 10,
        marginBottom: -4
    },
    viewIcons: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 10,
        padding: 10,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        borderBottomColor: '#6C2D93',
        borderBottomWidth: 1,
    },
    icons: {
        paddingTop: 10,
        paddingBottom:10,
        color: '#6C2D93',
    },
    modalContainer: {
        width: '100%',
        height: '90%',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopColor: '#6C2D93',
        borderWidth: 1,
    },
    viewButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '4%',
        flexDirection: 'column',
        marginTop: '55%'
    },
    modalButtomClose: {
        backgroundColor: '#fff',
        margin: '1%',
        borderRadius: 5,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#6C2D93',
        borderWidth: 1,
    },
    modalButtomUpdate: {
        backgroundColor: '#6C2D93',
        margin: '1%',
        borderRadius: 5,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',  
    },
    textButtonUpdate: {
        color: '#fff',
        padding: 10,
        fontSize: 17,
    },
    textButtons: {
        color: '#6C2D93',
        padding: 10,
        fontSize: 17,
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
      viewForm: {
        marginTop: 30,
      },
      textLabel: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 10,
        marginBottom: -10,
        marginLeft: 30
      },
      viewSearch: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginHorizontal: '1%',
        margin: 8
      },
      search: {
        padding: 10,
        paddingLeft: 8,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderColor: '#f1f1f1',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        width: '80%'
      },
      iconSearch: {
        borderColor: '#f1f1f1',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        padding: 8,
        color: '#6C2D93',
      }

})