/* CONTRAST */
FEATURES["contrast"] = {
    render(area, size) {

        const contrastValues = [
            100,
            80,
            60,
            40,
            20,
            10,
            5,
            2
        ];

        const percentage =
            contrastValues[currentLevel];

        const grey =
            255 -
            Math.round(
                percentage * 2.55
            );

        const circleSize =
            Math.max(100, size + 100);

        const dotSize =
            Math.max(10, size * 0.18);

        area.innerHTML = `
            <div style="
                display:flex;
                flex-direction:column;
                align-items:center;
                gap:20px;
            ">

                <div style="
                    width:${circleSize}px;
                    height:${circleSize}px;
                    border-radius:50%;
                    background:rgb(
                        ${grey},
                        ${grey},
                        ${grey}
                    );
                    display:flex;
                    align-items:center;
                    justify-content:center;
                ">

                    <div style="
                        width:${dotSize}px;
                        height:${dotSize}px;
                        border-radius:50%;
                        background:#222;
                    "></div>

                </div>

                <div style="
                    font-size:24px;
                    font-weight:bold;
                ">
                    ${percentage}% CONTRAST
                </div>

            </div>
        `;
    }
};
