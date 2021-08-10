import React from 'react';
import { StyleSheet, View, Text, TextInput, Alert, Button, ScrollView } from 'react-native';


export default class Chat extends React.Component {
    render() {
        let backgroundColor = this.props.route.params.backgroundColor;
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });

        return (
            <View style={[styles.backgroundColor(backgroundColor), styles.container]}>
                <Text>Chat room is under construction ...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    // Brings over selected background color selected in home screen
    backgroundColor: (backgroundColor) => ({
        backgroundColor: backgroundColor,
    }),
});