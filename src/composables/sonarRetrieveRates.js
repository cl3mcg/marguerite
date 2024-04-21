const retrieveRates = async function (userStore, selection) {
    try {
        const response = await fetch(`/backend/rate/getRate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                portOfLoading: selection.selectedPOL,
                portOfDestination: selection.selectedPOD,
                startTimeFrame: selection.selectedDates[0],
                endTimeFrame: selection.selectedDates[1],
                carriers: selection.selectedCarriers,
                modality: selection.selectedModality,
            }),
        });
        const dataReceived = await response.json();

        if (response.ok) {
            console.log("Response received");
            console.log(dataReceived);
            const validDataArray = dataReceived.data.filter((entry) => entry.months.length > 0)
            if (validDataArray.length <= 0) {
                userStore.triggerFlash(
                    "warning",
                    "No match",
                    "There's no data matching your selection."
                );
                return false;
            }
            return dataReceived;
        } else {
            console.log("FAIL rates request");
            return false;
        }
    } catch (error) {
        userStore.triggerFlash(
            "danger",
            "Server error",
            "The rates cannot be retrived for the time being."
        );
        console.error("Error:", error);
        return false
    }
};

export { retrieveRates }