import { useLocation } from "react-router-dom";

export function useSlugs()
{
    const location = useLocation();
    const slugs = location.pathname.split('/').slice(1);

    if (slugs[slugs.length - 1] === '') return slugs.slice(0, -1);

    return slugs;
}