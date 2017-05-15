import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import Button from './button/Button';

export default class InputButtons extends Component {

	constructor(props) {
		super(props);

		this.onKeyPressed = this.onKeyPressed.bind(this);
		this.handleNumberInput = this.handleNumberInput.bind(this);
		this.handleStringInput = this.handleStringInput.bind(this);
	}
	
	onKeyPressed(input) {
		return () => {
			switch (typeof input) {
				case 'number':
					return this.handleNumberInput(input)
				case 'string':
					return this.handleStringInput(input)
			}
		};
	}

	handleNumberInput(num) {
		if (this.props.creatingFloat) {
			this.props.onChangeState({
				creatingFloat: false,
				isCurrentValueFloat: true,
				currentValue: this.props.currentValue + (num/10)
			});
		} else {
			this.props.onChangeState({
				currentValue: (this.props.currentValue * 10) + num
			});
		}
	}

	handleStringInput(str) {
		switch (str) {
			case '/':
			case '*':
			case '+':
			case '-':
				this.props.onChangeState({
					selectedSymbol: str,
					previousValue: this.props.currentValue,
					currentValue: 0,
					isCurrentValueFloat: false
				});
				break;
			
			case '=':
				if (!this.props.selectedSymbol) return;

				this.props.onChangeState({
					previousValue: 0,
					currentValue: eval(this.props.previousValue + this.props.selectedSymbol + this.props.currentValue),
					selectedSymbol: null
				});
				break;

			case '.':
				if (this.props.isCurrentValueFloat) return;
				this.props.onChangeState({creatingFloat: true});
				break;

			case 'DEL':
				this.props.clearState();
				break;

		}
	}

	renderButton(input, color = 'primary') {
		return (
			<Button
				key={"button-" + input}
				onPress={this.onKeyPressed(input)}
				highlighted={this.props.selectedSymbol === input}
				color={color}
			>
				{input}
			</Button>
		);
	}

	render() {
		return (
			<View style={this.props.style}>
				<View style={Style.leftGroup}>
					{this.props.buttonsLeft.map((row, indexRow) => {
						return (
							<View style={Style.inputRow} key={"row-" + indexRow}>
								{row.map(input => this.renderButton(input))}
							</View>
						);
					})}
				</View>

				<View style={Style.rightGroup}>
					{this.props.buttonsRight.map(input => this.renderButton(input, 'secondary'))}
				</View>
				
			</View>
		);
	}
};

InputButtons.defaultProps = {
	buttonsLeft: [
		[7, 8, 9],
		[4, 5, 6],
		[1, 2, 3],
		['.', 0, '=']
	],
	buttonsRight: ['DEL', '/', '*', '-', '+']
};

InputButtons.propTypes = {
	onChangeState: React.PropTypes.func
};

const Style = StyleSheet.create({
	inputRow: {
		flex: 1,
		flexDirection: 'row'
	},
	leftGroup: {
		flex: 7,
		backgroundColor: '#696969'
	},
	rightGroup: {
		flex: 3,
		backgroundColor: '#808080'
	}
});
