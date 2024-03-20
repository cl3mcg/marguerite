import { accountLogout } from "@composables/accountLogout.js"

const accountChangeEmail = async function (userStore, router, formData) {
    userStore.isLoading.status = true;
    if (!formData.newEmail) {
        userStore.isLoading.status = false;
        return false;
    }
    try {
        const response = await fetch('/backend/user/changeEmail', {
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
                "Your email address has been changed successfully."
            );
            accountLogout(userStore, router);
            userStore.isLoading.status = false;
            return true;
        } else {
            userStore.triggerFlash(
                "warning",
                "Update failed",
                "Your email address could not be updated."
            );
            userStore.isLoading.status = false;
            return false;
        }
    } catch (error) {
        userStore.triggerFlash(
            "error",
            "Update failed",
            "Your email address could not be updated."
        );
        userStore.isLoading.status = false;
        return console.error('Error:', error);
    }
};

export { accountChangeEmail };