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
    <div class="w-100">
        <h5 class="fw-bold">
            請填寫以下資訊
        </h5>
        <div class="mb-3 mt-4 w-50">
            <label for="chineseName" class="form-label">身分證字號 <span class="text-danger">(必填)</span> </label>
            <input type="email" class="form-control" id="chineseName" placeholder="英文字母為大寫">
        </div>

        <div class="mb-3 mt-3 w-50">
            <label for="chineseName" class="form-label"> 生日<span class="text-danger">(必填)</span></label>
            <input type="email" class="form-control" id="chineseName" placeholder="列: 0770101">
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