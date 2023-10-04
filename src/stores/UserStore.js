import { defineStore } from "pinia"

export const useUserStore = defineStore("userStore", {
    state: function () {
        return {
            accountToken: null,
            isLoading: false,
            shownModal: null,
            // shownModal: {
            //     type: null,
            //     title: "neutral modal",
            //     message: "this is a test for a neutral modal message containing information that the user should focus its attention on",
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
        validateToken: async function (url, token) {
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
        },
        getAccountDetails: async function (url, token) {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
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
        },
        registerAccount: async function (url, data) {
            this.isLoading = true;
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                await response.json();

                if (response.ok) {
                    console.log('OK Registration');
                    this.isLoading = false;
                    return true;
                } else {
                    console.log('FAIL Registration');
                    this.isLoading = false;
                    return false;
                }
            } catch (error) {
                this.isLoading = false;
                return console.error('Error:', error);
            }
        },
        loginAccount: async function (url, data) {
            this.isLoading = true;
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const responseData = await response.json();

                if (response.ok) {
                    this.accountToken = responseData.token;
                    localStorage.removeItem("accountToken");
                    localStorage.setItem("accountToken", this.accountToken);
                    this.isLoading = false;
                    this.triggerFlash(
                        "success",
                        "Welcome back",
                        "You are now logged in"
                    );
                    return true;
                } else if (response.status === 403) {
                    console.log('FAIL Login');
                    this.isLoading = false;
                    this.triggerFlash(
                        "warning",
                        "Invalid credentials",
                        "Make sure to check your email address and password."
                    );
                    return false;
                } else {
                    this.triggerFlash(
                        "danger",
                        "Login error",
                        "There was an error during the login process. Please try again later."
                    );
                    return false;
                }
            } catch (error) {
                this.isLoading = false;
                return console.error('Error:', error);
            }
        },
        logoutAccount: function () {
            this.accountToken = null;
            localStorage.removeItem("accountToken");
        },
        changeEmail: async function (url, data) {
            this.isLoading = true;
            if (!url || !data.newEmail || !data.token) {
                this.isLoading = false;
                return false;
            }
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                if (response.ok) {
                    this.logoutAccount();
                    this.isLoading = false;
                    return true;
                } else {
                    this.isLoading = false;
                    return false;
                }
            } catch (error) {
                this.isLoading = false;
                return console.error('Error:', error);
            }
        },
        changePassword: async function (url, data) {
            this.isLoading = true;
            if (!url || !data.newPassword || !data.currentPassword || !data.token) {
                this.isLoading = false;
                console.log("Payload issue")
                console.log(data)
                return false;
            }
            try {
                console.log("Attempt API")
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                if (response.ok) {
                    console.log("Response OK")
                    this.logoutAccount();
                    this.isLoading = false;
                    return true;
                } else {
                    console.log("Response FAIL")
                    this.isLoading = false;
                    return false;
                }
            } catch (error) {
                this.isLoading = false;
                return console.error('Error:', error);
            }

        }
    }
})