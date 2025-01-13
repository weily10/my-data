import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/backstage/Login.vue'
import SearchStatus from '../pages/backstage/SearchStatus.vue'
import DetailPage from '../pages/backstage/DetailPage.vue'
import ChoosenService from '../pages/citizen/ChooseService.vue'
import Status from '../pages/citizen/Status.vue'
import Appliance from '../pages/citizen/Appliance.vue'
import ClientLogin from '../pages/citizen/ClientLogin.vue'
import ChooseData from '../pages/citizen/ChooseData.vue'
import Authentication from '../pages/citizen/Authentication.vue'
import ApplianceDone from '../pages/citizen/ApplianceDone.vue'
import ModuleManagement from '../pages/backstage/ModuleManagement.vue'
import SPForm from '../pages/sp/Form.vue'
import SPMyData from '../pages/sp/MyData.vue'
import MyData from '../pages/citizen/MyData.vue'
import SPAGreement from '../pages/sp/Agreement.vue'
import ChoosePOC from '../pages/ChoosePOC.vue'
import SearchCustomerData from '../pages/agency/SearchCustomerData.vue'
import ResultSearch from '../pages/agency/ResultSearch.vue'
import AgencyManage from '../pages/backstage/AgencyManage.vue'



import axios from 'axios'
import Cookies from 'js-cookie'

const routes = [
    {
        path: "/my-data",
        name: "ChoosePOC",
        component: ChoosePOC,

    },
    {
        path: "/",
        redirect: "/my-data",
    },
    {
        path: "/chooseService",
        name: "ChoosenService",
        component: ChoosenService,

    },
    {
        path: "/admin/login",
        name: "Login",
        component: Login,
        meta: {
            role: 'admin'
        }
    },
    {
        path: "/admin",
        name: "SearchStatus",
        component: SearchStatus,
        meta: {
            role: 'admin'
        }
    },
    {
        path: "/admin/detailPage",
        name: "DetailPage",
        component: DetailPage,
        meta: {
            role: 'admin'
        }

    },

    {
        path: "/status",
        name: "Status",
        component: Status,
        meta: {
            role: 'citizen'
        }

    },
    {
        path: "/appliance",
        name: "Appliance",
        component: Appliance,
        meta: {
            role: 'citizen'
        }

    },
    {
        path: "/clientlogin",
        name: "ClientLogin",
        component: ClientLogin,
        meta: {
            role: 'citizen'
        }
    },
    {
        path: "/choosedata",
        name: "ChooseData",
        component: ChooseData,
        meta: {
            role: 'citizen'
        }
    },
    {
        path: "/auth",
        name: "Authentication",
        component: Authentication,

    },
    {
        path: "/applianceDone",
        name: "ApplianceDone",
        component: ApplianceDone,
    },
    {
        path: "/admin/module-management",
        name: "ModuleManagement",
        component: ModuleManagement,
        meta: {
            role: 'admin'
        }
    },
    {
        path: "/sp-form",
        name: "SPForm",
        component: SPForm,
        meta: {
            role: 'sp'
        }
    },
    {
        path: "/mydata",
        name: "MyData",
        component: MyData,
        meta: {
            role: 'mydata'
        }
    },
    {
        path: "/sp-mydata",
        name: "SPMyData",
        component: SPMyData,
        meta: {
            role: 'mydata'
        }
    },
    {
        path: "/sp-agreement",
        name: "SPAGreement",
        component: SPAGreement,
        meta: {
            role: 'sp'
        }
    },
    {
        path: "/search-customer-data",
        name: "SearchCustomerData",
        component: SearchCustomerData,
    },
    {
        path: "/result-search",
        name: "ResultSearch",
        component: ResultSearch,
    },
    {
        path: "/admin/agencyManage",
        name: "AgencyManage",
        component: AgencyManage,
        meta: {
            role: 'poc1Admin'
        }
    },

]

const history = createWebHistory();
const adminRouter = createRouter({
    history,
    routes
})



// router.beforeEach((to, from, next) => {

//     const isAuth = Cookies.get('UdnAiPlatform_Judge')
//     // document.title = to.meta.title;
//     if (to.meta.auth && !isAuth) {
//         next('/login')
//     } else {
//         next()
//     }

// })


export default adminRouter