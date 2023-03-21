<template>
    <color @selectColor="getcolor"></color>
    <div class="aniclose">
    <p>Animate Switch</p>
    <el-switch
    v-model="value2"
    class="ml-2"
    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
  />
    </div>
    <div class="canvas-contain" ref="canvasDom"></div>
</template>
<script  setup>
import * as THREE from 'three';
import { onMounted, ref } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import color from '../components/color.vue';

var mixer=null;
let controls;
let canvasDom = ref(null);

const value2 = ref(false);


//创建场景
const scene = new THREE.Scene();
scene.scale.multiplyScalar(10);//对场景作比例缩放
//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 6);
//创建渲染器
const renderer = new THREE.WebGLRenderer({
    antialias: true, //抗锯齿
});
//设置渲染器尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

const render = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    //更新控制器
    controls && controls.update();
   
};


//设置上盖默认材质
const lidmaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('red'),
    metalness: 0.5,
    roughness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0.5,
});

onMounted(() => {
    
    canvasDom.value.appendChild(renderer.domElement);
    //初始化渲染器，渲染背景
    renderer.setClearColor('#000');
    scene.background = new THREE.Color('#ccc');
    scene.environment = new THREE.Color('#ccc');
   

    //添加网格地面

    const gridHelper = new THREE.GridHelper(10, 10);
    gridHelper.material.opacity = 0.5;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    //添加控制器
    controls = new OrbitControls(camera, renderer.domElement);
    //scene.add(controls);




    //添加模型
    var loader=new FBXLoader();
    loader.load("model/PB-G4.fbx", function(object) {          
            object.traverse(function(child) {
                if (child.isMesh) {
                    // child.castShadow = true;
                    // child.receiveShadow = true;
                };
                if (child.isMesh && child.name.includes("上盖")) {
                        
                        child.material = lidmaterial;
                };
            });
            object.scale.multiplyScalar(0.01);
            mixer = new THREE.AnimationMixer(object);
            object.position.set(0,0.06,0);
            const action = mixer.clipAction(object.animations[0]);
            action.play();
            scene.add(object);
            // console.log(object);
        });      

  
  
        



    //添加灯光
    const light1 = new THREE.DirectionalLight(0XFFFFFF, 1);
    light1.position.set(0, 10, 10);
    scene.add(light1);
    const light2 = new THREE.DirectionalLight(0XFFFFFF, 1);
    light2.position.set(0, 10, -10);
    scene.add(light2);
    const light3 = new THREE.DirectionalLight(0XFFFFFF, 1);
    light3.position.set(10, 5, 0);
    scene.add(light3);

});   

//窗口跟随
window.addEventListener('resize', onWindowResize);
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

//设置时钟
const clock = new THREE.Clock();
function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();
//    action=null;
 
    if (mixer && value2.value) {mixer.update(delta)};//更新动作组时间序列


    renderer.render(scene, camera);


}

const getcolor = (data) => {
    lidmaterial.color.set(data);

};



animate();
</script>
<style >
.aniclose{
  position: fixed;
  right:20px;
  top:110px;
  }
/* .ml-2{
  position: fixed;
  right:20px;
  top:150px;
  } */
</style>
