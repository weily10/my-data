<script setup>
import { ref, onMounted } from 'vue'
import router from '../../router';

const list = ref([])
const id = ref(null)

list.value = [
    {
        name: "XXX", phone: '121313122', corresAddress: '', birth: '', homeAdrr: '', mobilePhone: '', email: ''
    }

]
 
onMounted(() => {
    id.value = 'S38823828'
})

</script>

<template>
    <div class="d-flex justify-content-center">
        <div class="wrapper">
            <div class="text-center">
                <h1>跨機關異動通知服務_受通知機關前臺</h1>
            </div>
            <div class="border table-wrap mt-5">
                <h5 class="mb-3">客戶資料</h5>
                <span class="badge bg-success mb-3"><span>ID: </span>{{ id }}</span>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">姓名</th>
                            <th scope="col" class="text-start">連絡電話</th>
                            <th scope="col" class="text-center">通訊地址</th>
                            <th class="text-center">出生年月日</th>
                            <th class="text-center">戶籍地址</th>
                            <th class="text-center">手機號碼</th>
                            <th class="text-center">電子信箱</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item, index) in list" :key="index">
                            <tr>
                                <td class="align-middle">{{ item.name }}</td>
                                <td class=" align-top">
                                    {{ item.phone }}
                                </td>
                                <td>
                                    {{ item.corresAddress }}
                                </td>

                                <td>
                                    {{ item.birth }}
                                </td>
                                <td>
                                    {{ item.homeAdrr }}
                                </td>
                                <td>
                                    {{ item.mobilePhone }}
                                </td>
                                <td>
                                    {{ item.email }}
                                </td>


                            </tr>
                        </template>

                    </tbody>
                </table>
                <div class="mt-5">
                    更新日期: YYYY/MM/DD HH:MM:SS
                </div>
            </div>
            <div class="text-center mt-3">
                <button class="btn btn-primary  bg-primary" style="width: 10rem;" @click="router.go(-1)">回客戶資料查詢</button>
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

h5 {
    color: #337ab7 !important;
}
</style>