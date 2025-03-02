import * as THREE from "https://esm.sh/three";
import { OrbitControls } from "https://esm.sh/three/examples/jsm/controls/OrbitControls.js";

function createProjectGraph() {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.getElementById('3d-graph').appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false; // Disable zoom

    const nodes = {
        "Github": { color: 0x550055, position: [-1, 0, 0] },
        "HTML": { color: 0xff5500, position: [0, -2, 1] },
        "Javascript": { color: 0xffff00, position: [0, 2, -1] },
        "CSS": { color: 0x0055ff, position: [2, 0, -1] },
        "3D": { color: 0xff3355, position: [0, 2, 1] },
        "Data": { color: 0x55ff55, position: [0, -2, -1] }
    };

    // Store original positions
    const originalPositions = {};
    Object.keys(nodes).forEach(node => {
        originalPositions[node] = [...nodes[node].position];
    });

    // Store label objects
    const labelObjects = {};

    // **Create Nodes (Circles)**
    const nodeObjects = {};
    const outerStrokeObjects = {};
    Object.keys(nodes).forEach(node => {
        const geometry = new THREE.SphereGeometry(0.2, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: nodes[node].color });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(...nodes[node].position);
        scene.add(sphere);
        nodeObjects[node] = sphere;

        // Create outer stroke
        const outerGeometry = new THREE.SphereGeometry(0.2, 5, 5);
        const outerMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
        const outerSphere = new THREE.Mesh(outerGeometry, outerMaterial);
        outerSphere.position.set(...nodes[node].position);
        scene.add(outerSphere);
        outerStrokeObjects[node] = outerSphere;
    });

    // **Add Thin White Edges**
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1 });
    const edgesGeometry = new THREE.BufferGeometry();

    const edgePositions = [];
    Object.keys(nodes).forEach(nodeA => {
        Object.keys(nodes).forEach(nodeB => {
            if (nodeA !== nodeB) {
                edgePositions.push(...nodes[nodeA].position, ...nodes[nodeB].position);
            }
        });
    });

    edgesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(edgePositions, 3));
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    scene.add(edges);

    // Helper function to check for NaN values
    const isValidPosition = (positions) => {
        return positions.every(pos => !isNaN(pos));
    };

    // **Generate Planes (10% Opacity)**
    const planeGeometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];

    const planeMaterial = new THREE.MeshBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.1, // Reduced opacity to 10% for a cleaner look
        side: THREE.DoubleSide,
        depthWrite: true, // Optimized rendering
        polygonOffset: true, // Enable polygon offset
        polygonOffsetFactor: 1, // Adjust these values to reduce z-fighting
        polygonOffsetUnits: 1,
    });

    // Create triangular faces between connected nodes
    Object.keys(nodes).forEach(nodeA => {
        Object.keys(nodes).forEach(nodeB => {
            Object.keys(nodes).forEach(nodeC => {
                if (nodeA !== nodeB && nodeB !== nodeC && nodeA !== nodeC) {
                    const v1 = new THREE.Vector3(...nodes[nodeA].position);
                    const v2 = new THREE.Vector3(...nodes[nodeB].position);
                    const v3 = new THREE.Vector3(...nodes[nodeC].position);

                    const posArray = [...v1.toArray(), ...v2.toArray(), ...v3.toArray()];
                    if (isValidPosition(posArray)) {
                        positions.push(...posArray);

                        const c1 = new THREE.Color(nodes[nodeA].color);
                        const c2 = new THREE.Color(nodes[nodeB].color);
                        const c3 = new THREE.Color(nodes[nodeC].color);

                        colors.push(c1.r, c1.g, c1.b, c2.r, c2.g, c2.b, c3.r, c3.g, c3.b);
                    }
                }
            });
        });
    });

    planeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    planeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(planeMesh);

    // **Add Labels**
    const addLabel = (text, position) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 64;
        ctx.fillStyle = 'white';
        ctx.font = 'Bold 24px "Orbitron", sans-serif'; // Use the same font family as the page
        ctx.textAlign = 'center';
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
        const sprite = new THREE.Sprite(spriteMaterial);

        sprite.scale.set(2.5, 0.75, 2);
        sprite.position.set(position[0], position[1] + 0.6, position[2]);

        // Ensure the label is always rendered in front
        sprite.renderOrder = 999;

        scene.add(sprite);
        labelObjects[text] = sprite;
    };

    Object.keys(nodes).forEach(node => {
        addLabel(node, nodes[node].position);
    });

    // Define mouse, raycaster, and selectedNode
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let selectedNode = null;

    const onMouseMove = (event) => {
        if (selectedNode) {
            const vector = new THREE.Vector3(
                (event.clientX / window.innerWidth) * 2 - 1,
                -(event.clientY / window.innerHeight) * 2 + 1,
                0.5
            );
            vector.unproject(camera);
            const dir = vector.sub(camera.position).normalize();
            const distance = -camera.position.z / dir.z;
            const pos = camera.position.clone().add(dir.multiplyScalar(distance));
            selectedNode.position.copy(pos);
        }
    };

    const onMouseDown = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(Object.values(nodeObjects));
        if (intersects.length > 0) {
            selectedNode = intersects[0].object;
            controls.enabled = false; // Disable controls while dragging
        }
    };

    const onMouseUp = () => {
        selectedNode = null;
        controls.enabled = true; // Re-enable controls
    };

    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mouseup', onMouseUp, false);

    // Create the small circle
    const circle = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 16, 16), // Half the size
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    scene.add(circle);

    // **Animation Loop**
    const animate = (time) => {
        requestAnimationFrame(animate);

        // 🌍 Add a subtle rotation effect
        scene.rotation.y += 0.01;  // Adjust speed (higher = faster)
        scene.rotation.x += 0.005; // Optional slight tilt

        // Update node positions to create a wiggle effect
        Object.keys(nodeObjects).forEach((node, index) => {
            const sphere = nodeObjects[node];
            const outerSphere = outerStrokeObjects[node];
            const originalPosition = originalPositions[node];
            const wiggleAmount = 0.5; // Adjust the wiggle amount as needed
            const scaleAmount = 1 + 0.1 * Math.sin(time / 500 + index); // Pulsate effect
            sphere.position.set(
                originalPosition[0] + wiggleAmount * Math.sin(time / 500 + index),
                originalPosition[1] + wiggleAmount * Math.cos(time / 500 + index + Math.PI / 2),
                originalPosition[2] + wiggleAmount * Math.sin(time / 500 + index + Math.PI)
            );
            sphere.scale.set(scaleAmount, scaleAmount, scaleAmount);
            outerSphere.position.copy(sphere.position);
            outerSphere.scale.set(scaleAmount, scaleAmount, scaleAmount);
        });

        // Update edge positions
        const edgePositions = [];
        Object.keys(nodes).forEach(nodeA => {
            Object.keys(nodes).forEach(nodeB => {
                if (nodeA !== nodeB) {
                    edgePositions.push(...nodeObjects[nodeA].position.toArray(), ...nodeObjects[nodeB].position.toArray());
                }
            });
        });
        edgesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(edgePositions, 3));
        edgesGeometry.attributes.position.needsUpdate = true;

        // Update label positions
        Object.keys(labelObjects).forEach((node, index) => {
            const label = labelObjects[node];
            const originalPosition = originalPositions[node];
            const wiggleAmount = 0.5; // Adjust the wiggle amount as needed
            label.position.set(
                originalPosition[0] + wiggleAmount * Math.sin(time / 500 + index),
                originalPosition[1] + 0.6 + wiggleAmount * Math.cos(time / 500 + index + Math.PI / 2),
                originalPosition[2] + wiggleAmount * Math.sin(time / 500 + index + Math.PI)
            );
        });

        // Update face positions
        const positions = [];
        const colors = [];
        Object.keys(nodes).forEach(nodeA => {
            Object.keys(nodes).forEach(nodeB => {
                Object.keys(nodes).forEach(nodeC => {
                    if (nodeA !== nodeB && nodeB !== nodeC && nodeA !== nodeC) {
                        const v1 = new THREE.Vector3(...nodeObjects[nodeA].position.toArray());
                        const v2 = new THREE.Vector3(...nodeObjects[nodeB].position.toArray());
                        const v3 = new THREE.Vector3(...nodeObjects[nodeC].position.toArray());

                        const posArray = [...v1.toArray(), ...v2.toArray(), ...v3.toArray()];
                        if (isValidPosition(posArray)) {
                            positions.push(...posArray);

                            const c1 = new THREE.Color(nodes[nodeA].color);
                            const c2 = new THREE.Color(nodes[nodeB].color);
                            const c3 = new THREE.Color(nodes[nodeC].color);

                            colors.push(c1.r, c1.g, c1.b, c2.r, c2.g, c2.b, c3.r, c3.g, c3.b);
                        }
                    }
                });
            });
        });

        if (isValidPosition(positions)) {
            planeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            planeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            planeGeometry.attributes.position.needsUpdate = true;
            planeGeometry.attributes.color.needsUpdate = true;
        }

        // Move small circle along the edge path
        const edgePath = Object.keys(nodes).map(node => nodeObjects[node].position);
        let pathIndex = Math.floor((time / 1000) % edgePath.length);
        let nextPathIndex = (pathIndex + 1) % edgePath.length;
        let t = (time % 1000) / 1000;

        circle.position.lerpVectors(edgePath[pathIndex], edgePath[nextPathIndex], t);

        controls.update();
        renderer.render(scene, camera);
    };

    animate();
}
createProjectGraph();