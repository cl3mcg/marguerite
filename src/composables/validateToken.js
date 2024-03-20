const validateToken = async function () {
    try {
        const response = await fetch('/backend/user/validateToken', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'token': token
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
        console.error('Error:', error);
        return;
    }
};

export { validateToken };