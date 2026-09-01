/* PEDIATRIC */

const pediatricImages = [
    "icons/image-1.png",
    "icons/image-2.png",
    "icons/image-3.png",
    "icons/image-4.png",
    "icons/image-5.png",
    "icons/image6.png",
    
];


/* ADD YOUR ALLEN PRESCHOOL IMAGES HERE */

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


let pediatricMode = null;
let pediatricImageIndex = 0;


/* ================= PEDIATRIC ================= */

FEATURES["pediatric"] = {

    render(area, size) {

        /* ================= MENU / 2 CARDS ================= */

        if (pediatricMode === null) {

            area.innerHTML = `
                <div style="
                    width:100%;
                    height:100%;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    gap:30px;
                    box-sizing:border-box;
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
                        "
                    >
                        <div style="
                            font-size:60px;
                            margin-bottom:20px;
                        ">
                            🐦
                        </div>

                        <div style="
                            font-size:16px;
                        ">
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
                        "
                    >
                        <div style="
                            font-size:60px;
                            margin-bottom:20px;
                        ">
                            🦁
                        </div>

                        <div style="
                            font-size:16px;
                        ">
                            IMAGES
                        </div>
                    </button>

                </div>
            `;

            return;
        }


        /* ================= IMAGE SET ================= */

        const imageSet =
            pediatricMode === "preschool"
                ? allenPreschoolImages
                : pediatricImages;


        if (!imageSet.length) {

            area.innerHTML = `
                <div style="
                    width:100%;
                    height:100%;
                    padding:30px;
                    box-sizing:border-box;
                    font:18px Arial,sans-serif;
                    color:#777;
                ">
                    No images found.
                </div>
            `;

            return;
        }


        /* Keep index valid */

        if (pediatricImageIndex >= imageSet.length) {
            pediatricImageIndex = 0;
        }

        if (pediatricImageIndex < 0) {
            pediatricImageIndex = imageSet.length - 1;
        }


        const image = imageSet[pediatricImageIndex];


        /* ================= IMAGE SCREEN ================= */

        area.innerHTML = `
            <div style="
                position:relative;
                width:100%;
                height:100%;
                box-sizing:border-box;
                padding:24px;
            ">

                <!-- BACK BUTTON -->

                <button
                    type="button"
                    onclick="backToPediatricMenu()"
                    style="
                        position:absolute;
                        top:70px;
                        left:20px;
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


                <!-- IMAGE — CENTER -->

<div style="
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    box-sizing:border-box;
">

                    <img
                        src="${image}"
                        alt="Pediatric chart"
                        style="
                            max-width:75%;
                            max-height:75%;
                            width:auto;
                            height:auto;
                            object-fit:contain;
                            display:block;
                        "
                    >

                </div>

            </div>
        `;
    },


    /* ================= NEXT IMAGE ================= */

    next() {

        if (pediatricMode === null) {
            return;
        }

        const imageSet =
            pediatricMode === "preschool"
                ? allenPreschoolImages
                : pediatricImages;

        if (!imageSet.length) {
            return;
        }

        pediatricImageIndex++;

        if (pediatricImageIndex >= imageSet.length) {
            pediatricImageIndex = 0;
        }

        renderFeature();
    },


    /* ================= PREVIOUS IMAGE ================= */

    prev() {

        if (pediatricMode === null) {
            return;
        }

        const imageSet =
            pediatricMode === "preschool"
                ? allenPreschoolImages
                : pediatricImages;

        if (!imageSet.length) {
            return;
        }

        pediatricImageIndex--;

        if (pediatricImageIndex < 0) {
            pediatricImageIndex = imageSet.length - 1;
        }

        renderFeature();
    }
};


/* ================= SELECT CARD ================= */

function selectPediatricMode(mode) {

    pediatricMode = mode;

    pediatricImageIndex = 0;

    renderFeature();
}


/* ================= BACK BUTTON ================= */

function backToPediatricMenu() {

    pediatricMode = null;

    pediatricImageIndex = 0;

    renderFeature();
}