import { useLocation } from 'react-router-dom';

export function lerp(t, a, b)
{
    return a + t * (b - a);
}

export function useUrl()
{
    const location = useLocation();
    return location.pathname.toLowerCase().match(/\/[\w]*/)?.[0];
}

export function absPath(relativePath)
{
    if (relativePath[0] !== '/') 
    {
        relativePath = '/' + relativePath;
    }

    return window.location.origin + relativePath;
}