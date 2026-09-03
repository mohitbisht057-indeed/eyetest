/* TUMBLING E — solid black, centered */

let tumblingRowIndex = 0;
let tumblingSixFourIndex = 0;


/* ================= TUMBLING E SVG ================= */

function createTumblingESvg(size, rotation) {

    return `
        <svg
            viewBox="0 0 100 100"
            style="
                width:${size}px;
                height:${size}px;
                display:block;
                flex:none;
                transform:rotate(${rotation}deg);
                transform-origin:center;
            "
        >

            <rect
                x="0"
                y="0"
                width="100"
                height="20"
                fill="#000000"
            />

            <rect
                x="0"
                y="40"
                width="100"
                height="20"
                fill="#000000"
            />

            <rect
                x="0"
                y="80"
                width="100"
                height="20"
                fill="#000000"
            />

            <rect
                x="0"
                y="0"
                width="20"
                height="100"
                fill="#000000"
            />

        </svg>
    `;
}


/* TUMBLING E — solid black, centered */

FEATURES["tumbling"] = {

    directions: [],

    render(area, size) {

        const rotations = [0, 90, 180, 270];

        const count =
            currentLevel === 7
                ? 8
                : currentLevel + 1;


        /* Generate directions if count changed */
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
                class="acuity-optotype-row"
                style="
                    gap:${count > 1 ? getOptotypeGap(size) : 0}px;
                    color:#000000;
                    opacity:1;
                "
            >

${
    Array.from(
        { length: count },
        (_, index) =>
            createTumblingESvg(
                size,
                this.directions[index]
            )
    ).join("")
}

            </div>
        `;
    },


    randomize() {

        const count =
            currentLevel === 7
                ? 8
                : currentLevel + 1;

        const rotations = [0, 90, 180, 270];

        this.directions = Array.from(
            { length: count },
            () =>
                rotations[
                    Math.floor(
                        Math.random() * rotations.length
                    )
                ]
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


        /* NEW RANDOM DIRECTIONS */
        const count =
            currentLevel === 7
                ? 8
                : currentLevel + 1;

        const rotations = [0, 90, 180, 270];

        this.directions = Array.from(
            { length: count },
            () =>
                rotations[
                    Math.floor(
                        Math.random() * rotations.length
                    )
                ]
        );


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


        /* NEW RANDOM DIRECTIONS */
        const count =
            currentLevel === 7
                ? 8
                : currentLevel + 1;

        const rotations = [0, 90, 180, 270];

        this.directions = Array.from(
            { length: count },
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