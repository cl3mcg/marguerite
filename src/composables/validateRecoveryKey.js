export async function validateRecoveryKey(recoveryKey) {
    try {
        const response = await fetch(`/backend/user/validateRecoveryKey/${recoveryKey}`, {
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
        return console.error('Error:', error);
    }
}