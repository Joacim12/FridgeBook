import React from 'react'
import { Button, Text, TextInput, View } from "react-native";
import DatePicker from 'react-native-datepicker'

class AddIngredient extends React.Component {

        state = {
            text: '', 
            date: ''
        };


    static navigationOptions = ({ navigation }) => ({
        headerRight: <Button
            title="hej"
            onPress={() => console.log("clicked")}
        />
    });

    render() {
        return (
            <View style={{ padding: 10 }}>
                <Text style={{ padding: 10, fontSize: 42 }}>Add new comestible</Text>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Comestible name"
                    onChangeText={(text) => this.setState({ text })}
                />
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Amount"
                    keyboardType="numeric"
                    onChangeText={(text) => this.setState({ text })}
                />
                 <DatePicker
                    style={{ width: 200 }}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    minDate="01-05-2013"
                    maxDate="10-06-2020"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => { this.setState({ date: date }) }}
                />
                <Text style={{ padding: 10, fontSize: 42 }}>
                    {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
                </Text>
            </View>
        );
    }
}

export default AddIngredient