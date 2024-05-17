const accountLogin = async function (userStore, formData) {
    userStore.isLoading.status = true;
    try {
        const response = await fetch('/backend/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        // const responseData = await response.json();

        if (response.ok) {
            const closeModalButtons = document.querySelectorAll('.close-modal-button')
            for (let button of closeModalButtons) {
                button.click()
            }
            if (formData.rememberMe) {
                localStorage.setItem("rememberMe", true)
            };
            // userStore.accountToken = responseData.token;
            userStore.accountToken = true;
            // localStorage.removeItem("accountToken");
            // localStorage.setItem("accountToken", userStore.accountToken);
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
            console.log('FAIL Login');
            userStore.isLoading.status = false;
            userStore.triggerFlash(
                "warning",
                "Invalid credentials",
                "Double check the email address and password provided."
            );
            return false;
        } else {
            userStore.triggerFlash(
                "danger",
                "Login error",
                "There was an error during the login process. Please try again later."
            );
            return false;
        }
    } catch (error) {
        userStore.isLoading.status = false;
        userStore.triggerFlash(
            "danger",
            "Login error",
            "There was an error during the login process. Please try again later."
        );
        return console.error('Error:', error);
    }
};

export { accountLogin };