<script setup>
import router from '../../router'

function gotoNextPage(){
router.push({name:'Authentication'})
}

</script>

<template>
    <div class="container">
        <div class="step-bar w-100">
            <div class="bar d-flex py-3">
                <div class="bar0 item mx-auto d-lg-flex flex-lg-culumn align-items-center justify-content-center">
                    <div class="mx-auto circle rounded-circle d-flex justify-content-center align-items-center">
                        1
                    </div>
                    <div class="text fw-bold p-2">
                        知情同意
                    </div>
                </div>
                <div class="bar0 item mx-auto d-lg-flex flex-lg-culumn align-items-center justify-content-center">
                    <div class="mx-auto circle rounded-circle d-flex justify-content-center align-items-center">
                        2
                    </div>
                    <div class="text fw-bold p-2">
                        知情同意
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
        <div class="text-center bg-color pt-5 d-flex justify-content-center flex-column align-items-center">
            初次使用本平臺請充分閱讀以下服務條款 , 以保障您的權益與資料安全
            <div class="bg-white text-box mt-3 p-5">
                <h3>服務條款</h3>
                <p class="mt-4 agree-text">數位發展部 ( 以下簡稱本部 ) 配合行政院推動優質電子化政
                    府服務 , 建置服務平台 ( 以下簡稱本平臺 ) 提供戶籍資料異
                    軌跨機關通報服務作業 。本部像依據下列服務條款提供各
                    項 服務 , 為確保您的權益 , 請詳細閱讀下列服務條款
 
                </p>
            </div>
            <p class="py-4"> 初次使用本平臺請充分閱讀以下服務條款 ,以保障您的權益與資料安全</p>

        </div>
        <div>

        </div>
        <div class="d-flex justify-content-between mt-3">
            <div></div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="agree" id="agree">
                <label class="form-check-label" for="agree">
                    我已了解並同意上述服務條款
                </label>
            </div>
            <button class="btn-custom bg-yellow  " @click="gotoNextPage()">下一步</button>
        </div>
    </div>
</template>

<style scoped>
.step-bar .circle {
    background-color: #ffd154;
    height: 40px;
    width: 40px;
}

.text-box {
    width: 600px;
    height: 320px;
    overflow: auto;
}

.agree-text {
    text-align: justify;
    text-justify: inter-word;
    line-height: 1.8rem;
}
</style>