import React from 'react';
import { StyleSheet, View, Text, TextInput, Alert, Button, ScrollView } from 'react-native';

export default class Start extends React.Component {

    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Hello! Please add your name to enter the chat room.</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(name) => this.setState({ name })}
                    value={this.state.name}
                    placeholder="Type here"
                />
                <Button
                    title="Go to Chat"
                    onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name })}
                />
            </View>
        )
    }
}