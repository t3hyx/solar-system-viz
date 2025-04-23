import type { ISolarSystemConfig } from '@/types/solar-system.types'
import { colorConfig } from '@/configs/color.config'
import * as THREE from 'three'

export const solarSystemConfig: ISolarSystemConfig = {
  fov: 75,
  near: 0.1,
  far: 1000,
  cameraPosition: new THREE.Vector3(0, 0, 10),
  backgroundColor: colorConfig.pureBlack,
  lightColor: colorConfig.pureWhite,
  lightIntensity: 1,
  ambientLightColor: colorConfig.ambientGray,
  ambientLightIntensity: 0.5,
}
