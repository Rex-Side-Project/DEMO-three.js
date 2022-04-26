import { Colors } from '../GlobalConst.js';
import { BaseObject } from './BaseObject.js';

class Sea extends BaseObject {
    constructor() {
        super();

        // 創建一個幾何圓柱體Geometry
        // 參數：上半表面半徑 下半表面半徑 高度 半徑方向細分段數
        var geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);

        // 在x軸旋轉
        geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

        // 建立 Material
        var mat = new THREE.MeshPhongMaterial({
            color: Colors.blue,
            transparent: true,
            opacity: .6
        });

        // 建立 Mesh對象，Mesh對象是Geometry貼上材質Material最後形成的總體
        this.mesh = new THREE.Mesh(geom, mat);

        // 允許大海接收陰影
        this.mesh.receiveShadow = true;
    }

    NextAnimationFrame = () => {
        this.mesh.rotation.z += .003;
    }
}

export { Sea }