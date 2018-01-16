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
                        <Text style={{fontFamily: 'fira-bold'}}>{this.props.comestible.ingredient.name}</Text>
                        <Text style={{fontFamily: 'fira-bold'}}>{this.props.comestible.amount}</Text>
                        <Text style={{color: 'gray', fontFamily: 'fira'}}>Udløber den:{this.props.comestible.expiryDate}</Text>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', paddingBottom: 10}}>
                            <Icon
                                name='local-dining'
                                size={24}
                                type='MaterialIcons'
                                color="#2196F3"
                                onPress={() => {
                                    this.findRecipes()
                                }}
                            />
                            <Icon
                                name='edit'
                                size={24}
                                type='MaterialIcons'
                                color="#ffc413"
                                onPress={() => {
                                    this.props.info(this.props.comestible);
                                }}
                            />
                            <Icon
                                name='trash'
                                size={24}
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
        height: 175,
        width: 180,
        flex: 1,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
    },
    text: {
        marginLeft: 10,
        marginRight: 10,
        flex: 1

    }
});

export default Card;