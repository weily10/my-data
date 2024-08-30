<script setup>
import router from '../../router'

function gotoNextPage() {
    router.push({ name: 'Authentication' })
}


function agreeProvide() {

}

function disagreeProvide() {

}

</script>

<template>
    <div class="container">
        <div class="step-bar w-100">
            <div class="bar d-flex py-3">
                <div class="bar0 item mx-auto d-lg-flex   align-items-center justify-content-center">
                    <div class="mx-auto done rounded-circle d-flex justify-content-center align-items-center ">
                        <i class="bi bi-check2"></i>
                    </div>
                    <div class="text fw-bold p-2">
                        知情同意
                    </div>
                </div>
                <div class="bar0 item mx-auto d-lg-flex flex-lg-culumn align-items-center justify-content-center">
                    <div class="mx-auto done rounded-circle d-flex justify-content-center align-items-center">
                        <i class="bi bi-check2"></i>
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
            style="padding-inline:7rem;">
            <div class="w-100">
                <p class="text-start m-0">戶籍資料異動跨機關通報服務申請，已驗證您的身分，<br>
                    只要您同意，以下異動資料將通報至以下受通報機關，就能繼續進行變更。</p>

                <table class="table my-3 table-bordered w-50">
                    <thead>
                        <tr>
                            <th>
                                受通知機關
                            </th>
                            <th>
                                異動資料
                            </th>
                        </tr>

                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                台灣電力公司
                            </td>
                            <td>
                                姓名 , 戶籍地址
                            </td>
                        </tr>
                        <tr>
                            <td>
                                台灣自來水公司
                            </td>
                            <td>
                                姓名 , 國民身分證統一編號 , 戶籍地址 </td>
                        </tr>
                    </tbody>
                </table>

                <p>
                    此異動通報時程須１至３天。通報完成時可至內政部戶政司全球資訊網[戶籍資料異動跨機關通報服務查詢]，
                    輸入個人基本資料或使用自人人憑證查詢進度與結果。
                </p>
            </div>


        </div>
        <div>

        </div>
        <div class="d-flex justify-content-between mt-3">
            <div>


            </div>
            <div class="d-flex gap-3">
                <button class="btn-outline bg-white  " @click="agreeProvide()">同意提供</button>
                <button class="btn-custom bg-yellow  " @click="disagreeProvide()">同意提供</button>
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