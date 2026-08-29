/* LANDOLT C */
FEATURES["landolt"] = {
    render(area, size) {

        const count = currentLevel + 1;

        const rotations = [
            0,
            90,
            180,
            270
        ];

        area.innerHTML = `
            <div style="
                display:flex;
                justify-content:center;
                align-items:center;
                flex-wrap:wrap;
                gap:${Math.max(10, size * 0.15)}px;
                width:100%;
            ">
                ${
                    Array.from(
                        { length: count },
                        (_, i) => `
                            <div
                                class="landolt-c"
                                style="
                                    width:${size}px;
                                    height:${size}px;
                                    border-width:${Math.round(size / 5)}px;
                                    transform:rotate(${rotations[i % 4]}deg);
                                "
                            ></div>
                        `
                    ).join("")
                }
            </div>
        `;
    }
};
