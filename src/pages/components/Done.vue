<script setup>
import router from '../../router'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useStore } from '../../store';



const fields = ref([])
const props = defineProps({
    dpsNFieldsList: Array,
})

const store = useStore()
const route = useRoute()
const dpsNFieldsList = ref(JSON.parse(localStorage.getItem('dpsNFieldsList')))

function gotoNextPage() {
    router.push({ name: 'Authentication' })
}


function agreeProvide() {

}

function disagreeProvide() {

}




async function getField() {
    const serviceId = 1
    const url = `api/services/${serviceId}`

    await axios.get(url).then(res => {

        fields.value = res.data.result
    })

}


onMounted(() => {
    getField()
})


function formatFieldName(name, item) {
    console.log(store);
    if (store.dp === 'dp4') {
        if (name == '姓名') {
            return '公司名稱'
        } else {
            return '公司所在地'
        }
    } else {
        if (item.dpId === 'dp3') {
            if (name == '姓名') {
                return name + '(用電戶名)'
            } else {
                return name
            }
        }

        if (item.dpId === 'dp2') {
            if (name == '姓名') {
                return name + '(用水戶名，非過戶)'
            } else {
                return name
            }
        }
    }



}


onMounted(() => {

    console.log(dpsNFieldsList.value);
})



</script>

<template>
    <div class="w-100" v-if="route.name == 'MyData'">

        <h2 class="text-center">跨機關異動通知服務申請</h2>
        <div class="w-100 bg-white mt-4 p-4 ">
            <div class="d-flex gap-3  flex-column">
                <div>已驗證您的身分，所需資料如下：</div>
                <div>
                    <ol>
                        <template v-for="(item, index) in dpsNFieldsList" :key="index">
                            <div v-show="item.checkedDps">
                                <li> {{ item.checkedDps ? item.dpName : '' }}</li>
                                <div class="pb-3 pt-2 text-danger">
                                    通知
                                    <template v-for="(item1, index1) in item.checkedFields" :key="index1">

                                        <span v-for="(item2, index2) in item.fields" :key="index2">
                                            {{ item1 === item2.fieldId ? formatFieldName(item2.fieldName, item) : '' }}
                                        </span>
                                        <span v-show="index1 !== item.checkedFields.length - 1">、</span>
                                    </template>
                                    變更
                                </div>
                            </div>
                        </template>
                    </ol>
                </div>
                <div>
                    <hr>

                    您已完成身分驗證 , 是否同意將上述資料傳給 「<span v-for="(item, index) in dpsNFieldsList.filter(item => item.checkedDps)"
                        :key="index" v-show="item.checkedDps">{{ item.checkedDps ? item.dpName : null }}
                        <span v-show="dpsNFieldsList.filter(item => item.checkedDps).length !== index + 1">,</span>
                    </span>」。
                </div>
            </div>
        </div>
    </div>
    <div class="w-100" v-else>

        <h2 class="text-center">身心障礙停車識別證申請</h2>
        <div class="w-100 bg-white mt-4 p-4 ">
            <div class="d-flex gap-3  flex-column">
                <div>已驗證您的身分，所需資料如下：</div>
                1. 常用欄位資訊
                <div class="text-danger">

                    <span v-for="(item, index) in fields.fieldDescs" :key="'index' + index">
                        {{ item }}<span v-show="fields.fieldDescs.length !== index + 1">、</span>
                    </span>
                </div>
                <div>
                    <hr>
                    您已完成身分驗證 , 是否同意將上述資料傳給 「新竹市-身心障礙停車識別證申請服務」。

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.step-bar .circle {
    background-color: #ffd154;
    height: 40px;
    width: 40px;
}

.circle2 {
    border-radius: 100%;
    background-color: #ffd154;
    height: 20px;
    width: 20px;

}

.step-bar .done {
    border: solid #ffd154;
    color: #ffd154;
    background-color: #ffffff;
    height: 40px;
    width: 40px;
}

.btn-outline {
    border: solid 1px #ffd154;

}

.btn-outline:hover {
    background-color: #ffd154 !important;
}
</style>