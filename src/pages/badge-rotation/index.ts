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
  toleratedSpeed?: 0.0005
  /**
   * 最后可忽略的角度
   */
  toleratedAngel?: 3
  /**
   * 获取旋转角度
   */
  getRotation?: () => number
  /**
   * 设置旋转的动画
   */
  setRotation?: (deltaRotation: number) => void
}

/**
 * 创建旋转惯性动画
 *
 * @param {*} options
 * @param {Function} callback 回调函数 设置状态
 */
export function createInertiaAnimation(options: InertiaAnimationOptions) {
  return {
    playAnimation: false,
    /**
     * 初速度
     */
    speed: 1,
    /**
     * 水平重力影响系数
     */
    gravity: 0.008,
    /**
     * 衰减系数
     */
    u: 0.92,
    /**
     * 最后可忽略的速度
     */
    toleratedSpeed: 0.0005,
    toleratedAngel: 3,
    /**
     * 获取旋转角度
     * @returns
     */
    getRotation() {
      console.log('您需要设置「getRotation」以获取旋转角度')
      return 0
    },
    /**
     * 设置旋转的动画
     * @param {number} rotation
     */
    setRotation() {
      console.log('您需要设置「setRotation」以设置旋转角度')
    },
    ...options,
    run() {
      // 上一次时间
      let lastTime: number | undefined

      let { speed } = this
      const {
        gravity,
        u,
        toleratedSpeed,
        toleratedAngel,
        getRotation,
        setRotation,
      } = this

      /**
       * 每一步动画
       * @param {number} timestamp
       */
      const step = (timestamp: number) => {
        const remainder = getRotation() % 180
        const positiveRemainder = remainder < 0 ? remainder + 180 : remainder

        if (positiveRemainder >= 90 && positiveRemainder < 180) speed -= gravity
        else if (positiveRemainder > 0 && positiveRemainder < 90)
          speed += gravity

        speed *= u

        if (lastTime === undefined) lastTime = timestamp

        if (
          this.playAnimation
          && (Math.abs(speed) > toleratedSpeed
            || (positiveRemainder > toleratedAngel
              && positiveRemainder < 180 - toleratedAngel))
        ) {
          // 默认 16 ms
          let elapsed = 16
          if (lastTime !== undefined) elapsed = timestamp - lastTime

          lastTime = timestamp

          const deltaRotation = speed * elapsed
          setRotation(deltaRotation)

          window.requestAnimationFrame(step)
        }
      }

      window.requestAnimationFrame(step)
    },
  }
}
