import { OrbitControls } from '../../lib/OrbitControls.js';
let scene, renderer, camera
let cube
let cameraControl, stats

// 初始化場景、渲染器、相機、物體
function init() {
    // 建立場景
    scene = new THREE.Scene()

    // 建立渲染器
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight) // 場景大小
    renderer.setClearColor(0xf6ead7, 1.0) // 預設背景顏色
    renderer.shadowMap.enable = true // 陰影效果

    // 將渲染器的 DOM 綁到網頁上
    document.body.appendChild(renderer.domElement)

    // 建立相機
    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    )
    camera.position.set(-20, 20, 20)
    camera.lookAt(scene.position)

    // 建立 OrbitControls
    cameraControl = new OrbitControls(camera, renderer.domElement)
    cameraControl.enableDamping = true // 啟用阻尼效果
    cameraControl.dampingFactor = 0.25 // 阻尼系數
    // cameraControl.autoRotate = true // 啟用自動旋轉

    // 光照
    var point = new THREE.PointLight(0xffffff);                             // 點光源
    var ambient = new THREE.AmbientLight(0x444444);                         // 環境光
    point.position.set(400, 200, 300);
    scene.add(point);
    scene.add(ambient);

    // 輔助線
    var axes = new THREE.AxisHelper(50);
    scene.add(axes);
    var gridHelper = new THREE.GridHelper(100, 30, 0x2C2C2C, 0x888888);
    scene.add(gridHelper);

    CreateObject();


    // 監聽螢幕寬高來做簡單 RWD 設定
    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    })
}

function CreateObject() {
    // 建立物體
    const geometry = new THREE.BoxGeometry(10, 2, 2) // 幾何體
    const material = new THREE.MeshPhongMaterial({
        color: 0xeabbc5
    }) // 材質
    cube = new THREE.Mesh(geometry, material) // 建立網格物件
    cube.position.set(5, 1, 1)
    scene.add(cube)


    // 建立物體
    const geometry2 = new THREE.BoxGeometry(10, 2, 2) // 幾何體
    const material2 = new THREE.MeshPhongMaterial({
        color: 0xeabbc0
    }) // 材質
    cube = new THREE.Mesh(geometry2, material2) // 建立網格物件
    cube.position.set(15, 4, 4)
    scene.add(cube)
}

// 建立動畫
function animate() {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
}

// 渲染場景
function render() {
    animate()
    requestAnimationFrame(render)
    renderer.render(scene, camera)
}

init()
render()

