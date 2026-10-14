const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const materials = [
    new THREE.MeshStandardMaterial({ color: 0x00ffcc, roughness: 0.2 }),
    new THREE.MeshStandardMaterial({ color: 0xff007f, roughness: 0.2 }),
    new THREE.MeshStandardMaterial({ color: 0xffcc00, roughness: 0.2 })
];

const cube = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.2), materials[0]);
cube.position.set(-3.5, 1, -2);
scene.add(cube);

const cone = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.8, 32), materials[1]);
cone.position.set(0, -1, -1);
scene.add(cone);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), materials[2]);
sphere.position.set(3.5, 1.5, -3);
scene.add(sphere);

let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
});

function animate() {
    requestAnimationFrame(animate);

    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    scene.rotation.y = targetX * 0.5;
    scene.rotation.x = targetY * 0.5;

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.015;

    cone.rotation.x += 0.01;
    cone.rotation.z += 0.01;

    sphere.rotation.y += 0.008;

    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});