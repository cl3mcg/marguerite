const accountChangeLanguage = async function (userStore, languageCode) {
    userStore.isLoading.status = true;
    try {
        localStorage.setItem('language', languageCode)
        userStore.language = languageCode;
        userStore.triggerFlash(
            "success",
            "Language updated",
            "The application language has been updated."
        );
        userStore.isLoading.status = false;
        return true
    } catch (error) {
        userStore.triggerFlash(
            "warning",
            "Update failed",
            "The application language could not be updated."
        );
        userStore.isLoading.status = false;
        console.error('Error:', error);
        return false
    }
};

export { accountChangeLanguage }