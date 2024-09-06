const accountChangeLanguage = async function (userStore, languageCode) {
    try {
        userStore.isLoading.status = true;
        localStorage.setItem('language', languageCode)
        userStore.language = languageCode;
        userStore.triggerFlash(
            "success",
            "Language updated",
            "The application language has been updated."
        );
        return true
    } catch (error) {
        userStore.triggerFlash(
            "warning",
            "Application error",
            "The application language could not be updated."
        );
        return false
    } finally {
        userStore.isLoading.status = false;
    }
};

export { accountChangeLanguage }