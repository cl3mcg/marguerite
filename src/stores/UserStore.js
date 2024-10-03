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
                //     id: "8bc1b3fd-7587-4256-b7a0-cf97707c3908",
                //     type: null,
                //     title: "Neutral flash",
                //     message: "An example of a neutral flash displaying information",
                //     permanent: false
                // }
            ]
        }
    },
    actions: {
        triggerFlash: function (type = null, title = `Notification`, message, permanent = false) {
            // Ensure that there are no more than 5 flash messages at any given time
            if (this.flashMessages.length >= 5) {
                // Remove the oldest flash message (the first one in the array)
                this.flashMessages.splice(0, 1);
            }
            // Add the (new) flash message
            return this.flashMessages.push({
                id: self.crypto.randomUUID(),
                type: type,
                title: title,
                message: message,
                permanent: permanent
            });
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
        }
    }
})