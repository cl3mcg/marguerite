import { defineStore } from "pinia"

export const useUserStore = defineStore("userStore", {
    state: function () {
        return {
            accountToken: null,
            darkMode: false,
            language: 'en-GB',
            intendedRoute: null,
            isLoading: { status: false, message: null },
            shownModal: null,
            // shownModal: {
            //     type: null,
            //     title: "Neutral modal",
            //     message: "This is a test for a neutral modal message containing information that the user should focus its attention on",
            //     options: ["OK", "Cancel"],
            // },
            flashMessages: [
                // {
                //     type: null,
                //     title: "Neutral flash",
                //     message: "An example of a neutral flash displaying information",
                // }
            ]
        }
    },
    actions: {
        triggerFlash: function (type = null, title = `Notification`, message) {
            return this.flashMessages.push({
                type: type,
                title: title,
                message: message,
            })
        },
        triggerModal: function (type = null, title = `Notification`, message, options = ['OK']) {
            return this.shownModal = {
                type: type,
                title: title,
                message: message,
                options: typeof options === "object" ? options : [`${options}`]
            }
        },
        removeAccountToken: function () {
            this.accountToken = null;
            localStorage.removeItem("accountToken");
        },
        // validateToken: async function (url, token) {
        //     try {
        //         const response = await fetch(url, {
        //             method: 'GET',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'token': token
        //             },
        //         });
        //         await response.json();

        //         if (response.ok) {
        //             console.log('OK Token');
        //             return true;
        //         } else {
        //             console.log('FAIL Token');
        //             return false;
        //         }
        //     } catch (error) {
        //         return console.error('Error:', error);
        //     }
        // },
        // getAccountDetails: async function (url, token) {
        //     try {
        //         const response = await fetch(url, {
        //             method: 'GET',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'token': token
        //             },
        //         });
        //         const responseData = await response.json();

        //         if (response.ok) {
        //             console.log('OK Account Details');
        //             return responseData;
        //         } else {
        //             console.log('FAIL Account Details');
        //             return false;
        //         }
        //     } catch (error) {
        //         return console.error('Error:', error);
        //     }
        // },
        // registerAccount: async function (url, data) {
        //     this.isLoading.status = true;
        //     try {
        //         const response = await fetch(url, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify(data)
        //         });
        //         await response.json();

        //         if (response.ok) {
        //             console.log('OK Registration');
        //             this.isLoading.status = false;
        //             return true;
        //         } else {
        //             console.log('FAIL Registration');
        //             this.isLoading.status = false;
        //             return false;
        //         }
        //     } catch (error) {
        //         this.isLoading.status = false;
        //         return console.error('Error:', error);
        //     }
        // },
        // loginAccount: async function (url, data) {
        //     this.isLoading.status = true;
        //     try {
        //         const response = await fetch(url, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify(data)
        //         });
        //         const responseData = await response.json();

        //         if (response.ok) {
        //             if (data.rememberMe) {
        //                 localStorage.setItem("rememberMe", true)
        //             };
        //             this.accountToken = responseData.token;
        //             localStorage.removeItem("accountToken");
        //             localStorage.setItem("accountToken", this.accountToken);
        //             this.isLoading.status = false;
        //             this.triggerFlash(
        //                 "success",
        //                 "Welcome back",
        //                 "You are now logged in."
        //             );
        //             return true;
        //         } else if (response.status === 403) {
        //             console.log('FAIL Login');
        //             this.isLoading.status = false;
        //             this.triggerFlash(
        //                 "warning",
        //                 "Invalid credentials",
        //                 "Double check the email address and password provided."
        //             );
        //             return false;
        //         } else {
        //             this.triggerFlash(
        //                 "danger",
        //                 "Login error",
        //                 "There was an error during the login process. Please try again later."
        //             );
        //             return false;
        //         }
        //     } catch (error) {
        //         this.isLoading.status = false;
        //         this.triggerFlash(
        //             "danger",
        //             "Login error",
        //             "There was an error during the login process. Please try again later."
        //         );
        //         return console.error('Error:', error);
        //     }
        // },
        // logoutAccount: function () {
        //     localStorage.removeItem("rememberMe");
        //     this.accountToken = null;
        //     localStorage.removeItem("accountToken");
        // },
        // changeEmail: async function (url, data) {
        //     this.isLoading.status = true;
        //     if (!url || !data.newEmail || !data.token) {
        //         this.isLoading.status = false;
        //         return false;
        //     }
        //     try {
        //         const response = await fetch(url, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify(data)
        //         });
        //         if (response.ok) {
        //             this.logoutAccount();
        //             this.isLoading.status = false;
        //             return true;
        //         } else {
        //             this.isLoading.status = false;
        //             return false;
        //         }
        //     } catch (error) {
        //         this.isLoading.status = false;
        //         return console.error('Error:', error);
        //     }
        // },
        // changePassword: async function (url, data) {
        //     this.isLoading.status = true;
        //     if (!url || !data.newPassword || !data.currentPassword || !data.token) {
        //         this.isLoading.status = false;
        //         console.log("Payload issue")
        //         console.log(data)
        //         return false;
        //     }
        //     try {
        //         console.log("Attempt API")
        //         const response = await fetch(url, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify(data)
        //         });
        //         if (response.ok) {
        //             console.log("Response OK")
        //             this.logoutAccount();
        //             this.isLoading.status = false;
        //             return true;
        //         } else {
        //             console.log("Response FAIL")
        //             this.isLoading.status = false;
        //             return false;
        //         }
        //     } catch (error) {
        //         this.isLoading.status = false;
        //         return console.error('Error:', error);
        //     }
        // }
    }
})