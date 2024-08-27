<script setup>

import { ref } from 'vue'
const items1 = ref([])
const items2 = ref([])
const highlightedRow = ref(new Set())
const highlightedRow2 = ref(new Set())
const modulesArray = ref([])
let tempArray = ref([])
let tempArray2 = ref([])

items1.value = [{ chinesename: '姓名', agency: '內政部', name: 'Name' },
{ chinesename: '國民身分證統一編號', agency: '內政部', name: 'ID' },
{ chinesename: '戶籍地址', agency: '內政部', name: 'Addr' }]

items2.value = []

modulesArray.value = [{
    name: 'module1', items1: [{ chinesename: '姓名', agency: '內政部', name: 'Name' },
    { chinesename: '國民身分證統一編號', agency: '內政部', name: 'ID' },
    { chinesename: '戶籍地址', agency: '內政部', name: 'Addr' }], items2: []
}, {
    name: 'module2', items1: [{ chinesename: '姓名', agency: '內政部', name: 'Name' },
    { chinesename: '國民身分證統一編號', agency: '內政部', name: 'ID' },
    { chinesename: '戶籍地址', agency: '內政部', name: 'Addr' }], items2: []
}, {
    name: 'module3', items1: [{ chinesename: '姓名', agency: '內政部', name: 'Name' },
    { chinesename: '國民身分證統一編號', agency: '內政部', name: 'ID' },
    { chinesename: '戶籍地址', agency: '內政部', name: 'Addr' }], items2: []
}]

function handleClick(rowIndex) {
    if (highlightedRow.value.has(rowIndex)) {
        highlightedRow.value.delete(rowIndex)
        tempArray.value.splice(rowIndex, 1)

    } else {
        console.log(items1.value[rowIndex].name);
        highlightedRow.value.add(rowIndex)

        const exist = tempArray.value.some(item => item.name == items1.value[rowIndex].name)
        console.log(exist);
        if (!exist) {
            tempArray.value.push(items1.value[rowIndex])
        }

    }

}

function handleClick2(rowIndex) {

    if (highlightedRow2.value.has(rowIndex)) {
        highlightedRow2.value.delete(rowIndex)

        tempArray.value.splice(rowIndex, 1)


    } else {
        console.log(items2.value[rowIndex].name);
        highlightedRow2.value.add(rowIndex)

        const exist = tempArray2.value.some(item => item.name == items2.value[rowIndex].name)
        if (!exist) {
            tempArray2.value.push(items2.value[rowIndex])
        }

    }

}



function isHighlighted2(rowIndex) {
    return highlightedRow2.value.has(rowIndex)

}

function isHighlighted(rowIndex) {
    return highlightedRow.value.has(rowIndex)
}

function toUsed() {
    items2.value.push(...tempArray.value)
    items1.value = items1.value.filter(item => !isInArray(item, tempArray));
    tempArray.value = []
    highlightedRow.value = new Set()
}

function removeUsed() {
    items1.value.push(...tempArray2.value)
    items2.value = items2.value.filter(item => !isInArray(item, tempArray2));
    tempArray2.value = []
    highlightedRow2.value = new Set()
}

function isInArray(item, array) {
    return array.value.some(element => JSON.stringify(element) === JSON.stringify(item));
}



</script>
<template>
    <div>
        <h1>常用模組設定</h1>
        <div class="card w-100 p-3 mt-3">
            <div class="card-body ">
                <div class="d-flex justify-content-between ">
                    <h4>常用欄位模組</h4> <button class="btn bg-primary text-white" @click="addModule()">新增模組</button>
                </div>
                <template v-for="(module, index) in modulesArray" :key="'module'+index">
                    <div class="card border-0   p-0 mt-4">
                        <div class="d-flex gap-3">
                            <div class="border  w-100" style="height: 16rem;">
                                <table class="table  table-borderless">
                                    <thead>
                                        <tr>
                                            <th>欄位中文名稱</th>
                                            <th>主責機關</th>
                                            <th>欄位名稱</th>
                                        </tr>
                                    </thead>
                                    <template v-for="(item, index) in items1" :key="index">
                                        <tr @click="handleClick(index)"
                                            :class="{ 'highlighted-row': isHighlighted(index) }">
                                            <td> {{ item.chinesename }}
                                            </td>
                                            <td>{{ item.agency }}</td>
                                            <td>{{ item.name }}</td>
                                        </tr>
                                    </template>

                                </table>
                            </div>
                            <div class="d-flex flex-column justify-content-center gap-3">
                                <button class="btn bg-primary text-white" style="width: 5rem; " @click="toUsed()"> <i
                                        class="bi bi-arrow-right"></i> </button>
                                <button class="btn bg-primary text-white" style="width: 5rem;" @click="removeUsed()"> <i
                                        class="bi bi-arrow-left"></i>
                                </button>
                            </div>
                            <div class="border  w-100">
                                <table class="table  table-borderless">
                                    <thead>
                                        <tr>
                                            <th>欄位中文名稱</th>
                                            <th>主責機關</th>
                                            <th>欄位名稱</th>
                                        </tr>
                                    </thead>
                                    <template v-for="(item, index) in items2" :key="index">
                                        <tr @click="handleClick2(index)"
                                            :class="{ 'highlighted-row': isHighlighted2(index) }">
                                            <td> {{
                                                item.chinesename }}
                                            </td>
                                            <td>{{ item.agency }}</td>
                                            <td>{{ item.name }}</td>
                                        </tr>
                                    </template>
                                </table>
                            </div>
                        </div>
                    </div>
                    <hr>
                </template>

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