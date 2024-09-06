const accountDeletion = async function (userStore, router, formData) {
    if (!formData.currentPassword) {
        return false;
    }
    try {
        userStore.isLoading.status = true;
        const response = await fetch('/backend/user/deleteAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            localStorage.removeItem("rememberMe");
            userStore.accountToken = null;
            localStorage.removeItem("accountToken");
            router.push('/');
            userStore.triggerFlash(
                "success",
                "Update done",
                "Your account has been deleted."
            );
            return true;
        } else if (response.status >= 400 && response.status < 500) {
            userStore.triggerFlash(
                "warning",
                "Update failed",
                "The credentials provided are not correct."
            );
            return false;
        } else {
            userStore.triggerFlash(
                "warning",
                "Update failed",
                "Your account could not be deleted. Please try again later."
            );
            return false;
        }
    } catch (error) {
        userStore.triggerFlash(
            "warning",
            "Server error",
            "Your account could not be deleted. Please try again later."
        );
        return false;
    } finally {
        userStore.isLoading.status = false;
    }
};

export { accountDeletion }