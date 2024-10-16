<script setup>

import { onMounted, computed, ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router';
// import { useStore } from './store'
import { Toast } from 'bootstrap'
import router from './router'
const route = useRoute();
// const store = useStore()




const isadmin = computed(() =>
    router.currentRoute.value.path.includes('/admin') && !router.currentRoute.value.path.includes('/login')
)

 
const username = ref('')

username.value = '王小明'


function setRoleColor() {
     if (router.currentRoute.value.path.includes('/admin') && !router.currentRoute.value.path.includes('/login')) {
        return 'background-color:white'
    }

    if (router.currentRoute.value.meta.role === 'citizen') {
        return 'background-color:#F8FCF9'
    }

    if (router.currentRoute.value.meta.role === 'mydata') {
        console.log('mydata');
        return 'background-color:#FFFEF5'
    }

    if (router.currentRoute.value.meta.role === 'sp') {
        return 'background-color:#FFFAFA'
    }

    if (router.currentRoute.value.meta.role === 'admin') {
        return 'background-color:#51A5F3'
    }

}

</script>

<template>
    <div class="d-flex " style="min-height: 100vh;" :style="setRoleColor()">
        <div v-if="isadmin">
            <nav class="nav border-end  d-flex   flex-column  p-1">
                <h4 class="fw-bold p-3 text-white">
                    系統名稱
                </h4>
                <div class="accordion accordion-flush mt-3" id="accordionFlushExample">
                    <div class="" v-show="route.meta.role === 'poc1Admin'">
                        <RouterLink to="/admin/agencyManage">跨機關異動通報</RouterLink>
                    </div>
                    <div class="accordion-item" v-show="route.meta.role !== 'poc1Admin'">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed text-white" type="button" data-bs-toggle="collapse"
                                style="background-color: #434343;" data-bs-target="#flush-collapseOne" aria-expanded="false"
                                aria-controls="flush-collapseOne">
                                受理異動機關管理
                            </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse"
                            data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body text-white" style="background-color: #434343;">
                                <div class="d-flex flex-column">
                                    <RouterLink to="/admin">跨機關異動通知服務查詢</RouterLink>
                                    <RouterLink to="/admin/module-management">常用模組設定</RouterLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="reserved">

            </div>
        </div>
        <div class="w-100  ">
             <div class="header d-flex d-flex justify-content-between  align-items-center px-3 text-white" v-if="isadmin" :style="route.meta.role === 'poc1Admin'?'background-color:#D27E00':''">
                <div class="text-start fs-5">
                    <span v-show="route.meta.role === 'poc1Admin'">
                        模擬受通知機關管理畫面(台灣電力公司)
                    </span>
                    <span v-show="route.meta.role === 'admin'">
                        模擬MyData服務平臺之後臺管理
                    </span>
                    
                </div>
                <div class="p-2 text-end" v-show="route.meta.role !== 'poc1Admin'">
                    Hi, 聯經數位股份有限公司 {{ username }}
                </div>
            </div>
            <div class="p-3">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bg-color {
    background-color: #f2fdf5;
}

.header {
    height: 62px;
    background-color: #51A5F3;
}

.nav {
    padding-top: 10px;
    width: 290px;
    height: 100%;
    position: fixed;
    background-color: #434343;
}

.reserved {
    width: 290px;
    height: 100%;
}

a {

    padding: 16px;
    color: rgb(255, 255, 255);
}

a:hover {
    background-color: rgb(0, 0, 0) !important;
    transition: 0.2s;
}


li {
    list-style-type: none;
    padding: 10px 8px;
}
</style>
