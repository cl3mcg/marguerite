import { createRouter, createWebHistory } from 'vue-router'
import { validateToken } from "../hooks/validateToken.js";


// const TheCoachList = () => import('../src/components/TheCoachList.vue')
const TheHomePage = () => import('../components/parts/TheHomePage.vue')
const TheAboutPage = () => import('../components/parts/TheAboutPage.vue')
const TheContactPage = () => import('../components/parts/TheContactPage.vue')
const TheToolsPage = () => import('../components/parts/TheToolsPage.vue')
const TheLoginPage = () => import('../components/parts/TheLoginPage.vue')
const TheAccountPage = () => import('../components/parts/TheAccountPage.vue')
const TheSonarPage = () => import('../components/parts/TheSonarPage.vue')
const TheSauronPage = () => import('../components/parts/TheSauronPage.vue')
const The404Page = () => import('../components/parts/The404Page.vue')
const TheErrorPage = () => import('../components/parts/TheErrorPage.vue')

const router = createRouter({
    history: createWebHistory(),
    // routes: [
    //     {
    //         path: "/",
    //         redirect: "/coach"
    //     },
    //     {
    //         path: "/coach",
    //         component: TheCoachList,
    //         name: "home",
    //         meta: {
    //             pageTitle: "The coach list"
    //         }
    //     },
    //     {
    //         path: "/coach/:id",
    //         component: TheCoachDetails,
    //         name: "coach",
    //         props: true,
    //         meta: {
    //             pageTitle: "Coach details"
    //         }
    //     },
    //     {
    //         path: "/createCoach",
    //         component: TheCoachForm,
    //         name: "createCoach",
    //         meta: {
    //             pageTitle: "Adding a coach",
    //             requiresAuth: true,
    //         }
    //     },
    //     {
    //         path: "/login",
    //         component: TheLoginForm,
    //         name: "loginPage",
    //         meta: {
    //             pageTitle: "Login"
    //         }
    //     },
    //     {
    //         path: "/register",
    //         component: TheRegisterForm,
    //         name: "registerPage",
    //         meta: {
    //             pageTitle: "Create your account"
    //         }
    //     },
    //     {
    //         path: "/:notFound(.*)",
    //         redirect: "/coach"
    //     }
    // ],
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        {
            path: "/home",
            component: TheHomePage,
            name: "home",
            meta: {
                requiresAuth: false,
            }
        },
        {
            path: "/tools",
            component: TheToolsPage,
            name: "tools",
            meta: {
                requiresAuth: false,
            }
        },
        {
            path: "/contact",
            component: TheContactPage,
            name: "contact",
            meta: {
                requiresAuth: false,
            }
        },
        {
            path: "/about",
            component: TheAboutPage,
            name: "about",
            meta: {
                requiresAuth: false,
            }
        },
        {
            path: "/login",
            component: TheLoginPage,
            name: "login",
            meta: {
                requiresAuth: false,
            }
        },
        {
            path: "/account",
            component: TheAccountPage,
            name: "account",
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/error",
            component: TheErrorPage,
            name: "error",
            meta: {
                requiresAuth: false,
            }
        },
        {
            path: "/notfound",
            component: The404Page,
            name: "notfound",
            meta: {
                requiresAuth: false,
            }
        },
        {
            path: "/tools/sonar",
            component: TheSonarPage,
            name: "sonar",
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/tools/sauron",
            component: TheSauronPage,
            name: "sauron",
            meta: {
                requiresAuth: false,
            }
        },
        {
            path: "/:notFound(.*)",
            redirect: "/notfound"
        }
    ],
})

router.beforeEach(async function (to, from, next) {
    if (to.meta.requiresAuth && !localStorage.getItem("accountToken")) {
        router.push("/login")
    }
    if (to.meta.requiresAuth && localStorage.getItem("accountToken")) {
        let validation = await validateToken(`http://localhost:3000/user/validateToken`, localStorage.accountToken)
        if (!validation) { router.push("/login") }
    }
    return next()
});

export default router