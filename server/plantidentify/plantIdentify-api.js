const   express = require("express"),
        axios   = require("axios"),
        router  = express.Router(),
        api_key = "4rzBUqqyzhqGHeDvWYdGkTJTmHmehVLM7PhAUZUmVvdoQ3Gz4a", 
        url     = "https://api.plant.id/v2/identify"
        
router.post("/plantidentify", async (req, res) =>{
    try{
        const body = {
            api_key, 
            images: req.body.images,
            modifiers: ["crops_fast", "similar_images"],
            plant_language: "en",
            plant_details: ["common_names",
                              "url",
                              "name_authority",
                              "wiki_description",
                              "taxonomy",
                              "synonyms"]
          }
    
        const plantData = await axios.post(url , body)
        res.send(plantData.data)
    }
    catch(err){
        res.send(err)
    }
})

module.exports = router