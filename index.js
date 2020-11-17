import { AppRegistry } from 'react-360';
import App from './src/App';
import Sphere from './src/Sphere';

// This is a map between components and names; no need to be identical!
AppRegistry.registerComponent('hello_react_360', () => App);
AppRegistry.registerComponent('Sphere', () => Sphere);
