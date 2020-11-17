import React from 'react';
import {
	asset,
	StyleSheet,
	Text,
	View,
	VrButton,
	NativeModules,
	Animated,
} from 'react-360';
import {rotate} from './rotate';

const {WinAlert, AudioModule} = NativeModules;

const SOUND_EFFECT = asset('ray-gun.wav');

export default class App extends React.Component {

	// Animated fadeIn/Out adapted from:
	// https://reactnative.dev/docs/animated
	constructor(props){
		super(props);
		this.state = {
			visible: false,
			fadeAnim: new Animated.Value(0)
		};
	};

	// duration in ms
	fade = (value) => {
		Animated.timing(this.state.fadeAnim, {
			toValue: value,
			duration: 500
		}).start();
	};

	handleClick = () => {
		// this a window.alert exposed to the app through as a native module (see client.js)
		// console.log(WinAlert.alert("I\'m a " + this.props.name));
		this.setState({visible: !this.state.visible}); // update state
		const toValue = this.state.visible ? 0 : 1;
		this.fade(toValue);	// animate fadein/out
		AudioModule.playOneShot( // play sound effect
			{
				source: SOUND_EFFECT,
				volume: 0.1,
			}
		);
		rotate(); // rotate 3D sphere (this function is defined in rotate.js and bound to another function in Sphere.js that implements the rotation)
	};

	render() {
		return (
			<View style={styles.panel}>
				<Animated.Text style={[styles.sign, { opacity: this.state.fadeAnim}]}>
					{this.props.name}
				</Animated.Text>
				<VrButton
					style={[
						styles.button,
						{backgroundColor: this.state.visible ? 'green' : 'red'}
					]}
					onClick={this.handleClick}
				>
				<Text style={{color: 'white', fontWeight: 'bold'}}>
					Click Me
				</Text>
				</VrButton>
			</View>
		);
	}
};

// CSS-like styles
const styles = StyleSheet.create({
	panel: {
		flexDirection: 'column',
		width: 300,
		height: 300,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	sign: {
		top: 0,
		fontSize: 60,
		fontWeight: 'bold',
		color: 'black',
	},
	button: {
		height: 100,
		width: 100,
		borderRadius: 100,
		backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
