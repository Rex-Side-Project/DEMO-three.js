class Scene {
    constructor(domElement) {
        this.domElement = domElement;
        this.objects = [];
    }

    init() {
        this.CreateScene();     // 設置scene, camera, renderer
        this.CreateLights();    // lights

        this.mousePos = { x: 0, y: 0 };
        document.addEventListener('mousemove', (event) => {
            // here we are converting the mouse position value received 
            // to a normalized value varying between -1 and 1;
            // this is the formula for the horizontal axis:

            var tx = -1 + (event.clientX / this.WIDTH) * 2;

            // for the vertical axis, we need to inverse the formula 
            // because the 2D y-axis goes the opposite direction of the 3D y-axis

            var ty = 1 - (event.clientY / this.HEIGHT) * 2;
            this.mousePos = { x: tx, y: ty };
            // console.log(this.mousePos);
        }, false);
    }

    /**
     * 設置scene, camera, renderer
     */
    CreateScene() {
        // 
        this.HEIGHT = window.innerHeight;
        this.WIDTH = window.innerWidth;

        // 建立scene
        this.scene = new THREE.Scene();

        // 增加霧校
        this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

        // 建立camera
        var aspectRatio = this.WIDTH / this.HEIGHT;
        var fieldOfView = 60;
        var nearPlane = 1;
        var farPlane = 10000;
        this.camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane
        );
        this.camera.position.set(0, 100, 200); // camera 座標

        // 建立渲染器 renderer
        this.renderer = new THREE.WebGLRenderer({
            // 允許透明
            alpha: true,

            // 開啟抗鋸齒效果
            antialias: true
        });
        this.renderer.setSize(this.WIDTH, this.HEIGHT); // 指定選染器尺寸
        this.renderer.shadowMap.enabled = true; // 啟用陰影渲染

        // 渲染器加入dom
        this.domElement.appendChild(this.renderer.domElement)

        // rwd效果
        window.addEventListener('resize', () => {
            // 更新 渲染器 camera 寬高
            this.HEIGHT = window.innerHeight;
            this.WIDTH = window.innerWidth;
            this.renderer.setSize(this.WIDTH, this.HEIGHT);
            this.camera.aspect = this.WIDTH / this.HEIGHT;
            this.camera.updateProjectionMatrix();
        }, false);
    }

    /**
     * lights
     */
    CreateLights() {
        // 半球光HemisphereLight事件變色光源 第一個參數是天空顏色 第二個是地面顏色 第三個是光源強度
        var hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9)

        // 平行光DirectionLight適從指定方向照射過來的光源 這邊用來指定太陽光 產生的光都是平行的
        var shadowLight = new THREE.DirectionalLight(0xffffff, .9);
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
        this.scene.add(hemisphereLight);
        this.scene.add(shadowLight);
    }

    /**
     * 在場景新增
     */
    add(obj) {
        this.scene.add(obj.mesh);
        this.objects.push(obj);
    }

    /**
     * 循環 更新物體位置 渲染每一禎數畫面
     */
    loop() {
        this.objects.forEach(obj => {
            obj.NextAnimationFrame(this);
        });

        // 渲染場景
        this.renderer.render(this.scene, this.camera);

        // 再次調用loop函数
        requestAnimationFrame(() => {
            this.loop()
        });
    }
}

export { Scene };