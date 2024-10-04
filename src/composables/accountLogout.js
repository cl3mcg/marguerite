const accountLogout = async function (userStore, router) {
    localStorage.removeItem("rememberMe");
    userStore.accountToken = null;
    localStorage.removeItem("accountToken");
    try {
        const response = await fetch('/backend/user/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            userStore.triggerFlash(
                "success",
                "Goodbye",
                "You are now logged out."
            );
            router.push('/')
        } else {
            userStore.triggerFlash(
                "warning",
                "Whoops...",
                "An error occurred during the disconnection process."
            );
        }
    } catch (error) {
        userStore.triggerFlash(
            "error",
            "Server error",
            "An error occurred during the disconnection process."
        );
    }
};

export { accountLogout }