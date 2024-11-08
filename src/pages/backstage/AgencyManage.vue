 
<script setup>
import { ref, onMounted } from 'vue';


const notifications = ref([])
const appNumber = ref(null)
const startDate = ref('')
const endDate = ref('')
const notifStatus = ref()
const displayNumber = 10

onMounted(() => {
    notifications.value = [{ number: '550e8400-e29b231-12221', date: '2023-11-21 10:00:00', data: ['姓名', '連絡電話'], status: '完成' }]
 
})

function report() {

}


function searchNotif() {

}

function startDateClear() {
    startDate.value = ""
}

function endDateClear(){
    endDate.value = ""
}


</script>

<template>
    <div>
        <h1>跨機關異動通報</h1>
        <div class="border p-3 mt-3">
            <h6 class="fw-bold">查詢條件</h6>
            <div class="d-flex gap-3 align-items-end   flex-wrap">
                <div class="mt-3" style="width: 15rem;">
                    <label for="number" class="form-label">申請單號</label>
                    <input class="form-control" id="appNumber" v-model="appNumber">
                </div>
                <div class="mt-3  flex-wrap" style="width: 30rem;">
                    <label for=" " class="form-label">查詢時間區間</label>
                    <div class="d-flex align-items-center">
                        <VueDatePicker v-model="startDate" placeholder="初始日期"   text-input
                            auto-apply :format-locale="zhTW" @cleared="startDateClear"></VueDatePicker>
                        <span class="px-2">~</span>

                        <VueDatePicker v-model="endDate" placeholder="結束日期"  text-input
                            auto-apply :format-locale="zhTW" @cleared="endDateClear"></VueDatePicker>
                    </div>
                </div>

                <div class="mt-3" style="width: 15rem;">
                    <label for="exampleFormControlInput1" class="form-label">狀態</label>
                    <select class="form-select" aria-label="Default select example" v-model="notifStatus">
                        <option selected>處理中</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div>
                    <button type="button" class="btn btn-primary" style="width: 100px ;" @click="searchNotif">查詢</button>
                </div>
            </div>
        </div>
        <div class="border mt-3 p-3 ">
            <div class="d-flex justify-content-between">
                <h5>跨機關異動通報列表</h5>
                <div class="d-flex align-items-center gap-2">
                    <span style="width: 5em;">顯示 </span>
                    <select class="form-select form-select-sm" name="" id="" v-model="displayNumber">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                    <span>筆</span>
                </div>
            </div>
            <div class="card-body p-0 mt-3">

                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">申請單號</th>
                            <th scope="col" class="text-center">申請日期</th>
                            <th scope="col" class="text-center">異動資料</th>
                            <th class="text-center">狀態</th>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item2, index) in notifications" :key="index">
                            <tr>
                                <td class="align-middle">{{ item2.number }}</td>
                                <td class="text-center align-middle">{{ item2.date }}</td>
                                <td class="text-center align-middle">
                                    <div v-for="(item, index) in item2.data" :key="index">
                                        {{ item }}
                                    </div>
                                </td>
                                <td class="text-center align-middle">
                                    <span class="badge bg-success">
                                        {{ item2.status }}</span>

                                </td>
                                <td class="text-end align-middle" style="width:5em">
                                    <button class="btn bg-primary text-white " style="width: 5em;"
                                        @click="report">回報</button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>

            </div>
            <div class="d-flex justify-content-between mt-3">
                <div>
                    共 {{ notifications.length }} 筆
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


<style scoped>
.table-wrap {
    min-height: 30vh;
    padding: 16px;
}
</style>
       
 
 