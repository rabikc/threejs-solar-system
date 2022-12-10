import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(0, 0, 100);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

const light = new THREE.PointLight(0xffffff, 5, 300);

const sceneBG = new THREE.TextureLoader().load("/public/space.jpg");

scene.background = sceneBG;

const sunSphere = new THREE.SphereGeometry(20, 40, 40);
const sunMat = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load("/public/sun3000.jpg"),
});
const sun = new THREE.Mesh(sunSphere, sunMat);

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load("/public/mercury.png"),
  })
);

mercury.position.set(32, 0, 0);

const mercuryWrap = new THREE.Object3D();
mercuryWrap.add(mercury);

scene.add(sun, light, mercuryWrap);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  sun.rotation.y += 0.001;
  mercury.rotateY(0.02);
  mercuryWrap.rotateY(0.01);
}

animate();

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
