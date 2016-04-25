/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
const Firebase = require('firebase');
const styles = require('./styles.js');
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');


import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  AlertIOS
} from 'react-native';

class GroceryApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })

    };
    this.itemsRef = new Firebase("<GroceryApp>/items")
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      //get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key()
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows([{ title: 'Pizza' }])
    })
  }

  _renderItem(item) {
    return (
      <ListItem item={item} onPress={() => {}} />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar title="Grocery List" />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview}/>

        <ActionButton title="Add" onPress={() => {}} />

  <Text>lol</Text>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor: '#f2f2f2',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

AppRegistry.registerComponent('GroceryApp', () => GroceryApp);
