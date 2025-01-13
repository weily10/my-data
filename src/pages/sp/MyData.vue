<script setup>
import { ref, shallowRef, onMounted } from 'vue'
import router from '../../router'
import DataEnter from '../components/DataEnter.vue'
import Auth from '../components/Auth.vue'
import Done from '../components/Done.vue'
import axios from 'axios'
import { useStore } from '../../store'
 
const componentsList = shallowRef(DataEnter)

const text = ref([{ name: '常用欄位資訊', detail: '姓名 , 出生日期 , 身分證字號 , 戶籍地址 , 性別' }])
const customerData = ref([])
const api = ref(null)
const nationalID = ref(null)
const bday = ref(null)
const pin = ref(null)
const cardReading = ref(false)
const store = useStore()
const loading = ref(false)


function nextComponent() {

    verify()
}


function verify() {
     
}


async function certCheck() {
    const url = "/dp1/api/persons/verifyCert"
    const requestBody = {
        uid: nationalID.value,
        birthdate: ''
    }
    await axios.post(url, requestBody).then(res => {
        if (!res.data.success) {
            store.toastText = '登入失敗！'
            store.color = 'bg-danger'
            store.toast.hide();
            setTimeout(() => {
                store.toast.show();
            }, 0);

        } else {
            componentsList.value = Auth

        }

    }).catch((err) => {
        console.log(err);
        errormsg.value.show()
        errormessage.value = "server 有異常"
    })


}



async function agree() {
    loading.value = true
    const servicesId = 1
    const requestBody = {
        uid: nationalID.value,
        birthdate: bday.value
    }
    api.value = `/api/persons/services/${servicesId}/verifyCert`

    await axios.post(api.value, requestBody).then(res => {

        customerData.value = res.data.result
        sessionStorage.setItem("customerData", JSON.stringify(customerData.value));
        router.push({ name: 'SPForm', query: { filled: true } })
        store.setText('成功提供')
        store.setColor('bg-success')
        store.toast.hide()
        setTimeout(() => {
            store.toast.show();
        }, 0);
        loading.value = false
    }).catch((err) => {
        console.log(err);
        loading.value = false
    })
}

function updatePin(value) {
    pin.value = value
}

function updateCardReading(value) {
    cardReading.value = value
}

function onUpdateBday(value) {
    bday.value = value
}

function updateValue(value) {
    nationalID.value = value
}


onMounted(() => {
    localStorage.clear();
    // nationalID.value = localStorage.getItem('nationalID')
    // bday.value = localStorage.getItem('bday')
})

</script>

<template>
    <div class="container">
        <div>
            <img src="../../assets/mydataicon.svg" alt="" srcset="">
            <span class="fs-6 fw-semibold ps-1">個人化資料自主運用(MyData)</span>
        </div>
        <div class="step-bar w-100">
            <div class="bar d-flex py-3">
                <div class="bar0 item mx-auto d-lg-flex flex-lg-culumn align-items-center justify-content-center">
                    <div class="mx-auto circle rounded-circle d-flex justify-content-center align-items-center"
                        :class="componentsList.__name !== 'DataEnter' ? 'done' : 'circle'">
                        <i class="bi bi-check2" v-show="componentsList.__name !== 'DataEnter'"></i> <span
                            v-show="componentsList.__name == 'DataEnter'">1</span>
                    </div>
                    <div class="text fw-bold p-2">
                        資料填寫
                    </div>
                </div>

                <div class="bar0 item mx-auto d-lg-flex flex-lg-culumn align-items-center justify-content-center">
                    <div class="mx-auto circle rounded-circle d-flex justify-content-center align-items-center"
                        :class="componentsList.__name === 'Done' ? 'done' : 'circle'">
                        <i class="bi bi-check2" v-show="componentsList.__name === 'Done'"></i>
                        <span class="" v-show="componentsList.__name !== 'Done'">2</span>
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
                <component :is="componentsList" :text="text" :nationalID="nationalID" @updateBday="onUpdateBday"
                    @onUpdateValue="updateValue" :bday="bday" @updatePin="updatePin" :pin="pin" :cardReading="cardReading"
                    @updateCardReading="updateCardReading"></component>
            </div>
        </div>
        <div>
        </div>
        <div class="d-flex justify-content-between mt-3">
            <div>

            </div>
            <div class="d-flex gap-3">
                <button class="btn-outline bg-white  " @click="router.push({ name: 'ChoosePOC' })"
                    v-show="componentsList.__name === 'Done'" :disabled="loading">不同意提供</button>
                <button class="btn-custom bg-yellow  " @click="agree()" v-show="componentsList.__name === 'Done'"
                    :disabled="loading"> <span class="spinner-border spinner-border-sm text-white" v-show="loading"
                        aria-hidden="true"></span>
                    同意提供</button>
                <button class="btn-custom bg-yellow  " @click="nextComponent()" :disabled="!pin || cardReading"
                    v-show="componentsList.__name == 'Auth'">下一步</button>
                <button class="btn-custom bg-yellow  " @click="certCheck()" v-show="componentsList.__name == 'DataEnter'"
                    :disabled="!nationalID && !pin">下一步</button>

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
    cursor: default;

}

.btn-outline:disabled {
    pointer-events: none;

}

.btn-outline:hover {
    background-color: #ffd154 !important;
}
</style>