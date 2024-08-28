<script setup>
import router from '../../router'

function toApplyPage() {
    router.push({ name: 'ApplianceDone' })
}

</script>

<template>
    <div class="container">
        <div class="step-bar w-100">
            <div class="bar d-flex py-3">
                <div class="bar0 item mx-auto d-lg-flex flex-lg-culumn align-items-center justify-content-center">
                    <div class="mx-auto done rounded-circle d-flex justify-content-center align-items-center ">
                        <i class="bi bi-check2"></i>
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
        <div class="bg-color  d-flex justify-content-center flex-column align-items-center  py-5"
            style="padding-inline:7rem">
            <h2>驗證您的身分</h2>
            <div class="w-100">
                <p class="text-start m-0">插卡驗證</p>
            </div>
            <div class="bg-white text-box mt-3 p-4 w-100">
                <p class="fw-bold">自然人憑證</p>

                <p style="color: #c0c0c0;">請準備以下項目：</p>

                <ul class="d-flex justify-content-between gap-5">
                    <li>自然人憑證+PIN碼</li>
                    <li>晶片讀卡機</li>
                    <li>安裝HiCOS卡片管理工具</li>
                </ul>

                <hr>
                <p class="fw-bold">未安裝讀卡元件</p>
                <div>
                    <p>跨平台元件安裝說明：HiCOS卡片管理工具</p>
                    <p>如無法正常讀取卡片，建議您重新安裝元件</p>
                    <p>請插入您的自然人憑證，查看 憑證IC卡詳細說明</p>
                </div>
                <div class="d-flex gap-2 align-items-top">
                    <div class="circle2 d-flex justify-content-center align-items-center "><i class="bi bi-check"></i></div>
                    <div>
                        <div class="fw-bold">請填入PIN碼</div>
                        <div class="mb-3 text-start">
                            <label for="usernameInput" class="form-label ">PIN碼累積３次錯誤將會自動鎖卡，解鎖請洽 內政部憑證管理中心</label>
                            <input type="text" class="form-control" id="usernameInput" v-model="usernameInput"
                                placeholder="請填寫自然人憑證PIN碼">
                        </div>
                    </div>
                </div>

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
            <button class="btn-custom bg-yellow  " @click="toApplyPage()">下一步</button>
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


.text-box {
    overflow: auto;
}

.agree-text {
    text-align: justify;
    text-justify: inter-word;
    line-height: 1.8rem;
}


li::marker {
    color: #ffd154;
    width: 100px;
}


hr {
    color: rgb(189, 189, 189);
}
</style>