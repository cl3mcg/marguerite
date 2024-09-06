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
            return responseData;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

export { accountGetDetails }