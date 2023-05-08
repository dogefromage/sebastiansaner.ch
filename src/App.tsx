import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import useCreateClient from './useCreateClient';
import MainPage from './components/MainPage/MainPage';

function App() {
    const client = useCreateClient();
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <MainPage />
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
