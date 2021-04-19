import { App } from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue"
const svgs = import.meta.globEager('./svg/*.svg')
export function registerIcons(app: App) {
  Object.assign(svgs)
  app.component('svg-icon', SvgIcon as any)
}
