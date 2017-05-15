import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, Text} from 'react-native';

export default class Button extends Component {
	render() {
		return (
			<TouchableHighlight
				style={[Style.button, this.props.higlighted ? Style.highlighted : null]}
				underlayColor="#A9A9A9"
				onPress={this.props.onPress}
			>
				<Text style={Style.buttonText}>{this.props.children}</Text>
			</TouchableHighlight>
		);
	}
}

const Style = StyleSheet.create({
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},

	buttonText: {
		fontSize: 22,
		fontWeight: 'bold',
		color: 'white'
	},

	highlighted: {
		backgroundColor: '#193441'
	},
});