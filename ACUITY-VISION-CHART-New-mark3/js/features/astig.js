window.FEATURES = window.FEATURES || {};

FEATURES["astig"] = {

    currentAngle: 180,

    render(area, size) {

        /* =====================================================
           CLEANUP PREVIOUS RENDER FIRST
        ===================================================== */

        if (typeof area._astigCleanup === "function") {
            area._astigCleanup();
            area._astigCleanup = null;
        }

        area.innerHTML = "";

        area.style.position = "relative";
        area.style.overflow = "hidden";

        /* =====================================================
           SVG
        ===================================================== */

        const ns = "http://www.w3.org/2000/svg";

        const svg = document.createElementNS(ns, "svg");

        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("preserveAspectRatio", "none");

        svg.style.display = "block";
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.cursor = "pointer";
        svg.style.userSelect = "none";
        svg.style.touchAction = "none";

        area.appendChild(svg);

        function el(tag, attrs = {}) {

            const element =
                document.createElementNS(ns, tag);

            for (const key in attrs) {
                element.setAttribute(
                    key,
                    attrs[key]
                );
            }

            return element;
        }

        /* =====================================================
           DRAW
        ===================================================== */

        function draw() {

            const width = area.clientWidth;
            const height = area.clientHeight;

            if (!width || !height) {
                return;
            }

            svg.setAttribute(
                "viewBox",
                `0 0 ${width} ${height}`
            );

            while (svg.firstChild) {
                svg.removeChild(svg.firstChild);
            }

            /* =================================================
               BACKGROUND
            ================================================= */

            svg.appendChild(
                el("rect", {
                    x: 0,
                    y: 0,
                    width,
                    height,
                    fill: "#ffffff"
                })
            );

            /* =================================================
               GEOMETRY
            ================================================= */

            const cx = width * 0.50;

            /*
             * Move the center slightly upward so the
             * complete fan and numbers have more room.
             */
            const cy = height * 0.76;

            /*
             * Larger base size.
             *
             * Previously the fan was restricted too much.
             * Now it uses almost the entire available area.
             */

            const baseRadius = Math.min(
                width * 0.46,
                height * 0.72
            );

            /*
             * Support both small numeric size values
             * (1–8) and pixel-like size values.
             */

            let sizeScale;

            if (size <= 10) {

                /*
                 * SIZE 1 → 0.90
                 * SIZE 8 → 1.25
                 */
                sizeScale =
                    0.90 +
                    ((size - 1) * 0.05);

            } else {

                sizeScale =
                    Math.max(
                        0.90,
                        Math.min(
                            1.30,
                            size / 400
                        )
                    );
            }

            let r =
                baseRadius * sizeScale;

            /*
             * Final safety limits.
             */

            r = Math.min(
                r,
                width * 0.49,
                height * 0.75
            );

            r = Math.max(
                r,
                80
            );

            /* =================================================
               POINT CALCULATION
            ================================================= */

            function pt(deg, radius) {

                const rad =
                    deg * Math.PI / 180;

                return {
                    x:
                        cx +
                        radius *
                        Math.cos(rad),

                    y:
                        cy -
                        radius *
                        Math.sin(rad)
                };
            }

            /* =================================================
               OUTER ARC
            ================================================= */

            const p0 =
                pt(0, r);

            const p180 =
                pt(180, r);

            const lineWidth =
                Math.max(
                    2.5,
                    r * 0.006
                );

            svg.appendChild(
                el("path", {
                    d:
                        `M ${p180.x} ${p180.y}` +
                        ` A ${r} ${r} 0 0 1 ` +
                        `${p0.x} ${p0.y}`,

                    fill: "none",

                    stroke: "#111",

                    "stroke-width":
                        lineWidth
                })
            );

            /* =================================================
               BASE LINE
            ================================================= */

            svg.appendChild(
                el("line", {
                    x1: p180.x,
                    y1: cy,

                    x2: p0.x,
                    y2: cy,

                    stroke: "#111",

                    "stroke-width":
                        lineWidth
                })
            );

            /* =================================================
               NUMBERS
            ================================================= */

            const numberRadius =
                r +
                Math.max(
                    32,
                    r * 0.075
                );

            const fontSize =
                Math.max(
                    20,
                    r * 0.060
                );

            for (
                let d = 0;
                d <= 180;
                d += 10
            ) {

                const isCurrent =
                    d === FEATURES["astig"].currentAngle;

                let labelRadius =
                    numberRadius;

                /*
                 * Pull selected number slightly inward.
                 */

                if (isCurrent) {
                    labelRadius -= 14;
                }

                const pos =
                    pt(
                        d,
                        labelRadius
                    );

                const text =
                    el("text", {

                        x: pos.x,

                        y: pos.y,

                        "text-anchor":
                            "middle",

                        "dominant-baseline":
                            "middle",

                        "font-size":
                            fontSize,

                        fill: "#111",

                        "font-weight":
                            isCurrent
                                ? "700"
                                : "600",

                        style:
                            "cursor:pointer;"
                    });

                text.textContent = d;

                text.addEventListener(
                    "click",
                    function (e) {

                        e.stopPropagation();

                        FEATURES["astig"]
                            .currentAngle = d;

                        draw();
                    }
                );

                svg.appendChild(text);
            }

            /* =================================================
               MOVABLE ARROW
            ================================================= */

            const numRadius =
                numberRadius;

            const tipRadius =
                numRadius + 22;

            const headBaseRadius =
                tipRadius + 16;

            const tailRadius =
                tipRadius + 40;

            const angle =
                FEATURES["astig"]
                    .currentAngle;

            const arrowTip =
                pt(
                    angle,
                    tipRadius
                );

            const arrowStart =
                pt(
                    angle,
                    tailRadius
                );

            const arrowHead1 =
                pt(
                    angle - 2.5,
                    headBaseRadius
                );

            const arrowHead2 =
                pt(
                    angle + 2.5,
                    headBaseRadius
                );

            const arrowGroup =
                el("g");

            /* Arrow shaft */

            arrowGroup.appendChild(
                el("line", {

                    x1:
                        arrowStart.x,

                    y1:
                        arrowStart.y,

                    x2:
                        arrowTip.x,

                    y2:
                        arrowTip.y,

                    stroke: "#111",

                    "stroke-width":
                        lineWidth,

                    "stroke-linecap":
                        "round"
                })
            );

            /* Arrow head */

            arrowGroup.appendChild(
                el("polygon", {

                    points: `
                        ${arrowTip.x},${arrowTip.y}
                        ${arrowHead1.x},${arrowHead1.y}
                        ${arrowHead2.x},${arrowHead2.y}
                    `,

                    fill: "#111"
                })
            );

            svg.appendChild(
                arrowGroup
            );

            /* =================================================
               CENTER SYMBOLS
            ================================================= */

            const shiftUp =
                Math.max(
                    18,
                    r * 0.15
                );

            const blockCy =
                cy - shiftUp;

            const centerSymbols =
                el("g", {

                    transform:
                        `rotate(` +
                        `${180 - angle}, ` +
                        `${cx}, ` +
                        `${blockCy})`
                });

            const spacing =
                Math.max(
                    8,
                    r * 0.027
                );

            const blockSize =
                spacing * 4;

            const gap =
                spacing * 1.5;

            /* =================================================
               TOP 5 HORIZONTAL LINES
            ================================================= */

            const topGroup =
                el("g");

            for (
                let i = 0;
                i < 5;
                i++
            ) {

                const y =
                    blockCy -
                    gap / 2 -
                    blockSize +
                    (i * spacing);

                topGroup.appendChild(
                    el("line", {

                        x1:
                            cx -
                            blockSize / 2,

                        y1: y,

                        x2:
                            cx +
                            blockSize / 2,

                        y2: y,

                        stroke: "#111",

                        "stroke-width":
                            lineWidth,

                        "stroke-linecap":
                            "round"
                    })
                );
            }

            centerSymbols.appendChild(
                topGroup
            );

            /* =================================================
               BOTTOM 5 VERTICAL LINES
            ================================================= */

            const bottomGroup =
                el("g");

            for (
                let i = 0;
                i < 5;
                i++
            ) {

                const x =
                    cx -
                    blockSize / 2 +
                    (i * spacing);

                bottomGroup.appendChild(
                    el("line", {

                        x1: x,

                        y1:
                            blockCy +
                            gap / 2,

                        x2: x,

                        y2:
                            blockCy +
                            gap / 2 +
                            blockSize,

                        stroke: "#111",

                        "stroke-width":
                            lineWidth,

                        "stroke-linecap":
                            "round"
                    })
                );
            }

            centerSymbols.appendChild(
                bottomGroup
            );

            svg.appendChild(
                centerSymbols
            );
        }

        /* =====================================================
           CHANGE ANGLE
        ===================================================== */

        function changeAngle(direction) {

            FEATURES["astig"]
                .currentAngle +=
                direction * 10;

            if (
                FEATURES["astig"]
                    .currentAngle < 0
            ) {
                FEATURES["astig"]
                    .currentAngle = 180;
            }

            if (
                FEATURES["astig"]
                    .currentAngle > 180
            ) {
                FEATURES["astig"]
                    .currentAngle = 0;
            }

            draw();
        }

        /* =====================================================
           KEYBOARD
        ===================================================== */

        function keydownHandler(e) {

            if (!area.isConnected) {
                return;
            }

            if (
                e.key === "ArrowRight" ||
                e.key === "ArrowDown"
            ) {

                e.preventDefault();

                changeAngle(-1);

            } else if (
                e.key === "ArrowLeft" ||
                e.key === "ArrowUp"
            ) {

                e.preventDefault();

                changeAngle(1);
            }
        }

        window.addEventListener(
            "keydown",
            keydownHandler
        );

        /* =====================================================
           CLICK
        ===================================================== */

        function clickHandler(e) {

            /*
             * Angle numbers have their own
             * click handler.
             */

            if (
                e.target &&
                e.target.tagName &&
                e.target.tagName
                    .toLowerCase() === "text"
            ) {
                return;
            }

            const rect =
                svg.getBoundingClientRect();

            const x =
                e.clientX -
                rect.left;

            if (
                x >
                rect.width / 2
            ) {

                changeAngle(-1);

            } else {

                changeAngle(1);
            }
        }

        svg.addEventListener(
            "click",
            clickHandler
        );

        /* =====================================================
           RESIZE
        ===================================================== */

        function resizeHandler() {
            draw();
        }

        window.addEventListener(
            "resize",
            resizeHandler
        );

        /* =====================================================
           CLEANUP FUNCTION
        ===================================================== */

        area._astigCleanup =
            function () {

                window.removeEventListener(
                    "keydown",
                    keydownHandler
                );

                window.removeEventListener(
                    "resize",
                    resizeHandler
                );

                svg.removeEventListener(
                    "click",
                    clickHandler
                );
            };

        /* =====================================================
           INITIAL DRAW
        ===================================================== */

        draw();
    }
};
