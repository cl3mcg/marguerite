import { createRouter, createWebHistory } from 'vue-router'

// Import the Pinia store
import { useUserStore } from "@stores/UserStore.js";

// Import the flowbite logic
import { initFlowbite } from "flowbite";

// Import required composables
import { validateToken } from "@composables/validateToken.js";
import { validateAdminToken } from "@composables/validateAdminToken.js";
import { validateRecoveryKey } from "@composables/validateRecoveryKey.js"
import { modalClose } from '@composables/modalClose.js';

const TheHomePage = () => import('@components/layout/TheHomePage.vue')
const TheAboutPage = () => import('@components/layout/TheAboutPage.vue')
const TheContactPage = () => import('@components/layout/TheContactPage.vue')
const TheToolsPage = () => import('@components/layout/TheToolsPage.vue')
// const TheLoginPage = () => import('@components/layout/TheLoginPage.vue')
const TheAccountPage = () => import('@components/layout/TheAccountPage.vue')
const TheAccountRecoveryPage = () => import('@components/layout/TheAccountRecoveryPage.vue')
const TheSonarPage = () => import('@components/layout/TheSonarPage.vue')
const TheSauronPage = () => import('@components/layout/TheSauronPage.vue')
const TheSuperviseurPage = () => import('@components/layout/TheSuperviseurPage.vue')
const TheSanitizerPage = () => import('@components/layout/TheSanitizerPage.vue')
const The404Page = () => import('@components/layout/The404Page.vue')
const TheErrorPage = () => import('@components/layout/TheErrorPage.vue')

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/home",
            redirect: "/",
        },
        {
            path: "/",
            component: TheHomePage,
            name: "home"
        },
        {
            path: "/tools",
            component: TheToolsPage,
            name: "tools",
            meta: {
                requiresAuth: false,
                isAvailable: true
            }
        },
        {
            path: "/contact",
            component: TheContactPage,
            name: "contact",
            meta: {
                requiresAuth: false,
                isAvailable: true
            }
        },
        {
            path: "/about",
            component: TheAboutPage,
            name: "about",
            meta: {
                requiresAuth: false,
                isAvailable: true
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
                isAvailable: true
            }
        },
        {
            path: "/accountrecovery/:recoveryKey",
            component: TheAccountRecoveryPage,
            name: "accountrecovery",
            meta: {
                requiresAuth: false,
                isAvailable: true
            },
            beforeEnter: async (to, from, next) => {
                try {
                    const validatedRecoveryKey = await validateRecoveryKey(to.params.recoveryKey);
                    if (!validatedRecoveryKey) {
                        useUserStore().triggerFlash(
                            "warning",
                            "Invalid recovery key",
                            "Please restart the password recovery process and request a new email with a new reset password link."
                        );
                        return next('/')
                    }
                    return next()
                } catch (error) {
                    useUserStore().triggerFlash(
                        "danger",
                        "There's an issue",
                        "Please restart the password recovery process later."
                    );
                    return next('/')
                }
            },
        },
        {
            path: "/error",
            component: TheErrorPage,
            name: "error",
            meta: {
                requiresAuth: false,
                isAvailable: true
            }
        },
        {
            path: "/notfound",
            component: The404Page,
            name: "notfound",
            meta: {
                requiresAuth: false,
                isAvailable: true
            }
        },
        {
            path: "/tools/sonar",
            component: TheSonarPage,
            name: "sonar",
            meta: {
                requiresAuth: true,
                isAvailable: true
            }
        },
        {
            path: "/tools/sauron",
            component: TheSauronPage,
            name: "sauron",
            meta: {
                requiresAuth: true,
                isAvailable: true
            }
        },
        {
            path: "/tools/superviseur",
            component: TheSuperviseurPage,
            name: "superviseur",
            meta: {
                requiresAdmin: true,
                isAvailable: true
            }
        },
        {
            path: "/tools/sanitizer",
            component: TheSanitizerPage,
            name: "sanitizer",
            meta: {
                requiresAuth: false,
                isAvailable: false
            },
        },
        {
            path: "/:notFound(.*)",
            redirect: "/notfound"
        }
    ],
})

router.beforeEach(async function (to, from, next) {
    useUserStore().intendedRoute = null;
    if (to.meta && to.meta.isAvailable !== undefined && !to.meta.isAvailable) {
        useUserStore().triggerFlash(
            "warning",
            "Not available",
            "This resource is not available. Please try again later."
        );
        next(from.fullPath); // Cancel navigation
        return;
    }
    if ((to.meta.requiresAuth || to.meta.requiresAdmin) && !localStorage.getItem("accountToken")) {
        useUserStore().intendedRoute = to.fullPath;
        useUserStore().triggerFlash(
            "warning",
            "Login required",
            "You need to login to access this resource."
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
                "You need to login to access this resource."
            );
            next(from.fullPath); // Cancel navigation
            return;
        }
    }
    if (to.meta.requiresAdmin && localStorage.getItem("accountToken")) {
        let validation = await validateAdminToken(localStorage.accountToken);
        if (!validation) {
            useUserStore().intendedRoute = to.fullPath;
            useUserStore().triggerFlash(
                "warning",
                "Admin rights required",
                "You need to have administrative privileges to access this resource."
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

router.beforeEach(function (to, from, next) {
    try {
        initFlowbite()
    } catch (error) {
        console.log(error)
    }
    return next()
})

export default router
