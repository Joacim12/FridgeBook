import React from 'react'
import {Image, StyleSheet, View, Text} from "react-native";
import {Icon} from "react-native-elements";
import {Alert} from "react-native";

class Card extends React.Component {

    deleteComestible = async (id) => {
        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "DELETE"
        }

        const res = await fetch('https://vetterlain.dk/FridgeBook/api/comestible/' + id, options);
    }

    findRecipes = () => {
        this.props.search(this.props.comestible.ingredient.name);
    }

    render() {
        return (
            <View style={styles.outerContainer}>
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={{uri: "https://vetterlain.dk/images/fridgebook/thumb/" + this.props.comestible.ingredient.imagePath}}/>
                    <View style={styles.text}>
                        <Text style={{fontWeight: 'bold'}}>{this.props.comestible.ingredient.name}</Text>
                        <Text style={{fontWeight: 'bold'}}>{this.props.comestible.amount}</Text>
                        <Text style={{color: 'gray'}}>Udløber den:{this.props.comestible.expiryDate}</Text>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{justifyContent: 'flex-end'}}>
                                <Icon
                                    reverse
                                    name='local-dining'
                                    size={14}
                                    type='MaterialIcons'
                                    color="#2196F3"
                                    onPress={() => {
                                        this.findRecipes()
                                    }}
                                />
                            </View>
                            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                                <Icon
                                    reverse
                                    name='trash'
                                    size={14}
                                    type='entypo'
                                    color='#ff5613'
                                    onPress={() => {
                                        Alert.alert(
                                            'Slet ' + this.props.comestible.ingredient.name,
                                            `Er du sikker på at du vil slette ${this.props.comestible.ingredient.name.toLowerCase()}? Handlingen kan ikke fortrydes`,
                                            [{text: 'Annuller'},
                                                {
                                                    text: 'OK', onPress: () => {
                                                        this.deleteComestible(this.props.comestible.id)
                                                            .then(() => this.props.updateUser())
                                                    }
                                                }]
                                        );
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        // borderWidth: .1,
        margin: 10,
        borderColor: 'gray',
        shadowColor: '#000000',
        borderRadius: 5,
        backgroundColor: 'white',
        elevation: 5,

    },
    container: {
        flexDirection: 'row'
    },
    image: {
        height: 150,
        width: 150,
        flex: 1,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
    },
    text: {
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
        // padding: 10,

    }
});

{/*<Card*/
}
{/*key={index}*/
}
{/*title={comestible.ingredient.name}*/
}
{/*image={{uri: 'https://vetterlain.dk/images/fridgebook/thumb' + comestible.ingredient.imagePath}}>*/
}
{/*<Text style={{marginBottom: 10}}>*/
}
{/*{'Antal: ' + comestible.amount}*/
}
{/*{'\nUdløber den: ' + comestible.expiryDate}*/
}
{/*</Text>*/
}
{/*
}
                                {/*</Card>*/
}

export default Card;