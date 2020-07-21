import React, { Component } from "react";
import { View, Image, RefreshControl, FlatList, StyleSheet } from "react-native";
// components
import JokesCard from "./JokesCard";
// assets
import smile from '../assets/images/smile.png';

export default class Jokes extends Component {
    refreshHandler = () => {
        this.props.onRefresh();
    }
    render() {
    // receive state from props
    const { jokesData, refreshing } = this.props.state;
        return (
            <>
            <FlatList
                style={styles.flatList}
                data={jokesData}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) =>
                    <JokesCard item={item} />
                }
                ListHeaderComponent={
                    <View style={styles.smileHeaderWrapper}>
                        <Image source={smile} style={styles.smileHeader}></Image>
                    </View>
                }
                ListFooterComponent={
                    <View style={styles.flatlistBottomSpacing}>
                    </View>
                }
                refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={this.refreshHandler}
                    />
                  }
                 />
        </>
        );
    }
};

const styles = StyleSheet.create({
    flatList: {
        padding: 15
    },
    smileHeaderWrapper: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 30
    },
    flatlistBottomSpacing: {
        padding: 25
    }
  });