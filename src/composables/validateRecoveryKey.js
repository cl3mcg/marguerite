export async function validateRecoveryKey(recoveryKey) {
    try {
        const response = await fetch(`/backend/user/validateRecoveryKey/${recoveryKey}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        await response.json();
        return response.ok ? true : false
    } catch (error) {
        return false;
    }
}