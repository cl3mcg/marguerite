const validateAdminToken = async function () {
    try {
        const response = await fetch('/backend/user/validateAdminToken', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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

export { validateAdminToken };