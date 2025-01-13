<script setup>
import { ref, onMounted } from 'vue'
import router from '../../router';
import axios from 'axios'

const list = ref([])

function goToDetail(dpId) {
    console.log(dpId);
    router.push({ name: 'DetailPage', query: { dpId: dpId } })
}

onMounted(() => {
    getList()
})

function formatDate(dt) {
     const date = new Date(dt)
    if (dt) {
        return date.toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })
    } else {
        return '-'
    }

}

async function getList() {

    const url = `/api/dp/sync/dps`
    await axios.get(url).then(res => {
        list.value = res.data.result
        console.log(res.data.result);
    })

}



</script>

<template>
    <div>
        <h1>受理異動機關列表</h1>

        <div class="border table-wrap mt-3">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">受理異動機關名稱</th>
                        <th scope="col" class="text-end">受通知機關數</th>
                        <th scope="col" class="text-center">服務開通日期</th>
                        <th class="text-center">服務狀態</th>
                        <th class="text-center">完整詳細資訊</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item, index) in list" :key="index">
                        <tr>
                            <td class="align-middle">{{ item.dpName }}</td>
                            <td class="text-end align-middle">{{ item.targetDpCount }}</td>
                            <td class="text-center align-middle">{{ formatDate(item.createdDate) }}</td>
                            <td class="text-center align-middle">
                                正常
                            </td>
                            <td class="text-center">
                                <button type="button" class="btn btn-primary" @click="goToDetail(item.dpId)">詳細</button>
                            </td>
                        </tr>
                    </template>

                </tbody>
            </table>
        </div>
        <div class="d-flex justify-content-between mt-3">
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
        </div>
    </div>
</template>


<style scoped>
.table-wrap {
    min-height: 30vh;
    padding: 16px;
}
</style>