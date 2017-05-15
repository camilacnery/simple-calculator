import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import Display from './components/display/Display';
import InputButtons from './components/input-buttons/InputButtons';

const initialState = {
	previousValue: 0,
	currentValue: 0,
	selectedSymbol: null,
	creatingFloat: false,
	isCurrentValueFloat: false
};

export default class SimpleCalculator extends Component {
	constructor(props) {
		super(props);

		this.state = {...initialState};
	}

  render() {
		return (
			<View style={Style.rootContainer}>
				<Display style={Style.displayContainer}>
					{this.state.currentValue}
					{this.state.creatingFloat && '.'}
				</Display>
				<InputButtons
					{...this.state}
					style={Style.inputContainer}
					onChangeState={(state) => this.setState(state)}
					clearState={() => this.setState({...initialState})}
				/>
			</View>
		);
	}
}

const Style = StyleSheet.create({
	rootContainer: {
		flex: 1
	},

	displayContainer: {
		flex: 2,
		backgroundColor: '#F5F5F5',
		justifyContent: 'center'
	},

	inputContainer: {
		flexDirection: 'row',
		flex: 8
	}
});

AppRegistry.registerComponent('SimpleCalculator', () => SimpleCalculator);
