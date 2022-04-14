import { Scene } from './Scene.js';
import { Sea } from './Sea.js';
import { Sky } from './Sky.js';

window.addEventListener('load', () => {
    var scene = new Scene(document.body);

    scene.init();

    var sea = new Sea();
    sea.mesh.position.y = -500; // 放至畫面下方
    scene.add(sea.mesh, () => {
        sea.mesh.rotation.z += .003;
    }); // 在場景增加大海的 Mesh

    var sky = new Sky();
    sky.mesh.position.y = -500;
    scene.add(sky.mesh, () => {
        sky.mesh.rotation.z += .008;
    });

    scene.loop();

}, false);