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