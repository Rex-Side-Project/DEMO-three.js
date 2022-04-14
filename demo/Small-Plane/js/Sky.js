import { Cloud } from "./Cloud.js";

// 天空
var Sky = function () {
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

export { Sky }