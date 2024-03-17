import { accountLogout } from "./accountLogout.js"

const accountChangePassword = async function (userStore, router, formData) {
    userStore.isLoading.status = true;
    if (!formData.newPassword || !formData.currentPassword) {
        userStore.isLoading.status = false;
        return false;
    }
    try {
        const response = await fetch('/backend/user/changePassword', {
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
                "Your password has been changed successfully."
            );
            userStore.isLoading.status = false;
            accountLogout(userStore, router)
            return true;
        } else {
            userStore.triggerFlash(
                "warning",
                "Update failed",
                "Your password could not be updated."
            );
            userStore.isLoading.status = false;
            return false;
        }
    } catch (error) {
        userStore.triggerFlash(
            "warning",
            "Update failed",
            "Your password could not be updated."
        );
        userStore.isLoading.status = false;
        return console.error('Error:', error);
    }
};

export { accountChangePassword }