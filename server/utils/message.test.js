const expect = require('expect')
const {generateMessage, generateLocationMessage} = require('./message')

describe('Generate Message', () => {
    it("should generate correct message object", () => {
        let from = "WDJ"
        let text = "Some text"
        let message = generateMessage(from, text)

        expect(typeof message.createdAt).toBe('number')
        expect(message).toMatchObject({from, text})
    })
})

describe('Generate location message', () => {
    it('should generate correct location object', () => {
        let from  = 'Claire'
        let coords = {
            lat: 15,
            lng: 74
        }
        let url = `https://www.google.com/maps?q=${coords.lat}, ${coords.lng}`
        let message = generateLocationMessage(from, coords)

        expect(typeof message.createdAt).toBe('number')
        expect(message).toMatchObject({from, url})
    })
})
