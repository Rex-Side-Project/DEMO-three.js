import { Scene } from './Scene.js';
import { Sea } from './Objects/Sea.js';
import { Sky } from './Objects/Sky.js';
import { AirPlane } from './Objects/AirPlane.js';

window.addEventListener('load', () => {
    var scene = new Scene(document.getElementById('world'));

    scene.init();

    var sea = new Sea();
    sea.mesh.position.y = -600; // 放至畫面下方
    scene.add(sea);

    var sky = new Sky();
    sky.mesh.position.y = -600;
    scene.add(sky);

    var airPlane = new AirPlane();
    airPlane.mesh.scale.set(.25, .25, .25);
    airPlane.mesh.position.y = 100;
    scene.add(airPlane);

    scene.loop();

}, false);