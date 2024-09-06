import { validateToken } from "@composables/validateToken.js";

const isLoggedIn = async function () {
    try {
        const validation = await validateToken();
        if (!validation) {
            return false;
        };
        return true;
    } catch (error) {
        return false;
    };
};

export { isLoggedIn }