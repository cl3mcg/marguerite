import { accountLogout } from "@composables/accountLogout.js"

const accountDeletion = async function (userStore, router, formData) {
    userStore.isLoading.status = true;
    if (!formData.currentPassword) {
        userStore.isLoading.status = false;
        return false;
    }
    try {
        const response = await fetch('/backend/user/deleteAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            userStore.triggerFlash(
                "success",
                "Update done",
                "Your account has been deleted."
            );
            userStore.isLoading.status = false;
            localStorage.removeItem("rememberMe");
            userStore.accountToken = null;
            localStorage.removeItem("accountToken");
            router.push('/')
            return true;
        } else if (response.status === 400 || response.status === 401) {
            userStore.triggerFlash(
                "warning",
                "Update failed",
                "The credentials provided are not correct."
            );
            userStore.isLoading.status = false;
            return false;
        } else {
            userStore.triggerFlash(
                "warning",
                "Update failed",
                "Your account could not be deleted. Please try again later."
            );
            userStore.isLoading.status = false;
            return false;
        }
    } catch (error) {
        userStore.triggerFlash(
            "warning",
            "Update failed",
            "Your account could not be deleted. Please try again later."
        );
        userStore.isLoading.status = false;
        return console.error('Error:', error);
    }
};

export { accountDeletion }