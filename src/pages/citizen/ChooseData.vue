<script setup>
import { ref } from 'vue'
import router from '../../router'

const items = ref([
    {
        agency: { value: 'taipower', text: '台灣電力公司' },
        datas:
            [{
                value: 'name',
                text: '姓名'
            }]
    },
    {
        agency: { value: 'water', text: '台灣自來水公司' },
        datas:
            [{
                value: 'name',
                text: '姓名'
            },
            {
                value: 'address',
                text: '通訊地址'
            }]
    },
    {
        agency: { value: 'retire', text: '勞動部' },
        datas:
            [{
                value: 'name',
                text: '姓名'
            },
            {
                value: 'address',
                text: '通訊地址'
            }]
    }])

function useMydata() {
    router.push({ name: 'MyData' })
}

</script>

<template>
    <div class="container">
        <h2 class="text-center">受通報機關</h2>
        <div>

            <table class="table mt-3 table-bordered">
                <thead>
                    <tr>
                        <th>
                            機關
                        </th>
                        <th>
                            通報資料
                        </th>
                        <th>
                            注意事定
                        </th>
                    </tr>

                </thead>
                <tbody>
                    <template v-for="(item, index) in items" :key="index">
                        <tr>
                            <td>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" :value="item.agency.value"
                                        :id="item.agency.value">
                                    <label class="form-check-label" for="flexCheckDefault">
                                        {{ item.agency.text }}
                                    </label>
                                </div>
                            </td>
                            <td>
                                <template v-for="(item1, index) in item.datas" :key="index">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" :value="item1.value"
                                            :id="item1.value">
                                        <label class="form-check-label" for="flexCheckDefault">
                                            {{ item1.text }}
                                        </label>
                                    </div>
                                </template>

                            </td>
                            <td>
                            </td>
                        </tr>
                    </template>

                </tbody>

            </table>
        </div>
        <div class="text-end">
            <button class="btn bg-primary text-white" type="button" style="width: 420px"
                @click="useMydata()">使用MyData進行戶籍資料異動跨機關通知服務</button>
        </div>
    </div>
</template>


<style scoped></style>