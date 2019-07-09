interface WaveOption {
  waveHeight: number
  color?: string
  progress?: number
  offset?: number
  speed?: number
}

interface Wave extends WaveOption {
  step: number
}

interface VasConstructor {
  el: string | HTMLCanvasElement
  height?: number
  width?: number
  speed?: number
  waves: WaveOption | WaveOption[]
}

declare class Vas {
  el: HTMLCanvasElement
  height: number
  width: number
  ctx: CanvasRenderingContext2D
  speed: number
  waves: Wave[]

  constructor({ el, height, width, speed, waves }: VasConstructor)
}

export default Vas
