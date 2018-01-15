import React from 'react'
import {Modal, StyleSheet, Text, View} from "react-native";
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
            // console.log(this.props.navigation)
            this.props.navigation.navigate('AddComestible', {data: data, onBack: this.props.navigation.state.params.onBack, setBack: this.setBack});
            this.setState({read: true})
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeRead={this.handleBarCodeRead}
                    // style={{height:300,width:300}}
                    style={StyleSheet.absoluteFill}
                />
                <View style={{backgroundColor: 'rgba(255,255,255,0.1)', flex: 1}}>
                    <View style={{marginTop: 120,marginBottom:-120}}>
                        <Text style={{color: 'white', textAlign: 'center'}}>Vend stregkode i samme retning som mobilen{"\n"}</Text>
                    </View>
                    <View style={{
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        // position: 'absolute',
                        flex: 1,
                        marginTop: 140,
                        marginBottom: 140,
                        marginLeft: 60,
                        marginRight: 60,
                        borderWidth: 1,
                        borderColor: 'white'
                    }}>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    }
});

export default Barcode;