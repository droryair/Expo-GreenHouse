// import { observer } from 'mobx-react';
// import * as React from 'react';
// import {useContext} from 'react';
// import { Button, StyleSheet, View, Text, Image} from 'react-native';
// import { PlantsContext } from '../../App';

//   const Results = observer(({ navigation }) => {
//     const plantsStore = useContext(PlantsContext)
//     return ( 
//         <View style={styles.container}>
//             <Button title="Menu" onPress={() => navigation.toggleDrawer()} />
//             <Text style={styles.header}>{plantsStore.identification.identified.plant_name}</Text>
//             <Image
//                 style={styles.plantImage}
//                 source={{
//                 uri: plantsStore.identification.image,
//                 }}
//             />
//             <Text>{plantsStore.identification.wikiData}</Text>
//         </View>
//     )
// })
// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center' 
//     },
//     header:{
//         fontSize: 20,
//         color:"black",
//         marginBottom: 50
//     },
//     plantImage: {
//         width: 100,
//         height: 200,
//     }
// })

// export default Results