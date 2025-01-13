<script setup>

import { ref, onMounted } from 'vue'
import axios from 'axios'
import toast from '../components/Toast.vue'
import { useStore } from '../../store'

const items1 = ref([])
const items2 = ref([])
const modulesArray = ref([])
const themeSelect = ref('')
const themes = ref([])
const tempArr = ref([])
const highlightedRows = ref([]);
const highlightedRows2 = ref([]);
const toMoveArr = ref([])
const toMoveArr2 = ref([])

const store = useStore()

function handleClick(index, item) {

    const rowIndex = highlightedRows2.value.indexOf(index);
    if (rowIndex === -1) {
        highlightedRows2.value.push(index);
        toMoveArr.value.push(item.fieldId)
    } else {
        highlightedRows2.value.splice(rowIndex, 1);
        toMoveArr.value.splice(item.fieldId, 1)
    }



}

function handleClick2(index, item) {
    const rowIndex = highlightedRows.value.indexOf(index);
    if (rowIndex === -1) {
        highlightedRows.value.push(index);
        toMoveArr2.value.push(item)
    } else {
        highlightedRows.value.splice(rowIndex, 1);
        toMoveArr2.value.splice(item, 1)
    }
}



function isHighlighted(index) {
    return highlightedRows.value.includes(index);

}

function isHighlighted2(index) {
    return highlightedRows2.value.includes(index);

}


function toUsed() {
    items2.value.fields.push(...toMoveArr.value)
    items1.value = items1.value.filter(item => !isInArray(item, toMoveArr.value));
    highlightedRows2.value = []
}

function removeUsed() {
    items1.value.push(...toMoveArr2.value)
    items2.value.fields = items2.value.fields.filter(item => !toMoveArr2.value.some(element => element == item));
    highlightedRows.value = []

}


function removeUsedAll() {
    items2.value.fields = []

    highlightedRows.value = []
}

function toUsedAll() {
    toMoveArr.value = shownFields(items1.value).map(item => item.fieldId)
    items2.value.fields.push(...toMoveArr.value)
    items1.value = items1.value.filter(item => !isInArray(item, toMoveArr.value));
    toMoveArr.value = []
    highlightedRows2.value = []
}




function isInArray(item, array) {
    return array.some(element => JSON.stringify(element) === JSON.stringify(item));
}




onMounted(() => {

    getFields()
    getServices()
})




async function getServices() {
    const url = `/api/services`
    await axios.get(url).then(res => {
        themes.value = res.data.result
         themeSelect.value = themes.value[0].serviceId
        getChoosenServices(themeSelect.value)
    }).catch(err => {
        console.log(err);
    })
}
async function getFields() {
    const url = `/api/fields`
    await axios.get(url).then(res => {
        console.log(res);
        items1.value = res.data.result
    }).catch(err => {
        console.log(err);
    })
}

async function getChoosenServices(serviceId) {
    const url = `/api/services/${serviceId}`
    await axios.get(url).then(res => {
        console.log(res);

        items2.value = res.data.result
        shownFields(items1.value)

    }).catch(err => {
        console.log(err);
    })
}


function shownFields(arr) {
    const val = arr.filter(item => items2.value.fields ? !items2.value.fields.includes(item.fieldId) : '').filter(item => item.fieldId);

    return val
}

function fieldName(id) {
    const match = items1.value.filter(item => item.fieldId == id)
    if (match && match.length !== 0) {
        return match[0].fieldName
    } else {
        return '-'
    }
}

async function save() {

    const url = `/api/services/${themeSelect.value}`
    const requestBody = items2.value
    console.log(requestBody);
    await axios.put(url, requestBody).then(res => {
        console.log(res);
        store.setText('資料更新成功')
        store.setColor('bg-success')
        store.toast.hide()
        setTimeout(() => {
            store.toast.show();
        }, 0);

    }).catch(err => {
        console.log(err);
        store.setText('失敗!')
        store.setColor('bg-danger')
        store.toast.hide()
        setTimeout(() => {
            store.toast.show();
        }, 0);
    })
}

