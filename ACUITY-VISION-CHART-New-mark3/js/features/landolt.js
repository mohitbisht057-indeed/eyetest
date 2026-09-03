/* LANDOLT C */

FEATURES["landolt"] = {

    directions: [],

    render(area, size) {

        const count = currentLevel + 1;

        const rotations = [0, 90, 180, 270];

        const level =
            ACUITY_LEVELS[currentLevel] || { label: "6/60" };

        const cSize =
            typeof calculateLandoltSize === "function"
                ? calculateLandoltSize(level.label)
                : size || 80;


        /* Make sure every C has its own random direction */
        if (this.directions.length !== count) {

            this.directions = Array.from(
                { length: count },
                () =>
                    rotations[
                        Math.floor(
                            Math.random() * rotations.length
                        )
                    ]
            );
        }


        area.innerHTML = `
            <div
                class="landolt-chart"
                style="
                    position:absolute;
                    inset:0;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    flex-wrap:wrap;
                    gap:${count > 1 ? getOptotypeGap(cSize) : 0}px;
                    opacity:1;
                "
            >

                ${
                    Array.from(
                        { length: count },
                        (_, i) =>
                            createLandoltCSvg(
                                cSize,
                                this.directions[i]
                            )
                    ).join("")
                }

            </div>
        `;
    },


    next() {

        if (currentLevel < ACUITY_LEVELS.length - 1) {

            currentLevel++;

            localStorage.setItem(
                "level_" + currentTest,
                currentLevel
            );

            /* New random directions for new row */
            const rotations = [0, 90, 180, 270];

            this.directions = Array.from(
                { length: currentLevel + 1 },
                () =>
                    rotations[
                        Math.floor(
                            Math.random() * rotations.length
                        )
                    ]
            );

            renderFeature();
        }
    },


    prev() {

        if (currentLevel > 0) {

            currentLevel--;

            localStorage.setItem(
                "level_" + currentTest,
                currentLevel
            );

            /* New random directions for new row */
            const rotations = [0, 90, 180, 270];

            this.directions = Array.from(
                { length: currentLevel + 1 },
                () =>
                    rotations[
                        Math.floor(
                            Math.random() * rotations.length
                        )
                    ]
            );

            renderFeature();
        }
    },


    randomize() {

        const rotations = [0, 90, 180, 270];

        this.directions = Array.from(
            { length: currentLevel + 1 },
            () =>
                rotations[
                    Math.floor(
                        Math.random() * rotations.length
                    )
                ]
        );

        renderFeature();
    }
};