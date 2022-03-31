import MedIcon from '@/components/common/MedIcon'
import MedHeader from '@/components/common/MedHeader'
import MedHintField from '@/components/common/MedHintField'
import MedUnitField from '@/components/common/MedUnitField'
import MedDatePicker from '@/components/common/MedDatePicker'
import MedNumberField from '@/components/common/MedNumberField'
import MedSelectField from '@/components/common/MedSelectField'
import MedViewContainer from '@/components/common/MedViewContainer'
import MedPopupContainer from '@/components/common/MedPopupContainer'

export default {
  install: Vue => {
    Vue.component('med-icon', MedIcon)
    Vue.component('med-header', MedHeader)
    Vue.component('med-hint-field', MedHintField)
    Vue.component('med-unit-field', MedUnitField)
    Vue.component('med-date-picker', MedDatePicker)
    Vue.component('med-number-field', MedNumberField)
    Vue.component('med-select-field', MedSelectField)
    Vue.component('med-view-container', MedViewContainer)
    Vue.component('med-popup-container', MedPopupContainer)
  }
}
