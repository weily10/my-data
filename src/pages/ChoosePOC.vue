<script setup>
import router from '../router'
import { onMounted } from 'vue';
import { useStore } from '../store';

const store = useStore()

onMounted(() => {
    localStorage.clear()
})

function setDpname(item, dp) {
    sessionStorage.setItem('dpname', item)
    sessionStorage.setItem('dp', dp)
    store.dpName = item
    store.dp = dp
    router.push({ name: 'ChoosenService', query: { dp: dp } })
}


function toPOC2() {
    sessionStorage.setItem('dp', 'poc2')
    store.dp = 'poc2'
    router.push({ name: 'SPAGreement' })
}


function toAgency() {

    router.push({ name: 'ChooseAgency' })
}


function toBackStage() {
    sessionStorage.setItem('dp', 'backstage')
    store.dp = 'backstage'
    router.push({ name: 'Login' })
}

</script>

<template>
    <div class="mx-auto container">
        <div class=" text-center ">
            <h2>選擇模擬情境</h2>
        </div>

        <div class="d-flex justify-content-center align-items-center gap-3 h-100  mt-5 flex-wrap">

            <div class="btn-big  poc1-1 card justify-content-center fs-5 px-3   d-flex align-items-center text-center lh-lg"
                @click="setDpname('內政部戶政司', 'dp1')">
                <span>跨機關異動通知服務<br>模擬受理異動機關畫面 <br>(內政部戶政司)</span>
            </div>

            <div class="btn-big  poc1-1 card justify-content-center fs-5 px-3  d-flex align-items-center text-center lh-lg"
                @click="setDpname('商業發展署', 'dp4')">
                <span>跨機關異動通知服務<br>模擬受理異動機關畫面 <br>(商業發展署)</span>
            </div>

            <!-- <div class="btn-big   card justify-content-center  fs-5 px-3  d-flex align-items-center text-center"
                @click="router.push({ name: 'SearchCustomerData' })">
                <span>POC 1 <br> 跨機關異動通知服務 <br>受通知機關前臺</span>
            </div> -->


            <!-- <div class="btn-big  poc3 card justify-content-center fs-5 px-3  d-flex align-items-center text-center"
                @click="router.push({ name: 'ChoosenService' })">
                <span>POC 3 <br>模擬受理異動機關畫面 (商業發展署)</span>
            </div> -->


        </div>



        <div class="d-flex justify-content-center  align-items-center gap-3 h-100  mt-3 flex-wrap">
            <div class="btn-big poc1-2  card justify-content-center  fs-5 px-3  d-flex align-items-center text-center"
                @click="toAgency()">
                模擬受通知機關管理畫面</div>
            <div class="btn-big poc2-2 card justify-content-center  fs-5 px-3 d-flex align-items-center text-center"
                @click="toBackStage">

                MyData服務平臺之後臺管理</div>

        </div>
        <div class="d-flex justify-content-center  align-items-center gap-3 h-100  mt-3 flex-wrap">
            <div class="btn-big poc2-1 card   fs-5 px-3  d-flex align-items-center text-center lh-lg" @click="toPOC2">
                欄位模組化應用服務 <br>
                身心障礙停車識別證申請</div>
         </div>
    </div>
</template>

<style scoped>
.poc1-1 {
    background-color: rgb(227, 255, 238);
}

.poc1-2 {
    background-color: rgb(255, 239, 206);
}

.poc2-1 {
    background-color: rgb(255, 231, 231);
}

.poc2-2 {
    background-color: rgb(208, 232, 255);
}

.poc3 {
    background-color: rgb(255, 255, 255);
}



.btn-big {
    flex-grow: 1;
    width: 220px;
    max-width: 350px;
    height: 180px;
    cursor: pointer;
}

.btn-big:hover {
    background-color: #a5a5a5;
    transition: 0.25s;
    color: #ffffff;
}
</style>