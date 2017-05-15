import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Display extends Component {
	render() {
		return (
			<View style={this.props.style}>
				<Text style={Style.text}>{this.props.children}</Text>
			</View>
		);
	}
}

const Style = StyleSheet.create({
	text: {
		color: '#696969',
		fontSize: 38,
		fontWeight: 'bold',
		textAlign: 'right',
		padding: 20
	}
});