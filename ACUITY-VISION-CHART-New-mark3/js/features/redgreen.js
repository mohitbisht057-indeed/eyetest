/* RED / GREEN */
FEATURES["redgreen"] = {
    render(area, size) {

        const boxSize =
            Math.max(80, size);

        area.innerHTML = `
            <div style="
                display:flex;
                gap:30px;
                justify-content:center;
            ">

                <div style="
                    width:${boxSize}px;
                    height:${boxSize}px;
                    background:red;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    color:white;
                    font-weight:bold;
                ">
                    RED
                </div>

                <div style="
                    width:${boxSize}px;
                    height:${boxSize}px;
                    background:green;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    color:white;
                    font-weight:bold;
                ">
                    GREEN
                </div>

            </div>
        `;
    }
};
