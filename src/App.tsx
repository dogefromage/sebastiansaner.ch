import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import createClient from './apolloClient';
import DesktopPage from './components/Page/Page';

function App()
{
    const client = createClient();

    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <DesktopPage />    
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
