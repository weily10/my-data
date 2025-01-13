<script setup>
import { ref } from 'vue'
import router from '../../router';
import axios from 'axios'
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const list = ref([])
const agencies = ref([])
const startDate = ref(null)
const endDate = ref(null)
const active = ref([])



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

async function getLists() {

    const fromDpId = route.query.dpId
    console.log(fromDpId);
    const url = `/api/dp/sync/dps/${fromDpId}`
    await axios.get(url).then(res => {
        console.log(res);
        agencies.value = res.data.result
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}

onMounted(() => {
    getLists()
})

function formatStatus(statustype, status) {

    if (statustype == 'workstatus') {
        if (status == 3 || status == 'Z') return '完成'
        if (status == 2 || status == 1 || status == 0) return '處理中'
        if (status == '11') return '平台已回應異動資料給' + '「受通知機關」'
        if (status == '9') return '結案'
    }

    if (statustype == 'servicestatus') {
        if (status == 2 || status == 1 || status == 0 || status == 3) return '正常'
        if (status == 'Z') return '異常'
        if (status == '11') return '平台已回應異動資料給「受通知機關」'
        if (status == '9') return '結案'
    }

}


function onColorChange(statustype, status) {
    if (statustype == 'workstatus') {
        if (status == 3 || status == 'Z') return 'bg-success'
        if (status == 2 || status == 1 || status == 0) return 'bg-primary'
        if (status == '11') return 'bg-info'
        if (status == '9') return 'bg-secondary'

    }

    if (statustype == 'servicestatus') {
        if (status == 2 || status == 1 || status == 0 || status == 3) return 'bg-success'
        if (status == 'Z') return 'bg-danger'
        if (status == '9') return 'bg-secondary'
        if (status == '11') return 'bg-info '
    }


}


function formatDate(dt) {
    const date = new Date(dt)
    return date.toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })
}

function dpName(id){
    if(id == 'dp1') return '內政部'
    if(id == 'dp4') return '商業發展署'
}




</script>

<template>
    <div>
        <h1>[{{dpName(route.query.dpId)}}]異動通知狀態查詢</h1>

        <div class=" mt-3">
            <template v-for="(item, key, index) in agencies" :key="item.targetDpId">
                <div class="card shadow-sm border-0 table-wrap  flex-fill">
                    <div class="d-flex justify-content-between align-items-center">
                        <h4 class="card-title"> {{ item[0].history[0].targetDpName }}</h4>
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

                    <div class="card-body p-0 mt-3 ">
                        <table class="table">
                            <thead>
                                <tr>
                                     
                                    <th scope="col" colspan="2">申請單號</th>
                                    <th scope="col" class="text-center">處理狀態</th>
                                    <th scope="col" class="text-center">服務狀態</th>
                                    <th class="text-center">時間</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(item2, index2) in item" :key="item.txId">
                                    <tr data-bs-toggle="collapse" :data-bs-target="'#accordion' + index + index2"
                                        class="clickable">
                                         <td class="align-middle " colspan="2">
                                             <span class="">{{ item2.formNo
                                            }}</span>
                                        </td>
                                        <td class="text-center align-middle ">
                                          <span v-show="item2.status == '9'"> 本案不受理，原因:</span> {{ item2.reason }}
                                        </td>
                                        <td class="text-center align-middle ">
                                            <span class="badge break-text"
                                                :class="onColorChange('servicestatus', item2.status)">
                                                {{ formatStatus('servicestatus', item2.status) }}</span>
                                        </td>
                                        <td class="text-center align-middle">
                                            {{ formatDate(item2.createdDate) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="6" class="border-0 p-0 ">
                                            <div :id="'accordion' + index + index2" class=" collapse overflow-auto p-3"
                                                style="max-height:20vh">
                                                 <table class="table w-100">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" class="">狀態</th>
                                                            <th scope="col" class="text-center">時間</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="item3 in item2.history">
                                                            <td>
                                                                {{ item3.reason }}
                                                            </td>
                                                            <td class="text-center">
                                                                {{ formatDate(item3.updatedDate) }}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>

                                    </tr>
                                </template>

                            </tbody>
                        </table>

                    </div>
                    <div class="d-flex justify-content-between mt-3">
                        <div>
                            共 {{ item.length }} 筆
                        </div>
                        <!-- <nav>
                            <ul class="pagination">
                                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item"><a class="page-link" href="#">Next</a></li>
                            </ul>
                        </nav> -->
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>


<style scoped>
.table-wrap {
    min-height: 30vh;
    padding: 16px;
}

.clickable {
    cursor: pointer;
}


.accordion-icon::before {
    content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23212529' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M2 5L8 11L14 5'/%3e%3c/svg%3e");
    display: inline-block;
    width: 16px;

}

 
 
</style>