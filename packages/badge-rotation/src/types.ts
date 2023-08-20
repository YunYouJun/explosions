export interface InertiaAnimationOptions {
  /**
   * 初速度
   */
  speed?: number
  /**
   * 水平重力影响系数
   */
  gravity?: number
  /**
   * 衰减系数
   */
  u?: number
  /**
   * 最后可忽略的速度
   */
  toleratedSpeed?: number
  /**
   * 最后可忽略的角度
   */
  toleratedAngel?: number
  /**
   * 每帧时间（以保持不同帧数设备衰减表现一致）
   */
  frameDuration?: number
  /**
   * 获取旋转角度
   */
  getRotation?: () => number
  /**
   * 设置旋转的动画
   */
  setRotation?: (deltaRotation: number) => void
}
