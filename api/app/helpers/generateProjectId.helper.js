module.exports = function(nLength) {
    let val = "10"
    for (let i = 1; i < nLength; i++) {
      val += "0"
    }
    let random = Math.round((Math.random() * parseInt(val)))
    while (String(random).length > nLength) {
      random = generateRamdonId(nLength)
      if (String(random).length > val.length) {
        return random
      }
    }
  
    return random
}