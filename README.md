# CRUD-REACT-NATIVE

Este é um pequeno app para cadastros, desenvolvido com base em React Native, JavaScript, Axios. (O APP AINDA NÃO ESTÁ COMPLETO)
Esse app faz o consumo de uma API desenvolvida em NodeJS e Express

###  Passos da criação:
#### 1.  Criação da API atendendo as requisições http (GET, POST, PUT, DELETE)
    1.1 - A API foi desenvolvida com NodeJs e Express
    1.2 - As requisições de itens específicos, são feitos através do index da posição de cada elemento
    1.3 - Foram implementados 2 Middlewares para conferir se a erro na requisição.

#### 2. Após API concluída, é iniciado o processo de consumo da API pelo frontend através do Axios, numa interface desenvolvida com React Native
	2.1 - Foram utilizadas algumas bibliotecas para a implementação de algumas funções: 
		2.1.1 - '@react-native-picker/picker' - Inserir um Picker Select para selecionar o sexo
		2.1.2 - '@react-native-community/datetimepicker' - Inserir um calendário para selecionar a data de nascimento
		2.1.3 - 'date-fns'- Para formatação da data
		2.1.4 - 'react-native-vector-icons' - Inserir ícones de exclusão e edição.
	2.2 - A UI/UX é uma SPA (Single-Page-Application).
	2.3 - A UI é composta por uma mensagem de boas vindas e uma chamada pra ação através de dois botões.
	2.4 - Cada botão renderiza um componentes específico. O primeiro (Listar Desenvolvedores), renderiza a lista com os desenvolvedores cadastrados, 
    onde em cada item possui a opção de exclusão e edição através de ícones. 
    O primeiro click exibe o componente e o segundo oculta. Os itens são exibidos em uma FlatList
	2.5 - O segundo botão exibe um formulário para o cadastro de novos desenvolvedores.
#### 3.  O projeto está bem organizado em uma hierarquia de diretórios e arquivos.
    
#### 4.  No Backend foram implementadas os seguintes endpoints:
    4.1  GET / developers
    4.2  GET / developers / {id}
    4.3  POST / developers
    4.4  PUT / developers / {id}
    4.5  DELETE / developers / {id}
#### 5.  No Frontend foram implementadas os seguintes endpoints:
    
    5.1 - GET / developers
    5.2 - POST / developers
#### 6.  Funções não implementadas no Frontend
    
    6.1 - Exclusão de um item especifico - DELETE / developers / {id}
    6.2 - Edição de um item especifico - PUT / developers / {id}
    6.3 - Busca de um item por passagem de parâmetros - GET / developers?
#### 7.  Funções não implementadas no Backend
    
    7.1  Busca de um item por passagem de parâmetros - GET / developers?

#####      NÃO FORAM IMPLEMENTADOS TESTES UNITÁRIOS!
