const accountRecoveryRequest = async function (userStore, emailProvided) {
    try {
        const response = await fetch(`/backend/user/requestAccountRecovery`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ emailProvided: emailProvided }),
        });
        await response.json();

        if (response.ok) {
            userStore.triggerFlash(
                "success",
                "Check your inbox",
                "If the email address provided matches our records, we will send you further instructions to recover your account."
            );
            return true;
        } else {
            userStore.triggerFlash(
                "warning",
                "Error",
                "There was an error during the process. Please try again later."
            );
            return false;
        }
    } catch (error) {
        userStore.triggerFlash(
            "error",
            "Server error",
            "There was an error during the process. Please try again later."
        );
        return console.error('Error:', error);
    }
};

export { accountRecoveryRequest };