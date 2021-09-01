import React from 'react';
import { StyleSheet, View, Text, TextInput, Alert, Button, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
const firebase = require('firebase').default;
require('firebase/firestore');


export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            uid: 0,
            loggedInText: 'Please wait, you are getting logged in',
            user: {
                _id: '',
                name: '',
                avatar: null,
            }
        };


        const firebaseConfig = {
            apiKey: "AIzaSyA5Q39DnzOZEPPJImBokSrl7j2Rg2fycUc",
            authDomain: "chat-app-51f68.firebaseapp.com",
            projectId: "chat-app-51f68",
            storageBucket: "chat-app-51f68.appspot.com",
            messagingSenderId: "1082511549007",
            appId: "1:1082511549007:web:78823186b370a18200403a",
            measurementId: "G-WC4VWG2ME7"
        }

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        this.referenceChatMessages = firebase.firestore().collection("messages");
        this.referenceMessageUser = null;

    }


    componentDidMount() {

        // listen to authentication events
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
            // Update user state with active user    
            this.setState({
                uid: user.uid,
                messages: [],
                user: {
                    _id: user.uid,
                    name: name,
                    avatar: 'https://placeimg.com/140/140/any',
                }
            });

            // Create reference to the active users messages
            this.referenceMessagesUser = firebase.firestore().collection('messages').where('uid', '==', this.state.uid);

            // Listen for collection changes
            this.unsubscribe = this.referenceChatMessages
                .orderBy("createdAt", "desc")
                .onSnapshot(this.onCollectionUpdate);
        });
        //Reference the name entered on the start screen
        let name = this.props.route.params.name;
        //set name to be on top of screen
        this.props.navigation.setOptions({ title: name });
    }

    componentWillUnmount() {
        this.authUnsubscribe();
    }

    //Send messages
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }),
            //call addMessages to save messages to the collection on firebase
            () => {
                this.addMessages();
            })
    }

    // add a new message to the collection
    addMessages() {
        const message = this.state.messages[0];
        this.referenceChatMessages.add({
            _id: message._id,
            createdAt: message.createdAt,
            text: message.text,
            uid: this.state.uid,
            user: message.user,
        });
    }

    // Retrieve current messages and store them in the state: messages
    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // go through each document
        querySnapshot.forEach((doc) => {
            // get the QueryDocumentSnapshot's data
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                    avatar: data.user.avatar,
                },
            });
        });
        this.setState({
            messages,
        });
    }

    // Sets message bubble color
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#cdc8da'
                    }
                }}
            />
        )
    }

    render() {
        let backgroundColor = this.props.route.params.backgroundColor;

        return (
            <View style={{ flex: 1, backgroundColor }}>
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={this.state.user}
                />
                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>
        )
    }
}