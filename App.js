
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Button,  } from 'react-native';

export default function App() {
  async function rafiz()
  {/*
    let a =  fetch('https://jsonplaceholder.typicode.com/todos/2')
    .then(response => response.json())
    .then(json => alert(json.title))*/
    alert(1+2);
  }
  
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
      <View style={styles.horizontal}>
        <Button title='Sunday' />
        <Button title='Monday' />
        <Button title='Tuesday' />
        <Button title='Wednesday' />
        <Button title='Thursday' />
        
      </View>
      </ScrollView>
      <TouchableOpacity onPress={()=>rafiz()}>
      <Text>Open up App.js to start working on your {"\n"} {new Date().getTime()}  app, hi!</Text>
      </TouchableOpacity>
      <ScrollView>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text style={{fontSize: 96}}>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      <Text>Open up App.js to start working on your app, hi!</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection:"row",
    gap:10
  }
});
