import React from 'react';
import { StyleSheet, View, Text, TextInput, Alert, Button, ScrollView } from 'react-native';


export default class Chat extends React.Component {
    render() {
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Chat room pending ...</Text>
            </View>
        )
    }
}