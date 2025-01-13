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
const dps = ref('dp2')
const dpName = ref('內政部戶政司')

const customerData = ref({})

const route = useRoute()

async function login() {
    router.push({ name: 'Dashboard' })
}

onMounted(() => {

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
            console.log(res.data);
            const txId = res.data.txId
            personUid.value = res.data.personUid
            localStorage.setItem('nationalID', uid.value)
            sessionStorage.setItem('personUid', personUid.value)
            sessionStorage.setItem('pin', pin.value)
            console.log(res.data);
            verify(txId)
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


function verify(txId) {
   

}


function toDp(dps) {

    let dpName = ''
    if (dps == 'dp2') {
        dpName = '台灣自來水公司'

    } else {
        dpName = '台灣電力公司'
    }


    router.push({ path: '/admin/agencyManage', query: { dpName: dpName, dp: dps } })
    console.log(dps);
}


</script>

<template>
    <div class="d-flex justify-content-end">
        <button type="button" class="bg-primary btn btn-sm text-light" style="width: 85px;"
            @click="router.push({ path: '/' })"> 回首頁</button>
    </div>
    <div class=" d-flex flex-column justify-content-center " style="height: 80vh;">
        <h2 class="card-title text-center">請選擇受通知機關</h2>
        <div class="d-flex justify-content-center mt-3">
            <div class="">
                <div class="card border-0 shadow-sm" style="width:383px;">
                    <div class="card-body">

                        <div>
                            <label for="pin" class="form-label">選單位 </label>
                        </div>
                        <div class="mb-3 d-flex flex-column gap-2">

                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="dp2" v-model="dps"
                                    checked value="dp2">
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
                            <!-- <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="dp4" v-model="dps"
                                    value="dp3">
                                <label class="form-check-label" for="dp3">
                                    商業發展署
                                </label>
                            </div> -->

                        </div>
                        <div class="mt-4">
                            <button
                                class="btn btn-primary w-100 d-flex gap-2 align-items-center justify-content-center bg-primary"
                                @click="toDp(dps)">
                                <div>下一步</div>

                            </button>

                        </div>
                    </div>
                </div>
            </div>

        </div>


    </div>
</template> 

<style scoped>
.wrapper {}
</style>