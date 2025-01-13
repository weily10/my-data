<script setup>
import router from '../../router'
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Toast } from 'bootstrap'
 import { useStore } from '../../store';

let uid = ref(null)
let pin = ref(null)
let loading = ref(false)
let errormsg = ref(false)
let errormessage = ref(null)
let personUid = ref(null)
const store = useStore()
const dps = ref('dp1')

const customerData = ref({})

const route = useRoute()

async function login() {
    router.push({ name: 'Dashboard' })
}

onMounted(() => {
    dps.value = sessionStorage.getItem('dp')
    console.log(route.query.toPage);
})



async function clientLogin() {
    const url = `/${dps.value}/api/persons/verifyCert`
    const requestBody = {
        uid: uid.value,
        birthdate: ''
    }
    await axios.post(url, requestBody).then(res => {
        if (!res.data.success) {
            errormsg.value.show()
            errormessage.value = res.data.result
        } else {
            localStorage.setItem('dps', dps.value)
            const txId = res.data.txId
            personUid.value = res.data.personUid
            localStorage.setItem('nationalID', uid.value)
            sessionStorage.setItem('personUid', personUid.value)
            sessionStorage.setItem('pin', pin.value)
            verify(txId, dps.value)
            if (route.query.toPage !== 'Status') {
                customerData.value = res.data
                sessionStorage.setItem("customerData", JSON.stringify(customerData.value));
            }
        }

    }).catch((err) => {
        console.log(err);
        errormsg.value.show()
        errormessage.value = "server 有異常"
    })

}

onMounted(() => {
    errormsg.value = new Toast(document.getElementById('errormsg'));

})


function verify(txId, dp) {
     

}


</script>

<template>
    <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-outline-primary btn-sm  mt-4 " @click="router.push({ path: '/' })">
            回首頁</button>
    </div>
    <div class=" d-flex flex-column justify-content-center mt-5">
        <h2 class="card-title text-center">身分確認方式</h2>
        <div class="d-flex justify-content-center mt-3">
            <div class="">
                <div class="card border-0 shadow-sm" style="width:383px;">
                    <h5 class="text-center fw-semibold" v-show="store.dp == 'dp4'">工商憑證</h5>
                    <div class="card-body">

                        <div class="mb-3  text-start">
                            <label for="uid" class="form-label " v-show="store.dp == 'dp1'">國民身分證統一編號</label>
                            <label for="uid" class="form-label " v-show="store.dp == 'dp4'">統一編號</label>
                            <input type="text" class="form-control" id="uid" v-model="uid" placeholder="如:T236632934">
                        </div>
                        <div class="mb-3 text-start">
                            <label for="pin" class="form-label" v-show="store.dp == 'dp4'">工商憑證IC卡密碼﹝PIN Code﹞</label>
                            <label for="pin" class="form-label" v-show="store.dp == 'dp1'">自然人憑證IC卡密碼﹝PIN
                                Code﹞</label>
                            <input type="password" class="form-control" id="pin" v-model="pin" placeholder=" ">
                        </div>
                        <!-- <div>
                            <label for="pin" class="form-label">選單位</label>
                        </div> -->
                        <!-- <div class="mb-3 d-flex flex-column gap-2">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="dp1" v-model="dps"
                                    value="dp1" checked>
                                <label class="form-check-label" for="dp1">
                                    內政部戶政司
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="dp2" v-model="dps"
                                    value="dp2">
                                <label class="form-check-label" for="dp2">
                                    台灣自來水公司
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="dp3" v-model="dps"
                                    value="dp3">
                                <label class="form-check-label" for="dp3">
                                    台灣電力公司
                                </label>
                            </div>
                           
                        </div> -->
                        <div class="mt-4">
                            <button :disabled="loading || !uid || !pin"
                                class="btn btn-primary w-100 d-flex gap-2 align-items-center justify-content-center bg-primary"
                                @click="clientLogin">
                                <div>登入</div>

                                <div v-show="loading" class="spinner-border spinner-border-sm text-light" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </button>

                        </div>
                    </div>
                </div>

            </div>

        </div>

        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="errormsg" class="toast " role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body ">
                        <i class="bi bi-exclamation-diamond text-danger"></i> {{ errormessage }}
                    </div>
                    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>
    </div>
</template> 

<style scoped>
.btn:hover {
    color: white !important;
}

.wrapper {}
</style>