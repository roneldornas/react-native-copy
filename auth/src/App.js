import React, { Component } from 'react';
import { View } from 'react-native';
import Firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

    state = { loggedIn: null };

    componentWillMount() {
        Firebase.initializeApp({
            apiKey: 'AIzaSyDBnj2mFmnZ_6NzOnFg-8WMigt3lbYVoeY',
            authDomain: 'auth-497b3.firebaseapp.com',
            databaseURL: 'https://auth-497b3.firebaseio.com',
            projectId: 'auth-497b3',
            storageBucket: 'auth-497b3.appspot.com',
            messagingSenderId: '714660524920'
        });

        Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => Firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </CardSection>
                );
            case false:
                return <LoginForm />;
            default:
                return <Spinner />;
        }
    }
    
    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
