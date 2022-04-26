import { Colors } from "../GlobalConst.js";
import { BaseObject } from "./BaseObject.js";

class Cloud extends BaseObject {
    constructor() {
        super();

        // 創建一個空的容器用來存放不同部分的雲
        this.mesh = new THREE.Object3D();

        // 創立一個立方體 複製多個變成雲
        var geom = new THREE.BoxGeometry(20, 20, 20);

        // 創建雲的材質 
        var mat = new THREE.MeshPhongMaterial({
            color: Colors.white,
        });

        // 隨機定義要複製幾何體的數量
        var nBlocs = 3 + Math.floor(Math.random() * 3);
        for (var i = 0; i < nBlocs; i++) {
            // 給複製的幾何體創建Mesh 對象
            var m = new THREE.Mesh(geom, mat);

            // 給每個立方體隨機設定位置和角度
            m.position.x = i * 15;
            m.position.y = Math.random() * 10;
            m.position.z = Math.random() * 10;
            m.rotation.z = Math.random() * Math.PI * 2;
            m.rotation.y = Math.random() * Math.PI * 2;

            // 隨機設定立方體尺寸
            var s = .1 + Math.random() * .9;
            m.scale.set(s, s, s);

            // 運許每朵雲生成投影和接收投影
            m.castShadow = true;
            m.receiveShadow = true;

            // 追加立方體至容器中
            this.mesh.add(m);
        }
    }
}

class Sky extends BaseObject {
    constructor() {
        super();

        // 建立一個空的容器
        this.mesh = new THREE.Object3D();

        // 設定散若在天空中雲朵的數量
        this.nClouds = 20;

        // To distribute the clouds consistently,
        // we need to place them according to a uniform angle
        var stepAngle = Math.PI * 2 / this.nClouds;

        // 建立雲朵
        for (var i = 0; i < this.nClouds; i++) {
            var c = new Cloud();

            // 設定雲朵角度位置
            var a = stepAngle * i; // 最終角度
            var h = 750 + Math.random() * 200; // 軸到雲的位置

            // 將及座標(角度、距離)轉換為笛卡爾座標(x, y)
            c.mesh.position.y = Math.sin(a) * h;
            c.mesh.position.x = Math.cos(a) * h;

            // 根據雲的位置旋轉
            c.mesh.rotation.z = a + Math.PI / 2;

            // 為了更真實，有近有遠
            c.mesh.position.z = -400 - Math.random() * 400;

            // 給每朵雲設置比例
            var s = 1 + Math.random() * 2;
            c.mesh.scale.set(s, s, s);

            // 加入場景
            this.mesh.add(c.mesh);
        }
    }

    NextAnimationFrame = () => {
        this.mesh.rotation.z += .008;
    }
}

export { Sky, Cloud }