<script setup>
import router from '../../router'
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';

let usernameInput = ref(null)
let passwordInput = ref(null)
let loading = ref(false)
let errormsg = ref(false)
let errormessage = ref(null)


const url = "/api/Account/login"
const route = useRoute()

async function login() {
    router.push({ name: 'Dashboard' })
}

onMounted(() => {

 })



async function search() {
    //   await axios.post(api.value).then(res => {
    //         customerData.value = res.data
    //         sessionStorage.setItem("customerData", JSON.stringify(customerData.value));
    //         router.push({ name: 'SPForm', query: { filled: true } })
    //      }).catch((err) => {
    //         console.log(err);
    //     })

    router.push({ name: "ResultSearch" })
}

</script>

<template>
    <div class=" d-flex flex-column justify-content-center " style="height: 80vh;">
        <h2 class="card-title text-center mb-3">跨機關異動通知服務_受通知機關前臺</h2>
        <div class="d-flex justify-content-center mt-3">

            <div class="">

                <div class="card border-0 shadow-sm" style="width:383px;">
                    <div class="card-body">
                        <h5 class="card-title mb-3">
                            客戶資料查詢作業
                        </h5>
                        <div class="mt-3">
                            <label for="usernameInput" class="form-label ">國民身分證統一編號</label>
                            <input type="text" class="form-control" id="usernameInput" v-model="usernameInput"
                                placeholder="如: S24242342">
                        </div>
                   
                        <div class="mt-5 d-flex justify-content-end">
                            <button  
                                class="btn btn-primary  d-flex gap-2 align-items-center justify-content-center bg-primary"
                                @click="search">
                                <div>查詢</div>

                                <div v-show="loading" class="spinner-border spinner-border-sm text-light" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </button>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template> 

<style scoped>
h5{
    color: #337ab7 !important;
}
</style>