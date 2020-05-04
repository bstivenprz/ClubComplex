module.exports = function (data) {
    if (!data) {
        return Object.values(data).every(val => val !== null && val !== "" && Object.keys(val).length > 0)
    } else {
        return false
    }
}