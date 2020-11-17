import React from 'react';
import {asset} from 'react-360';
import Entity from 'Entity';
import {subscribe} from './rotate';


export default class Sphere extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			rotated: 0,
		};
	};

	handleRotate = () => {
		this.setState({rotated: this.state.rotated+30})
	};

	// this is the 'bridge' between the components; it connects the function rotate() defined in rotate.js to handleRotate defined here
	componentDidMount() {
      subscribe(this.handleRotate);
  	};

	render () {
		return (
			<Entity
				source={{
					gltf2: asset('scene.gltf'),
				}}
				style={{
					transform: [
						{translate: [-10,0,-10]},
						{scaleX: 0.02},
						{scaleY: 0.02},
						{scaleZ: 0.02},
						{rotateX: this.state.rotated}
					]
				}}
			/>
		);
	};
};
