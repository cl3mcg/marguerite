import { createRouter, createWebHistory } from 'vue-router'

// Import the Pinia store
import { useUserStore } from "@stores/UserStore.js";

// Import required composables
import { validateToken } from "@composables/validateToken.js";
import { validateRecoveryKey } from "@composables/validateRecoveryKey.js"
import { modalClose } from '@composables/modalClose.js';

const TheHomePage = () => import('@components/layout/TheHomePage.vue')
const TheAboutPage = () => import('@components/layout/TheAboutPage.vue')
const TheContactPage = () => import('@components/layout/TheContactPage.vue')
const TheToolsPage = () => import('@components/layout/TheToolsPage.vue')
// const TheLoginPage = () => import('@components/layout/TheLoginPage.vue')
const TheAccountPage = () => import('@components/layout/TheAccountPage.vue')
// const TheAccountRecoveryPage = () => import('@components/layout/TheAccountRecoveryPage.vue')
const TheSonarPage = () => import('@components/layout/TheSonarPage.vue')
const TheSauronPage = () => import('@components/layout/TheSauronPage.vue')
const The404Page = () => import('@components/layout/The404Page.vue')
const TheErrorPage = () => import('@components/layout/TheErrorPage.vue')


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
        // {
        //     path: "/login",
        //     component: TheLoginPage,
        //     name: "login",
        //     meta: {
        //         requiresAuth: false,
        //     }
        // },
        {
            path: "/account",
            component: TheAccountPage,
            name: "account",
            meta: {
                requiresAuth: true,
            }
        },
        // {
        //     path: "/accountRecovery/:recoveryKey",
        //     component: TheAccountRecoveryPage,
        //     name: "accountRecovery",
        //     meta: {
        //         requiresAuth: false,
        //     },
        //     beforeEnter: async (to, from, next) => {
        //         try {
        //             const validatedRecoveryKey = await validateRecoveryKey(to.params.recoveryKey);
        //             console.log(`RecoveryKey is ${to.params.recoveryKey}`);
        //             console.log(`validatedRecoveryKey is ${validatedRecoveryKey}`);
        //             if (!validatedRecoveryKey) {
        //                 useUserStore().triggerFlash(
        //                     "danger",
        //                     "Recovery error",
        //                     "Please restart the password recovery process and request a new email with a new reset password link."
        //                 );
        //                 return next('/')
        //             }
        //             console.log('Valid recovery key, proceeding to account recovery...');
        //             return next()
        //         } catch (error) {
        //             useUserStore().triggerFlash(
        //                 "warning",
        //                 "There's an issue",
        //                 "Please restart the password recovery process later."
        //             );
        //             return next('/')
        //         }
        //     },
        // },
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
    useUserStore().intendedRoute = null;
    if (to.meta.requiresAuth && !localStorage.getItem("accountToken")) {
        useUserStore().intendedRoute = to.fullPath;
        useUserStore().triggerFlash(
            "warning",
            "Login required",
            "You need to login to get access to this resource."
        );
        next(from.fullPath); // Cancel navigation
        return;
    }
    if (to.meta.requiresAuth && localStorage.getItem("accountToken")) {
        let validation = await validateToken(localStorage.accountToken);
        if (!validation) {
            useUserStore().intendedRoute = to.fullPath;
            useUserStore().triggerFlash(
                "warning",
                "Login required",
                "You need to login to get access to this resource."
            );
            next(from.fullPath); // Cancel navigation
            return;
        }
    }
    try {
        modalClose();
    } catch (error) {
        console.log(error);
    } finally {
        next(); // Allow navigation
    }
});



// router.beforeEach(function (to, from, next) {
//     try {
//         modalClose()
//     } catch (error) {
//         console.log(error)
//     }
//     return next()
// })

export default router