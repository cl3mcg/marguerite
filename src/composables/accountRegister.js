const accountRegister = async function (userStore, formData) {
    userStore.isLoading.status = true;
    try {
        const response = await fetch('/backend/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        await response.json();

        if (response.ok) {
            userStore.triggerFlash(
                "success",
                "Welcome",
                "Your account has been successfully created. You can now login with your credentials."
            );
            return true;
        } else {
            userStore.triggerFlash(
                "error",
                "Registration error",
                "There was an error during the account registration process. Please try again later."
            );
            return false;
        }
    } catch (error) {
        userStore.triggerFlash(
            "error",
            "Server error",
            "There was an error during the account registration process. Please try again later."
        );
        return false;
    } finally {
        userStore.isLoading.status = false;
    }
};

export { accountRegister }