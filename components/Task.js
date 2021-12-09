import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';


const Task = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemsLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.circular} >
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  item:{
    backgroundColor:'white',
    padding:15,
    borderRadius:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:20
  },
  itemsLeft:{
    flexDirection:'row',
    alignItems:'center',
    flexWrap:'wrap'
  },
  square:{
    width:24,
    height:24,
    backgroundColor:'#55BCF6',
    opacity:0.4,
    borderRadius:5,
    marginRight:15
  },
  itemText:{  
    color:'black',
    maxWidth:'80%'
  },
  circular:{
    width:10,
    height:10,
    // borderColor:'#55BCF6',
    borderColor:'gold',
    borderWidth:2,
    borderRadius:25
  }
  
});


export default Task;