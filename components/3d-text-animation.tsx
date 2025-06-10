"use client"
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import gsap from 'gsap'

export default function Text3DAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const textMeshRef = useRef<THREE.Mesh | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.x = 5
    directionalLight.position.y = 5
    directionalLight.position.z = 5
    scene.add(directionalLight)
    const pointLight = new THREE.PointLight(0xff69b4, 1, 100)
    pointLight.position.x = 0
    pointLight.position.y = 0
    pointLight.position.z = 5
    scene.add(pointLight)

    // Load font and create text
    const fontLoader = new FontLoader()
    fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new TextGeometry('v-scent\nAura', {
        font: font,
        size: 0.5,
        depth: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      })

      // Center the text
      const box = new THREE.Box3()
      const tempMesh = new THREE.Mesh(textGeometry, new THREE.MeshBasicMaterial())
      box.setFromObject(tempMesh)
      const center = box.getCenter(new THREE.Vector3())
      textGeometry.translate(-center.x, -center.y, -center.z)

      // Create gradient material
      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 100,
        transparent: true,
        opacity: 0.9
      })

      const textMesh = new THREE.Mesh(textGeometry, material)
      scene.add(textMesh)
      textMeshRef.current = textMesh

      // Initial animation
      gsap.from(textMesh.rotation, {
        y: Math.PI * 2,
        duration: 2,
        ease: "power2.out"
      })

      gsap.from(textMesh.position, {
        y: -2,
        duration: 2,
        ease: "elastic.out(1, 0.3)"
      })

      // Continuous animation
      gsap.to(textMesh.rotation, {
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: "none"
      })

      // Floating animation
      gsap.to(textMesh.position, {
        y: "+=0.2",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    })

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return

      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      if (textMeshRef.current) {
        // Add subtle wave effect
        textMeshRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1
      }

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }
      scene.clear()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full absolute inset-0"
      style={{ background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)' }}
    />
  )
} 