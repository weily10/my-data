<script setup>
import { ref } from 'vue'
import router from '../../router';

const list = ref([])

list.value = [{
    agency: "內政部",
    number: 8,
    notifyTime: '2024-7-01 10:00:00',
    status: '正常',
},
{
    agency: "監理站",
    number: 2,
    notifyTime: '2024-7-01 10:00:00',
    status: '異常',
}]


function goToDetail() {
    router.push({ name: 'DetailPage' })
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
                            <td class="align-middle">{{ item.agency }}</td>
                            <td class="text-end align-middle">{{ item.number }}</td>
                            <td class="text-center align-middle">{{ item.notifyTime }}</td>
                            <td class="text-center align-middle">
                                {{ item.status }}
                            </td>
                            <td class="text-center">
                                <button type="button" class="btn btn-primary" @click="goToDetail()">詳細</button>
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


<style>
.table-wrap {
    min-height: 30vh;
    padding: 16px;
}
</style>