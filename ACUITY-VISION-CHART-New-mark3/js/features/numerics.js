/* =====================================================
   NUMERICS — CALIBRATED SVG NUMBERS
===================================================== */


/* =====================================================
   CREATE CALIBRATED NUMBER SVG
===================================================== */

function createNumericSvg(number, size) {

    return `
        <svg
            class="numeric-optotype"
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
                class="numeric-letter"
                x="50"
                y="50"
                text-anchor="middle"
                dominant-baseline="central"
                font-family="Arial, Helvetica, sans-serif"
                font-size="138"
                font-weight="700"
                fill="#000000"
            >${number}</text>
        </svg>
    `;
}


/* =====================================================
   NUMERICS
===================================================== */

FEATURES["numerics"] = {

    render(area, size) {

        let numbers;


        /* =============================================
           SAME CALIBRATED SIZE AS LANDOLT C
        ============================================= */

        const level =
            ACUITY_LEVELS[currentLevel] || {
                label: "6/60"
            };


        const numericSize =
            typeof calculateLandoltSize === "function"
                ? calculateLandoltSize(level.label)
                : size;


        /* =============================================
           SELECT NUMBERS
        ============================================= */

        if (currentLevel === 0) {

            numbers = [
                numericSingleNumbers[
                    numericRowIndex
                ]
            ];

        } else if (currentLevel === 7) {

            numbers =
                numericSixFourRows[
                    numericSixFourIndex
                ];

        } else {

            numbers =
                numericSets[currentLevel];
        }


        /* =============================================
           RENDER
        ============================================= */

        area.innerHTML = `
            <div
                class="acuity-optotype-row"
                style="
                    gap:${
                        numbers.length > 1
                            ? getOptotypeGap(numericSize)
                            : 0
                    }px;
                    align-items:center;
                    justify-content:center;
                "
            >

                ${
                    numbers
                        .map(number =>
                            createNumericSvg(
                                number,
                                numericSize
                            )
                        )
                        .join("")
                }

            </div>
        `;
    },


    /* =============================================
       NEXT
    ============================================= */

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


        /* 6/4 → same size, new number row */

        if (currentLevel === 7) {

            numericSixFourIndex =
                (
                    numericSixFourIndex + 1
                ) %
                numericSixFourRows.length;

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


    /* =============================================
       PREVIOUS
    ============================================= */

    prev() {

        /* 6/60 → next number */

        if (currentLevel === 0) {

            numericRowIndex =
                (
                    numericRowIndex + 1
                ) %
                numericSingleNumbers.length;

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