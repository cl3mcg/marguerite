import { accountLogout } from "@composables/accountLogout.js"

const accountChangePassword = async function (userStore, router, formData) {
    if (!formData.newPassword || !formData.currentPassword) {
        return false;
    }

    try {
        userStore.isLoading.status = true;
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
            accountLogout(userStore, router)
            return true;
        } else {
            userStore.triggerFlash(
                "warning",
                "Update failed",
                "Your password could not be updated."
            );
            return false;
        }
    } catch (error) {
        userStore.triggerFlash(
            "warning",
            "Server error",
            "Your password could not be updated."
        );
        return false;
    } finally {
        userStore.isLoading.status = false;
    }
};

export { accountChangePassword }