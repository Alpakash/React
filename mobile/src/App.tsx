import React from 'react'
import {ApolloProvider} from '@apollo/react-hooks'
import Splash from "./screens/Splash";
import {client} from "./GraphQLClient";
import {Net} from "./util/Net";
import axios from "axios";
import {ThemeProvider} from "styled-components/native";
import theme from "fitworld-common/lib/common/src/theming/theme";
import AppNavigation from "./navigations/AppNavigation";
import SplashScreen from 'react-native-splash-screen'

class App extends React.Component<any, any> {
    state = {
        cachePersisted: false,
    };

    componentDidMount(): void {
        client.setupClient()
            .then(stored => {
                this.setState({cachePersisted: true});
                SplashScreen.hide()
            })
            .catch(err => console.log(err))
    }

    render() {
        if (!this.state.cachePersisted) {
            return null;
        } else {
            return (
                <ThemeProvider theme={theme}>
                    <ApolloProvider client={client.getClient()}>
                        <AppNavigation/>
                    </ApolloProvider>
                </ThemeProvider>
            )
        }
    }
}

export default App
