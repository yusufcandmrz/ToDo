import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {

  const [inputText, setInputText] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [totalToDoItem, setTotalToDoItem] = useState(0);
  const [itemId, setItemId] = useState(1);

  function addToDoItem() {
    if (inputText != "") {
      setToDoList((prevToDoList) => [...prevToDoList, { id: itemId, text: inputText, isCompleted: false }]);
      setInputText("");
      setTotalToDoItem(totalToDoItem + 1);
    }
    setItemId(itemId + 1);
  }

  const renderItem = ({ item }) => (

    <TouchableOpacity
      style={[styles.itemContainer, item.isCompleted && styles.completedItem]}
      onPress={() => completeToDoItem(item.id, item.isCompleted)}
      onLongPress={() => removeToDoItem(item.id, item.isCompleted)}
    >
      <Text style={[styles.itemText, item.isCompleted && styles.completedItemText]}>{item.text}</Text>
    </TouchableOpacity>
  );

  const completeToDoItem = (id, isCompleted) => {
    if (!isCompleted) {
      setToDoList((prevToDoList) =>
        prevToDoList.map((item) =>
          item.id === id ? { ...item, isCompleted: true } : item
        )
      );
      setTotalToDoItem(totalToDoItem - 1);
    }
  };

  const removeToDoItem = (id, isCompleted) => {
    if(isCompleted)
    setToDoList(prevToDoList => prevToDoList.filter(item => item.id !== id));
  };

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>YAPILACAKLAR</Text>
        <Text style={styles.headerText}>{totalToDoItem}</Text>
      </View>
      <FlatList style={styles.toDoList} data={toDoList} renderItem={renderItem} />
      <View style={styles.inputArea}>
        <TextInput style={styles.input} placeholder='Yapılacak...' placeholderTextColor={"white"} onChangeText={setInputText} value={inputText}></TextInput>
        <TouchableOpacity style={styles.inputButton} onPress={addToDoItem}>
          <Text style={styles.inputButtonText}>KAYDET</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 10,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderColor: "orange",
    borderBottomWidth: 1,
  },
  headerText: {
    color: "orange",
    fontSize: 20,
    fontWeight: "bold",
  },
  toDoList: {
    flex: 1,
    marginVertical: 10,
    borderRadius: 10,
  },
  inputArea: {
    backgroundColor: "#454545",
    padding: 10,
    borderRadius: 10,
  },
  input: {
    color: "white",
    fontSize: 15,
    borderColor: "white",
    borderBottomWidth: 1,
  },
  inputButton: {
    margin: 10,
    backgroundColor: "orange",
    borderRadius: 10,
  },
  inputButtonText: {
    color: "white",
    alignSelf: "center",
    padding: 5,
  },
  itemContainer: {
    backgroundColor: "green",
    marginVertical: 10,
    borderRadius: 10,
  },
  completedItem: {
    backgroundColor: "#454545",
  },
  itemText: {
    padding: 10,
    color: "white",
  },
  completedItemText: {
    textDecorationLine: "line-through",
  },
});
