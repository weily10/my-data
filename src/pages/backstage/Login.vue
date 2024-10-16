<script setup>
import router from '../../router'
import { ref, onMounted } from 'vue';

let usernameInput = ref(null)
let passwordInput = ref(null)
let loading = ref(false)
let errormsg = ref(false)
let errormessage = ref(null)

const url = "/api/Account/login"

async function loginToBackend() {
router.push({name:'SearchStatus'})
}

onMounted(() => {
})

</script>

<template>
    <div class="d-flex justify-content-center" style="height: 90vh">
       
        <div class=" d-flex    align-items-center">
            
            <div class="card border-0 shadow-sm" style="width:383px;  ">
                <div class="card-body">
                    <h2 class="card-title">MyData平臺後臺</h2>

                    <div class="mb-3 mt-4 text-start">
                        <label for="usernameInput" class="form-label ">使用者</label>
                        <input type="text" class="form-control" id="usernameInput" v-model="usernameInput"
                            placeholder="name@example.com">
                    </div>
                    <div class="mb-3 text-start">
                        <label for="passwordInput" class="form-label">密碼</label>
                        <input type="password" class="form-control" id="passwordInput" v-model="passwordInput"
                            placeholder=" ">
                    </div>
                    <div class="mt-4">
                        <button :disabled="loading || !usernameInput || !passwordInput"
                            class="btn btn-primary w-100 d-flex gap-2 align-items-center justify-content-center"
                            @click="loginToBackend">
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
</template> 

<style></style>