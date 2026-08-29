/* EDUCATIONAL */
FEATURES["educational"] = {
    render(area, size) {

        const values = [
            "A",
            "B",
            "C",
            "1",
            "2",
            "3"
        ];

        area.innerHTML = `
            <div style="
                font-size:${size}px;
                font-weight:bold;
            ">
                ${values[currentLevel % values.length]}
            </div>
        `;
    }
};
