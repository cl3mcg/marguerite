import { createRouter, createWebHistory } from 'vue-router'
import { validateToken } from "../hooks/validateToken.js";

// Import the Pinia store
import { useUserStore } from "../stores/UserStore.js";
// const userStore = useUserStore();

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
    routes: [
        {
            path: "/home",
            redirect: "/"
        },
        {
            path: "/",
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
                requiresAuth: true,
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
        useUserStore().intendedRoute = to.fullPath
        router.push("/login")
    }
    if (to.meta.requiresAuth && localStorage.getItem("accountToken")) {
        let validation = await validateToken(`/backend/user/validateToken`, localStorage.accountToken)
        if (!validation) {
            useUserStore().intendedRoute = to.fullPath
            router.push("/login")
        }
    }
    return next()
});

export default router