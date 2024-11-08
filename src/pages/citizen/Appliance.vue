<script setup>
import router from '../../router'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useStore } from '../../store'

const store = useStore()

const personUid = ref('')
const url = ref('')
const ischecked = ref(false)
const inputAddress = ref({})


const applianceData = ref({})

function toNextPage() {
    router.push({ name: 'ChooseData' })
}

async function getPersonsInfo() {
    personUid.value = sessionStorage.getItem("personUid")
    url.value = `/api/persons/${personUid.value}`
    await axios.get(url.value).then((res) => {
        applianceData.value = res.data.result
        store.setInfo(applianceData.value)

        localStorage.setItem('bday', applianceData.value.birthDate)
    })
}

onMounted(() => {

    getPersonsInfo()

})

</script>

<template  >
    <div class="container">
        <p class="danger text-danger  ">模擬受理異動機關畫面</p>
        <div class="card">
            <div class="card-body">
                <h2 class="card-title text-center">資料填寫</h2>
                <div class="d-flex flex-wrap gap-3 mt-5">
                    <div class="mb-3 inputcontainer flex-fill">
                        <label for="nationalid" class="form-label">國民身分證統一編號</label>
                        <input class="form-control" id="nationalid" placeholder="" v-model="applianceData.personId"
                            disabled>
                    </div>
                    <div class="mb-3 inputcontainer flex-fill">
                        <label for="pincode" class="form-label">PIN CODE</label>
                        <input class="form-control" id="pincode" v-model="applianceData.pincode" placeholder="">
                    </div>
                    <div class="mb-3 inputcontainer flex-fill">
                        <label for="phone" class="form-label">聯絡電話</label>
                        <input class="form-control" v-model="applianceData.phoneNumber" id="phone" placeholder="">
                    </div>
                    <div class="mb-3 inputcontainer flex-fill">
                        <label for="email" class="form-label">電子郵件</label>
                        <input type="email" class="form-control" id="email" placeholder="" v-model="applianceData.email">
                    </div>
                </div>

                <div>
                    <p class="fw-bold mt-1"> 戶籍所在地</p>
                    <div class="mb-3 ">
                        <input class="form-control" id="region" v-model="applianceData.houseAddr" placeholder="" disabled>
                    </div>
                </div>
                <div>
                    <p class="fw-bold mt-1"> 通訊地址</p>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="infoAddrChk" v-model="ischecked"
                            @change="handleChange">
                        <label class="form-check-label" for="infoAddrChk">
                            同戶籍地
                        </label>
                    </div>
                    <div>
                        <div class="d-flex gap-3 mt-3">
                            <div class="mb-3 " style="width: 23.5%;">
                                <label for="postNo" class="form-label">郵編號</label>
                                <input type="email" class="form-control" id="postNo" :disabled="ischecked"
                                    v-model="inputAddress.postNo" placeholder="">
                            </div>
                            <div class="mb-3 " style="width: 23.5%;">
                                <label for="samecity" class="form-label">市</label>
                                <input type="email" class="form-control" id="samecity" :disabled="ischecked"
                                    v-model="inputAddress.samecity" placeholder="">
                            </div>
                            <div class="mb-3 " style="width: 23.5%;">
                                <label for="sameregion" class="form-label">市區</label>
                                <input class="form-control" id="sameregion" :disabled="ischecked"
                                    v-model="inputAddress.sameregion" placeholder="">
                            </div>
                        </div>
                        <div class="d-flex gap-3 mt-3">
                            <div class="mb-3 " style="width: 23.5%;">
                                <label for="sametownship" class="form-label">鄉</label>
                                <input class="form-control" id="sametownship" :disabled="ischecked"
                                    v-model="inputAddress.sametownship" placeholder="">
                            </div>
                            <div class="mb-3 " style="width: 23.5%;">
                                <label for="sameVillage" class="form-label">村(里)</label>
                                <input class="form-control" id="sameVillage" :disabled="ischecked"
                                    v-model="inputAddress.sameVillage" placeholder="">
                            </div>
                            <div class="mb-3 " style="width: 23.5%;">
                                <label for="sameNeighbour" class="form-label">鄰</label>
                                <input class="form-control" id="sameNeighbour" :disabled="ischecked"
                                    v-model="inputAddress.sameNeighbour" placeholder="">
                            </div>
                            <div class="mb-3 " style="width: 23.5%;">
                                <label for="sameStreetNo" class="form-label">街路門牌</label>
                                <input class="form-control" id="sameStreetNo" :disabled="ischecked"
                                    v-model="inputAddress.sameStreetNo" placeholder="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-3 text-end">
            <button class="btn  bg-primary text-white" type="submit" @click="toNextPage()">下一步</button>
        </div>
    </div>
</template>


<style scoped>
.inputcontainer {
    width: 33.3%;
    min-width: 200px;
}
</style>