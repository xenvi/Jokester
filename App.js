import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar
} from 'react-native';
// components
import Jokes from './components/FetchJokes';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        jokesData: null,
        refreshing: false
    };
  }
  componentDidMount() {
    // on load, fetch jokes
    this.fetchJokes();
  }

  fetchJokes = async () => {
    this.setState({
        loading: true
    })
    
    // // fetch 10 random jokes and set to state
    // try {
    //   await fetch('https://official-joke-api.appspot.com/random_ten')
    //   .then(res => res.json())
    //   .then(data => {
    //       this.setState({
    //           loading: false,
    //           jokesData: data
    //       })
    //   })
    // } catch (err) {
    //   console.log(err);
    // }
    
    // local json jokes to test async storage
    const localJokesData = require('./random_ten_storage.json');
    this.setState({
      loading: false,
      jokesData: localJokesData
    })
  };

  _onRefresh = () => {
    // on refresh, load new set of jokes
    this.setState({refreshing: true});
    this.fetchJokes()
      .then(() => {
        this.setState({refreshing: false});
      });
  }

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.container}>
            <Jokes state={this.state} onRefresh={this._onRefresh} />
        </SafeAreaView>
      </>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});