import { validateToken } from "@composables/validateToken.js";

const isLoggedIn = async function () {
    // if (!localStorage.getItem("accountToken")) {
    //     console.log('The token is not found in the local storage')
    //     return false;
    // };
    const validation = await validateToken();
    if (!validation) {
        console.log('The token is not validated')
        return false;
    };
    console.log('The token is validated')
    return true;
};

export { isLoggedIn }