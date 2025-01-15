<script setup>
import router from "../../router"
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue'


const route = useRoute()

onMounted(() => {
})
</script>

<template>
   <div class="custom-container mx-auto">
      <div class="d-flex gap-3">
         <button type="button" class="btn  bg-back " @click="router.push({ name: 'ChoosePOC' })">
            返回主頁</button>

      </div>
      <div class="d-flex justify-content-center align-items-center gap-5 h-100 mt-5">

         <button id="gotoservice" class="btn-big   card justify-content-center fs-4 px-1  d-flex align-items-center "
            @click="router.push({ path: '/clientlogin', query: { toPage: 'Appliance', dp: route.query.dp } })">
            <span>申請跨機關異動通知服務​</span>
         </button>
         <button class="btn-big  card justify-content-center fs-4 px-1  d-flex align-items-center"
            @click="router.push({ path: '/clientlogin', query: { toPage: 'Status', dp: route.query.dp } })">
            查詢資料異動通知狀態​</button>
      </div>
   </div>
</template>


<style scoped>
.custom-container {
   max-width: 760px;
}

.btn:hover {
   background-color: #239E5B !important;
   transition: 0.25s !important;
   color: #EEEEEE !important;
}

.bg-back {

   background-color: #EEEEEE;
}

.bg-green:hover {
   background-color: #239E5B;
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