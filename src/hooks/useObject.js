import { useRef } from 'react';

/**
 * Copies a js object but only re-instantiates it if its parameters change.
 * Used for useTransition hook, so that the animation doesn't update every frame.
 * 
 * @param object to be watched
 * 
 * @returns an object
 */
export default function useObject(obj)
{
    const ref = useRef(obj);

    let json1 = JSON.stringify(ref.current);
    let json2 = JSON.stringify(obj)
    
    if (json1 !== json2)
    {
        ref.current = obj;
    }
    
    return ref.current;
}