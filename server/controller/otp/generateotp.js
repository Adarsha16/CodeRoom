
function generateotp() {

    return Math.floor(Math.random() * (9 - 0 + 1) * 700).toString();

}

export { generateotp }