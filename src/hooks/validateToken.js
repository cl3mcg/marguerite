export async function validateToken(url, token) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        });
        await response.json();

        if (response.ok) {
            console.log('OK Token');
            return true;
        } else {
            console.log('FAIL Token');
            return false;
        }
    } catch (error) {
        return console.error('Error:', error);
    }
}