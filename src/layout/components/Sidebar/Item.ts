
import { resolveComponent, h, FunctionalComponent } from "vue"


const MenuItem: FunctionalComponent<{ icon: string }> = (props) => {

  const SvgIcon = resolveComponent('svg-icon')
  const { icon } = props
  if (icon) {
    if (icon.includes('el-icon')) {
      return h('i', { class: [[icon, 'sub-el-icon']] })
    } else {
      return h(SvgIcon, { 'icon-class': icon })
    }
  }
  return []
}
export default MenuItem


