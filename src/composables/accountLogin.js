const accountLogin = async function (userStore, formData) {
    try {
        userStore.isLoading.status = true;

        const response = await fetch('/backend/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const closeModalButtons = document.querySelectorAll('.close-modal-button')
            for (let button of closeModalButtons) {
                button.click()
            }
            if (formData.rememberMe) {
                localStorage.setItem("rememberMe", true)
            };
            userStore.accountToken = true;
            localStorage.removeItem("accountToken");
            localStorage.setItem("accountToken", userStore.accountToken);
            userStore.isLoading.status = false;
            userStore.triggerFlash(
                "success",
                "Welcome back",
                "You are now logged in."
            );
            return true;
        } else if (response.status === 403) {
            userStore.triggerFlash(
                "warning",
                "Invalid credentials",
                "Double check the email address and password provided."
            );
            return false;
        } else {
            userStore.triggerFlash(
                "warning",
                "Login error",
                "There was an error during the login process. Please try again later."
            );
            return false;
        }
    } catch (error) {
        userStore.triggerFlash(
            "danger",
            "Server error",
            "There was an error during the login process. Please try again later."
        );
        return false;
    } finally {
        userStore.isLoading.status = false
    }
};

export { accountLogin };