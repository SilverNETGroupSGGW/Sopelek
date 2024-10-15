declare module 'three/examples/jsm/controls/OrbitControls' {
  import type { Camera, MOUSE, Vector3 } from 'three'
  import { EventDispatcher } from 'three'

  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement)
    object: Camera
    domElement: HTMLElement | Document
    enabled: boolean
    target: Vector3
    minDistance: number
    maxDistance: number
    minZoom: number
    maxZoom: number
    minPolarAngle: number
    maxPolarAngle: number
    minAzimuthAngle: number
    maxAzimuthAngle: number
    enableDamping: boolean
    dampingFactor: number
    enableZoom: boolean
    zoomSpeed: number
    enableRotate: boolean
    rotateSpeed: number
    enablePan: boolean
    panSpeed: number
    screenSpacePanning: boolean
    keyPanSpeed: number
    autoRotate: boolean
    autoRotateSpeed: number
    enableKeys: boolean
    keys: { LEFT: number, UP: number, RIGHT: number, BOTTOM: number }
    mouseButtons: { LEFT: MOUSE, MIDDLE: MOUSE, RIGHT: MOUSE }
    update(): void
    listenToKeyEvents(domElement: HTMLElement): void
    saveState(): void
    reset(): void
    dispose(): void
    getPolarAngle(): number
    getAzimuthalAngle(): number
    addEventListener(type: string, listener: (event: any) => void): void
    hasEventListener(type: string, listener: (event: any) => void): boolean
    removeEventListener(type: string, listener: (event: any) => void): void
    dispatchEvent(event: { type: string, target: any }): void
  }
}
