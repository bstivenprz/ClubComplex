module.exports = function (len) {

    var maxlen = 8,
    min = Math.pow(16, Math.min(len, maxlen) - 1) 
    max = Math.pow(16, Math.min(len, maxlen)) - 1,
    code = Math.floor(Math.random() * (max - min + 1)) + min,
    referralCode = code.toString(16)

    while ( referralCode.length < len ) {
        referralCode = referralCode + randHex(len - maxlen)
    }

    return referralCode

}