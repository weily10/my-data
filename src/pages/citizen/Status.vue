<script setup>
import { ref } from 'vue'
import router from '../../router';

const list = ref([])

list.value = [{
    agency: [{ name: "內政部", status: '申請中', provideinfo: [{ name: '姓名' }, { name: '戶籍地址' }] }, { name: '自來水', status: '未能完成，請洽該單位洽詢', provideinfo: [{ name: '國民身分證統一編號' }, { name: '戶籍地址' }] }],
    notifyTime: '2024-7-01 10:00:00',
}
]


function goToDetail() {
    router.push({ name: 'DetailPage' })
}

</script>

<template>
    <div class="d-flex justify-content-center">
        <div class="wrapper">
            <div class="text-center">
                <h1>資料異動通知狀態​</h1>
            </div>
            <div class="border table-wrap mt-5">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">申請時間</th>
                            <th scope="col" class="text-start">異動通知機關</th>
                            <th scope="col" class="text-center">同意通報資料</th>
                            <th class="text-center">異動狀態</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item, index) in list" :key="index">
                            <tr>
                                <td class="align-middle">{{ item.notifyTime }}</td>
                                <td class="text-end align-top">
                                    <table class="table">
                                        <tr v-for="(item1, index) in item.agency" :key="index">
                                            <td class="text-start p-2 text-align-top ">
                                                {{ item1.name }}
                                            </td>

                                        </tr>
                                    </table>
                                </td>
                                <td>
                                    <table class="table">
                                        <tr v-for="(item1, index) in item.agency" :key="index">
                                            <td class="text-center ">
                                                <template v-for="(item2, index) in item1.provideinfo" :key="index">
                                                    <div>
                                                        {{ item2.name }}
                                                    </div>
                                                </template>
                                            </td>

                                        </tr>
                                    </table>
                                </td>

                                <td>
                                    <table class="table">
                                        <tr v-for="(item1, index) in item.agency" :key="index">
                                            <td class="text-center p-2">
                                                {{ item1.status }}
                                            </td>

                                        </tr>
                                    </table>
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
    </div>
</template>


<style>
.table-wrap {
    min-height: 30vh;
    padding: 16px;
}

.wrapper {
    width: 1200px;
    min-width: 340px;
}
</style>