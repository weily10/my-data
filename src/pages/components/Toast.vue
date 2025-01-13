<script setup>
import { onMounted } from 'vue';
import { useStore } from '../../store'
import { Toast } from 'bootstrap'


const store = useStore()
 
onMounted(() => {
    store.toast = new Toast(document.getElementById('toast'))
})
</script>

<template>
    <div class="position-fixed top-0  p-3" style="right: 40%; z-index: 5000">
        <div class="toast align-items-center border-0  " :class="store.color" role="alert" aria-live="assertive" aria-atomic="true"
            id="toast">
            <div class="d-flex">
                <div class="toast-body">
                    <b class="text-light"> {{ store.toastText }}</b>
                </div>
                <button type="button" class="btn-close btn-close-white  me-2 m-auto" data-bs-dismiss="toast"
                    aria-label="Close"></button>
            </div>
        </div>
    </div>
</template>