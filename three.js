import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';



const questionBlock = document.getElementById('questionBlock');
const questionButton = document.getElementById('questionButton');

questionButton.addEventListener('click', toggleQuestionContent);

function toggleQuestionContent() {
  questionBlock.classList.toggle('open');
}

const canvas = document.querySelector('#webgl');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfe3dd);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight,1,1000	);
camera.position.set(0, 25,  0);
var group = new THREE.Group();


const loader = new GLTFLoader();
loader.load('kvant.glb', function (gltf) {
  scene.add(gltf.scene);

  // Calculate the center position of the model
  const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
  const center = boundingBox.getCenter(new THREE.Vector3());

  // Set the camera's position to the center of the model
  camera.position.copy(center);

  // Adjust the camera's position to a suitable distance from the model
  const modelSize = boundingBox.getSize(new THREE.Vector3());
  const maxModelSize = Math.max(modelSize.x, modelSize.y, modelSize.z);
  const distance = maxModelSize * 2; // Adjust this value as needed
  camera.position.z += 1;
  

  // Update the camera's lookAt target to the center of the model
  controls.target.copy(center);
});

const light1 = new THREE.PointLight(0xffffff, 20, 100);
light1.position.set(50, 30, 50);
scene.add(light1);

const light2 = new THREE.PointLight(0xffffff, 10, 100);
light2.position.set(-50, 30, 50);
scene.add(light2);

const light3 = new THREE.PointLight(0xffffff,0.5,30);
light3.position.set(-18, 6, -37);
scene.add(light3);
const light4 = new THREE.PointLight(0xffffff,0.5,30);
light4.position.set(-17, 6, -37);
scene.add(light4);
const light5 = new THREE.PointLight(0xffffff,0.5,30);
light5.position.set(-19, 6, -37);scene.add(light5);
for (let i=0;i<6;i++) {
const light = new THREE.PointLight(0xffffff,2,10);
light.position.set(-8, 8, -40+5.5*i);
scene.add(light);
}
for (let i=0;i<6;i++) {
const light = new THREE.PointLight(0xffffff,1,10);
light.position.set(-30, 8, -40+5.5*i);
scene.add(light);
}

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const controls = new OrbitControls(camera, canvas);
controls.enableKeys = false; // Disable default keyboard controls of OrbitControls

// Add event listeners for keyboard input
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

const moveDistance = 0.25; // Distance to move the camera for each step
const moveDirection = {
  forward: false,
  backward: false,
  left: false,
  right: false,
};

function handleKeyDown(event) {
  switch (event.key) {
    case 'w':
      moveDirection.forward = true;
      break;
    case 'a':
      moveDirection.left = true;
      break;
    case 's':
      moveDirection.backward = true;
      break;
    case 'd':
      moveDirection.right = true;
      break;
  }
}

function handleKeyUp(event) {
  switch (event.key) {
    case 'w':
      moveDirection.forward = false;
      break;
    case 'a':
      moveDirection.left = false;
      break;
    case 's':
      moveDirection.backward = false;
      break;
    case 'd':
      moveDirection.right = false;
      break;
  }
}

const boundary = {
  minX: -30, // Minimum x-coordinate
  maxX: -5, // Maximum x-coordinate
  minZ: -42, // Minimum z-coordinate
  maxZ: -8, // Maximum z-coordinate
};
	
function animate() {
  requestAnimationFrame(animate);

  // Move the camera based on the keyboard input
  if (moveDirection.forward && camera.position.z - moveDistance >= boundary.minZ) {
    camera.position.z -= moveDistance;
  }
  if (moveDirection.backward && camera.position.z + moveDistance <= boundary.maxZ) {
    camera.position.z += moveDistance;
  }
  if (moveDirection.left && camera.position.x - moveDistance >= boundary.minX) {
    camera.position.x -= moveDistance;
  }
  if (moveDirection.right && camera.position.x + moveDistance <= boundary.maxX) {
    camera.position.x += moveDistance;
  }

  controls.update(); // Update the OrbitControls

  renderer.render(scene, camera);
}
animate();
