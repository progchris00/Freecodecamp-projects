function cleanInputString(str) {
    const regex = /[+-\s]/g;
    return str.replace(regex, '');
}