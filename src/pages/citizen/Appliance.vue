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
const pincode = ref('')

const applianceData = ref({})

function toNextPage() {
    router.push({ name: 'ChooseData' })
}

async function getPersonsInfo() {
    if (localStorage.getItem('dps')) {
        applianceData.value = {
            personId:'1323123123',
             houseAddr:'台北市'
        }
        pincode.value = sessionStorage.getItem('pin')
        // const dps = localStorage.getItem('dps')
        // personUid.value = sessionStorage.getItem("personUid")
        // url.value = `/${dps}/api/persons/${personUid.value}`
        // await axios.get(url.value).then((res) => {
        //      applianceData.value = res.data.result
        //     pincode.value = sessionStorage.getItem('pin')
        //     store.setInfo(applianceData.value)

        //     localStorage.setItem('bday', applianceData.value.birthDate)
        // })
    }

}


function handleChange(e) {

    if (ischecked.value) {
        console.log(applianceData.value);
        applianceData.value.contactAddr = applianceData.value.houseAddr

    } else {
        applianceData.value.contactAddr = ''
    }
}

onMounted(() => {
    getPersonsInfo()
})

</script>

<template  >
    <div class="container">
        <div class="card">
            <div class="card-body">
                <h2 class="card-title text-center">聯絡資料填寫</h2>
                <div class="d-flex flex-wrap gap-3 mt-5">


                    <div class="mb-3 inputcontainer flex-fill">
                        <label for="nationalid" class="form-label" v-show="store.dp == 'dp1'">國民身分證統一編號</label>
                        <label for="nationalid" class="form-label" v-show="store.dp == 'dp4'">統一編號</label>
                        <input class="form-control" id="nationalid" placeholder="" v-model="applianceData.personId"
                            disabled>
                    </div>


                    <div class="mb-3 inputcontainer flex-fill" v-show="store.dp == 'dp1'">
                        <label for="phone" class="form-label">聯絡電話</label>
                        <input class="form-control" v-model="applianceData.phoneNumber" id="phone" placeholder="">
                    </div>

                    <div class="mb-3 inputcontainer flex-fill" v-show="store.dp == 'dp1'">
                        <label for="email" class="form-label">電子郵件</label>
                        <input type="email" class="form-control" id="email" placeholder="" v-model="applianceData.email">
                    </div>
                    <div class="mb-3 inputcontainer flex-fill">
                        <label for="pincode" class="form-label">PIN CODE</label>
                        <input class="form-control" id="pincode" v-model="pincode" placeholder="" type="password" disabled>
                    </div>
                </div>
                <div class="mb-3   flex-fill">
                    <label for="companyName" class="form-label" v-show="store.dp == 'dp4'">公司名稱</label>
                     <input v-show="store.dp == 'dp4'" class="form-control" id="companyName" v-model="applianceData.personName" placeholder="">
                </div>
                <div>
                    <p class="fw-bold mt-1" v-show="store.dp == 'dp4'"> 公司所在地</p>
                    <p class="fw-bold mt-1" v-show="store.dp == 'dp1'"> 戶籍所在地</p>
                    <div class="mb-3 ">
                        <input class="form-control" id="region" v-model="applianceData.houseAddr" placeholder=""
                            :disabled="store.dp == 'dp1'">

                    </div>
                </div>
                <div v-show="store.dp == 'dp1'">
                    <p class="fw-bold mt-1"> 通訊地址</p>
                    <div class="mb-3 ">
                        <input class="form-control" id="regionCheckBox" v-model="applianceData.contactAddr" placeholder=""
                            :disabled="ischecked">
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="infoAddrChk" v-model="ischecked"
                            @change="handleChange">
                        <label class="form-check-label" for="infoAddrChk">
                            同戶籍地
                        </label>
                    </div>
                    <!-- <div>
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
                    </div> -->
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

.form-check-input:checked {
    background-color: #239E5B;
    border-color: #239E5B
}
</style>