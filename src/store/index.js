import { defineStore } from 'pinia'
import { ref } from "vue";


export const useStore = defineStore('myStore', () => {

    const information = ref([])
    const dps = ref([])
    const toast = ref(false)
    const toastText = ref('資料更新成功!')
    const color = ref('bg-success')
    const dpName = ref('內政部戶政司')
    const dp = ref('dp1')

    function setInfo(variable) {
        information.value = variable
    }

    function setText(text) {
        toastText.value = text
    }

    function setColor(ctx) {
        color.value = ctx
    }

    function setDps(dp) {
        dps.value = dp
    }

    return { information, setInfo, setDps, toast, setText, toastText, color, setColor, dpName,dp }

})