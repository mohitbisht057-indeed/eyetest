/* ALPHABETS */
FEATURES["alphabets"] = {
    render(area, size) {

        const alphabetSets = [
            ["K"],
            ["R", "D"],
            ["R", "Z", "K"],
            ["R", "Z", "K", "D"],
            ["R", "D", "S", "K", "H"],
            ["R", "Z", "K", "D", "H", "N"],
            ["Z", "D", "S", "K", "R", "N", "H"],
            ["R", "Z", "K", "D", "H", "N", "S", "R"]
        ];

        const alphabetSixFourRows = [
            ["R", "Z", "K", "D", "H", "N", "S", "R"],
            ["K", "D", "R", "H", "S", "N", "Z", "P"],
            ["N", "S", "R", "K", "D", "P", "H", "Z"],
            ["D", "K", "N", "R", "Z", "S", "P", "H"],
            ["H", "R", "P", "D", "N", "K", "S", "Z"],
            ["P", "H", "D", "K", "R", "N", "S", "Z"],
            ["Z", "N", "K", "S", "D", "R", "H", "P"],
            ["R", "H", "N", "P", "Z", "K", "D", "S"],
            ["D", "P", "S", "R", "H", "Z", "N", "K"],
            ["K", "N", "R", "D", "P", "S", "H", "Z"]
        ];

        const letters =
            currentLevel === 0
                ? [alphabetLettersAt6_4[alphabetRowIndex]]
                : currentLevel === 7
                    ? alphabetSixFourRows[alphabetSixFourIndex]
                    : alphabetSets[currentLevel];

        area.innerHTML = `
            <div style="
                display:flex;
                justify-content:center;
                align-items:center;
                gap:${Math.max(56, size * 0.5)}px;
                width:100%;
            ">
                ${letters.map(letter => `
                    <span style="
                        font-size:${size}px;
                        font-weight:bold;
                        line-height:1;
                        color:#000000;
                    ">
                        ${letter}
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

        // 6/4 → same size, new 8-letter row
        if (currentLevel === 7) {

            alphabetSixFourIndex++;

            if (alphabetSixFourIndex >= 10) {
                alphabetSixFourIndex = 0;
            }

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

        // 6/60 → same size, previous letter
        if (currentLevel === 0) {

            alphabetRowIndex++;

            if (alphabetRowIndex >= alphabetLettersAt6_4.length) {
                alphabetRowIndex = 0;
            }

            renderFeature();
            return;
        }

        // Bigger size → smaller size
        if (currentLevel > 0) {

            currentLevel--;

            localStorage.setItem("level_" + currentTest, currentLevel);

            renderFeature();
            return;
        }
    }
};
