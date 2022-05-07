

export function capitalize(word: string)
{
    if (!word.length) return word;
    
    return word[0].toUpperCase() + word.slice(1);
}