const   express = require("express"),
        axios   = require("axios"),
        router  = express.Router(),
        url     = "https://api.plant.id/v2/identify"
        
const { plantIdApiKey1 } = require("../../config")
router.post("/plantidentify", async (req, res) =>{
    try{
        const body = {
            api_key:`${plantIdApiKey1}`, 
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
        // const plantData = await axios.post(url , body)
        // console.log(plantData.data);
        // res.send(plantData.data)
        res.send(

            {
                id: 7164251,
                custom_id: "ziv ziv ziv",
                meta_data: {
                  latitude: null,
                  longitude: null,
                  date: '2020-10-30',
                  datetime: '2020-10-30'
                },
                uploaded_datetime: 1604061551.232358,
                finished_datetime: 1604061553.444943,
                images: [
                  {
                    file_name: '825c3b11906540ce95225a5e8128d16c.jpg',
                    url: 'https://plant.id/media/images/825c3b11906540ce95225a5e8128d16c.jpg'
                  }
                ],
                suggestions: [
                  {
                    id: 52559921,
                    plant_name: 'Euphorbia trigona',
                    plant_details: [Object],
                    probability: 0.32437512263111234,
                    confirmed: false,
                    similar_images: [Array]
                  },
                  {
                    id: 52559922,
                    plant_name: 'Cereus',
                    plant_details: [Object],
                    probability: 0.16113332108548475,
                    confirmed: false,
                    similar_images: [Array]
                  },
                  {
                    id: 52559923,
                    plant_name: 'Cereus jamacaru',
                    plant_details: [Object],
                    probability: 0.11295860463819073,
                    confirmed: false,
                    similar_images: [Array]
                  },
                  {
                    id: 52559924,
                    plant_name: 'Euphorbia',
                    plant_details: [Object],
                    probability: 0.044559296184496965,
                    confirmed: false,
                    similar_images: [Array]
                  },
                  {
                    id: 52559925,
                    plant_name: 'Marginatocereus marginatus',
                    plant_details: [Object],
                    probability: 0.04325503014630893,
                    confirmed: false,
                    similar_images: [Array]
                  },
                  {
                    id: 52559926,
                    plant_name: 'Cereus hildmannianus',
                    plant_details: [Object],
                    probability: 0.02925900849240598,
                    confirmed: false,
                    similar_images: [Array]
                  },
                  {
                    id: 52559927,
                    plant_name: 'Pachycereus pringlei',
                    plant_details: [Object],
                    probability: 0.02346105146587007,
                    confirmed: false,
                    similar_images: [Array]
                  },
                  {
                    id: 52559928,
                    plant_name: 'Echinopsis',
                    plant_details: [Object],
                    probability: 0.019137298501046358,
                    confirmed: false,
                    similar_images: [Array]
                  }
                ],
                modifiers: [ 'crops_fast', 'similar_images' ],
                secret: 'xXHQivl5OxYc7Hn',
                fail_cause: null,
                countable: true,
                feedback: null
              }



        )
    }
    catch(err){
        console.log("error");
        res.send(err)
    }
})
module.exports = router