import { App } from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue"
import svgs from 'globby!/@/icons/svg/*.@(svg)'
export function registerIcons(app: App) {
  Object.assign(svgs)
  app.component('svg-icon', SvgIcon as any)
}
