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
camera.position.set(0, 200, 300);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.screenSpacePanning = false;
controls.minDistance = 10;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;

const light = new THREE.PointLight(0xffffff, 5, 500);

const sceneBG = new THREE.TextureLoader().load("/space.jpg");

scene.background = sceneBG;

const sunSphere = new THREE.SphereGeometry(32, 40, 40);
const sunMat = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load("/sun3000.jpg"),
});

const sun = new THREE.Mesh(sunSphere, sunMat);

scene.add(sun, light);

function createPlanet(size, texture, position, ring) {
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(size, 32, 32),
    new THREE.MeshStandardMaterial({
      map: texture,
    })
  );
  const planetWrap = new THREE.Object3D();
  planetWrap.add(planet);

  if (ring) {
    const planetRing = new THREE.Mesh(
      new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32),
      new THREE.MeshBasicMaterial({
        map: ring.texture,
        side: THREE.DoubleSide,
      })
    );
    planetRing.rotation.x = 0.5 * Math.PI;
    planetWrap.add(planetRing);
    planetRing.position.set(position.x, position.y, position.z);
  }

  planet.position.set(position.x, position.y, position.z);
  scene.add(planetWrap);

  return { planet, planetWrap };
}

const mercury = createPlanet(
  3,
  new THREE.TextureLoader().load("/mercury.png"),
  { x: 0, y: 0, z: 45 }
);

const venus = createPlanet(3, new THREE.TextureLoader().load("/venus.jpg"), {
  x: 65,
  y: 0,
  z: -65,
});

const earth = createPlanet(5, new THREE.TextureLoader().load("/earth.jpg"), {
  x: -90,
  y: 0,
  z: 90,
});

const mars = createPlanet(4, new THREE.TextureLoader().load("/mars.jpg"), {
  x: 120,
  y: 0,
  z: 120,
});

const jupiter = createPlanet(
  10,
  new THREE.TextureLoader().load("/jupiter.jpg"),
  { x: -200, y: 0, z: -200 }
);

const saturn = createPlanet(
  8.5,
  new THREE.TextureLoader().load("/saturn.jpg"),
  { x: 0, y: 0, z: 230 },
  {
    innerRadius: 9,
    outerRadius: 15,
    texture: new THREE.TextureLoader().load("/saturn-ring.png"),
  }
);

const uranus = createPlanet(
  8,
  new THREE.TextureLoader().load("/uranus.jpg"),
  { x: 260, y: 0, z: -100 },
  {
    innerRadius: 8,
    outerRadius: 15,
    texture: new THREE.TextureLoader().load("/uranus-ring.png"),
  }
);
const neptune = createPlanet(
  8,
  new THREE.TextureLoader().load("/neptune.jpg"),
  { x: 300, y: 0, z: 100 }
);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  sun.rotation.y += 0.001;
  mercury.planet.rotateY(0.02);
  mercury.planetWrap.rotateY(0.007);
  venus.planet.rotateY(0.02);
  venus.planetWrap.rotateY(0.005);
  earth.planet.rotateY(0.02);
  earth.planetWrap.rotateY(0.003);
  mars.planet.rotateY(0.02);
  mars.planetWrap.rotateY(0.002);
  jupiter.planet.rotation.y += 0.0025;
  jupiter.planetWrap.rotation.y += 0.001;
  saturn.planet.rotation.y += 0.0025;
  saturn.planetWrap.rotation.y += 0.0007;
  uranus.planet.rotation.y += 0.0025;
  uranus.planetWrap.rotation.y += 0.00045;
  neptune.planet.rotation.y += 0.0025;
  neptune.planetWrap.rotation.y += 0.0003;
}

animate();

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
