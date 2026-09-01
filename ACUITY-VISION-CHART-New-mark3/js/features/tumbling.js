/* TUMBLING E — solid black, centered */

let tumblingRowIndex = 0;
let tumblingSixFourIndex = 0;

FEATURES["tumbling"] = {

    directions: [],

    render(area, size) {

        const rotations = [0, 90, 180, 270];

        const count =
            currentLevel === 7
                ? 8
                : currentLevel + 1;

        const directionOffset =
            currentLevel === 0
                ? tumblingRowIndex
                : currentLevel === 7
                    ? tumblingSixFourIndex
                    : 0;

        area.innerHTML = `
            <div
                style="
                    width:100%;
                    height:100%;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    gap:${Math.max(56, size * 0.5)}px;
                    color:#000000;
                    opacity:1;
                "
            >

                ${
                    Array.from(
                        { length: count },
                        (_, index) => `
                            <span
                                style="
                                    display:inline-block;
                                    color:#000000;
                                    font-family:Arial,sans-serif;
                                    font-size:${size}px;
                                    font-weight:700;
                                    line-height:1;
                                    transform:rotate(${
                                        this.directions[index] ?? rotations[
                                            (index + directionOffset) % rotations.length
                                        ]
                                    }deg);
                                    opacity:1;
                                "
                            >
                                E
                            </span>
                        `
                    ).join("")
                }

            </div>
        `;
    },

    randomize() {
        const count = currentLevel === 7 ? 8 : currentLevel + 1;
        const rotations = [0, 90, 180, 270];
        this.directions = Array.from(
            { length: count },
            () => rotations[Math.floor(Math.random() * rotations.length)]
        );
        renderFeature();
    },


    next() {

        if (currentLevel === 7) {

            tumblingSixFourIndex =
                (tumblingSixFourIndex + 1) % 10;

        } else {

            currentLevel++;

            localStorage.setItem(
                "level_" + currentTest,
                currentLevel
            );
        }

        renderFeature();
    },


    prev() {

        if (currentLevel === 0) {

            tumblingRowIndex =
                (tumblingRowIndex + 1) % 4;

        } else {

            currentLevel--;

            localStorage.setItem(
                "level_" + currentTest,
                currentLevel
            );
        }

        renderFeature();
    }
};
