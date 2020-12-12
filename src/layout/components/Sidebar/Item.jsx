
import { resolveComponent } from "vue"

export default function MenuItem(props) {

  const SvgIcon = resolveComponent('svg-icon')
  const { icon } = props
  if (icon) {
    if (icon.includes('el-icon')) {
      return (<i class={[icon, 'sub-el-icon']} />)
    } else {
      return (<SvgIcon icon-class={icon} />)
    }
  }
  return []
}


