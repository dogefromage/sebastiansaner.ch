

export function joinClasses(...classes: (string | undefined | null)[])
{
    return classes.reduce<string>((last, current) =>
    {
        if (current) return `${last} ${current}`;
        return last;
    }, '');
}