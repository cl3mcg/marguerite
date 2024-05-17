const accountGetDetails = async function () {
    try {
        const response = await fetch('/backend/user/userDetails', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const responseData = await response.json();

        if (response.ok) {
            console.log('OK Account Details');
            return responseData;
        } else {
            console.log('FAIL Account Details');
            return false;
        }
    } catch (error) {
        return console.error('Error:', error);
    }
};

export { accountGetDetails }