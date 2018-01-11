import React, {Component} from "react";
import {View, Text, KeyboardAvoidingView, TextInput, ScrollView} from "react-native";
import {Button, FormInput} from "react-native-elements";

class Test extends Component {

    render() {
        return (
            <ScrollView>
                <KeyboardAvoidingView behavior={'padding'}  keyboardVerticalOffset={25} style={{alignItems: 'center'}}>
                    <FormInput>hey</FormInput>
                    <Button>click</Button>
                    <View>
                        <TextInput placeholder='Example 1'/>
                        <TextInput placeholder='Example 2'/>
                        <TextInput placeholder='Example 3'/>
                        <TextInput placeholder='Example 4'/>
                        <TextInput placeholder='Example 5'/>
                        <TextInput placeholder='Example 6'/>
                        <TextInput placeholder='Example 7'/>
                        <TextInput placeholder='Example 1' />
                        <TextInput placeholder='Example 2' />
                        <TextInput placeholder='Example 3' />
                        <TextInput placeholder='Example 4' />
                        <TextInput placeholder='Example 5' />
                        <TextInput placeholder='Example 6' />
                        <TextInput placeholder='Example 7' />
                        <Text>This is text</Text>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}


export default Test;