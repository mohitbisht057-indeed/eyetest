/* RED / GREEN DUOCHROME */

FEATURES["redgreen"] = {

    render(area, size) {

        const cSize = Math.max(100, size);


        function createLandoltC(rotation = 0) {

            const stroke = 14;

            return `
                <div
                    style="
                        width:${cSize}px;
                        height:${cSize}px;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        transform:rotate(${rotation}deg);
                        flex:none;
                    "
                >
                    <svg
                        viewBox="0 0 100 100"
                        width="${cSize}"
                        height="${cSize}"
                        style="
                            width:100%;
                            height:100%;
                            display:block;
                        "
                    >

                        <circle
                            cx="50"
                            cy="50"
                            r="36"
                            fill="none"
                            stroke="#000000"
                            stroke-width="${stroke}"
                            stroke-linecap="butt"
                            stroke-dasharray="185 42"
                        />

                    </svg>
                </div>
            `;
        }


        area.innerHTML = `

            <div
                style="
                    position:absolute;
                    inset:0;
                    width:100%;
                    height:100%;
                    display:flex;
                    overflow:hidden;
                    background:#000;
                "
            >

                <!-- RED HALF -->

                <div
                    style="
                        position:relative;
                        width:50%;
                        height:100%;
                        background:#ff0000;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                    "
                >

                    ${createLandoltC(0)}

                    <div
                        style="
                            position:absolute;
                            left:30px;
                            top:50%;
                            transform:translateY(-50%);
                            color:#000000;
                            font:16px Arial,sans-serif;
                            font-weight:400;
                        "
                    >
                        ${ACUITY_LEVELS[currentLevel]?.label || "6/60"}
                    </div>

                </div>


                <!-- GREEN HALF -->

                <div
                    style="
                        position:relative;
                        width:50%;
                        height:100%;
                        background:#00a000;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                    "
                >

                    ${createLandoltC(0)}

                    <div
                        style="
                            position:absolute;
                            right:30px;
                            top:50%;
                            transform:translateY(-50%);
                            color:#000000;
                            font:16px Arial,sans-serif;
                            font-weight:400;
                        "
                    >
                        ${ACUITY_LEVELS[currentLevel]?.label || "6/60"}
                    </div>

                </div>

            </div>
        `;
    }
};