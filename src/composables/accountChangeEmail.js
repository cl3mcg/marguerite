import { accountLogout } from "@composables/accountLogout.js"

const accountChangeEmail = async function (userStore, router, formData) {
    if (!formData.newEmail) {
        return false;
    }
    try {
        userStore.isLoading.status = true;
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
            return true;
        } else {
            userStore.triggerFlash(
                "warning",
                "Update failed",
                "Your email address could not be updated."
            );
            return false;
        }
    } catch (error) {
        userStore.triggerFlash(
            "error",
            "Update failed",
            "Your email address could not be updated."
        );
        return false;
    } finally {
        userStore.isLoading.status = false;
    }
};

export { accountChangeEmail };