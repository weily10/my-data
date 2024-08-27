<script setup>
import router from '../../router'

function toNextPage() {
    router.push({ name: 'ChooseData' })
}

</script>

<template  >
    <div class="container">
        <p class="danger text-danger  ">模擬受理異動機關畫面</p>
        <div class="card">
            <div class="card-body">
                <h2 class="card-title text-center">資料填寫</h2>
                <div class="d-flex flex-wrap gap-3 mt-5">
                    <div class="mb-3 inputcontainer flex-fill">
                        <label for="exampleFormControlInput1" class="form-label">國民身分證統一編號</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                    </div>
                    <div class="mb-3 inputcontainer flex-fill">
                        <label for="exampleFormControlInput1" class="form-label">PIN CODE</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                    </div>
                    <div class="mb-3 inputcontainer flex-fill">
                        <label for="exampleFormControlInput1" class="form-label">聯絡電話</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                    </div>
                    <div class="mb-3 inputcontainer flex-fill">
                        <label for="exampleFormControlInput1" class="form-label">電子郵件</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                    </div>
                </div>

                <div>
                    <p class="fw-bold mt-1"> 戶籍所在地</p>
                    <div class="d-flex gap-3">
                        <div class="mb-3 " style="width: 23.5%;">
                            <label for="exampleFormControlInput1" class="form-label">市</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                        </div>
                        <div class="mb-3 " style="width: 23.5%;">
                            <label for="exampleFormControlInput1" class="form-label">市區</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                        </div>
                    </div>
                </div>
                <div>
                    <p class="fw-bold mt-1"> 通訊地址</p>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label" for="flexCheckDefault">
                            同戶籍地
                        </label>
                    </div>
                    <div class="d-flex gap-3 mt-3">
                        <div class="mb-3 " style="width: 23.5%;">
                            <label for="exampleFormControlInput1" class="form-label">郵編號</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                        </div>
                        <div class="mb-3 " style="width: 23.5%;">
                            <label for="exampleFormControlInput1" class="form-label">市</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                        </div>
                        <div class="mb-3 " style="width: 23.5%;">
                            <label for="exampleFormControlInput1" class="form-label">市區</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                        </div>
                    </div>
                    <div class="d-flex gap-3 mt-3">
                        <div class="mb-3 " style="width: 23.5%;">
                            <label for="exampleFormControlInput1" class="form-label">鄉</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                        </div>
                        <div class="mb-3 " style="width: 23.5%;">
                            <label for="exampleFormControlInput1" class="form-label">村(里)</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                        </div>
                        <div class="mb-3 " style="width: 23.5%;">
                            <label for="exampleFormControlInput1" class="form-label">鄰</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                        </div>
                        <div class="mb-3 " style="width: 23.5%;">
                            <label for="exampleFormControlInput1" class="form-label">街路門牌</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
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