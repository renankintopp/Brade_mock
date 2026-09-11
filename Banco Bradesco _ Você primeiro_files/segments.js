function handleSegments() {
    const buttons = segmentsMobile.getElementsByClassName('item');

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];

        button.onclick = () => {
            buttons[i == 0 ? 1 : 0].classList.remove('active');

            button.classList.toggle('active');
        }
    }
}

function initSegments() {
    handleSegments();
}

initSegments();