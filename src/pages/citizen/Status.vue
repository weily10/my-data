<script setup>
import { ref, onMounted } from 'vue'
import router from '../../router';
import axios from 'axios'
import { useRoute } from 'vue-router';

const route = useRoute()
const notifyTime = ref('2024-7-01 10:00:00')
const list = ref([])

onMounted(() => {
    list.value = [{}]
    getStatus()
})

async function getStatus() {
    if (route.query.txId) {
        const txId = route.query.txId
        const url = `/api/persons/status/${txId}`
        await axios.get(url).then(res => {
            console.log(res.data.result);
            list.value = res.data.result
        })
    }
}

function goToDetail() {
    router.push({ name: 'DetailPage' })
}

function hasItem(item) {
    return item ? item : '-'
}

</script>

<template>
    <div class="d-flex justify-content-center">
        <div class="wrapper">
            <div class="text-center">
                <h1>資料異動通知狀態​</h1>
            </div>
            <div class="border   mt-5 p-3">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">申請時間</th>
                            <th scope="col" class="text-start">異動通知機關</th>
                            <th scope="col" class="text-start">同意通報資料</th>
                            <th class="text-center">異動狀態</th>
                        </tr>
                    </thead>

                    <tbody>
                        
                        <tr v-for="(item, index) in list" :key="index">
                            <td class="align-middle">{{ notifyTime }}</td>
                            <td class="text-start align-top">
                                {{ hasItem(item.targetDpId) }}
                            </td>
                            <td class="text-start align-top">
                                {{ hasItem(item.field) }}<br>
                                {{ hasItem(item.field) }}
                            </td>
                            <td class="text-center align-top">
                                {{ hasItem(item.status) }}<br>
                                {{ hasItem(item.reason) }}
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <div class="mt-3 d-flex justify-content-center">
                <button type="button" class="btn text-white bg-primary" @click="router.push({ path: '/chooseService' })"> 返回主頁</button>
            </div>
            <!-- <div class="d-flex justify-content-between mt-3">
                <div>
                    共 {{ list.length }} 筆
                </div>
                <nav>
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div> -->


        </div>
    </div>
</template>


<style scoped>
.wrapper {
    width: 1200px;
    min-width: 340px;
}
</style>