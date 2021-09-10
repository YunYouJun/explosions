import { MotionPlugin } from '@vueuse/motion'
import { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(MotionPlugin)
}
