<script setup>
import { ref } from 'vue';


</script>

<template>
    <div class="d-flex">
        <div>
            <nav class="nav border-end  d-flex   flex-column p-3">
                <h4 class="fw-bold">
                    系統名稱
                </h4>
                <RouterLink to="/admin">跨機關異動通知服務查詢</RouterLink>
            </nav>
            <div class="reserved">

            </div>
        </div>
        <div class="p-3 w-100 wrapper">
            <router-view></router-view>
        </div>
    </div>
</template>


<style scoped>

.wrapper {}
</style>