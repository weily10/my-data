<script setup>

import { ref, onMounted } from 'vue'
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
}]

function handleClick(rowIndex, moduleIndex) {
    console.log(modulesArray.value[moduleIndex].highlightedRow.has(rowIndex));
    if (modulesArray.value[moduleIndex].highlightedRow.has(rowIndex)) {
        modulesArray.value[moduleIndex].highlightedRow.delete(rowIndex)
        modulesArray.value[moduleIndex].tempArray.splice(rowIndex, 1)

    } else {
        modulesArray.value[moduleIndex].highlightedRow.add(rowIndex)

        const exist = modulesArray.value[moduleIndex].tempArray.some(item => item.name == modulesArray.value[moduleIndex].items1[rowIndex].name)
        if (!exist) {
            modulesArray.value[moduleIndex].tempArray.push(modulesArray.value[moduleIndex].items1[rowIndex])
        }

    }

}

function handleClick2(rowIndex, moduleIndex) {
    if (modulesArray.value[moduleIndex].highlightedRow2.has(rowIndex)) {
        modulesArray.value[moduleIndex].highlightedRow2.delete(rowIndex)
        modulesArray.value[moduleIndex].tempArray.splice(rowIndex, 1)

    } else {
        modulesArray.value[moduleIndex].highlightedRow2.add(rowIndex)
        const exist = modulesArray.value[moduleIndex].tempArray2.some(item => item.name == modulesArray.value[moduleIndex].items2[rowIndex].name)
        if (!exist) {
            modulesArray.value[moduleIndex].tempArray2.push(modulesArray.value[moduleIndex].items2[rowIndex])
        }

    }

}



function isHighlighted2(rowIndex, moduleIndex) {
    return modulesArray.value[moduleIndex].highlightedRow2.has(rowIndex)

}

function isHighlighted(rowIndex, moduleIndex) {
    if (modulesArray.value[moduleIndex].highlightedRow) {
        return modulesArray.value[moduleIndex].highlightedRow.has(rowIndex)
    }

}

function toUsed(moduleIndex) {
    modulesArray.value[moduleIndex].items2.push(...modulesArray.value[moduleIndex].tempArray)
    modulesArray.value[moduleIndex].items1 = modulesArray.value[moduleIndex].items1.filter(item => !isInArray(item, modulesArray.value[moduleIndex].tempArray));
    modulesArray.value[moduleIndex].tempArray = []
    modulesArray.value[moduleIndex].highlightedRow = new Set()
}

function toUsedAll(moduleIndex) {
    console.log(...modulesArray.value[moduleIndex].items1);
    modulesArray.value[moduleIndex].items2.push(...modulesArray.value[moduleIndex].items1)
    modulesArray.value[moduleIndex].items1 = []
    modulesArray.value[moduleIndex].tempArray = []
    modulesArray.value[moduleIndex].highlightedRow = new Set()
}

function removeUsed(moduleIndex) {
    modulesArray.value[moduleIndex].items1.push(...modulesArray.value[moduleIndex].tempArray2)
    modulesArray.value[moduleIndex].items2 = modulesArray.value[moduleIndex].items2.filter(item => !isInArray(item, modulesArray.value[moduleIndex].tempArray2));
    modulesArray.value[moduleIndex].tempArray2 = []
    modulesArray.value[moduleIndex].highlightedRow2 = new Set()
}

function removeUsedAll(moduleIndex) {
    modulesArray.value[moduleIndex].items1.push(...modulesArray.value[moduleIndex].items2)
    modulesArray.value[moduleIndex].items2 = []
    modulesArray.value[moduleIndex].tempArray2 = []
    modulesArray.value[moduleIndex].highlightedRow2 = new Set()
}

function isInArray(item, array) {
    return array.some(element => JSON.stringify(element) === JSON.stringify(item));
}


function addModule() {
    modulesArray.value.push(
        {
            name: 'module1', items1: [{ chinesename: '姓名', agency: '內政部', name: 'Name' },
            { chinesename: '國民身分證統一編號', agency: '內政部', name: 'ID' },
            { chinesename: '戶籍地址', agency: '內政部', name: 'Addr' }], items2: []
        }
    )
    modulesArray.value.map(o => o.highlightedRow = new Set())
    modulesArray.value.map(o => o.highlightedRow2 = new Set())
    modulesArray.value.map(o => o.tempArray = [])
    modulesArray.value.map(o => o.tempArray2 = [])
}

onMounted(() => {
    modulesArray.value.map(o => o.highlightedRow = new Set())
    modulesArray.value.map(o => o.highlightedRow2 = new Set())
    modulesArray.value.map(o => o.tempArray = [])
    modulesArray.value.map(o => o.tempArray2 = [])
    console.log(modulesArray);
})



</script>
<template>
    <div>
        <h1>常用模組設定</h1>
        <div class="card w-100 p-3 mt-3">
            <div class="card-body ">
                <div class="d-flex justify-content-between ">
                    <h4>常用欄位模組</h4> <button class="btn bg-primary text-white" @click="addModule()">新增模組</button>
                </div>
                <template v-for="(moduleItem, moduleIndex) in modulesArray" :key="'module'+moduleIndex">
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
                                    <template v-for="(item, index) in moduleItem.items1" :key="index">
                                        <tr @click="handleClick(index, moduleIndex)"
                                            :class="{ 'highlighted-row': isHighlighted(index, moduleIndex) }">
                                            <td> {{ item.chinesename }}
                                            </td>
                                            <td>{{ item.agency }}</td>
                                            <td>{{ item.name }}</td>
                                        </tr>
                                    </template>

                                </table>
                            </div>
                            <div class="d-flex flex-column justify-content-center gap-3">
                                <button class="btn bg-primary text-white" style="width: 5rem; "
                                    @click="toUsedAll(moduleIndex)"> <i class="bi bi-chevron-double-right"></i> </button>
                                <button class="btn bg-primary text-white" style="width: 5rem; "
                                    @click="toUsed(moduleIndex)"> <i class="bi bi-arrow-right"></i> </button>
                                <button class="btn bg-primary text-white" style="width: 5rem;"
                                    @click="removeUsed(moduleIndex)"> <i class="bi bi-arrow-left"></i>
                                </button>
                                <button class="btn bg-primary text-white" style="width: 5rem; "
                                    @click="removeUsedAll(moduleIndex)"> <i class="bi bi-chevron-double-left"></i> </button>
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
                                    <template v-for="(item, index) in moduleItem.items2" :key="index">
                                        <tr @click="handleClick2(index, moduleIndex)"
                                            :class="{ 'highlighted-row': isHighlighted2(index, moduleIndex) }">
                                            <td>
                                                {{ item.chinesename }}
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