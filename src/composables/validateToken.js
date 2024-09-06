const validateToken = async function () {
    try {
        const response = await fetch('/backend/user/validateToken', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        await response.json();

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        userStore.triggerFlash(
            "danger",
            "Server error",
            "There was an error while trying to validate the credentials token."
        );
        return false;
    }
};

export { validateToken };