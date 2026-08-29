/* PERIPHERAL */
FEATURES["peripheral"] = {
    render(area, size) {

        const peripheralSize =
            Math.max(30, size * 0.35);

        area.innerHTML = `
            <div style="
                position:relative;
                width:500px;
                height:350px;
                font-size:${peripheralSize}px;
                font-weight:bold;
            ">

                <span style="
                    position:absolute;
                    top:0;
                    left:50%;
                ">9</span>

                <span style="
                    position:absolute;
                    right:0;
                    top:50%;
                ">4</span>

                <span style="
                    position:absolute;
                    bottom:0;
                    left:50%;
                ">2</span>

                <span style="
                    position:absolute;
                    left:0;
                    top:50%;
                ">7</span>

            </div>
        `;
    }
};
