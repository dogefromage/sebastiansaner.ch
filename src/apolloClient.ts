import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

let client: ApolloClient<NormalizedCacheObject> | undefined;

export default function createClient()
{
    if (!client)
    {
        client = new ApolloClient({
            uri: process.env.REACT_APP_CONTENTFUL_GRAPHQL_URI,
            cache: new InMemoryCache()
        });

    }

    return client;
}
