import MedHeader from '@/components/common/MedHeader'
import MedIcon from '@/components/common/MedIcon'
import MedUnitField from '@/components/common/MedUnitField'
import MedSelectField from '@/components/common/MedSelectField'
import MedViewContainer from '@/components/common/MedViewContainer'

export default {
  install: Vue => {
    Vue.component('med-icon', MedIcon)
    Vue.component('med-header', MedHeader)
    Vue.component('med-unit-field', MedUnitField)
    Vue.component('med-select-field', MedSelectField)
    Vue.component('med-view-container', MedViewContainer)
  }
}
