import MedIcon from '@/components/common/MedIcon'
import MedUnitField from '@/components/common/MedUnitField'
import MedSelectField from '@/components/common/MedSelectField'

export default {
  install: Vue => {
    Vue.component('med-icon', MedIcon)
    Vue.component('med-unit-field', MedUnitField)
    Vue.component('med-select-field', MedSelectField)
  }
}
