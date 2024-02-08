function togglePasswordView(toggleBtn, passwordInput) {
    toggleBtn.addEventListener("click", () => {
        if (passwordInput.getAttribute("type") == "password") {
            passwordInput.setAttribute("type", "text");
            toggleBtn.setAttribute("src", "/img/bootstrap-icons/eye-slash-fill.svg");
        } else {
            passwordInput.setAttribute("type", "password");
            toggleBtn.setAttribute("src", "/img/bootstrap-icons/eye-fill.svg");
        }
    });
}

function blockChar(badChars, event) {
    switch (event.type) {
        case "keypress":
            let pressedKey = event.key;
            let isBadKey = false;
            badChars.forEach((badChar) => {
                if (pressedKey == badChar)
                    isBadKey = true;
            });
            return isBadKey;
            break;
        case "paste":
            let pastedText = event.clipboardData.getData('text');
            isBadPaste = false;
            badChars.forEach((badChar) =>
            {
                if(pastedText.includes(badChar))
                    isBadPaste = true;

            });
            return isBadPaste;
            break;
    }
}
