import React, { useState } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { usePlantsStore } from '../../App';
import GardenArea from '../GardenComponents/GardenArea';
import Json from './BOTanistMessages.json'
import { RadioButton, Text } from 'react-native-paper';


// ADD MENU BUTTON



export default function BOTanistChat() {
    const [currentChat, setCurrentChat] = useState([])
    const [value, setValue] = useState()

    const userName = "Dror"
    const Plantstore = usePlantsStore()
    const areas = Plantstore.gardenAreas.areas
    const allPlants = Object.values(Plantstore.PlantsStore.plantsArr)
    // console.log(allPlants );
    // console.log(typeof( allPlants))
    // console.log(Object.values(allPlants))
    var gardensNames = areas.map(area => {
        return area.nickName ? area.nickName : area.type
    })

    const Welcome = () => {
        const message = Json.welcome.replace("user_name", userName)
        setCurrentChat(
            ...currentChat,
            [
                <Text>{message}</Text>,
                <Button
                    title="Help me pick a new plant to adopt!"
                    onPress={() => suggestions()} />,
                <Button
                    title="One of my plants is sick..."
                    onPress={() => diseases()} />
            ])
    }


    const suggestions = () => {
        const gardenMessage = Json.suggestions.garden
        setCurrentChat(
            ...currentChat,
            [
                <>
                    <Text>{gardenMessage}</Text>
                    {gardensNames.map((garden, i) => {
                        return <Button
                            key={i}
                            title={garden}
                            onPress={() => suggestionsResultsFunction(garden)} />
                    })}
                    <Button key={34567898765}
                        title="None of the above"
                        onPress={() => noGarden()}
                    />
                </>
            ])
    }



    const noGarden = () => {
        const noGarednaMessage = Json.suggestions.none
        setCurrentChat([
            ...currentChat,
            [
                <Text key={34875}>{noGarednaMessage}</Text>
            ]
        ])
    }


    const suggestionsResultsFunction = async (garden) => {
        console.log(garden)
        const resultsMessage = Json.suggestions.results.replace("garden_name", garden)
        const noMatches = Json.suggestions.no_matches
        const gardenConditions = garden.conditions
        await console.log("looking for results from the DB")
        const results = ["cacti", "herbs"]

        setCurrentChat(
            ...currentChat,
            [
                results
                    ? <>
                        <Text>{resultsMessage}</Text>
                        {results.map((result, i) => {
                            return (
                                <ListItem key={i} >
                                    <Text >{result}</Text>
                                </ListItem>
                            )
                        }
                        )}
                    </>
                    : <Text>{noMatches}</Text>
            ])
    }






    const diseases = () => {
        const gardenMessage = Json.diseases.garden
        setCurrentChat(
            ...currentChat,
            [
                <>
                    <Text>{gardenMessage}</Text>
                    {gardensNames.map((gardenName, i) => {
                        return <Button
                            key={i}
                            title={gardenName}
                            onPress={() => plantFunction(gardenName)} />
                    })}
                    <Button key={34567898765}
                        title="None of the above"
                        onPress={() => noGarden()}
                    />
                </>
            ])
    }

    const plantFunction = (gardenName) => {
        const garden = areas.find(area => area.type === gardenName || area.nickName === gardenName)
        console.log(garden)
        const plantMessage = Json.diseases.plant
        const plantsIDs = garden.plants
        const gardenPlants = []
        plantsIDs.map(plantId => {
            gardenPlants.push(allPlants.find(p => p.id === plantId))
        })
        console.log(gardenPlants)
        setCurrentChat(
            ...currentChat,
            [
                <>
                    <Text>{plantMessage}</Text>
                    {gardenPlants.map((plant, i) => {
                        return (
                            <Button
                                key={i}
                                title={plant.nickname ? plant.nickname : plant.name}
                                onPress={() => diseasesFunctions(plant)} />
                        )
                    })}
                </>
            ]
        )

    }

    const diseasesFunctions = (plant) => {
        const diseases = plant.possibleDiseases
        const symptomsMessage = Json.diseases.symptoms
        console.log(diseases)
        let radioButton
        setCurrentChat(
            ...currentChat,
            [
                <>
                    <Text>{symptomsMessage}</Text>
                    <View>
                        <RadioButton.Group
                            onValueChange={value => setValue(value)}
                            value={value}>
                            {diseases.map((disease, i) => {
                                return (
                                    <View key={i}>
                                        <Text>{disease.main_symptoms}</Text>
                                        <RadioButton value={disease.id} />
                                    </View>
                                )
                            })
                            }
                        </RadioButton.Group>
                        <Button
                            title="Yes, that's the one!"
                            onPress={diseasesResultFunction(radioButton, diseases)}
                        />
                    </View>
                </>
            ]
        )
    }

    const diseasesResultFunction = (value, diseases) => {
        const chosenDisease = diseases.find(d => d.id === value)
        const resultsMessage = Json.diseases.results
        setCurrentChat(
            ...currentChat,
            [
                <>
                    <Text>{resultsMessage}</Text>
                    <Image
                        style={styles.smallLogo}
                        source={chosenDisease.img_link}
                    />
                    <Text>this is how tou can treat {chosenDisease.scientific_name}: {"\n"}
                        {chosenDisease.treatment}
                    </Text>
                    <Text style={{ color: 'blue' }}
                        onPress={() => Linking.openURL(chosenDisease.external_link)}>
                        Read more about {chosenDisease.name ? chosenDisease.name : chosenDisease.scientific_name}
                    </Text>
                </>
            ]
        )
    }




    // *radio button
    // diseases=[
    //     id ,
    //     name,  
    //     scientific_name ,
    //     time_of_year ,
    //     treatment ,
    //     main_symptoms  ,
    //     img_link  ,
    //     external_link 
    // ]

    console.log("chat history", currentChat)
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Text>BOTanist Chat</Text>


            {currentChat.length > 0
                ? currentChat.map((element, i) => <View key={i}>{element}</View>)
                : <Button
                    onPress={Welcome}
                    title="welcome"
                />
            }

        </View>
    )
}


const styles = StyleSheet.create({
    smallLogo: {
        width: 70,
        height: 70,
    },
});
