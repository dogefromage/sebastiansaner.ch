import React, { useCallback, useContext, useState, useEffect, useRef } from 'react';
import { a, useTransition } from 'react-spring';

const LoadingContext = React.createContext();

export function useLoadingStatus()
{
    return useContext(LoadingContext)[0];
}

export function useLoading()
{
    const setLoadingStatus = useContext(LoadingContext)[1];

    const loading = useRef({
        start: () =>
        {
            setLoadingStatus(oldLoadingStatus => {
                return {
                    ...oldLoadingStatus,
                    totalLoaders: oldLoadingStatus.totalLoaders + 1,
                };
            });
        },
        finished: () =>
        {
            setLoadingStatus((oldLoadingStatus) => {
                return {
                    ...oldLoadingStatus,
                    totalFinished: oldLoadingStatus.totalFinished + 1,
                };
            });
        },
        abort: () =>
        {
            setLoadingStatus((oldLoadingStatus) => {
                return {
                    ...oldLoadingStatus,
                    totalFinished: oldLoadingStatus.totalLoaders - 1,
                };
            });
        },
    });

    return loading.current;
}

export function LoadingProvider({ children })
{
    const [ loadingStatus, setLoadingStatus ] = useState({
        totalLoaders: 0,
        totalFinished: 0,
    });
    
    const isLoading = loadingStatus.totalLoaders === 0 || 
        loadingStatus.totalLoaders !== loadingStatus.totalFinished;

    const transition = useTransition(isLoading, {
        enter: { opacity: 1, }, 
        leave: { opacity: 0, },
        config: { duration: 600 }
    });

    return (
        <>
            {
                transition((style, visible) =>
                    visible && <a.div className="loading-screen" style={style}>
                        <h1>Loading Page</h1>
                        <h3>{loadingStatus.totalFinished} of {loadingStatus.totalLoaders} finished</h3>
                    </a.div>
                )
            }
            <LoadingContext.Provider value={[ loadingStatus, setLoadingStatus ]}>
                { children }
            </LoadingContext.Provider>
        </>
    )
}