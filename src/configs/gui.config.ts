import type { IGuiConfig } from '@/types/solar-system.types'
import { colorConfig } from '@/configs/color.config'
import * as THREE from 'three'

export const guiConfig: IGuiConfig = {
  trails: {
    color: colorConfig.trailGrey,
    opacity: 0.5,
    linewidth: 1,
    segments: 128,
    transparent: true,
    side: THREE.DoubleSide,
  },
  fps: {
    updateInterval: 500, // update fps every 500ms
  },
  axisGrid: {
    units: 3,
  },
} 
