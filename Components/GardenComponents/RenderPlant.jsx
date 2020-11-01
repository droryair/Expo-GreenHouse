import React from 'react';
import { Button, Text, View, Image, ScrollView, StyleSheet } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import plantIcon from '../../assets/plant.png'

export default function RenderPlant(){

    return (
        <ScrollView>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Button title="Menu" onPress={() => navigation.toggleDrawer()} />
                <Text>These are the plants in your -{area.nickName ? area.nickName : area.type}- garden area</Text>
                <View>
                    {plants.map((p, i) => {
                        return (
                            <Card key={i}>
                                <Text>
                                    <Card.Title>id: {p}</Card.Title>
                                </Text>
                                <Card.Divider />
                                <Image
                                    style={styles.tinyLogo}
                                    source={p.imgURL ? p.imgURL : plantIcon}
                                />
                                <Text style={{ marginBottom: 10 }}>
                                </Text>
                                <Button
                                    icon={<Icon name='code' color='green' />}
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title='View Plant >'
                                    onPress={() => handlePress(p)}
                                />
                            </Card>
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    tinyLogo: {
        width: 50,
        height: 50,
    },
});
