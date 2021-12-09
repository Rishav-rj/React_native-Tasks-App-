import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import Task from './components/Task';

const App = () => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);


  React.useEffect(() => {
    getTodosFromUserDevice(taskItems);
  }, [])

  React.useEffect(() => {
    saveTodoTouserDevice();
  }, [taskItems])



  const handleAddTask = () => {
    // Keyboard.dismiss();
    if (task === null) {
      setTaskItems([...taskItems]), alert('Oops - Input is empty');
    }
    else
      setTaskItems([...taskItems, task])
    setTask(null)
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  const saveTodoTouserDevice = async (setTaskItems = taskItems) => {
    
    try {
    const stringifyItems = JSON.stringify(taskItems);
    {console.log(taskItems)}
    await AsyncStorage.setItem('taskItems', stringifyItems)
    {console.log(taskItems)}
      } catch (e) {
      console.log(e);
      // saving error
      }
    };
    const getTodosFromUserDevice = async () => {
    try {
    const taskItems = await AsyncStorage.getItem('taskItems')    
    if (taskItems != null) {
      setTaskItems(JSON.parse(taskItems));
      {console.log(taskItems)}
    }
      } catch (error) {
        console.log(error);
      }
    };



  return (
    <View style={style.container}>

      {/* Today's Task */}
      <View style={style.taskswrapper}>
        <Text style={style.SectionTitle}>Today's<Text style={style.span}> tasks</Text></Text>

        <ScrollView>
          <View style={style.items}>
            {/* This is where the tasks go */}
            {
              taskItems.map((items, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => completeTask()}>
                    <Task text={items} />
                  </TouchableOpacity>
                )
              })
            }

          </View>
        </ScrollView>

      </View>
      


      {/* write a task */}

      <KeyboardAvoidingView
        behavior={Platform.os === "ios" ? "padding" : "height"}
        style={style.wrtieTaskWrapper}
      >
        <TextInput style={style.input} placeholder={'Write a task'}
          value={task}
          onChangeText={text => setTask(text)} />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={style.addWrapper}>
            <Text style={style.addText}>+</Text>
          </View>
        </TouchableOpacity>

      </KeyboardAvoidingView>

    </View>
  )
}









const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskswrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  SectionTitle: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold'
  },
  items: {
    color: 'black',
    marginTop: 30,
  },
  wrtieTaskWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    color: 'black',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 30
  },
  span: {
    color: 'skyblue'
  }
});

export default App;
