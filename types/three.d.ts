declare module 'three' {
  export class Scene {
    add(object: any): void;
    clear(): void;
  }

  export class PerspectiveCamera {
    constructor(fov: number, aspect: number, near: number, far: number);
    position: Vector3;
    aspect: number;
    updateProjectionMatrix(): void;
  }

  export class WebGLRenderer {
    constructor(parameters?: { antialias?: boolean; alpha?: boolean });
    domElement: HTMLElement;
    setSize(width: number, height: number): void;
    setClearColor(color: number, alpha: number): void;
    render(scene: Scene, camera: PerspectiveCamera): void;
  }

  export class Mesh {
    constructor(geometry: any, material: any);
    position: Vector3;
    rotation: Vector3;
  }

  export class AmbientLight {
    constructor(color: number, intensity: number);
  }

  export class DirectionalLight {
    constructor(color: number, intensity: number);
    position: Vector3;
  }

  export class PointLight {
    constructor(color: number, intensity: number, distance: number);
    position: Vector3;
  }

  export class MeshPhongMaterial {
    constructor(parameters: {
      color?: number;
      specular?: number;
      shininess?: number;
      transparent?: boolean;
      opacity?: number;
    });
  }

  export class MeshBasicMaterial {
    constructor(parameters?: {
      color?: number;
      transparent?: boolean;
      opacity?: number;
    });
  }

  export class Box3 {
    constructor();
    setFromObject(object: Mesh): void;
    getCenter(target: Vector3): Vector3;
  }

  export class Vector3 {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
  }
}

declare module 'three/examples/jsm/geometries/TextGeometry' {
  import { BufferGeometry } from 'three';
  
  export class TextGeometry extends BufferGeometry {
    constructor(
      text: string,
      parameters: {
        font: any;
        size?: number;
        height?: number;
        depth?: number;
        curveSegments?: number;
        bevelEnabled?: boolean;
        bevelThickness?: number;
        bevelSize?: number;
        bevelOffset?: number;
        bevelSegments?: number;
      }
    );
    translate(x: number, y: number, z: number): this;
  }
}

declare module 'three/examples/jsm/loaders/FontLoader' {
  export class FontLoader {
    constructor();
    load(url: string, onLoad: (font: any) => void): void;
  }
} 