</script>
<template>
    <div>
        <h1>常用模組設定</h1>
        <div class="card w-100 p-3 mt-3">
            <div class="card-body ">
                <div class="d-flex justify-content-between ">
                    <h4>常用欄位模組</h4>
                </div>
                <hr>
                <div class="pb-3" style="width: 16rem;">
                    <label for="themeService">主題服務</label>
                    <select class="form-select form-select mt-1" aria-label="Small select example" id="themeService"
                        v-model="themeSelect">
                        <template v-for="(item, index) in themes">
                            <option :value="item.serviceId">
                                {{ item.serviceName }}
                            </option>
                        </template>

                    </select>
                </div>
                <div class="d-flex gap-3 shadow-sm flex-wrap">
                    <div class="card   border-0  flex-fill" style="min-width: 300px;">
                        <h5 class="fw-bolder card-title text-center pb-4">可供選擇欄位</h5>
                        <div class="border " style="min-height: 16rem;">

                            <table class="table  table-borderless">
                                <thead>
                                    <tr>
                                        <th>欄位中文名稱</th>
                                        <th>主責機關</th>
                                        <th>欄位名稱</th>
                                    </tr>
                                </thead>
                                <template v-for="(item, index) in shownFields(items1)" :key="index">
                                    <tr @click="handleClick(index, item)"
                                        :class="{ 'highlighted-row': isHighlighted2(index) }">
                                        <td> {{ item.fieldName }}
                                        </td>
                                        <td>{{ item.agency }}</td>
                                        <td>{{ item.fieldId }}</td>
                                    </tr>
                                </template>

                            </table>
                        </div>
                    </div>

                    <div class="d-flex flex-column justify-content-center align-items-center gap-3 mt-5"
                        style="min-width: 100px;">
                        <button class="btn bg-primary text-white" style="width: 5rem; " @click="toUsedAll()"
                            :disabled="shownFields(items1).length <= 0"> <i class="bi bi-chevron-double-right"></i>
                        </button>
                        <button class="btn bg-primary text-white" style="width: 5rem; " @click="toUsed()"
                            :disabled="highlightedRows2.length <= 0">
                            <i class="bi bi-arrow-right"></i> </button>
                        <button class="btn bg-primary text-white" style="width: 5rem;" @click="removeUsed()"
                            :disabled="highlightedRows.length <= 0"> <i class="bi bi-arrow-left"></i>
                        </button>
                        <button class="btn bg-primary text-white" style="width: 5rem; " @click="removeUsedAll()"
                            :disabled="items2.fields <= 0">
                            <i class="bi bi-chevron-double-left"></i> </button>
                    </div>
                    <div class="card border-0 flex-fill " style="min-width: 300px;">
                        <h5 class="fw-bolder card-title text-center pb-4">已選擇欄位</h5>
                        <div class="border" style="min-height: 16rem;">
                            <table class="table  table-borderless">
                                <thead>
                                    <tr>
                                        <th>欄位中文名稱</th>
                                        <th>主責機關</th>
                                        <th>欄位名稱</th>
                                    </tr>
                                </thead>
                                <tr v-for="(item, index) in  items2.fields" :key="index" @click="handleClick2(index, item)"
                                    :class="{ 'highlighted-row': isHighlighted(index) }">

                                    <td>
                                        {{ fieldName(item) }}
                                    </td>
                                    <td>{{ item.agency }}</td>
                                    <td>{{ item }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-end">
                <button type="button" class="btn bg-primary text-white" @click="save">儲存</button>
            </div>
        </div>

    </div>
</template>
<style   scoped>
.highlighted-row {
    background-color: #d8d8d8 !important;
    /* Light gray background */

}


tr {
    cursor: pointer;
}

td {
    padding: 9px;
}

.highlighted-row {
    background-color: #201717;
    /* Light gray background */
}
</style>