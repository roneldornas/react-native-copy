import React, { Component } from 'react';
import { Text } from 'react-native';
import Firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });

// Password deve ter no mínimo 6 caracteres ou ocorrerá erro do Firebase

        Firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLogingSuccess.bind(this))
        .catch(() => {
            Firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLogingSuccess.bind(this))
            .catch(this.onLoginFail.bind(this));
        });
    }

    onLoginFail() {
        this.setState({
            loading: false,
            error: 'Authentication Failed'
        });
    }

    onLogingSuccess() {
        this.setState({
            loading: false,
            email: '',
            password: '',
            error: ''
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Log In
            </Button>
        );
    }
    
    render() {
        return (
            <Card>

                <CardSection>
                    <Input
                    label="Email"
                    placeholder="user@email.com"
                    value={this.state.email} 
                    onChangeText={text => this.setState({ email: text })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                    label="Password"
                    placeholder="password"
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={text => this.setState({ password: text })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle} >
                    {this.state.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>

            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;
