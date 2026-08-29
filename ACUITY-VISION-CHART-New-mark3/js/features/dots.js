/* DOTS */
FEATURES["dots"] = {
    render(area, size) {

        const dotSize =
            Math.max(8, size * 0.18);

        area.innerHTML = `
            <div style="
                display:flex;
                gap:${Math.max(10, size * 0.15)}px;
                justify-content:center;
                align-items:center;
            ">
                <div style="
                    width:${dotSize}px;
                    height:${dotSize}px;
                    border-radius:50%;
                    background:#222;
                "></div>

                <div style="
                    width:${dotSize}px;
                    height:${dotSize}px;
                    border-radius:50%;
                    background:#222;
                "></div>

                <div style="
                    width:${dotSize}px;
                    height:${dotSize}px;
                    border-radius:50%;
                    background:#222;
                "></div>

                <div style="
                    width:${dotSize}px;
                    height:${dotSize}px;
                    border-radius:50%;
                    background:#222;
                "></div>

                <div style="
                    width:${dotSize}px;
                    height:${dotSize}px;
                    border-radius:50%;
                    background:#222;
                "></div>
            </div>
        `;
    }
};
