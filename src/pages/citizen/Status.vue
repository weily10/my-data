<script setup>
import { ref, onMounted } from 'vue'
import router from '../../router';
import axios from 'axios'
import { useRoute } from 'vue-router';

const route = useRoute()
const notifyTime = ref('2024-7-01 10:00:00')
const list = ref([])
const dpsList = ref([])
const dp = ref('dp1')


onMounted(() => {
    list.value = [{}]
    dp.value = route.query.dp
    getStatus()
    getDP()
    setTimeout(() => {
        refreshPage()
    }, 1000);


})

function refreshPage() {

    if (!localStorage.getItem('reloaded')) {
        localStorage.setItem('reloaded', 'true'); // Set a flag
        window.location.reload(); // Refresh the page
    } else {
        localStorage.removeItem('reloaded'); // Reset the flag for future reloads
    }

}

async function getDP() {
    const url = `/api/dp/`
    await axios.get(url).then(res => {
        dpsList.value = res.data.result
    }).catch((err) => {
        console.log(err);
    })
}


function getName(id) {
    const result = dpsList.value.map(v => {
        if (v.dpId == id) {
            return v.dpName
        }
        return null
    }).find(Boolean)
    return result

}

async function getStatus() {
    if (route.query.dp) {
        console.log(route.query.dp);
        const dps = route.query.dp
        if (route.query.txId) {
            const txId = route.query.txId
            const url = `/${dps}/api/persons/status/${txId}`
            await axios.get(url).then(res => {
                console.log(res.data.result);
                list.value = res.data.result
            })
        }
    }

}

function defineStats(st) {
    if (st == 0 || st == 1 || st == 2) {
        return '處理中'
    }

    if (st == 'Z' || st == 3) {
        return '完成'
    }

    if (st == '9') {
        return '結案'
    }
}

function hasItem(item) {
    if (item) {
        if (route.query.dp == 'dp4') {
            if (item == '姓名') {
                return '公司名稱'
            }
            if (item == '戶籍地址') {
                return '公司所在地'
            }

        } else {
            return item
        }
    } else {
        return '-'
    }
}


function formatDate(dt) {
    const date = new Date(dt)
    return date.toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })
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
                            <td class="align-middle">{{ formatDate(item.createdDate) }}</td>
                            <td class="text-start align-top">
                                {{ getName(item.targetDpId) }}
                            </td>
                            <td class="text-start align-top">
                                <div v-for="item in item.fields">
                                    {{ hasItem(item) }}
                                </div>


                            </td>
                            <td class="text-center align-top">
                                {{ defineStats(item.status) }}<br>
                                <span v-show="item.status == '9'"> 本案不受理，原因:</span> {{ hasItem(item.reason) }}
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <div class="mt-3 d-flex justify-content-center">
                <button type="button" class="btn text-white bg-primary" @click="router.push({ path: '/' })">
                    返回主頁</button>
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