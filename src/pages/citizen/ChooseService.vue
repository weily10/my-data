<script setup>
import router from "../../router"
</script>

<template>
   <div class="custom-container mx-auto">
      <div class=" ">
         <p class="danger text-danger  ">模擬受理異動機關畫面</p>
      </div>
      <div class="d-flex justify-content-center align-items-center gap-5 h-100 mt-5">

         <div class="btn-big   card justify-content-center fs-4 px-1  d-flex align-items-center "
            @click="router.push({ path: '/clientlogin', query: { toPage: 'Appliance' } })">
            <span>申請跨機關異動通知服務​</span>
         </div>
         <div class="btn-big  card justify-content-center fs-4 px-1  d-flex align-items-center"
            @click="router.push({ path: '/clientlogin', query: { toPage: 'Status' } })">
            查詢資料異動通知狀態​</div>
      </div>
   </div>
</template>


<style scoped>

.custom-container{
   max-width: 760px;
  }
.btn-big {
   width: 350px;
   height: 350px;
   cursor: pointer;
   background-color: #EEEEEE;
}

.btn-big:hover {
   background-color: #239E5B;
   transition: 0.25s;
   color: #EEEEEE;
}
</style>