import React from 'react'
import {Image, StyleSheet, View, Text, Dimensions, TouchableHighlight} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class RecipeCard extends React.Component {

    openRecipe = (recipe) => {
        this.props.openRecipe(recipe);
    }


    render() {
        return (
            <View style={styles.outerContainer}>
                <TouchableHighlight
                    onPress={() => {this.openRecipe(this.props.recipe)}}
                >
                    <Image source={{uri: this.props.recipe.imagePaths[0]}} style={styles.image}/>
                </TouchableHighlight>
                <View style={styles.textContainer}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textOverhead}>OPSKRIFT {this.props.recipe.rateCounter} </Text>
                        <Icon name='heart' size={26} color={this.props.recipe.color}/>
                    </View>
                    <Text style={styles.textHeader}>{this.props.recipe.name}</Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 1,
    },
    image: {
        height: deviceHeight / 1.8,
        width: deviceWidth,
    },
    textContainer: {
        padding: 10,
        position: 'absolute',
    },
    textOverhead: {
        color: 'white',
        fontFamily: 'fira-bold',
        fontSize: 14,
        borderBottomWidth: .5,
        borderBottomColor: 'white'
    },
    textHeader: {
        color: 'white',
        fontFamily: 'fira-bold',
        fontSize: 28
    },
});

export default RecipeCard;