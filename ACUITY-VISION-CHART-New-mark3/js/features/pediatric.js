/* ================= PEDIATRIC ================= */

const pediatricImages = [
    "icons/image-1.png",
    "icons/image-2.png",
    "icons/image-3.png",
    "icons/image-4.png",
    "icons/image-5.png",
    "icons/image6.png"
];

const allenPreschoolImages = [
    "icons/pediatric.png",
    "icons/Pastes image(1).png",
    "icons/Pasted image(2).png",
    "icons/Pasted image (9).png",
    "icons/Pasted image (8).png",
    "icons/Pasted image (7).png",
    "icons/Pasted image (6).png",
    "icons/Pasted image (5).png",
    "icons/Pasted image (4).png"
];

let pediatricMode = "cards";
let pediatricSelectedIndex = 0;
let pediatricImageIndex = 0;


/* ================= FEATURE ================= */

FEATURES["pediatric"] = {

    render(area, size) {

        /* ================= CARD SCREEN ================= */

        if (pediatricMode === "cards") {

            area.innerHTML = `
                <div style="
                    width:100%;
                    height:100%;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    gap:30px;
                ">

                    <!-- ALLEN PRESCHOOL -->

                    <button
                        type="button"
                        onclick="selectPediatricMode('preschool')"
                        style="
                            width:300px;
                            height:220px;
                            border:none;
                            border-radius:14px;
                            background:var(--theme-color);
                            color:white;
                            cursor:pointer;
                            display:flex;
                            flex-direction:column;
                            align-items:center;
                            justify-content:center;
                            font-family:Arial,sans-serif;
                            font-weight:700;
                            box-shadow:var(--shadow-md);
                            outline:${pediatricSelectedIndex === 0
                                ? "4px solid #ffd21a"
                                : "none"};
                        "
                    >
                        <div style="
                            font-size:60px;
                            margin-bottom:20px;
                        ">
                            🐦
                        </div>

                        <div style="font-size:16px;">
                            ALLEN PRESCHOOL
                        </div>
                    </button>


                    <!-- IMAGES -->

                    <button
                        type="button"
                        onclick="selectPediatricMode('images')"
                        style="
                            width:300px;
                            height:220px;
                            border:none;
                            border-radius:14px;
                            background:var(--theme-color);
                            color:white;
                            cursor:pointer;
                            display:flex;
                            flex-direction:column;
                            align-items:center;
                            justify-content:center;
                            font-family:Arial,sans-serif;
                            font-weight:700;
                            box-shadow:var(--shadow-md);
                            outline:${pediatricSelectedIndex === 1
                                ? "4px solid #ffd21a"
                                : "none"};
                        "
                    >
                        <div style="
                            font-size:60px;
                            margin-bottom:20px;
                        ">
                            🦁
                        </div>

                        <div style="font-size:16px;">
                            IMAGES
                        </div>
                    </button>

                </div>
            `;

            return;
        }


        /* ================= IMAGE SCREEN ================= */

        const imageSet =
            pediatricMode === "preschool"
                ? allenPreschoolImages
                : pediatricImages;


        if (!imageSet.length) {
            area.innerHTML = "";
            return;
        }


        pediatricImageIndex =
            Math.max(
                0,
                Math.min(
                    pediatricImageIndex,
                    imageSet.length - 1
                )
            );


        area.innerHTML = `
            <div style="
                position:relative;
                width:100%;
                height:100%;
                display:flex;
                align-items:center;
                justify-content:center;
            ">

                <button
                    type="button"
                    onclick="backToPediatricCards()"
                    style="
                        position:absolute;
                        top:15px;
                        left:15px;
                        z-index:10;
                        border:none;
                        border-radius:8px;
                        background:var(--theme-strong);
                        color:white;
                        padding:10px 18px;
                        font:700 14px Arial,sans-serif;
                        cursor:pointer;
                    "
                >
                    BACK
                </button>

                <img
                    src="${imageSet[pediatricImageIndex]}"
                    alt="Pediatric image"
                    style="
                        max-width:80%;
                        max-height:80%;
                        width:auto;
                        height:auto;
                        object-fit:contain;
                        display:block;
                    "
                >

            </div>
        `;
    }
};


/* ================= CARD SELECTION ================= */

window.movePediatricSelection = function(direction) {

    if (pediatricMode !== "cards") return;

    /*
     * Only 2 cards:
     * LEFT  = card 0
     * RIGHT = card 1
     */

    if (direction === "left") {
        pediatricSelectedIndex = 0;
    }

    if (direction === "right") {
        pediatricSelectedIndex = 1;
    }

    /*
     * UP / DOWN toggle between the 2 cards
     */

    if (direction === "up" || direction === "down") {
        pediatricSelectedIndex =
            pediatricSelectedIndex === 0 ? 1 : 0;
    }

    renderFeature();
};


/* ================= ENTER / OK ================= */

window.activatePediatricSelection = function() {

    if (pediatricMode !== "cards") return;

    if (pediatricSelectedIndex === 0) {
        selectPediatricMode("preschool");
    } else {
        selectPediatricMode("images");
    }
};


/* ================= OPEN CARD ================= */

window.selectPediatricMode = function(mode) {

    pediatricMode = mode;
    pediatricImageIndex = 0;

    renderFeature();
};


/* ================= NEXT IMAGE ================= */

window.nextPediatricImage = function() {

    if (pediatricMode === "cards") return;

    const imageSet =
        pediatricMode === "preschool"
            ? allenPreschoolImages
            : pediatricImages;

    if (!imageSet.length) return;

    pediatricImageIndex++;

    if (pediatricImageIndex >= imageSet.length) {
        pediatricImageIndex = 0;
    }

    renderFeature();
};


/* ================= PREVIOUS IMAGE ================= */

window.previousPediatricImage = function() {

    if (pediatricMode === "cards") return;

    const imageSet =
        pediatricMode === "preschool"
            ? allenPreschoolImages
            : pediatricImages;

    if (!imageSet.length) return;

    pediatricImageIndex--;

    if (pediatricImageIndex < 0) {
        pediatricImageIndex = imageSet.length - 1;
    }

    renderFeature();
};


/* ================= BACK TO CARDS ================= */

window.backToPediatricCards = function() {

    pediatricMode = "cards";
    pediatricSelectedIndex = 0;
    pediatricImageIndex = 0;

    renderFeature();
};