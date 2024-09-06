const processPasswordRecovery = async function (userStore, router, recoveryKey, newPassword, email) {
	try {
		userStore.isLoading.status = true;
		const response = await fetch(`/backend/user/processAccountRecovery`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				recoveryKey: recoveryKey,
				newPassword: newPassword,
				email: email,
			}),
		});

		await response.json();

		if (response.ok) {
			userStore.triggerFlash(
				"success",
				"Password changed successfully",
				"Your password has been reset. Please login with your new credentials."
			);
			return router.push("/");
		} else {
			userStore.triggerFlash(
				"warning",
				"Invalid data provided",
				"The login form is not properly filled."
			);
			return false;
		}
	} catch (error) {
		userStore.triggerFlash(
			"danger",
			"Server error",
			"There was an error during the process. Please try again later."
		);
		return false;
	} finally {
		userStore.isLoading.status = false;
	}
};

export { processPasswordRecovery }
