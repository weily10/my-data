
<script setup>
import { onMounted } from 'vue';
import { useStore } from '../../store';

const props = defineProps(['pin'])
const emit = defineEmits(['updatePin'])
const store = useStore()


function updateValue(e) {
    emit('updatePin', e.target.value)
}


</script>

<template>
    <div>
        <h2 class="text-center">驗證您的身分</h2>
        <div class="w-100">
            <p class="text-start m-0">插卡驗證</p>
        </div>
        <div class="bg-white text-box mt-3 p-4 w-100">
            <p class="fw-bold"><span v-if="store.dp == 'dp4'">工商</span><span v-else>自然人</span>憑證</p>

            <p style="color: #c0c0c0;">請準備以下項目：</p>

            <ul class="d-flex justify-content-between gap-5">
                <li><span v-if="store.dp == 'dp4'">工商</span><span v-else>自然人</span>憑證+PIN碼</li>
                <li>晶片讀卡機</li>
                <li>安裝HiCOS卡片管理工具</li>
            </ul>

            <hr>
            <p class="fw-bold">未安裝讀卡元件</p>
            <div>
                <p>跨平台元件安裝說明：HiCOS卡片管理工具</p>
                <p>如無法正常讀取卡片，建議您重新安裝元件</p>
                <p>請插入您的<span v-if="store.dp == 'dp4'">工商</span><span v-else>自然人</span>憑證，查看 憑證IC卡詳細說明</p>
            </div>
            <div class="d-flex gap-2 align-items-top">
                <div class="circle2 d-flex justify-content-center   "><i class="bi bi-check"></i></div>
                <div>
                    <div class="fw-bold">請填入PIN碼</div>
                    <div class="mb-3 text-start">
                        <label for="pin" class="form-label">PIN碼累積３次錯誤將會自動鎖卡，解鎖請洽<span v-if="store.dp == 'dp4'">工商</span>
                            <span v-else>內政部</span>憑證管理中心</label>
                        <input type="text" class="form-control" id="pin" :value="props.pin" @input="updateValue"
                            placeholder="請填寫自然人憑證PIN碼">
                    </div>
                </div>
            </div>

        </div>
        <p class="pt-4"> 初次使用本平臺請充分閱讀以下服務條款 ,以保障您的權益與資料安全</p>
    </div>
</template>

<style scoped></style>