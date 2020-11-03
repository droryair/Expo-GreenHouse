const plantIdentify = require('./plantIdentify/plantIdentify-api')
const gardenAreas   = require('./gardens/gardens-api')
const botanist      = require('./botanist/botanist-api')
const plants        = require('./plants/plants-api')
const users         = require('./users/users-api')



module.exports = {
    plantIdentify,
    gardenAreas,
    botanist,
    plants,
    users
}


