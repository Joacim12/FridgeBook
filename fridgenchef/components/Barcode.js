import React from 'react'
import {StyleSheet, View} from "react-native";
import {BarCodeScanner} from "expo";

class Barcode extends React.Component {

    state = {
        read: false,
    }

    setBack = async () => {
        this.props.navigation.goBack();
    }

    handleBarCodeRead = ({type, data}) => {
        if (!this.state.read) {
            console.log(this.props.navigation)
            this.props.navigation.navigate('AddComestible', {data: data, onBack: this.props.navigation.state.params.onBack, setBack: this.setBack});
            this.setState({read: true})
        }
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <BarCodeScanner
                    onBarCodeRead={this.handleBarCodeRead}
                    style={StyleSheet.absoluteFill}
                />
            </View>
        );
    }
}

export default Barcode;