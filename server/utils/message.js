const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: Date.now()
    }
}

const generateLocationMessage = (from, coords) => {
    return {
      from,
      url: `https://www.google.com/maps?q=${coords.lat}, ${coords.lng}`,
      createdAt: Date.now()
    }
}

module.exports = { generateMessage, generateLocationMessage }