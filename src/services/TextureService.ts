import { planetTextures } from '@/configs/textures.config'
import * as THREE from 'three'

export class TextureService {
  private textureLoader: THREE.TextureLoader
  private textureCache: Map<string, THREE.Texture>

  constructor() {
    this.textureLoader = new THREE.TextureLoader()
    this.textureCache = new Map()
  }

  public async loadTexture(url: string): Promise<THREE.Texture> {
    if (this.textureCache.has(url)) {
      return this.textureCache.get(url)!
    }

    return new Promise((resolve, reject) => {
      this.textureLoader.load(
        url,
        (texture) => {
          this.textureCache.set(url, texture)
          resolve(texture)
        },
        undefined,
        (error) => {
          console.error(`Error loading texture: ${url}`, error)
          reject(error)
        },
      )
    })
  }

  public async createPlanetMaterial(planetName: string): Promise<THREE.MeshStandardMaterial> {
    const config = planetTextures[planetName]
    if (!config) {
      throw new Error(`No texture configuration found for planet: ${planetName}`)
    }

    const material = new THREE.MeshStandardMaterial()

    // load base color texture
    const albedoTexture = await this.loadTexture(config.albedo)
    material.map = albedoTexture

    // special cases for planets with additional textures
    if (planetName === 'earth') {
      const [normalTexture] = await Promise.all([
        this.loadTexture(config.normal!),
      ])

      // custom shader material for Earth to handle day/night cycle and clouds
      material.normalMap = normalTexture
      material.normalScale = new THREE.Vector2(1, 1)
      material.roughness = 0.8
      material.metalness = 0.2
    }
    else if (planetName === 'venus') {
      const atmosphereTexture = await this.loadTexture(config.atmosphere!)
      // apply atmosphere as emissive map
      material.emissiveMap = atmosphereTexture
      material.emissiveIntensity = 0.5
    }
    else if (planetName === 'saturn') {
      // Saturn's rings
      material.roughness = 0.7
      material.metalness = 0.3
    }

    return material
  }

  public dispose(): void {
    this.textureCache.forEach(texture => texture.dispose())
    this.textureCache.clear()
  }
}
