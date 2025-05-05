import type { ITextureConfig } from '@/types/solar-system.types'

export const planetTextures: Record<string, ITextureConfig> = {
  sun: {
    albedo: '/src/assets/textures/2k_sun.jpg',
    type: 'color',
  },
  mercury: {
    albedo: '/src/assets/textures/2k_mercury.jpg',
    type: 'color',
  },
  venus: {
    albedo: '/src/assets/textures/2k_venus_surface.jpg',
    atmosphere: '/src/assets/textures/2k_venus_atmosphere.jpg',
    type: 'color',
  },
  earth: {
    albedo: '/src/assets/textures/2k_earth_daymap.jpg',
    night: '/src/assets/textures/2k_earth_nightmap.jpg',
    clouds: '/src/assets/textures/2k_earth_clouds.jpg',
    normal: '/src/assets/textures/2k_earth_normal_map.tif',
    specular: '/src/assets/textures/2k_earth_specular_map.tif',
    type: 'color',
  },
  mars: {
    albedo: '/src/assets/textures/2k_mars.jpg',
    type: 'color',
  },
  jupiter: {
    albedo: '/src/assets/textures/2k_jupiter.jpg',
    type: 'color',
  },
  saturn: {
    albedo: '/src/assets/textures/2k_saturn.jpg',
    rings: '/src/assets/textures/2k_saturn_ring_alpha.png',
    type: 'color',
  },
  uranus: {
    albedo: '/src/assets/textures/2k_uranus.jpg',
    type: 'color',
  },
  neptune: {
    albedo: '/src/assets/textures/2k_neptune.jpg',
    type: 'color',
  },
  moon: {
    albedo: '/src/assets/textures/2k_moon.jpg',
    type: 'color',
  },
}
