/* LOGMAR — use the current app's chart rows. */
FEATURES["logmar"] = {
    render(area, size) {

        const letters = ["E F P", "T O Z", "L P E D", "P E C F", "E D F C Z P", "F E L O P Z D", "P E C F T", "D E F P O T E"];

        area.innerHTML = `
            <div style="
                font-size:${size}px;
                font-weight:bold;
            ">
                ${letters[currentLevel]}
            </div>
        `;
    }
};
