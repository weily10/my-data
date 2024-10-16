<script setup>
import router from '../router'

</script>

<template>
    <div class="custom-container mx-auto">
        <div class=" text-center ">
            <h2>選擇模擬情境</h2>
        </div>
        <div class="d-flex justify-content-center align-items-center gap-5 h-100 mt-5 flex-wrap">

            <div class="btn-big   card justify-content-center fs-5 px-3  d-flex align-items-center text-center"
                @click="router.push({ name: 'ChoosenService' })">
                <span>POC 1 <br>模擬受理異動機關畫面 <br>(內政部戶政司)</span>
            </div>
            <div class="btn-big   card justify-content-center  fs-5 px-3  d-flex align-items-center text-center"
                @click="router.push({ name: 'SearchCustomerData' })">
                <span>POC 1 <br> 跨機關異動通知服務 <br>受通知機關前臺</span>
            </div>
            <div class="btn-big  card justify-content-center  fs-5 px-3  d-flex align-items-center text-center"
                @click="router.push({ name: 'AgencyManage' })">
                POC 1 <br>
                模擬MyData服務平臺之後臺管理</div>
            <div class="btn-big  card justify-content-center  fs-5 px-3  d-flex align-items-center text-center"
                @click="router.push({ name: 'SPAGreement' })">
                POC 2 <br>
                身心障礙停車識別證申請</div>
            <div class="btn-big  card justify-content-center  fs-5 px-3 d-flex align-items-center text-center"
                @click="router.push({ name: 'Login' })">
                POC 2 <br>
                模擬MyData服務平臺之後臺管理</div>
           
        </div>
    </div>
</template>

<style scoped>
.custom-container {
    max-width: 760px;
}

.btn-big {
    width: 220px;
    height: 180px;
    cursor: pointer;
    background-color: #EEEEEE;
}

.btn-big:hover {
    background-color: #4778fd;
    transition: 0.25s;
    color: #EEEEEE;
}
</style>