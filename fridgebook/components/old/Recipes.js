import React from 'react';
import {Text, View, StyleSheet, FlatList, Image} from 'react-native';

class Recipes extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={[
                        {key: 'Devin'},
                        {key: 'Devin1'},
                        {key: 'Jackson'},
                        {key: 'James'},
                        {key: 'Joel'},
                        {key: 'John'},
                        {key: 'Jillian'},
                        {key: 'Jimmy'},
                        {key: 'Julie'},
                    ]}
                    renderItem={({item}) =>
                        <Text style={styles.item}>{item.key}</Text>

                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 8,
        backgroundColor: 'skyblue'
    },
})


export default Recipes