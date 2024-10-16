<script setup>
import { ref, shallowRef } from 'vue'
import router from '../../router'
import DataEnter from '../components/DataEnter.vue'
import Auth from '../components/Auth.vue'
import Done from '../components/Done.vue'
import axios from 'axios'

const componentsList = shallowRef(DataEnter)

const text = ref([{ name: '常用欄位資訊', detail: '姓名 , 出生日期 , 身分證字號 , 戶籍地址 , 性別' }])
const customerData = ref([])
const api = ref(null)

function nextComponent() {

    if (componentsList.value.__hmrId === DataEnter.__hmrId) {
        componentsList.value = Auth
    } else {
        if (componentsList.value.__hmrId === Auth.__hmrId) {
            componentsList.value = Done
        }

    }
}



async function agree() {
    api.value = 'https://run.mocky.io/v3/e59453a8-2898-4fee-8fe1-48cf5cc79f04'
    await axios.get(api.value).then(res => {
        customerData.value = res.data
        sessionStorage.setItem("customerData", JSON.stringify(customerData.value));
        router.push({ name: 'SPForm', query: { filled: true } })
     }).catch((err) => {
        console.log(err);
    })



}

</script>

<template>
    <div class="container">
        <div class="step-bar w-100">
            <div class="bar d-flex py-3">
                <div class="bar0 item mx-auto d-lg-flex flex-lg-culumn align-items-center justify-content-center">
                    <div class="mx-auto circle rounded-circle d-flex justify-content-center align-items-center"
                        :class="componentsList.__hmrId !== DataEnter.__hmrId ? 'done' : 'circle'">
                        <i class="bi bi-check2" v-show="componentsList.__hmrId !== DataEnter.__hmrId"></i> <span
                            v-show="componentsList.__hmrId == DataEnter.__hmrId">1</span>
                    </div>
                    <div class="text fw-bold p-2">
                        資料填寫
                    </div>
                </div>

                <div class="bar0 item mx-auto d-lg-flex flex-lg-culumn align-items-center justify-content-center">
                    <div class="mx-auto circle rounded-circle d-flex justify-content-center align-items-center"
                        :class="componentsList.__hmrId === Done.__hmrId ? 'done' : 'circle'">
                        <i class="bi bi-check2" v-show="componentsList.__hmrId === Done.__hmrId"></i>
                        <span class="" v-show="componentsList.__hmrId !== Done.__hmrId">2</span>
                    </div>
                    <div class="text fw-bold p-2">
                        身分驗證
                    </div>
                </div>
                <div class="bar0 item mx-auto d-lg-flex flex-lg-culumn align-items-center justify-content-center">
                    <div class="mx-auto circle rounded-circle d-flex justify-content-center align-items-center">
                        3
                    </div>
                    <div class="text fw-bold p-2">
                        申請完成
                    </div>
                </div>

            </div>
        </div>
        <div class="bg-color  d-flex justify-content-start flex-column align-items-start  py-5 overflow-auto"
            style="padding-inline:7rem; height: 78vh;">
            <div class="w-100">
                <component :is="componentsList" :text="text"></component>
            </div>
        </div>
        <div>

        </div>
        <div class="d-flex justify-content-between mt-3">
            <div>

            </div>

            <div class="d-flex gap-3">
                <button class="btn-outline bg-white  " @click="disagree()"
                    v-show="componentsList.__hmrId === Done.__hmrId">不同意提供</button>
                <button class="btn-custom bg-yellow  " @click="agree()"
                    v-show="componentsList.__hmrId === Done.__hmrId">同意提供</button>
                <button class="btn-custom bg-yellow  " @click="nextComponent()"
                    v-show="componentsList.__hmrId !== Done.__hmrId">下一步</button>
            </div>
        </div>

    </div>
</template>

<style scoped>
.step-bar .circle {
    background-color: #ffd154;
    height: 40px;
    width: 40px;
}

.circle2 {
    border-radius: 100%;
    background-color: #ffd154;
    height: 20px;
    width: 20px;

}

.step-bar .done {
    border: solid #ffd154;
    color: #ffd154;
    background-color: #ffffff;
    height: 40px;
    width: 40px;
}

.btn-outline {
    border: solid 1px #ffd154;

}

.btn-outline:hover {
    background-color: #ffd154 !important;
}
</style>