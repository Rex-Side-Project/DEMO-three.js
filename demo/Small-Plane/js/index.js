var Colors = {
    red:0xf25346,
    white:0xd8d0d1,
    brown:0x59332e,
    pink:0xF5986E,
    brownDark:0x23190f,
    blue:0x68c3c0
};
var scene,camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,renderer, container;

window.addEventListener('load', init, false);

function init() {
    // 設置scene, camera, renderer
    CreateScene();

    // lights
    CreateLights();

    // // 添加物体objects
    // createPlane();
    createSea();
    // createSky();

    // 循環 更新物體位置 渲染每一禎數畫面
    loop();
}

function CreateScene() {
    // 
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    // 建立scene
    scene = new THREE.Scene();

    // 增加霧校
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

    // 建立camera
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 10000;
    camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
    );

    // camera 座標
    camera.position.set(0, 200, 100);

    // 建立渲染器 renderer
    renderer = new THREE.WebGLRenderer({
        // 允許透明
        alpha: true,

        // 開啟抗拒尺效果
        antialias: true
    });

    // 指定選染器尺寸
    renderer.setSize(WIDTH, HEIGHT);

    // 啟用陰影渲染
    renderer.shadowMap.enabled = true;

    // 渲染器加入dom
    document.body.appendChild(renderer.domElement)

    // rwd效果
    window.addEventListener('resize', handleWindowResize, false);

    function handleWindowResize() {
        // 更新 渲染器 camera 寬高
        HEIGHT = window.innerHeight;
        WIDTH = window.innerWidth;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    }
}

var hemisphereLight, shadowLight;

function CreateLights() {
    // 半球光HemisphereLight事件變色光源 第一個參數是天空顏色 第二個是地面顏色 第三個是光源強度
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)

    // 平行光DirectionLight適從指定方向照射過來的光源 這邊用來指定太陽光 產生的光都是平行的
    shadowLight = new THREE.DirectionalLight(0xffffff, .9);
    shadowLight.position.set(150, 350, 350);  // 設定光源位置
    shadowLight.castShadow = true;  // 允許投射陰影

    // 定義投射陰影可見區域
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    // 定義陰影分辨綠 越高越好 性能越差
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    // 添加光源
    scene.add(hemisphereLight);
    scene.add(shadowLight);
}

// 先定义一个大海对象:
var Sea = function(){
    // 创建一个圆柱形几何体Geometry;
    // 它的参数: 上表面半径，下表面半径，高度，对象的半径方向的细分线段数，对象的高度细分线段数
    var geom = new THREE.CylinderGeometry(600,600,800,40,10);

    // 让它在X轴上旋转
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));

    // 创建材质Material
    var mat = new THREE.MeshPhongMaterial({
        color:Colors.blue,
        transparent:true,
        opacity:.6,
        shading:THREE.FlatShading
    });

    // 在Three.js里创建一个物体Object，我们必须创建一个Mesh对象，Mesh对象就是Geometry创建的框架贴上材质Material最后形成的总体。
    this.mesh = new THREE.Mesh(geom, mat);

    // 允许大海接收阴影
    this.mesh.receiveShadow = true;
}

// 实例化大海对象，并把它添加到场景scene中:
var sea;

function createSea(){
    sea = new Sea();

    // 把它放到屏幕下方
    sea.mesh.position.y = -600;

    // 在场景中追加大海的Mesh对象
    scene.add(sea.mesh);
}

function loop(){
    // 转动螺旋桨、大海和天空
    // airplane.propeller.rotation.x += 0.3;
    // sea.mesh.rotation.z += .005;
    // sky.mesh.rotation.z += .01;

    // 渲染場景
    renderer.render(scene, camera);

    // 再次調用loop函数
    requestAnimationFrame(loop);
}