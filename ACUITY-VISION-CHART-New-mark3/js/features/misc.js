/* MISC */
FEATURES["misc"] = {
    render(area, size) {

        const symbols = [
            "○",
            "□",
            "△",
            "+",
            "×",
            "●"
        ];

        area.innerHTML = `
            <div style="
                font-size:${size}px;
                font-weight:bold;
            ">
                ${symbols[currentLevel % symbols.length]}
            </div>
        `;
    }
};
