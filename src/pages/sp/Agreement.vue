<script setup>
import router from '../../router'
 


function agreeNext(){
    router.push({ name: 'SPForm' })
}

</script>

<template  >
    <div class="container">

        <h1 class="text-center mt-3">線上申辦同意書</h1>
        <hr class="">
        <div class="mt-3" style="overflow: auto; height:60vh">
            <p>以下說明詳述在使用線上申辦服務時， 您必須瞭解的相關事項，請您詳細閱讀！</p>

            <ol>
                <li>本作業係依循電子簽章法，建置安全及可信賴之網路環境，透過網際網路進行線上申辦。</li>
                <li>依電子簽章法第四條第一項及第九條第一項規定，為維護使用者之契約自由原則， 本人同意以使用本系統產製具有電子簽章之電子文件作為通信及交易之基礎， 取代傳統公私領域之書面文件及簽名、蓋章確定之相關法律責任。
                </li>
                <li>申請人於使用網路作業進行線上申辦前應先查閱本網站各項最新消息及案件說明。</li>
                <li>申請人於步驟二資料檢視時，請詳細確認申請資料是否正確，一旦按下完成送出，本府立即受理您的案件，無法取消案件。</li>
                <li>申請人於步驟三受理完成，可將您的申辦案件資訊，進行列印或儲存申辦資訊，如您的線上申辦須郵寄資料亦可於本步驟列印郵寄封面及檢核表。</li>
                <li> 本網站將保證您個人身分資料的私密性，在未徵求您同意前， 不會任意將您的個人資料作任何商業用途，或洩漏給第三者。但以下狀況除外：</li>
            </ol>

            <ul style="list-style-type: none;">
                <li> 6.1 基於法律規定。</li>
                <li>6.1 基於法律規定。</li>
                <li>
                    6.2 司法機關基於法定程序要求。
                </li>
                <li>6.3 您已於線上申辦使用免書證謄本服務，同意本府承辦同仁代為電子查調。</li>

                <li>6.4 為保障本網站或其他使用者之權益。</li>

            </ul>
            <ol>
                <li>申請人未遵守本同意書規定致生損害等，將自行負責。</li>
                <li>為求慎重周詳，保障申請人權益，本府得保有修改本同意書及使用規定的權利。</li>
                <li> 本同意書未規定之事項，得依主管機關之相關法令規定及內部管理之相關規定辦理。</li>
                <li>申請人勾選「我同意」，並按下「確定」鍵後，視同申請人已仔細審閱明白上述各條規定，並完全同意遵守各條款之約定。</li>
            </ol>



        </div>
        <div class="mt-3 text-end d-flex gap-3 justify-content-center">
             <button class="btn bg-gray" type="submit" @click="dontagree()">不同意</button>
            <button class="btn bg-yellow  " type="submit" @click="agreeNext()">同意 , 下一步</button>
        </div>
    </div>
</template>


<style scoped>
.btn:hover {
    background-color: rgb(168, 146, 23) !important; 
}

.bg-gray{
    background-color: #B9B9B9;
}

</style>