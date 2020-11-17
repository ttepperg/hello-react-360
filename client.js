// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Surface, Module} from 'react-360-web';

// an example of a native (i.e. custom) module to add a built-in browser function to the app which is otherwise not available
class WinAlert extends Module {
    constructor(){
        super('WinAlert');
    };
    // plain window.alert function
    alert (message) {
        window.alert(message);
    };
};

function init(bundle, parent, options = {}) {

    const r360 = new ReactInstance(bundle, parent, {
        // Add custom options here
        fullScreen: true,
        ...options,
        nativeModules: [
            new WinAlert(),
        ]
        }
    );

    const SIZE = 300; //px

    const sphereSurface = new Surface(
        SIZE, /*  widht */
        SIZE, /* height */
        Surface.SurfaceShape.Flat
    );
    sphereSurface.setAngle(0,0); // angles in RADIAN

    const capsuleSurface = new Surface(
        SIZE,
        SIZE,
        Surface.SurfaceShape.Flat
    );
    capsuleSurface.setAngle(Math.PI/2,0);

    const cylinderSurface = new Surface(
        SIZE,
        SIZE,
        Surface.SurfaceShape.Flat
    );
    cylinderSurface.setAngle(Math.PI,0);

    const cubeSurface = new Surface(
        SIZE,
        SIZE,
        Surface.SurfaceShape.Flat
    );
    cubeSurface.setAngle(-Math.PI/2,0);

    // Render your app content the various surfaces
    r360.renderToSurface(
        r360.createRoot('hello_react_360', {name: 'Sphere'}),
        sphereSurface
    );

    r360.renderToSurface(
        r360.createRoot('hello_react_360', {name: 'Capsule'}),
        capsuleSurface
    );

    r360.renderToSurface(
        r360.createRoot('hello_react_360', {name: 'Cylinder'}),
        cylinderSurface
    );
    r360.renderToSurface(
        r360.createRoot('hello_react_360', {name: 'Cube'}),
        cubeSurface
    );
    // 3D sphere
    r360.renderToLocation(
        r360.createRoot('Sphere'),
        r360.getDefaultLocation()
    );
    // Load the initial environment
    r360.compositor.setBackground(
        r360.getAssetURL('3d_scene.jpg')
    );

}

window.React360 = {init};
