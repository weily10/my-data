<script setup>
import router from '../../router'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const fields = ref([])


async function getField() {
    const serviceId = 1
    const url = `api/services/${serviceId}`

    await axios.get(url).then(res => {
        
        fields.value = res.data.result
        console.log(res);
    })

}


onMounted(() => {
    getField()
})


</script>

<template>
    <div class="container ">
        <div class="">
            <img src=" " alt="" srcset="">
            <span class="fw-semibold fs-6 ps-1">個人化資料自主運用(MyData)</span>
        </div>
        <h1 class="text-center">身心障礙停車識別證申請線上申辦服務</h1>

        <hr class="hr-1">
        <div class="py-3 text-center">
            <h2 class="">傳送個人資料欄位</h2>
            <p class="text-body-tertiary">瞭解申辦服務的應備個人資料欄位，並選擇個人資料欄位的傳送方式</p>
        </div>
        <div class="pb-3">
            <h5>應備個人資料</h5>
            <p class="pt-2">
                <span v-for="(item, index) in fields.fieldDescs" :key="'index' + index">
                    {{ item }}<span v-show="fields.fieldDescs.length !== index + 1">、</span>
                 </span>
            </p>
            <hr>
        </div>
        <div>
            <h5 class="fw-medium mt-4">
                選擇傳送方式
            </h5>
            <div class="form-check mt-4">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked>
                <label class="form-check-label" for="flexRadioDefault1">
                    MyData線上傳送個人資料 </label>
            </div>
            <p>
                MyData平臺由數位發展部建置，透過身分驗證及線上自主同意，傳送應備個人資料用於申辦服務
            </p>
        </div>
        <div class="d-flex bg-body-tertiary p-5 border-top border-bottom mt-4">
            <div class="circle-container">
                <div class="circle d-flex justify-content-center align-items-center fw-bold fs-4">1</div>
                <div class="line"></div>
                <div class="circle d-flex justify-content-center align-items-center fw-bold fs-4">2</div>
                <div class="line"></div>
                <div class="circle d-flex justify-content-center align-items-center fw-bold fs-4">3</div>
            </div>
            <div>
                <div class="ps-5">
                    <p class="fs-5"><span class="fw-bold">身分驗證</span><br><span
                            class="text-body-tertiary fs-6">為確保資料運用安全，需要先驗證您的身分</span></p>
                </div>
                <div class="ps-5">
                    <p class="fs-5 pt-1"><span class="fw-bold">備齊個人資料</span><br><span
                            class="text-body-tertiary fs-6">完成身分驗證後就能讓您備齊個人資料</span></p>
                </div>
                <div class="ps-5 pt-1">
                    <p class="fs-5"><span class="fw-bold">提供個人資料</span><br><span
                            class="text-body-tertiary fs-6">同意提供個人資料給本服務，即可繼續完成申辦</span></p>
                </div>
            </div>
        </div>
        <div class="mt-5 d-flex justify-content-center">
            <button class=" btn-custom bg-yellow  w-25 " @click="router.push({ name: 'SPMyData' })">前往MyData</button>
        </div>
    </div>
</template>

<script  setup>


</script>

<style scoped>
.hr-1 {
    border: 2px solid #e2a600;
    opacity: 1;
}


.circle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.circle {
    width: 50px;
    height: 50px;
    background-color: #fad15f;
    border-radius: 50%;
    margin: 0;
}

.line {
    width: 5px;
    height: 30px;
    background-color: #fad15f;
    margin: 0;
}
</style>