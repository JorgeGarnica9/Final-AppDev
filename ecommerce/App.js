import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Modal } from 'react-native';

const productsExample = [
  {id: 1, value:'tomate'},
  {id:2, value:'pera'},
  {id:3, value:'pepino'},
  {id:4, value:'pepino'},

]

export default function App() {
  const [textItem, setTextItem] = useState("")
  const [itemList, setItemList] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [itemSelected, setItemSelected] = useState({})

  const handleChangeText = (text) => setTextItem(text)
  const handleModal = (item) => {
    setItemSelected(item)
    setModalVisible(true)}
  const handleCancelModal = () => {
    setModalVisible(false)
    setItemSelected({})}
  const handleDelete = () => {
    const filter = itemList.filter(item => item.id !== itemSelected.id)
    setItemList(filter)
    setModalVisible(false)
  }

  const addItem = () => {
    setItemList(currentValue => [...currentValue, {id: Math.random().toString(), value: textItem}])
    setTextItem('')
  }

    return (
    <View style={styles.container}>
      <View>
        <TextInput 
        placeholder='Ingrese el dato' 
        style={styles.inputContainer}
        value={textItem}
        onChangeText={handleChangeText}
        >
        </TextInput>
      <Button title='AGREGAR TAREA' onPress={addItem}/>
      </View>
      <View>
        <FlatList
          style={styles.flatlist}
          data={itemList}
          keyExtractor={task => task.id.toString()}
          renderItem={({item})=>(
            <TouchableOpacity
            style={styles.product}
            onPress={()=>handleModal(item)}>
              <Text>{item.value}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <Modal 
        visible={modalVisible} 
        animationType='slide' 
        transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.textContainer}>
            <Text>
              Estás seguro que deseas eliminar el producto {itemSelected.value}
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <Button title='Borrar' color='red' onPress={handleDelete}/>
            <Button title='Cancelar' color='green' onPress={handleCancelModal}/>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 60,
    fontFamily: 'verdana',
    color: 'red',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    borderColor: 'black',
    borderWidth: 3,
    width: 250,
    margin: 5,
  },
  product: {
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 5,
    justifyContent: 'center',
    padding: 15,
    margin: 10,
    width: "90%",
  },
  flatlist: {
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    width: '80%',
    gap: 20,
    paddingVertical: 20,
    borderRadius: 8,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
  },

  textModal: {
    fontWeight: 'bold',
  }

});
