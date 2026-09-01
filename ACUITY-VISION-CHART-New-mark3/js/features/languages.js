/* LANGUAGES (handles every entry in LANGUAGE_NAMES) */
FEATURES["_language"] = {
    render(area, size) {

        const letters =
            LANGUAGE_LETTERS[currentTest] ||
            ["A", "B", "C", "D"];

        const rtlLanguages = [
            "urdu",
            "arabic",
            "persian",
            "hebrew",
            "sindhi",
            "kashmiri"
        ];

        const direction =
            rtlLanguages.includes(currentTest)
                ? "direction:rtl;"
                : "";

        // 6/4 ke multiple 8-character rows
        const languageSixFourRows = [
            [
                letters[0], letters[1], letters[2], letters[3],
                letters[0], letters[1], letters[2], letters[3]
            ],
            [
                letters[3], letters[2], letters[1], letters[0],
                letters[3], letters[2], letters[1], letters[0]
            ],
            [
                letters[1], letters[3], letters[0], letters[2],
                letters[1], letters[3], letters[0], letters[2]
            ],
            [
                letters[2], letters[0], letters[3], letters[1],
                letters[2], letters[0], letters[3], letters[1]
            ],
            [
                letters[0], letters[2], letters[3], letters[1],
                letters[3], letters[0], letters[1], letters[2]
            ],
            [
                letters[1], letters[0], letters[2], letters[3],
                letters[2], letters[3], letters[1], letters[0]
            ],
            [
                letters[3], letters[1], letters[2], letters[0],
                letters[0], letters[2], letters[3], letters[1]
            ],
            [
                letters[2], letters[3], letters[0], letters[1],
                letters[1], letters[0], letters[3], letters[2]
            ],
            [
                letters[0], letters[3], letters[1], letters[2],
                letters[2], letters[1], letters[3], letters[0]
            ],
            [
                letters[3], letters[0], letters[2], letters[1],
                letters[1], letters[2], letters[0], letters[3]
            ]
        ];

        let currentLetters;

        // 6/60 → one character
        if (currentLevel === 0) {

            currentLetters = [
                letters[languageRowIndex % letters.length]
            ];

        // 6/4 → 8 characters, same size
        } else if (currentLevel === 7) {

            currentLetters =
                languageSixFourRows[
                    languageSixFourIndex %
                    languageSixFourRows.length
                ];

        // Normal levels
        } else {

            const count = currentLevel + 1;

            currentLetters =
                Array.from(
                    { length: count },
                    (_, i) => letters[i % letters.length]
                );
        }

        area.innerHTML = `
            <div
                style="
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    gap:${Math.max(56, size * 0.5)}px;
                    width:100%;
                    ${direction}
                "
            >
                ${currentLetters.map(letter => `
                    <span
                        class="language"
                        style="
                            font-size:${size}px;
                            font-weight:bold;
                            line-height:1;
                            color:#000000;
                        "
                    >
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

        // 6/4 → same size, new 8-character row
        if (currentLevel === 7) {

            languageSixFourIndex =
                (languageSixFourIndex + 1) % 10;

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

        // 6/60 → same size, next character
        if (currentLevel === 0) {

            languageRowIndex =
                (languageRowIndex + 1) % 4;

            renderFeature();
            return;
        }

        // Bigger level → previous size
        if (currentLevel > 0) {

            currentLevel--;

            localStorage.setItem("level_" + currentTest, currentLevel);

            renderFeature();
            return;
        }
    }
};
