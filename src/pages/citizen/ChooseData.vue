<script setup>
import { ref, onMounted } from 'vue'
import router from '../../router'
import axios from 'axios'


const items = ref([
    {
        agency: { value: 'taipower', text: '台灣電力公司' },
        datas:
            [{
                value: 'name',
                text: '姓名'
            }]
    },
    {
        agency: { value: 'water', text: '台灣自來水公司' },
        datas:
            [{
                value: 'name',
                text: '姓名'
            },
            {
                value: 'address',
                text: '通訊地址'
            }]
    },
    {
        agency: { value: 'retire', text: '勞動部' },
        datas:
            [{
                value: 'name',
                text: '姓名'
            },
            {
                value: 'address',
                text: '通訊地址'
            }]
    }])
const fields = ref([])
const url = ref('')
const checkedDps = ref([])
const checkedItems = ref([])

function useMydata() {
    localStorage.setItem('checkedDps', JSON.stringify(checkedDps.value))
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems.value))

    router.push({ name: 'MyData' })
}

async function getDp() {
    url.value = `/apiPlatform/dp`
    await axios.get(url.value).then((res) => {
        items.value = res.data.result
     })
}

async function getField() {
    const url = `/api/persons/fields`
    await axios.get(url).then((res) => {
        fields.value = res.data.result

    })
}



onMounted(() => {
    getDp()
    getField()
})

</script>

<template>
    <div class="container">
        <h2 class="text-center">受通報機關</h2>
        <div>

            <table class="table mt-3 table-bordered">
                <thead>
                    <tr>
                        <th class="text-center p-3">
                            機關
                        </th>
                        <th class="text-center p-3">
                            通報資料
                        </th>
                        <th class="text-center p-3">
                            注意事定
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item, index) in items" :key="item.dpId">
                        <tr>
                            <td class="align-middle">
                                <div class="d-flex justify-content-center align-middle">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" :value="item" :id="item.dpId"
                                            v-model="checkedDps">
                                        <label class="form-check-label" :for="item.dpId">
                                            {{ item.dpName }}
                                        </label>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <template v-for="(item1, index2) in fields" :key="item1.fieldId">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" :value="item1"
                                            v-model="checkedItems" :id="item1.fieldId"
                                            :disabled="item1.fieldId === 'PERSON_ID' || item1.fieldId === 'PERSON_NAME'">
                                        <label class="form-check-label" :for="item1.fieldId">
                                            {{ item1.fieldName }}
                                        </label>
                                    </div>
                                </template>
                            </td>
                            <td>
                            </td>
                        </tr>
                    </template>
                </tbody>

            </table>
        </div>
        <div class="text-end">
            <button class="btn bg-primary text-white" type="button" style="width: 420px"
                :disabled="checkedDps.length <= 0 || checkedItems.length <= 0"
                @click="useMydata()">使用MyData進行戶籍資料異動跨機關通知服務</button>
        </div>
    </div>
</template>


<style scoped></style>