import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
// assets
import smile from '../assets/images/smile.png';
import frown from '../assets/images/frown.png';

export default class JokesCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            disliked: false,
            likedBackgroundColor: 'rgba(0,0,0, 0.1)',
            dislikedBackgroundColor: 'rgba(0,0,0, 0.1)'
        };
      }

      componentDidMount() {
        // retrieve local data
          this.getStorageData();
      }

    handleLike = async () => {
        // on like, if not already liked, change background green and reset dislike state
        // store state in local storage
        if (!this.state.liked) {
            this.setState({
                liked: true,
                disliked: false,
                likedBackgroundColor: '#7DE4A6',
                dislikedBackgroundColor: 'rgba(0,0,0, 0.1)'
            }, this.setStorageData)
            
        }
    }
    handleDislike = async () => {
        // on dislike, if not already disliked, change background red and reset 'like' state
        // store state in local storage
        if(!this.state.disliked) {
            this.setState({
                liked: false,
                disliked: true,
                likedBackgroundColor: 'rgba(0,0,0, 0.1)',
                dislikedBackgroundColor: '#FA8775'
            }, this.setStorageData);
        }
    }

    // set current joke state in local storage
    setStorageData = async() => {
        const jokeId = this.props.item.id;
        try {
            await AsyncStorage.setItem(`Joke ${jokeId}`, JSON.stringify({
                liked: this.state.liked,
                disliked: this.state.disliked,
                likedBackgroundColor: this.state.likedBackgroundColor,
                dislikedBackgroundColor: this.state.dislikedBackgroundColor
            }));
        } catch (err) {
            console.log(err);
        }
    }

    // get stored joke states in local storage
    getStorageData = async() => {
        const jokeId = this.props.item.id;
        try {
            let currentState = await AsyncStorage.getItem(`Joke ${jokeId}`).then((res) => JSON.parse(res));
            if (currentState !== null) {
                this.setState(currentState);
            }
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        const { item } = this.props;

        return (
                <View style={styles.card} key={item.id}>
                    <Text style={styles.setup}>{item.setup}</Text>
                    <Text style={styles.punchline}>{item.punchline}</Text>
                    <View style={styles.row}>
                        <TouchableOpacity
                            onPress={this.handleDislike}
                            style={[styles.iconBtn, {backgroundColor: this.state.dislikedBackgroundColor}]}>
                            <Image source={frown} style={styles.cardIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.handleLike}
                            style={[styles.iconBtn, {backgroundColor: this.state.likedBackgroundColor}]}
                            >
                            <Image source={smile} style={styles.cardIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconBtn: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 20
    },
    cardIcon: {
        transform: [{ scale: 0.5 }],
    },
    card: {
        backgroundColor: '#FFE6E2',
        width: '100%',
        height: 'auto',
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 20
    },
    setup: {
        fontFamily: 'Roboto-Medium',
        fontWeight: 'bold',
        fontSize: 16,
    },
    punchline: {
        fontFamily: 'Roboto-Regular',
        fontWeight: '400',
        fontSize: 16,
        marginTop: 15,
        marginBottom: 15
    }
  });