<script setup>
import { ref, onMounted, shallowRef } from 'vue'
import router from '../../router'
import DataEnter from '../components/DataEnter.vue'
import Auth from '../components/Auth.vue'
import Done from '../components/Done.vue'
import { useStore } from '../../store'
import axios from 'axios'
 

const store = useStore()
const nationalID = ref('')
const bday = ref('')
const componentsList = shallowRef(DataEnter)
const personUid = ref('')
const pin = ref('')
const loading = ref(false)
const txId = ref('')
const cardReading = ref(false)
const dp = sessionStorage.getItem('dp')

const dpsNFieldsList = ref([{ name: '台灣電力公司', detail: '更改姓名通報更新用電戶名' }, { name: '常用欄位資訊', detail: '更改姓名通報更新用水戶名(非過戶) , 通訊地址變更' }])
const checkedItems = ref([])

function nextComponent() {

    if (componentsList.value.__name === DataEnter.__name) {
        componentsList.value = Auth
    }

}

function verify() {
    
}


async function authenticate() {
    const url = `/${dp}/api/persons/verifyCert`
    const requestBody = {
        uid: localStorage.getItem('nationalID'),
        birthdate: localStorage.getItem('bday')
    }

    await axios.post(url, requestBody).then(res => {
        txId.value = res.data.txId
        personUid.value = res.data.personUid
        sessionStorage.setItem('personUid', personUid.value)
        verify()

    }).catch((err) => {
        console.log(err);

    })

}

async function updateCustomerInfo() {
    loading.value = true
    notifyCustomer()
    // loading.value = true
    // const requestBody = store.information

    // if (personUid.value) {
    //     const url = `/dp1/api/persons/${personUid.value}`
    //     await axios.put(url, requestBody).then(res => {
    //         console.log(res);
    //         setTimeout(() => {
    //             notifyCustomer()
    //             loading.value = false
    //         }, 2000); //  

    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }
}


async function notifyCustomer() {
    loading.value = true
    const url = `/${dp}/api/persons/${personUid.value}/notify`


    const requestBody = dpsNFieldsList.value.filter(item => item.checkedDps).map(({ dpId, checkedDps, dpName, checkedFields, ...rest }) => {
        return {
            ...rest,
            personUid: sessionStorage.getItem('personUid') ? sessionStorage.getItem('personUid') : '',
            targetDpId: dpId,
            fields: checkedFields
        }
    })


    await axios.put(url, requestBody).then(res => {
        router.push({ path: '/status', query: { txId: res.data.result,dp:dp } })
        store.toastText = '資料更新成功'
        store.color = 'bg-success'
        store.toast.hide()
        setTimeout(() => {
            store.toast.show();
        }, 0);


    }).catch((err) => {
        store.toastText = '失敗! ' + err
        store.color = 'bg-danger'
        store.toast.hide()
        setTimeout(() => {
            store.toast.show();
        }, 0);
        loading.value = false
    })
}

function agree() {
    updateCustomerInfo()


}


function updatePin(value) {
    pin.value = value
}


function disableBtn(value) {
    nationalID.value = value
}

function updateBday(value) {
    bday.value = value
}

onMounted(() => {
    personUid.value = sessionStorage.getItem('personUid')
    console.log(store.information);
    nationalID.value = localStorage.getItem('nationalID')
    bday.value = localStorage.getItem('bday')
    if (localStorage.getItem('dpsNFieldsList')) dpsNFieldsList.value = JSON.parse(localStorage.getItem('dpsNFieldsList'))
})



</script>

<template>
    <div class="container">
        <div>
            <img src=" " alt="" srcset="">
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
                <component :is="componentsList" :checkedItems="checkedItems" @onUpdateValue="disableBtn"
                    @updateBday="updateBday" :nationalID="nationalID" :bday="bday" @updatePin="updatePin" :pin="pin">
                </component>
            </div>
        </div>
        <div>

        </div>
        <div class="d-flex justify-content-between mt-3">
            <div></div>
            <div class="d-flex gap-3">
                <button class="btn-outline bg-white  " @click="router.push({ name: 'ChoosePOC' })" :disabled="loading"
                    v-show="componentsList.__name === 'Done'">不同意提供</button>
                <button class=" bg-yellow  " @click="agree()" v-show="componentsList.__name === 'Done'" :disabled="loading">
                    <span class="spinner-border spinner-border-sm text-body-tertiary" aria-hidden="true"
                        v-if="loading"></span>
                    <span role="status ms-3" v-if="loading">處理中...</span>
                    <span v-if="!loading">同意提供</span>

                </button>
                <button class="btn-custom bg-yellow  " @click="authenticate()" :disabled="!pin || cardReading === true"
                    v-show="componentsList.__name === 'Auth'">下一步</button>
                <button class="btn-custom bg-yellow  " @click="nextComponent()" :disabled="!nationalID"
                    v-show="componentsList.__name === 'DataEnter'">下一步</button>

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