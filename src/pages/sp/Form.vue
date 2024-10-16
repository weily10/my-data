<script setup>
import router from '../../router'
import { useRoute } from 'vue-router';
import { ref, onMounted, watch, computed } from 'vue'


const disabilityCategory = ref([])
const disabilityLevel = ref([])
const sameAddrChk = ref(false)
const cities = ref([])
const userData = ref({

})
const route = useRoute()

onMounted(() => {

    init()

    disabilityCategory.value = [{ value: "第1類", text: "第1類" },
    { value: "第2類", text: "第2類" },
    { value: "第3類~ 第8類", text: "第3類~ 第8類" },
    { value: "8", text: "共8類" }]

    disabilityLevel.value = [{ value: "輕度", text: "輕度" },
    { value: "中度", text: "中度" },
    { value: "severe", text: "重度" },
    { value: "extreme", text: "極重度 4 級" }]

    cities.value = [{
        value: '台北', text: '台北'
    }]


    if (route.query.filled) {
        userData.value = JSON.parse(sessionStorage.getItem("customerData"))
    }
    console.log(sessionStorage.getItem("customerData"));
    // if (sessionStorage.getItem("customerData")) {
    //     userData.value = sessionStorage.getItem("customerData")
    // }


})

function init() {
    userData.value.sex = 'male'
    userData.value.cities = '台北'
    userData.value.disabilityCategory = '第1類'
    userData.value.disabilityLevel = '中度'
}

watch(sameAddrChk, (newValue) => {
    console.log(userData.value);
    if (newValue) {
        userData.value.corrAddr = userData.value.cities + ' ' + (userData.value.homeAddress ? userData.value.homeAddress : '')
    }
})


function spFormSend() {
    console.log(userData.value);
}

function toMydata() {
    router.push({ name: 'SPMyData' })
}

function clearForm() {
    userData.value.chineseName = ''
    userData.value.nationalid = ''
     userData.value.homeAddress = ''
    userData.value.corrAddr = ''
    userData.value.phone = ''
    sameAddrChk.value = false
}

const validateForm = computed(()=>{
    return  userData.value.chineseName && 
    userData.value.nationalid && 
    userData.value.homeAddress &&  
    userData.value.phone ? false : true
})

 
</script>

