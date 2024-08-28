<script setup>
import router from '../../router'

function toNextPage() {
    router.push({ name: 'ChooseData' })
}

</script>

<template  >
    <div class="container">

        <h1 class="text-center">發展遲緩兒童療育補助</h1>
        <div class="border mt-3  ">
            <div class="title-wrapper p-2">
                <h5 class="mb-1">申請人/代理人基本資料</h5>
            </div>
            <div class="p-4">
                <div class="mb-3 inputcontainer flex-fill">
                    <label for="chineseName" class="form-label"><span class="text-danger pe-1">*</span>中文名稱</label>
                    <input type="email" class="form-control" id="chineseName" placeholder="中文名稱">
                </div>
                <div class="d-flex gap-5 flex-wrap ">
                    <div class="mb-3 inputcontainer  ">
                        <label for="exampleFormControlInput1" class="form-label"><span
                                class="text-danger pe-1">*</span>出生日期</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                    </div>
                    <div class="mb-3 ">
                        <label for="exampleFormControlInput1" class="form-label"> 性別</label>
                        <div class="d-flex gap-3">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    男 (Male)
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                    checked>
                                <label class="form-check-label" for="flexRadioDefault2">
                                    女 (Female)
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mb-3  flex-fill">
                    <label for="chineseName" class="form-label"><span class="text-danger pe-1">*</span>身分證字號</label>
                    <input type="email" class="form-control" id="chineseName" placeholder="如:S131349423">
                </div>
                <div class="mb-3  d-flex gap-3 align-items-end">
                    <div class="w-50">
                        <label for="chineseName" class="form-label"><span class="text-danger pe-1">*</span>戶籍地址</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected>台北</option>
                            <option value="1">新北市</option>
                            <option value="2">新竹</option>
                            <option value="3">桃園</option>
                        </select>
                    </div>
                    <div class="w-25 flex-fill">
                        <input type=" " class="form-control" id=" " placeholder="地址">
                    </div>
                </div>
                <div class="  flex-fill">
                    <label for="chineseName" class="form-label"> 通訊地址</label>
                    <input type="email" class="form-control" id="chineseName" placeholder="">
                </div>

                <div class="form-check mt-2">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        同戶籍地址 Same as above address
                    </label>
                </div>
                <div class="mb-3  flex-fill mt-3">
                    <label for="chineseName" class="form-label"><span class="text-danger pe-1">*</span>連絡電話</label>
                    <input type="email" class="form-control" id="chineseName" placeholder="如:09-0212-9912">
                </div>
            </div>
        </div>
        <div class="mt-3 text-end ">
            <button class="btn  bg-primary text-white" type="submit" @click="toNextPage()">下一步</button>
        </div>
    </div>
</template>


<style scoped>
.inputcontainer {
    width: 50%;
    min-width: 200px;
}

.title-wrapper {
    background-color: #DEF3FF;
    color: #337AB7;
}
</style>