<script setup>
import router from '../../router'
import { useRoute } from 'vue-router';
import { ref, onMounted, watch, computed } from 'vue'
import axios from 'axios';


const disabilityCategory = ref([])
const disabilityLevel = ref([])
const sameAddrChk = ref(false)
const cities = ref([])
const userData = ref({

})
const array1 = ref({})
const disability = ref({})
const person = ref({})
const route = useRoute()
const city = ref('')
const hasInteracted = ref({
    personName: false,
    personId: false,
    houseAddr: false,
    phoneNumber: false,
    disabilityCategory: false,
    city: false,
    gender: false
});

onMounted(() => {


    disabilityCategory.value = [{ value: "第一類", text: "第一類" },
    { value: "第二類", text: "第二類" },
    { value: "第三類", text: "第三類" },
    { value: "第四類", text: "第四類" },
    { value: "第五類", text: "第五類" },
    { value: "第六類", text: "第六類" }]

    disabilityLevel.value = [{ value: "輕度", text: "輕度" },
    { value: "中度", text: "中度" },
    { value: "重度", text: "重度" },
    { value: "極重度", text: "極重度" }]

    cities.value = [{
        value: '台北', text: '台北'
    }, {
        value: '新北市', text: '新北市'
    }, {
        value: '桃園市', text: '桃園市'
    }, {
        value: '臺中市', text: '臺中市'
    }, {
        value: '臺南市', text: '臺南市'
    }, {
        value: '高雄市', text: '高雄市'
    }, {
        value: '基隆市', text: '基隆市'
    }, {
        value: '新竹市', text: '新竹市'
    }, {
        value: '嘉義市', text: '嘉義市'
    }]


    if (route.query.filled) {

        userData.value = JSON.parse(sessionStorage.getItem("customerData"))
        person.value = userData.value.person
        disability.value = userData.value.disability
        city.value = extractCities(person.value.houseAddr)
        console.log(userData.value);

    }

    checkInputs()

})

function extractCities(city) {

    return city.split("市")[0] + "市"
}

function checkInputs() {
    person.value.gender ? hasInteracted.value['gender'] = true : hasInteracted.value['gender'] = false
    city.value ? hasInteracted.value['city'] = true : hasInteracted.value['city'] = false
    person.value.personName ? hasInteracted.value['personName'] = true : hasInteracted.value['personName'] = false
    person.value.personId ? hasInteracted.value['personId'] = true : hasInteracted.value['personId'] = false
    person.value.houseAddr ? hasInteracted.value['houseAddr'] = true : hasInteracted.value['houseAddr'] = false
    person.value.phoneNumber ? hasInteracted.value['phoneNumber'] = true : hasInteracted.value['phoneNumber'] = false
    disability.value.disabilityCategory ? hasInteracted.value['disabilityCategory'] = true : hasInteracted.value['disabilityCategory'] = false
    disability.value.disabilityLevel ? hasInteracted.value['disabilityLevel'] = true : hasInteracted.value['disabilityLevel'] = false
}





function spFormSend() {

    router.push({ name: 'ChoosePOC' })
}

function toMydata() {
    router.push({ name: 'Application' })
}

function clearForm() {
    person.value.personName = ''
    person.value.personId = ''
    person.value.houseAddr = ''
    person.value.phoneNumber = ''
    disability.value.disabilityCategory = ''
    disability.value.disabilityLevel = ''
    city.value = ''
    sameAddrChk.value = false
    router.push({ name: 'SPForm' })
}

const validateForm = computed(() => {
    return person.value.personName &&
        person.value.personId &&
        person.value.houseAddr &&
        person.value.gender &&
        person.value.phoneNumber ? false : true
})


</script>

