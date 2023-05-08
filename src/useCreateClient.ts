import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useMemo } from "react";

export default function () {
    const uri = import.meta.env.VITE_CONTENTFUL_GRAPHQL_URI;
    return useMemo(() =>
        new ApolloClient({
            uri: uri,
            cache: new InMemoryCache(),
        }),
        [ uri ],
    );
}