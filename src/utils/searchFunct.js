//No longer needed since we use a two-stage: temp city to fetch, and set the displayed city from the response
//Furthermore, in JS we can use text-transform: capitalize, if we would have needed it

const capitaliseFirstLetter = (string) => {
    let words = string.split(" ");
    let capitWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitWords.join(" ");
}

export {
    capitaliseFirstLetter
}