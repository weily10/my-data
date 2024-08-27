<script setup>
import router from '../../router'
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

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

    console.log(route.query.toPage);
})




function clientLogin() {
    router.push({ name: route.query.toPage })
}

</script>

<template>
    <p class="danger text-danger  text-simulation">模擬受理異動機關畫面</p>
    <div class=" d-flex flex-column justify-content-center " style="height: 80vh;">
        <h2 class="card-title text-center">身分確認方式</h2>
        <div class="d-flex justify-content-center  " >

            <div class="">
                <div class="text-center mt-3">
                    <button type="button" class="btn">自然人憑證</button>
                    <button type="button" class="btn">行動自然人憑證</button>
                </div>

                <div class="card border-0 shadow-sm" style="width:383px;">
                    <div class="card-body">

                        <div class="mb-3  text-start">
                            <label for="usernameInput" class="form-label ">國民身分證統一編號</label>
                            <input type="text" class="form-control" id="usernameInput" v-model="usernameInput"
                                placeholder="name@example.com">
                        </div>
                        <div class="mb-3 text-start">
                            <label for="passwordInput" class="form-label">自然人憑證IC卡密碼﹝PIN Code﹞</label>
                            <input type="password" class="form-control" id="passwordInput" v-model="passwordInput"
                                placeholder=" ">
                        </div>
                        <div class="mt-4">
                            <button :disabled="loading || !usernameInput || !passwordInput"
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
.wrapper {}
</style>