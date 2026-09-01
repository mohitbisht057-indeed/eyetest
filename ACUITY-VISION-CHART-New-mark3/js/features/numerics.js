/* NUMERICS */
FEATURES["numerics"] = {
    render(area, size) {

        let numbers;

        // 6/60 → one number
        if (currentLevel === 0) {
            numbers = [numericSingleNumbers[numericRowIndex]];
        // 6/4 → 8 numbers, same size
        } else if (currentLevel === 7) {
            numbers = numericSixFourRows[numericSixFourIndex];
        // Normal levels
        } else {
            numbers = numericSets[currentLevel];
        }

        area.innerHTML = `
            <div style="
                display:flex;
                justify-content:center;
                align-items:center;
                gap:${numbers.length > 1 ? getOptotypeGap(size) : 0}px;
                width:100%;
            ">
                ${numbers.map(number => `
                    <span style="
                        display:grid;
                        place-items:center;
                        width:${size}px;
                        height:${size}px;
                        font-size:${size}px;
                        font-weight:bold;
                        line-height:1;
                        color:#000000;
                    ">
                        ${number}
                    </span>
                `).join("")}
            </div>
        `;
    },

    next() {

        // 6/60 → 6/36
        if (currentLevel === 0) {

            currentLevel = 1;

            localStorage.setItem("level_" + currentTest, currentLevel);

            renderFeature();
            return;
        }

        // 6/4 → same size, new number row
        if (currentLevel === 7) {

            numericSixFourIndex =
                (numericSixFourIndex + 1) %
                numericSixFourRows.length;

            renderFeature();
            return;
        }

        // Normal UP
        if (currentLevel < ACUITY_LEVELS.length - 1) {

            currentLevel++;

            localStorage.setItem("level_" + currentTest, currentLevel);

            renderFeature();
            return;
        }
    },

    prev() {

        // 6/60 → same-size next number
        if (currentLevel === 0) {

            numericRowIndex =
                (numericRowIndex + 1) %
                numericSingleNumbers.length;

            renderFeature();
            return;
        }

        // 6/36 → 6/60
        if (currentLevel > 0) {

            currentLevel--;

            localStorage.setItem("level_" + currentTest, currentLevel);

            renderFeature();
            return;
        }
    }
};
