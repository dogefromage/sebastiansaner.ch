import { useState, useRef } from "react";


export default function useToggle(inital, { debounce = 0 } = {})
{
    const [ toggle, setToggle ] = useState(initial);

    const lastToggleTime = useRef(new Date().getTime())

    function setFunction(value = null)
    {
        if (!value)
        {
            value = !toggle;
        }
        
        if (debounce > 0)
        {
            let time = new Date().getTime();
            if (time - lastToggleTime.current < debounce) return; // too short time
            
            lastToggleTime.current = time;
        }

        setToggle(value);
    }

    return [ toggle, setFunction ];
}