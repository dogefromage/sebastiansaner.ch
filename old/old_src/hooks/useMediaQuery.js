import { useState, useEffect } from "react";


/**
 * https://fireship.io/snippets/use-media-query-hook/
 */
export default function useMediaQuery(query) 
{
    const [matches, setMatches] = useState(false);

    useEffect(() => 
    {
        const media = window.matchMedia(query);
        if (media.matches !== matches) 
        {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);
    }, [matches, query]);

    return matches;
}