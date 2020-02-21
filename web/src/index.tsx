import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from "styled-components";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';


export const client = new ApolloClient({
    uri: 'https://swapi.graph.cool/'
});

function Main() {
    return (
        <ThemeProvider theme={{}}>
            <ApolloProvider client={client}>
                <App/>
            </ApolloProvider>
        </ThemeProvider>
    )
}
ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();