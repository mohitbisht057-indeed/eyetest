/* LANDOLT C */

FEATURES["landolt"] = {

    render(area, size) {

        const count = currentLevel + 1;

        const rotations = [0, 90, 180, 270];

        const level =
            ACUITY_LEVELS[currentLevel] || { label: "6/60" };

        const cSize =
            typeof calculateLandoltSize === "function"
                ? calculateLandoltSize(level.label)
                : size || 80;


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
                    gap:${Math.max(10, cSize * 0.15)}px;
                    opacity:1;
                "
            >

                ${
                    Array.from(
                        { length: count },
                        (_, i) =>
                            createLandoltCSvg(
                                cSize,
                                rotations[i % 4]
                            )
                    ).join("")
                }

            </div>
        `;
    }
};
