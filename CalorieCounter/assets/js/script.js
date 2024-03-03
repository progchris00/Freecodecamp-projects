function cleanInputString(str) {
    const regex = /[+-\s]/g;
    return str.replace(regex, '');
}

function isValidInput(str) {
    const regex = /\d+e\d+/i;
    return str.match(regex);
}