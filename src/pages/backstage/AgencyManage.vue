 
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'
import { useStore } from '../../store'
import { useRoute } from 'vue-router';

const route = useRoute()
const notifications = ref([])
const appNumber = ref(null)
const startDate = ref('')
const endDate = ref('')
const notifStatus = ref()
const displayNumber = 10
const store = useStore()
const reportModels = ref([])

async function getDP2Status() {
    const dp = route.query.dp

    const url = `/${dp}/api/persons/status/`
    await axios.get(url).then(res => {
        console.log(res);
        notifications.value = res.data.result
    }).catch((err) => {
        console.log(err);
    })
}


onMounted(() => {
    getDP2Status()
    // notifications.value = [{ number: '550e8400-e29b231-12221', date: '2023-11-21 10:00:00', data: ['姓名', '連絡電話'], status: '完成' }]

})

async function update(item) {
    const dps = route.query.dp
    const resourceId = item.resourceId
    const txId = item.txId

    const url = `/${dps}/api/resources/sync/change/update/${txId}/${resourceId}`

    await axios.put(url).then(res => {
        getDP2Status()
        store.toastText = '資料更新成功'
        store.color = 'bg-success'
        store.toast.hide()
        setTimeout(() => {
            store.toast.show();
        }, 0);
    }).catch(err => {
        console.log(err);
    })
}

async function getInfo(item) {
     const dps = route.query.dp
    const resourceId = item.resourceId
    const txId = item.txId
    const url = `/${dps}/api/resources/sync/change/retrieve/${txId}/${resourceId}`
    await axios.get(url).then(res => {
        console.log(res);
        getDP2Status()
    }).catch(err => {
        console.log(err);
    })
}


function clean(index) {
    reportModels.value[index] = ''
}


async function sendReport(item, index) {
    const dps = route.query.dp
    const resourceId = item.resourceId
    const txId = item.txId
    const reqBody = {
        targetDpId: item.targetDpId,
        txId: txId,
        reason: reportModels.value[index]
    }

    const url = `/${dps}/api/resources/sync/change/closed/${txId}/${resourceId}`

    await axios.post(url, reqBody).then(res => {
        console.log(res);
        getDP2Status()
        store.toastText = '送出回報成功'
        store.color = 'bg-success'
        store.toast.hide()
        setTimeout(() => {
            store.toast.show();
        }, 0);
    }).catch(err => {
        console.log(err);
    })
}

// function startDateClear() {
//     startDate.value = ""
// }

// function endDateClear() {
//     endDate.value = ""
// }

function formatDate(dt) {
    const date = new Date(dt)
    return date.toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })
}

function formatStatus(data) {
    if (!data) {
        return '無狀態'
    }
    if (['0', '1', '2', '3'].includes(data)) {
        return '正常'
    }

    if (['Z'].includes(data)) {
        return '異常'
    }

    if (['9'].includes(data)) {
        return '結案'
    }

}

function formatColor(data) {
    if (['0', '1', '2', '3'].includes(data)) {
        return 'bg-success'
    }

    if (['Z'].includes(data)) {
        return 'bg-danger'
    }

    if (!data) {
        return 'bg-body-secondary text-secondary'
    }

    if (['9'].includes(data)) {
        return 'bg-secondary'
    }
}


function dpChoose(item,source) {
    if (source.sourceDpId == 'dp4') {

        if (item == '姓名') {
            return '公司名稱'
        }

        if (item == '戶籍地址') {
            return '公司所在地'
        }
    } else {
        return item
    }

}





</script>

<template>
    <div>
        <h1>跨機關異動通報</h1>

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
                                <td class="align-middle">{{ item2.formNo }}</td>
                                <td class="text-center align-middle" style="min-width: 5rem;">{{
                                    formatDate(item2.createdDate) }}</td>
                                <td class="text-center align-middle">

                                    <div v-for="(item, index) in item2.fields" :key="index">
                                        <div>
                                            {{ dpChoose(item,item2) }}
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center align-middle ">
                                    <span class="badge" :class="formatColor(item2.status)"> {{ formatStatus(item2.status)
                                    }}</span>
                                </td>
                                <td class="text-end align-middle" style="min-width: 5rem;">
                                    <div class="d-flex gap-2 justify-content-end flex-wrap">
                                        <button class="btn bg-primary text-white " style="width: 5em;"
                                            v-show="item2.fields && item2.status !== 'Z'"
                                            @click="update(item2)">已更新</button>
                                        <div class="dropdown">
                                            <a class="btn bg-primary text-white" href="#" role="button" style="width: 5em;"
                                                data-bs-toggle="dropdown" aria-expanded="false" @click="clean(index)">
                                                回報
                                            </a>

                                            <div class="dropdown-menu" style="width: 20rem;">
                                                <div class="p-3">
                                                    <label for="usernameInput" class="form-label ">通報資訊</label>
                                                    <input type="text" class="form-control" id="usernameInput"
                                                        v-model="reportModels[index]" placeholder="">
                                                    <div class="text-end mt-3">
                                                        <button class="btn bg-primary text-white " style="width: 5em;"
                                                            @click="sendReport(item2, index)">送出</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>

            </div>
            <div class="d-flex justify-content-between mt-3">
                <div>
                    顯示1到10共 {{ notifications.length }} 筆
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
       
 
 