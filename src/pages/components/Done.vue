<script setup>
import router from '../../router'

const props = defineProps({
    dpsFields: Array,
    checkedItems: Array
})

function gotoNextPage() {
    router.push({ name: 'Authentication' })
}


function agreeProvide() {

}

function disagreeProvide() {

}

</script>

<template>
    <div class="w-100">
        <h2 class="text-center">身心障礙停車識別證申請</h2>
        <div class="w-100 bg-white mt-4 p-4 ">
            <div class="d-flex gap-3  flex-column">
                <div class="fw-bold">提交申請</div>
                <div>本次使用的資料如下:</div>
                <div>
                    <ol>
                        <template v-for="(item, index) in props.dpsFields" :key="index">
                            <li> {{ item.dpName }}</li>
                            <div class="pb-3 pt-2 text-danger">
                                <template v-for="(item, index) in props.checkedItems" :key="index">
                                    <div>
                                        {{ item.fieldName }}
                                    </div>
                                </template>

                            </div>
                        </template>
                    </ol>
                </div>
                <div>
                    <hr>
                    您已完成身分驗證 , 是否同意將上述資料傳給 「<span v-for="(item, index) in props.dpsFields" :key="index">{{ item.dpName }}
                        <span v-if="props.dpsFields.length !== index + 1">, </span>  </span> 」。
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