const accountChangeLanguage = async function (userStore, languageCode) {
    try {
        userStore.isLoading.status = true;
        localStorage.setItem('language', languageCode)
        userStore.language = languageCode;
        // userStore.triggerFlash(
        //     "success",
        //     "Language updated",
        //     "The application language has been updated."
        // );
        userStore.triggerFlash(
            "info",
            "Work in Progress",
            "The application language change feature is currently under development. For the time being, the application is only available in English."
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