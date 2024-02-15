import { useUserStore } from "../stores/UserStore.js";
const userStore = useUserStore();

export async function processPasswordRecovery(recoveryKey, newPassword, router) {
	try {

		const response = await fetch(`/backend/user/processAccountRecovery`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				recoveryKey: recoveryKey,
				newPassword: newPassword,
			}),
		});

		await response.json();

		if (response.ok) {
			userStore.triggerFlash(
				"success",
				"Password reset",
				"Your password has been reset. Please login with your new credentials"
			);
			return router.push("/login");
		} else {
			userStore.triggerFlash(
				"warning",
				"Invalid data provided",
				"The login form is not properly filled"
			);
			return false;
		}

	} catch (error) {

		return console.error("Error:", error);

	}
}
