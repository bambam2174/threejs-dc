import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

window.threejsdc = window.threejsdc || {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Debug
// const gui = new dat.GUI()

const clock = new THREE.Clock()

/**
 * Sizes
 */
let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowX = window.innerWidth / 2
const windowY = window.innerHeight / 2

console.log('Sizes', 'window.innerWidth', window.innerWidth + ' -> ' + windowX, 'window.innerHeight', window.innerHeight + ' -> ' + windowY)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Loader
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('./textures/NormalMap.png')
const normalTexture_ = textureLoader.load('./textures/NormalMap_.png')
const normalTexture2 = textureLoader.load('./textures/NormalMap2.png')
const normalTexture2_ = textureLoader.load('./textures/NormalMap2_.png')
const normalTexture3 = textureLoader.load('./textures/NormalMap3.png')
const normalTexture3_ = textureLoader.load('./textures/NormalMap3_.png')


// Scene
const scene = new THREE.Scene()


window.threejsdc.scene = window.threejsdc.scene || scene

const arrSphere = []

const materialColor = 0x2f2f2f

// Materials + Sphere
const material = createMeshMaterialWithNormalMap(normalTexture_, 8.7, 0.2, materialColor)
// Objects
const sphere = createSphereWithNormalMap(material)

// Materials + Sphere
const material_ = createMeshMaterialWithNormalMap(normalTexture2, 8.7, 0.2, materialColor)
// Objects
const sphere_ = createSphereWithNormalMap(material_, -2.5, 0, 1)

arrSphere.push(sphere_)

// Materials + Sphere
const material2 = createMeshMaterialWithNormalMap(normalTexture, 8.7, 0.2, materialColor)
// Objects
const sphere2 = createSphereWithNormalMap(material2, -2, -1, 1)

arrSphere.push(sphere2)

// Materials + Sphere
const material2_ = createMeshMaterialWithNormalMap(normalTexture2_, 8.7, 0.2, materialColor)
// Objects
const sphere2_ = createSphereWithNormalMap(material2_, 2.5, 0, 1)

arrSphere.push(sphere2_)


// Materials + Sphere
const material3_ = createMeshMaterialWithNormalMap(normalTexture3_, 8.7, 0.2, materialColor)
// Objects
const sphere3_ = createSphereWithNormalMap(material3_, 2, -1, 1)

arrSphere.push(sphere3_)

// Materials + Sphere
const material3 = createMeshMaterialWithNormalMap(normalTexture3, 8.7, 0.2, materialColor)
// Objects
const sphere3 = createSphereWithNormalMap(material3, 0, 1, 1)

arrSphere.push(sphere3)

// Lights


const pointLight = createPointLight(2, 3, 4)

const pointLight2Color = 0xff0000
const pointLight2 = createPointLight(-0.74, 1.41, -3, pointLight2Color)

const pointLight3Color = 0x1effff
const pointLight3 = createPointLight(3, -1.45, -2.91, pointLight3Color)




window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

window.threejsdc.camera = window.threejsdc.camera || camera

/**
 * Debug Tools
 */

// setupDebugTools()
/* 
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

window.threejsdc.controls = window.threejsdc.controls || controls
 */


/**
 * Animate
 */

document.addEventListener("mousemove", onDocumentMouseMove)
// document.addEventListener("keydown", onDocumentKeyDown)

function createSphereWithNormalMap(material, x = 0, y = 0, z = 0, radius = 0.5, segments = 64) {
    const geometry = new THREE.SphereGeometry(radius, segments, segments)

    // Mesh
    const sphere = new THREE.Mesh(geometry, material)
    sphere.position.set(x, z, y)
    scene.add(sphere)
    return sphere
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} z 
 * @param {THREE.ColorRepresentation?} hexColor 
 * @param {number?} intensity 
 * @returns THREE.PointLight
 */
function createPointLight(x, y, z, hexColor = 0xffffff, intensity = 1) {
    const retPointLight = new THREE.PointLight(hexColor, 1)
    retPointLight.position.set(x, y, z)
    retPointLight.intensity = intensity

    scene.add(retPointLight)
    return retPointLight
}

/**
 * 
 * @param {THREE.Texture} pNormalTexture 
 * @param {number?} metalness 
 * @param {number?} roughness 
 * @param {THREE.ColorRepresentation?} color 
 * @returns THREE.MeshStandardMaterial
 */
function createMeshMaterialWithNormalMap(pNormalTexture, metalness = 0.5, roughness = 0.5, color = 0xffffff) {
    const material = new THREE.MeshStandardMaterial()
    material.metalness = metalness
    material.roughness = roughness
    material.normalMap = pNormalTexture
    material.color = new THREE.Color(color)
    return material
}

/**
 * Mouse Event Listener
 * @param {MouseEvent} event 
 */
function onDocumentMouseMove(event) {
    console.log("event", event)
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
    console.log("onDocumentMouseMove", 'event.clientX', event.clientX + ' -> ' + mouseX, 'event.clientY', event.clientY + ' -> ' + mouseY)
}

/**
 * Key Event Listener
 * @param {KeyEvent} event 
 */
function onDocumentKeyDown(event) {
    let cameraDirection = camera.getWorldDirection(controls.target)
    console.log("event", event)
    console.log("controls.target", controls.target)
    console.log("camera.getWorldDirection", cameraDirection)
    if (event.code == 'KeyW') {
        camera.position.add(cameraDirection)
    }

}


/**
 * FrameRequestCallback
 */
const tick = () => {

    targetX = mouseX * 0.001
    targetY = mouseY * 0.004
    /* 
    targetDragX = mouseDragX * 0.002
    targetDragY = mouseDragY * 0.002 
    */
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    for (let tmpSphere of arrSphere) {
        tmpSphere.rotation.y = .5 * elapsedTime
    }


    sphere.rotation.z -= 0.5 * (targetX - sphere.rotation.y / 2)
    sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x / 2)
    sphere.position.x += 0.5 * (targetX - sphere.position.x / 2)
    sphere.position.z += 1 * (targetY - sphere.position.z / 2)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

/**
 * sets up debug tools
 * Changing position, intensity & color of light sources
 */

function setupDebugTools() {
    // pointLight
    const light1 = gui.addFolder("Light 1")
    light1.add(pointLight.position, "x").min(-3).max(3).step(0.01)
    light1.add(pointLight.position, "y").min(-3).max(3).step(0.01)
    light1.add(pointLight.position, "z").min(-3).max(3).step(0.01)
    light1.add(pointLight, "intensity").min(0).max(10).step(0.01)

    const pointLightHelperLight1 = new THREE.PointLightHelper(pointLight, 1)
    scene.add(pointLightHelperLight1)
    pointLightHelperLight1.visible = false
    light1.add(pointLightHelperLight1, "visible")

    // pointLight2
    const light2 = gui.addFolder("Light 2")
    light2.add(pointLight2.position, "x").min(-3).max(3).step(0.01)
    light2.add(pointLight2.position, "y").min(-3).max(3).step(0.01)
    light2.add(pointLight2.position, "z").min(-3).max(3).step(0.01)
    light2.add(pointLight2, "intensity").min(0).max(10).step(0.01)

    const light2Color = {
        color: pointLight2Color
    }
    light2.addColor(light2Color, "color")
        .onChange(() => {
            pointLight2.color.set(light2Color.color)
        })

    const pointLightHelperLight2 = new THREE.PointLightHelper(pointLight2, 1)
    scene.add(pointLightHelperLight2)
    pointLightHelperLight2.visible = false
    light2.add(pointLightHelperLight2, "visible")

    // pointLight3
    const light3 = gui.addFolder("Light 3")
    light3.add(pointLight3.position, "x").min(-3).max(3).step(0.01)
    light3.add(pointLight3.position, "y").min(-3).max(3).step(0.01)
    light3.add(pointLight3.position, "z").min(-3).max(3).step(0.01)
    light3.add(pointLight3, "intensity").min(0).max(10).step(0.01)

    const light3Color = {
        color: pointLight3Color
    }
    light3.addColor(light3Color, "color")
        .onChange(() => {
            pointLight3.color.set(light3Color.color)
        })

    const pointLightHelperLight3 = new THREE.PointLightHelper(pointLight3, 1)
    scene.add(pointLightHelperLight3)
    pointLightHelperLight3.visible = false
    light3.add(pointLightHelperLight3, "visible")

    const material1 = gui.addFolder("Material")
    material1.add(material, "metalness").min(0).max(20).step(0.1)
    material1.add(material, "roughness").min(0).max(1).step(0.1)
    const material1Color = {
        color: materialColor
    }
    material1.addColor(material1Color, "color")
        .onChange(() => {
            material.color.set(material1Color.color)
        })

}
