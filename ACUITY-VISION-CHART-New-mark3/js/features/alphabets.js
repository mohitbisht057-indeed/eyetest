/* =====================================================
   ALPHABETS — CALIBRATED SVG LETTERS
===================================================== */


/* =====================================================
   CREATE ALPHABET OPTOTYPE
===================================================== */

function createAlphabetSvg(letter, size) {

    return `
        <svg
            viewBox="0 0 100 100"
            width="${size}"
            height="${size}"
            style="
                width:${size}px;
                height:${size}px;
                display:block;
                flex:none;
                overflow:visible;
            "
        >
            <text
                x="50"
                y="50"
                text-anchor="middle"
                dominant-baseline="central"
                font-family="Arial, Helvetica, sans-serif"
                font-size="138"
                font-weight="700"
                fill="#000000"
            >${letter}</text>
        </svg>
    `;
}


/* =====================================================
   ALPHABETS
===================================================== */

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


        /* SAME SIZE AS LANDOLT C */

        const level =
            ACUITY_LEVELS[currentLevel] || { label: "6/60" };

        const alphabetSize =
            typeof calculateLandoltSize === "function"
                ? calculateLandoltSize(level.label)
                : size;


        const letters =
            currentLevel === 0
                ? [alphabetLettersAt6_4[alphabetRowIndex]]
                : currentLevel === 7
                    ? alphabetSixFourRows[alphabetSixFourIndex]
                    : alphabetSets[currentLevel];


        area.innerHTML = `
            <div
                class="acuity-optotype-row"
                style="
                    gap:${letters.length > 1
                        ? getOptotypeGap(alphabetSize)
                        : 0}px;
                    align-items:center;
                    justify-content:center;
                "
            >

                ${
                    letters
                        .map(letter =>
                            createAlphabetSvg(
                                letter,
                                alphabetSize
                            )
                        )
                        .join("")
                }

            </div>
        `;
    },


    /* =================================================
       NEXT
    ================================================= */

    next() {

        /* 6/60 → 6/36 */

        if (currentLevel === 0) {

            currentLevel = 1;

            localStorage.setItem(
                "level_" + currentTest,
                currentLevel
            );

            renderFeature();

            return;
        }


        /* 6/4 → new 8-letter row */

        if (currentLevel === 7) {

            alphabetSixFourIndex++;

            if (alphabetSixFourIndex >= 10) {
                alphabetSixFourIndex = 0;
            }

            renderFeature();

            return;
        }


        /* Normal UP */

        if (
            currentLevel <
            ACUITY_LEVELS.length - 1
        ) {

            currentLevel++;

            localStorage.setItem(
                "level_" + currentTest,
                currentLevel
            );

            renderFeature();

            return;
        }
    },


    /* =================================================
       PREVIOUS
    ================================================= */

    prev() {

        /* 6/60 → previous letter */

        if (currentLevel === 0) {

            alphabetRowIndex++;

            if (
                alphabetRowIndex >=
                alphabetLettersAt6_4.length
            ) {
                alphabetRowIndex = 0;
            }

            renderFeature();

            return;
        }


        /* Bigger → smaller */

        if (currentLevel > 0) {

            currentLevel--;

            localStorage.setItem(
                "level_" + currentTest,
                currentLevel
            );

            renderFeature();

            return;
        }
    }
};