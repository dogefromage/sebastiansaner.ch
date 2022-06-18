

export function joinClasses(...classes: (string | undefined | null | false)[])
{
    return classes.reduce<string>((last, current) =>
    {
        if (current) return `${last} ${current}`;
        return last;
    }, '');
}