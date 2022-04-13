var scene,camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,renderer, container;

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
    container = document.getElementById('world');
    container.appendChild(renderer.domElement);

    // rwd效果
    window.addEventListener('resize', handleWindowResize, false);
}