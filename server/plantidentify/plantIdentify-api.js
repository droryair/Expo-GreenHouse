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
            id: 7076075,
            custom_id: null,
            meta_data: {
              latitude: null,
              longitude: null,
              date: '2020-10-26',
              datetime: '2020-10-26'
            },
            uploaded_datetime: 1603726551.637281,
            finished_datetime: 1603726552.527181,
            images: [
              {
                file_name: 'c2e2281d7d2e4490a3fdc5fc875f050f.jpg',
                url: 'https://plant.id/media/images/c2e2281d7d2e4490a3fdc5fc875f050f.jpg'
              }
            ],
            suggestions: [{
                id: 51868256,
                plant_name: 'Ficus benghalensis',
                plant_details: {
                  scientific_name: 'Ficus benghalensis',
                  structured_name: {
                    genus: 'ficus',
                    species: 'benghalensis'
                  },
                  common_names: [
                    'Banyan',
                    'Banyan tree',
                    'Banyan fig',
                    'Indian banyan'
                  ],
                  url: 'http://en.wikipedia.org/wiki/Ficus_benghalensis',
                  name_authority: 'Ficus benghalensis L.',
                  wiki_description: {
                    value: 'Ficus benghalensis, commonly known as the banyan, banyan fig and Indian banyan, is a tree native to the Indian Subcontinent. Specimens in India are among the largest trees in the world by canopy coverage.',
                    citation: 'http://en.wikipedia.org/wiki/Ficus_benghalensis',
                    license_name: 'CC BY-SA 3.0',
                    license_url: 'https://creativecommons.org/licenses/by-sa/3.0/'
                  },
                  taxonomy: {
                    kingdom: 'Plantae',
                    phylum: 'Tracheophyta',
                    'class': 'Magnoliopsida',
                    order: 'Rosales',
                    family: 'Moraceae',
                    genus: 'Ficus'
                  },
                  synonyms: [
                    'Ficus indica',
                    'Urostigma benghalense'
                  ]
                },
                probability: 0.22450020143648652,
                confirmed: false,
                similar_images: [
                  {
                    id: 'f8e196650bc6e5b12cd0ece24afd85f2',
                    similarity: 0.8202677492409174,
                    url: 'https://storage.googleapis.com/plant_id_images/similar_images/2019_05/images/Ficus benghalensis/f8e196650bc6e5b12cd0ece24afd85f2.jpg',
                    url_small: 'https://storage.googleapis.com/plant_id_images/similar_images/2019_05/images/Ficus benghalensis/f8e196650bc6e5b12cd0ece24afd85f2.small.jpg'
                  },
                  {
                    id: '2306d705da88fc895edda6f53e299861',
                    similarity: 0.720397443406311,
                    url: 'https://storage.googleapis.com/plant_id_images/similar_images/2019_05/images/Ficus benghalensis/2306d705da88fc895edda6f53e299861.jpg',
                    url_small: 'https://storage.googleapis.com/plant_id_images/similar_images/2019_05/images/Ficus benghalensis/2306d705da88fc895edda6f53e299861.small.jpg'
                  }
                ]
              }]
            ,
            modifiers: [
              'crops_fast',
              'similar_images'
            ],
            secret: '0VmkEAoRHlvEyBA',
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