<template>
    <div class="container">
        <form action="" @submit.prevent="checkform" method="submit" name="form1">
            <h1 class="text-center">身心障礙停車識別證申請</h1>
            <div class="border mt-3">
                <div class="title-wrapper p-3 d-flex justify-content-between align-items-center">
                    <h5 class="mb-1">申請人/代理人基本資料</h5>
                    <div class="d-flex justify-content-end">
                        <button :disabled="route.query.filled" class="btn-success  text-white me-auto" type="submit"
                            @click="toMydata()">使用MyData取得常用欄位資訊</button>
                    </div>
                </div>
                <div class="p-4 bg-white">
                    <div class="mb-3 inputcontainer flex-fill">
                        <label for="chineseName" class="form-label"><span class="text-danger pe-1">*</span>中文名稱</label>
                        <input :disabled="route.query.filled" type="email" class="form-control" id="chineseName"
                            placeholder="中文名稱" v-model="userData.chineseName" >
                    </div>
                    <div class="d-flex gap-5 flex-wrap ">
                        <div class="mb-3 inputcontainer  ">
                            <div class="mb-3  flex-fill">
                                <label for="nationalid" class="form-label"><span
                                        class="text-danger pe-1">*</span>身分證字號</label>
                                <input type="email" class="form-control" id="nationalid" placeholder="如:S131349423"
                                    v-model="userData.nationalid" :disabled="route.query.filled">
                            </div>
                        </div>
                        <div class="mb-3 ">
                            <label for="exampleFormControlInput1" class="form-label"> 性別</label>
                            <div class="d-flex gap-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="male"
                                        value="male" v-model="userData.sex" :disabled="route.query.filled">
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        男 (Male)
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="female"
                                        value="female" v-model="userData.sex" :disabled="route.query.filled">
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        女 (Female)
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3  d-flex gap-3 align-items-end">
                        <div class="w-50">
                            <label class="form-label"><span class="text-danger pe-1">*</span>身心障礙類別</label>
                            <select class="form-select" aria-label="Default select example" :disabled="route.query.filled"
                                v-model="userData.disabilityCategory">
                                <template v-for="(item, index) in disabilityCategory" :key="'index'+index">
                                    <option :value="item.value">{{ item.text }}</option>
                                </template>
                            </select>
                        </div>
                        <div class="w-25 flex-fill">
                            <label class="form-label"><span class="text-danger pe-1">*</span>身心障礙等級</label>
                            <select class="form-select" aria-label="Default select example" :disabled="route.query.filled"
                                v-model="userData.disabilityLevel">
                                <template v-for="(item, index) in disabilityLevel" :key="'index'+index">
                                    <option :value="item.value">{{ item.text }}</option>
                                </template>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3  d-flex gap-3 align-items-end">
                        <div class="w-50">
                            <label class="form-label"><span class="text-danger pe-1">*</span>戶籍地址</label>
                            <select class="form-select" aria-label="Default select example" :disabled="route.query.filled"
                                v-model="userData.cities">
                                <template v-for="(item, index) in cities" :key="'cities'+index">
                                    <option :value="item.value">{{ item.text }}</option>
                                </template>


                            </select>
                        </div>
                        <div class="w-25 flex-fill">
                            <input type=" " class="form-control" id=" " placeholder="地址" v-model="userData.homeAddress"
                                :disabled="route.query.filled">
                        </div>
                    </div>
                    <div class="  flex-fill">
                        <label for="chineseName" class="form-label"> 通訊地址</label>
                        <input type="email" class="form-control" id=" " placeholder="" v-model="userData.corrAddr"
                            :disabled="sameAddrChk || route.query.filled">
                    </div>

                    <div class="form-check mt-2">
                        <input class="form-check-input" type="checkbox" id="sameAddr" v-model="sameAddrChk"
                            :disabled="route.query.filled">
                        <label class="form-check-label" for="sameAddr">
                            同戶籍地址 Same as above address
                        </label>
                    </div>
                    <div class="mb-3  flex-fill mt-3">
                        <label for="chineseName" class="form-label"><span class="text-danger pe-1">*</span>連絡電話</label>
                        <input class="form-control" placeholder="如:09-0212-9912" :disabled="route.query.filled"
                            v-model="userData.phone">
                    </div>
                </div>
            </div>
            <div class="mt-3 d-flex justify-content-end text-end d-flex gap-3">

                <button class="btn-outline" type="button" @click="clearForm" :disabled="route.query.filled">重填</button>
                <button class="btn-success  text-white" type="submit" @click="spFormSend()" :disabled="validateForm">送出申請</button>
            </div>
        </form>
    </div>
</template>


<style scoped>
.btn-outline {
    border: solid 0.8px #F96F6F;
    background-color: white;
    color: #F96F6F;
}

.btn-outline:hover {
    background-color: #F96F6F;
    color: white;
    transition: 0.2s;
}

.btn-outline:disabled {
    background-color: #e9ecef;
    color: rgb(153, 153, 153) !important;
    cursor: context-menu;
    border: none
}

.btn-success {
    background-color: #F96F6F;
}

.btn-success:hover {
    background-color: #da6363;
    transition: 0.2s;
}

.btn-success:disabled {
    background-color: #e9ecef;
    color: rgb(153, 153, 153) !important;
    cursor: context-menu
}

.inputcontainer {
    width: 50%;
    min-width: 200px;
}

.title-wrapper {

    background-color: #FFE0CF;
    color: #161616;
}


.form-check-input:checked {
    background-color: #da6363;
    border-color: #c05959
}
</style>