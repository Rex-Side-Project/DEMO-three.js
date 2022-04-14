import { Colors } from "./GlobalConst.js";

var Cloud = function () {
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

export { Cloud }