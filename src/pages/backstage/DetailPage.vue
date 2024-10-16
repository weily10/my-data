<script setup>
import { ref } from 'vue'
import router from '../../router';

const list = ref([])
const agencies = ref([])
const startDate = ref(null)
const endDate = ref(null)

agencies.value = [{
    agency: '台電',
    status: 'done',
    detail: [{
        statusname: "平臺取得DP異動通知",
        number: 'lskddl1991010901901901901901901901',
        workstatus: '完成',
        serviceStatus: '異常',
        time: '2024-7-01 10:00:00',
    },
    {
        statusname: "平臺取得DP異動通知",
        number: '232dad32132212323',
        workstatus: '完成',
        serviceStatus: '異常',
        time: '2024-7-01 10:05:00',
    }]
},
{
    agency: '台水',
    status: 'working',
    detail: [{
        statusname: "平臺取得DP異動通知",
        number: 'Y3321322123',
        workstatus: '完成',
        serviceStatus: '異常',
        time: '2024-7-01 10:00:00',
    },
    {
        statusname: "平臺取得DP異動通知",
        number: 'Y3321322123',
        workstatus: '完成',
        serviceStatus: '異常',
        time: '2024-7-01 10:05:00',
    }]
},
{
    agency: '勞保',
    status: 'failed',
    detail: [{
        statusname: "平臺取得DP異動通知",
        number: 'Y33213221232133',
        workstatus: '完成',
        serviceStatus: '異常',
        time: '2024-7-01 10:00:00',
    },
    {
        statusname: "平臺取得DP異動通知",
        number: 'Y3321322123',
        workstatus: '完成',
        serviceStatus: '異常',
        time: '2024-7-01 10:05:00',
    }]
}]





function goToDetail() {
    router.push({ name: 'DetailPage' })
}

function convertStatus(word) {
    if (word === 'done') {
        return '異動完成'
    }

    if (word === 'working') {
        return '異動中'
    }

    if (word === 'failed') {
        return '失敗'
    }
}

function selectQtd(e) {
    console.log(e);
}

</script>

<template>
    <div>
        <h1>單位異動進度</h1>

        <div class="border p-3 mt-3">
            <h6 class="fw-bold">查詢條件</h6>
            <div class="d-flex gap-3 align-items-end  flex-wrap">
                <div class="mt-3 " style="min-width: 22%;">
                    <label for="exampleFormControlInput1" class="form-label">申請單號</label>
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                </div>
                <div class="mt-3" style="min-width: 35%;">
                    <label for="exampleFormControlInput1" class="form-label">查詢時間區間</label>
                    <div class="d-flex align-items-center">
                        <VueDatePicker v-model="startDate" placeholder="初始日期"   text-input
                            auto-apply :format-locale="zhTW" @cleared="startDateClear"></VueDatePicker>
                         <span class="px-2">~</span>
                         <VueDatePicker v-model="endDate" placeholder="結束日期"  text-input
                            auto-apply :format-locale="zhTW" @cleared="endDateClear"></VueDatePicker>
                     </div>
                </div>
                <div class="mt-3  " style="min-width: 12%;">
                    <label for="exampleFormControlInput1" class="form-label">機關名稱</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>台電</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div class="mt-3  " style="min-width: 12%;">
                    <label for="exampleFormControlInput1" class="form-label">狀態</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>處理中</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div>
                    <button type="button" class="btn btn-primary" style="width: 100px ;">查詢</button>
                </div>
            </div>
        </div>
        <div class="d-flex flex-wrap gap-3 mt-3">
            <template v-for="(item, index) in agencies" :key="index">
                <div class="card shadow-sm border-0 table-wrap  flex-fill">
                    <div class="d-flex justify-content-between align-items-center">
                        <h4 class="card-title">{{ item.agency }}</h4>
                        <div>
                            <div class="d-flex align-items-center gap-2">
                                <span style="width: 5em;">顯示 </span>
                                <select class="form-select form-select-sm" name="" id="" @change="selectQtd">
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                </select>
                                <span>筆</span>
                            </div>
                        </div>
                    </div>

                    <div class="card-body p-0 mt-3">

                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">狀態</th>
                                    <th scope="col" class="text-center">申請單號</th>
                                    <th scope="col" class="text-center">處理狀態</th>
                                    <th scope="col" class="text-center">服務狀態</th>
                                    <th class="text-center">時間</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(item2, index) in item.detail" :key="index">
                                    <tr>
                                        <td class="align-middle">{{ item2.statusname }}</td>
                                        <td class="text-center align-middle overflow   " width="50px"><span class="overflow ">{{ item2.number}}</span>
                                         </td>
                                        <td class="text-center align-middle">
                                            <span class="badge"
                                                :class="item2.workstatus === '異常' ? 'bg-danger' : 'bg-success'">{{
                                                    item2.workstatus
                                                }}</span>
                                        </td>
                                        <td class="text-center align-middle">
                                            <span class="badge"
                                                :class="item2.serviceStatus === '異常' ? 'bg-danger' : 'bg-success'"> {{
                                                    item2.serviceStatus }}</span>
                                        </td>
                                        <td class="text-center align-middle">
                                            {{ item2.time }}
                                        </td>
                                    </tr>
                                </template>

                            </tbody>
                        </table>

                    </div>
                    <div class="d-flex justify-content-between mt-3">
                        <div>
                            共 {{ item.detail.length }} 筆
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
        </div>
    </div>
</template>


<style>
.table-wrap {
    min-height: 30vh;
    padding: 16px;
}

 
</style>