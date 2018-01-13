import React from 'react'
import {Image, StyleSheet, View, Text} from "react-native";
import {Icon} from "react-native-elements";

class Card extends React.Component {

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
                        <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                            <Icon
                                reverse
                                name='trash'
                                size={14}
                                type='entypo'
                                color='#F01208'
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