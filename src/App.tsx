import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import createClient from './apolloClient';
import MainPage from './components/MainPage/MainPage';

function App()
{
    const client = createClient();

    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <MainPage />    
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
