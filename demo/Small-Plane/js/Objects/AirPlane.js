import { Colors } from "../GlobalConst.js";
import { BaseObject } from "./BaseObject.js";

class AirPlane extends BaseObject {
    constructor() {
        super();

        this.mesh = new THREE.Object3D();

        // Create the cabin
        var geomCockpit = new THREE.BoxGeometry(70, 50, 50);
        var matCockpit = new THREE.MeshPhongMaterial({ color: Colors.red });

        // we can access a specific vertex of a shape through 
        // the vertices array, and then move its x, y and z property:
        geomCockpit.vertices[4].z += 10;
        geomCockpit.vertices[4].y -= 10;
        geomCockpit.vertices[5].z -= 10;
        geomCockpit.vertices[5].y -= 10;
        geomCockpit.vertices[6].z += 10;
        geomCockpit.vertices[6].y += 20;
        geomCockpit.vertices[7].z -= 10;
        geomCockpit.vertices[7].y += 20;

        var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
        cockpit.position.x = -5;
        cockpit.castShadow = true;
        cockpit.receiveShadow = true;
        this.mesh.add(cockpit);

        // Create the engine
        var geomEngine = new THREE.BoxGeometry(20, 50, 50);
        var matEngine = new THREE.MeshPhongMaterial({ color: Colors.white });
        var engine = new THREE.Mesh(geomEngine, matEngine);
        engine.position.x = 40;
        engine.castShadow = true;
        engine.receiveShadow = true;
        this.mesh.add(engine);

        // Create the tail
        var geomTailPlane = new THREE.BoxGeometry(15, 20, 5);
        var matTailPlane = new THREE.MeshPhongMaterial({ color: Colors.red });
        var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
        tailPlane.position.set(-35, 25, 0);
        tailPlane.castShadow = true;
        tailPlane.receiveShadow = true;
        this.mesh.add(tailPlane);

        // Create the wing
        var geomSideWing = new THREE.BoxGeometry(40, 8, 150);
        var matSideWing = new THREE.MeshPhongMaterial({ color: Colors.red });
        var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
        sideWing.castShadow = true;
        sideWing.receiveShadow = true;
        this.mesh.add(sideWing);

        // propeller
        var geomPropeller = new THREE.BoxGeometry(20, 10, 10);
        var matPropeller = new THREE.MeshPhongMaterial({ color: Colors.brown });
        this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
        this.propeller.castShadow = true;
        this.propeller.receiveShadow = true;

        // blades
        var geomBlade = new THREE.BoxGeometry(1, 100, 20);
        var matBlade = new THREE.MeshPhongMaterial({ color: Colors.brownDark });
        var blade = new THREE.Mesh(geomBlade, matBlade);
        blade.position.set(8, 0, 0);
        blade.castShadow = true;
        blade.receiveShadow = true;
        this.propeller.add(blade);
        this.propeller.position.set(50, 0, 0);
        this.mesh.add(this.propeller);

    }

    NextAnimationFrame = (o) => {
        this.propeller.rotation.x += 0.3;

        var targetX = normalize(o.mousePos.x, -1, 1, -100, 100);
        var targetY = normalize(o.mousePos.y, -1, 1, 25, 175);

        // update the airplane's position
        this.mesh.position.y = targetY;
        this.mesh.position.x = targetX;
    }
}

function normalize(v, vmin, vmax, tmin, tmax) {

    var nv = Math.max(Math.min(v, vmax), vmin);
    var dv = vmax - vmin;
    var pc = (nv - vmin) / dv;
    var dt = tmax - tmin;
    var tv = tmin + (pc * dt);
    return tv;

}

export { AirPlane }
