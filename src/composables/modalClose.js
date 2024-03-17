const modalClose = function (identifier) {
    try {
        if (identifier) {
            const closeModalButton = document.querySelector(`${identifier}`)
            closeModalButton.click()
        } else {
            const closeModalButtons = document.querySelectorAll('.close-modal-button')
            if (closeModalButtons && closeModalButtons.length > 0) {
                for (let button of closeModalButtons) {
                    button.click()
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
};

export { modalClose };