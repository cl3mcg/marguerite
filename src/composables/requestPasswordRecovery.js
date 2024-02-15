export async function requestPasswordRecovery(emailProvided) {
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
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return console.error('Error:', error);
    }
}