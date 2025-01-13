<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import router from '../../router'
import axios from 'axios'
import { useStore } from '../../store';

const store = useStore()

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
const dpsNFieldsList = ref([])
const fields = ref([])
const url = ref('')

const checkedDps = ref([])
const checkedItems = ref([])
const profile = ref({})

function useMydata() {
    localStorage.setItem('dpsNFieldsList', JSON.stringify(dpsNFieldsList.value))
    router.push({ name: 'MyData' })
}

async function getDp() {

    url.value = `api/dp/notified`
    await axios.get(url.value).then((res) => {
        console.log(res);
        items.value = res.data.result.map(v => {
            return {
                ...v,
                ...checkedDps.value
            }
        })
        console.log(items.value);
        getField()
    })
}

async function getField() {
    if (localStorage.getItem('dps')) {

        const dps = localStorage.getItem('dps')

        const url = `/${dps}/api/persons/fields`
        await axios.get(url).then((res) => {
            fields.value = res.data.result

            dpsNFieldsList.value = items.value.map(item => {
                return { ...item, fields: [...fields.value], checkedFields: checkedItems.value }
            })
        })
    }

}


const isChecked = computed(() => {
    return dpsNFieldsList.value.every(item => item.checkedFields.length <= 0 || !item.checkedDps)
})


onMounted(() => {
    getDp()
    getProfile()

})

async function getProfile() {
    if (localStorage.getItem('dps')) {
        const dps = localStorage.getItem('dps')
        const url = `/${dps}/api/profile/`
        await axios.get(url).then((res) => {
            console.log(res);
            profile.value = res.data.result
        })
    }
}


function handleCheckBox(item) {
    if (item.checkedDps) {
        item.checkedFields = ['PERSON_NAME', 'HOUSE_ADDR']
    } else {
        item.checkedFields = []
    }
}


function filterName(name) {
    if (name == '姓名') {
        if (store.dp == 'dp1') {
            return name
        } else {
            return '公司名稱'
        }
    } else {
        if (store.dp == 'dp1') {
            return name
        } else {
            return '公司所在地'
        }
    }

}

</script>

<template>
    <div class="container">
        <h2 class="text-center">受通報機關</h2>
        <div>

            <table class="table mt-3 table-bordered">
                <thead>
                    <tr>
                        <th class=" p-3  ">
                            機關
                        </th>
                        <th class="  p-3">
                            通報資料
                        </th>
                        <th class="text-center p-3">
                            注意事項
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item, index) in dpsNFieldsList" :key="item.dpId">
                        <tr v-show="item.dpId !== profile.dpId">
                            <td class="align-middle p-3">
                                <div class="d-flex  align-middle">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" :value="item" :id="item.dpId"
                                            @change="handleCheckBox(item)" v-model="item.checkedDps">
                                        <label class="form-check-label" :for="item.dpId">
                                            {{ item.dpName }}
                                        </label>
                                    </div>
                                </div>
                            </td>
                            <td class="p-3">

                                <template v-for="(item1, index2) in item.fields" :key="item1.fieldId + index">
                                    <div class="form-check"
                                        v-show="item1.fieldId == 'PERSON_NAME' || item1.fieldId == 'HOUSE_ADDR'">
                                        <input class="form-check-input" type="checkbox" :value="item1.fieldId"
                                            v-model="item.checkedFields" :id="item1.fieldId + index"
                                            :disabled="!item.checkedDps">
                                        <label class="form-check-label" :for="item1.fieldId + index">
                                            {{ filterName(item1.fieldName) }}
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
            <button :disabled="isChecked" class="btn bg-primary text-white" type="button" style="width: 420px"
                @click="useMydata()">使用MyData進行戶籍資料異動跨機關通知服務</button>
        </div>
    </div>
</template>


<style scoped></style>