<template>
    <div class="container">
        <img src="https://static.wixstatic.com/media/d6fdd8_363d56d3dd104680a6e5655b6db73ebb~mv2.png/v1/fill/w_206,h_82,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d6fdd8_363d56d3dd104680a6e5655b6db73ebb~mv2.png"
            alt="" srcset="">
        <form action="" @submit.prevent="checkform" method="submit" name="form1">
            <h1 class="text-center">身心障礙停車識別證申請</h1>
            <div class="border mt-3">
                <div class="title-wrapper p-3 d-flex justify-content-between align-items-center">
                    <h5 class="mb-1">申請人/代理人基本資料</h5>
                    <div class="d-flex justify-content-end">
                        <button :disabled="route.query.filled" class="btn btn-custom bg-yellow" style="width: 16rem;"
                            type="submit" @click="toMydata()">使用MyData取得常用欄位資訊</button>

                    </div>
                </div>
                <div class="p-4 bg-white">
                    <div class="mb-3 inputcontainer flex-fill">
                        <label for="chineseName" class="form-label"><span class="text-danger pe-1">*</span>中文名稱</label>
                        <input :disabled="route.query.filled && hasInteracted['personName']" class="form-control"
                            id="chineseName" placeholder="中文名稱" v-model="person.personName"
                            @input="hasInteracted['personName'] = false">
                    </div>
                    <div class="d-flex gap-5 flex-wrap ">
                        <div class="mb-3 inputcontainer  ">
                            <div class="mb-3  flex-fill">
                                <label for="nationalid" class="form-label"><span
                                        class="text-danger pe-1">*</span>身分證字號</label>
                                <input type="email" class="form-control" id="nationalid" placeholder="如:S131349423"
                                    v-model="person.personId" :disabled="route.query.filled && hasInteracted['personId']"
                                    @input="hasInteracted['personId'] = false">
                            </div>
                        </div>
                        <div class="mb-3 ">
                            <label for="exampleFormControlInput1" class="form-label"> 性別</label>
                            <div class="d-flex gap-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="male" value="M"
                                        v-model="person.gender" :disabled="route.query.filled && hasInteracted['gender']"
                                        @change="hasInteracted['gender'] = false">
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        男 (Male)
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="female"
                                        value="F" v-model="person.gender"
                                        :disabled="route.query.filled && hasInteracted['gender']"
                                        @change="hasInteracted['gender'] = false">
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
                            <select class="form-select" aria-label="Default select example"
                                :disabled="route.query.filled && hasInteracted['disabilityCategory']"
                                v-model="disability.disabilityCategory"
                                @change="hasInteracted['disabilityCategory'] = false">
                                <template v-for="(item, index) in disabilityCategory" :key="'index'+index">
                                    <option :value="item.value">{{ item.text }}</option>
                                </template>
                            </select>
                        </div>
                        <div class="w-25 flex-fill">
                            <label class="form-label"><span class="text-danger pe-1">*</span>身心障礙等級</label>
                            <select class="form-select" aria-label="Default select example"
                                :disabled="route.query.filled && hasInteracted['disabilityLevel']"
                                v-model="disability.disabilityLevel" @change="hasInteracted['disabilityLevel'] = false">
                                <template v-for="(item, index) in disabilityLevel" :key="'index'+index">
                                    <option :value="item.value">{{ item.text }}</option>
                                </template>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3  d-flex gap-3 align-items-end">
                        <div class="w-50">
                            <label class="form-label"><span class="text-danger pe-1">*</span>戶籍地址</label>
                            <select class="form-select" aria-label="Default select example"
                                :disabled="route.query.filled && hasInteracted['city']" v-model="city"
                                @change="hasInteracted['city'] = false">

                                <template v-for="(item, index) in cities" :key="'cities'+index">
                                    <option :value="item.value">{{ item.text }}</option>
                                </template>


                            </select>
                        </div>
                        <div class="w-25 flex-fill">
                            <input type=" " class="form-control" id=" " placeholder="地址" v-model="person.houseAddr"
                                :disabled="route.query.filled && hasInteracted['houseAddr']"
                                @input="hasInteracted['houseAddr'] = false">
                        </div>
                    </div>
                    <div class="  flex-fill">
                        <label for="chineseName" class="form-label"> 通訊地址</label>
                        <input type="email" class="form-control" id=" " placeholder="" v-model="person.contactAddr"
                            :disabled="sameAddrChk">
                    </div>

                    <div class="form-check mt-2">
                        <input class="form-check-input" type="checkbox" id="sameAddr" v-model="sameAddrChk"
                            @change="sameAddrChk ? person.contactAddr = person.houseAddr : person.contactAddr = ''">
                        <label class="form-check-label" for="sameAddr">
                            同戶籍地址 Same as above address
                        </label>
                    </div>
                    <div class="mb-3  flex-fill mt-3">
                        <label for="chineseName" class="form-label"><span class="text-danger pe-1">*</span>連絡電話</label>
                        <input class="form-control" placeholder="如:09-0212-9912" v-model="person.phoneNumber"
                            @input="hasInteracted['phoneNumber'] = false">
                    </div>
                </div>
            </div>
            <div class="mt-3 d-flex justify-content-end text-end d-flex gap-3">

                <button class="btn-outline" type="button" @click="clearForm">重填</button>
                <button class="btn btn-custom bg-yellow" type="submit" @click="spFormSend()"
                    :disabled="validateForm">送出申請</button>


            </div>
        </form>
    </div>
</template>


<style scoped>
.btn-outline {
    border: solid 0.8px #d39b00;
    background-color: white;
    color: #d89e00;
}

.btn-outline:hover {
    background-color: #c9a440;
    color: white;
    transition: 0.2s;
}

.btn-outline:disabled {
    background-color: #e9ecef;
    color: rgb(153, 153, 153) !important;
    cursor: context-menu;
    border: none
}






.inputcontainer {
    width: 50%;
    min-width: 200px;
}

.title-wrapper {

    background-color: #fff4d1;
    color: #161616;
}


.form-check-input:checked {
    background-color: #da6363;
    border-color: #c05959
}
</style>