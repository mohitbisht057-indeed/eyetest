/* ================= EDUCATIONAL ================= */

let educationalTopicIndex = 0;
let educationalImageIndex = 0;
let educationalMode = "topics";


const educationalTopics = [
    "ANATOMY",
    "ASTIGMATISM",
    "CATARACT",
    "CONTACTS",
    "DIABETIC",
    "DRY EYE",
    "GENERAL",
    "GLAUCOMA",
    "IOL",
    "LASIK",
    "MACULAR",
    "MYOPIA",
    "OPTICALS",
    "RETINAL"
];


const educationalImages = {

    "ANATOMY": [
        "icons/ishihara/Educational/anatomy-1.png",
        "icons/ishihara/Educational/anatomy-2.png",
        "icons/ishihara/Educational/anatomy-3.png",
        "icons/ishihara/Educational/anatomy-4.png",
        "icons/ishihara/Educational/anatomy-5.png",
        "icons/ishihara/Educational/anatomy-6.png",
        "icons/ishihara/Educational/anatomy-7.png"
    ],

    "ASTIGMATISM": [
        "icons/ishihara/Educational/astigmatism-1.png",
        "icons/ishihara/Educational/astigmatism-2.png",
        "icons/ishihara/Educational/astigmatism-3.png",
        "icons/ishihara/Educational/astigmatism-5.png",
        "icons/ishihara/Educational/astigmatism-6.png"
    ],

    "CATARACT": [
        "icons/ishihara/Educational/cataract-1.png",
        "icons/ishihara/Educational/cataract-2.png",
        "icons/ishihara/Educational/cataract-3.png",
        "icons/ishihara/Educational/cataract-4.png",
        "icons/ishihara/Educational/cataract-5.png",
        "icons/ishihara/Educational/cataract-6.png"
    ],

    "CONTACTS": [
        "icons/ishihara/Educational/contacts-1.png",
        "icons/ishihara/Educational/contacts-2.png",
        "icons/ishihara/Educational/contacts-3.png",
        "icons/ishihara/Educational/contacts-4.png",
        "icons/ishihara/Educational/contacts-5.png",
        "icons/ishihara/Educational/contacts-6.png"
    ],

    "DIABETIC": [
        "icons/ishihara/Educational/diabetic-2.png",
        "icons/ishihara/Educational/diabetic-3.png",
        "icons/ishihara/Educational/diabetic-4.png",
        "icons/ishihara/Educational/diabetic-6.png",
        "icons/ishihara/Educational/diabetic-7.png"
    ],

    "DRY EYE": [
        "icons/ishihara/Educational/dry-eye-1.png",
        "icons/ishihara/Educational/dry-eye-2.png",
        "icons/ishihara/Educational/dry-eye-3.png",
        "icons/ishihara/Educational/dry-eye-4.png",
        "icons/ishihara/Educational/dry-eye-5.png"
    ],

    "GENERAL": [
        "icons/ishihara/Educational/general-1.png",
        "icons/ishihara/Educational/general-2.png",
        "icons/ishihara/Educational/general-3.png",
        "icons/ishihara/Educational/general-4.png",
        "icons/ishihara/Educational/general-5.png"
    ],

    "GLAUCOMA": [
        "icons/ishihara/Educational/glaucoma-1.png",
        "icons/ishihara/Educational/glaucoma-2.png",
        "icons/ishihara/Educational/glaucoma-3.png",
        "icons/ishihara/Educational/glaucoma-4.png",
        "icons/ishihara/Educational/glaucoma-5.png"
    ],

    "IOL": [
        "icons/ishihara/Educational/iol-1.png",
        "icons/ishihara/Educational/iol-2.png",
        "icons/ishihara/Educational/iol-3.png",
        "icons/ishihara/Educational/iol-4.png",
        "icons/ishihara/Educational/iol-5.png",
        "icons/ishihara/Educational/iol-6.png"
    ],

    "LASIK": [
        "icons/ishihara/Educational/lasik-1.png",
        "icons/ishihara/Educational/lasik-2.png",
        "icons/ishihara/Educational/lasik-3.png",
        "icons/ishihara/Educational/lasik-4.png",
        "icons/ishihara/Educational/lasik-5.png",
        "icons/ishihara/Educational/lasik-6.png"
    ],

    "MACULAR": [
        "icons/ishihara/Educational/macular-1.png",
        "icons/ishihara/Educational/macular-2.png",
        "icons/ishihara/Educational/macular-3.png",
        "icons/ishihara/Educational/macular-4.png",
        "icons/ishihara/Educational/macular-5.png"
    ],

    "MYOPIA": [
        "icons/ishihara/Educational/myopia-1.png",
        "icons/ishihara/Educational/myopia-2.png",
        "icons/ishihara/Educational/myopia-3.png",
        "icons/ishihara/Educational/myopia-4.png",
        "icons/ishihara/Educational/myopia-5.png"
    ],

    "OPTICALS": [
        "icons/ishihara/Educational/opticals-1.png",
        "icons/ishihara/Educational/opticals-2.png",
        "icons/ishihara/Educational/opticals-3.png",
        "icons/ishihara/Educational/opticals-4.png",
        "icons/ishihara/Educational/opticals-5.png"
    ],

    "RETINAL": [
        "icons/ishihara/Educational/retinal-1.png",
        "icons/ishihara/Educational/retinal-2.png",
        "icons/ishihara/Educational/retinal-3.png",
        "icons/ishihara/Educational/retinal-4.png",
        "icons/ishihara/Educational/retinal-5.png"
    ]
};


/* ================= MAIN FEATURE ================= */

FEATURES["educational"] = {

    render(area, size) {

        if (educationalMode === "images") {
            showEducationalImage();
            return;
        }

        renderEducationalTopics(area);
    }
};


/* ================= TOPIC CARDS ================= */

function renderEducationalTopics(area) {

    area.innerHTML = `
        <div
            id="educationalTopicsGrid"
            style="
                width:100%;
                height:100%;
                display:grid;
                grid-template-columns:repeat(6, 1fr);
                grid-template-rows:repeat(3, 165px);
                gap:18px;
                padding:10px 30px 25px;
                box-sizing:border-box;
                overflow:hidden;
            "
        >

            ${educationalTopics.map((topic, index) => `
                <button
                    type="button"
                    data-edu-index="${index}"
                    onclick="openEducationalTopic(${index})"
                    style="
                        width:200px;
                        height:165px;
                        border:none;
                        border-radius:18px;
                        background:#8f2035;
                        color:#fff;
                        font-size:22px;
                        font-weight:bold;
                        cursor:pointer;
                        box-shadow:0 7px 14px rgba(0,0,0,0.20);
                        outline:${index === educationalTopicIndex
                            ? "4px solid #ffd21a"
                            : "none"};
                        transform:${index === educationalTopicIndex
                            ? "scale(1.02)"
                            : "scale(1)"};
                    "
                >
                    ${topic}
                </button>
            `).join("")}

        </div>
    `;
}


/* ================= OPEN TOPIC ================= */

window.openEducationalTopic = function(index) {

    educationalTopicIndex = index;
    educationalImageIndex = 0;
    educationalMode = "images";

    renderFeature();
};


/* ================= SHOW IMAGE ================= */

function showEducationalImage() {

    const topic =
        educationalTopics[educationalTopicIndex];

    const images =
        educationalImages[topic] || [];

    const area =
        document.getElementById("testArea");

    if (!area) return;


    if (!images.length) {

        area.innerHTML = `
            <div style="
                width:100%;
                height:100%;
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:40px;
                font-weight:bold;
                color:#000;
            ">
                ${topic}
            </div>
        `;

        return;
    }


    educationalImageIndex =
        Math.max(
            0,
            Math.min(
                educationalImageIndex,
                images.length - 1
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
                onclick="backToEducationalTopics()"
                style="
                    position:absolute;
                    top:15px;
                    left:15px;
                    z-index:10;
                    border:none;
                    border-radius:8px;
                    padding:10px 18px;
                    background:#000;
                    color:#fff;
                    font-weight:bold;
                    cursor:pointer;
                "
            >
                BACK
            </button>

            <img
                src="${images[educationalImageIndex]}"
                alt="${topic}"
                style="
                    max-width:90%;
                    max-height:90%;
                    object-fit:contain;
                    display:block;
                "
            >

        </div>
    `;
}


/* ================= NEXT IMAGE ================= */

window.nextEducationalImage = function() {

    const topic =
        educationalTopics[educationalTopicIndex];

    const images =
        educationalImages[topic] || [];

    if (educationalImageIndex < images.length - 1) {

        educationalImageIndex++;

        showEducationalImage();
    }
};


/* ================= PREVIOUS IMAGE ================= */

window.previousEducationalImage = function() {

    if (educationalImageIndex > 0) {

        educationalImageIndex--;

        showEducationalImage();
    }
};


/* ================= BACK ================= */

window.backToEducationalTopics = function() {

    educationalMode = "topics";
    educationalImageIndex = 0;

    renderFeature();
};


/* ================= 4-WAY TOPIC NAVIGATION ================= */

window.moveEducationalSelection = function(direction) {

    if (educationalMode !== "topics") return;

    const total = educationalTopics.length;
    const columns = 6;

    let row = Math.floor(
        educationalTopicIndex / columns
    );

    let col =
        educationalTopicIndex % columns;


    if (direction === "left") {
        col--;
    }

    if (direction === "right") {
        col++;
    }

    if (direction === "up") {
        row--;
    }

    if (direction === "down") {
        row++;
    }


    row = Math.max(0, Math.min(2, row));
    col = Math.max(0, Math.min(columns - 1, col));


    let newIndex =
        row * columns + col;


    /*
     * Last row mein sirf 2 cards hain.
     */
    if (newIndex >= total) {
        newIndex = total - 1;
    }


    educationalTopicIndex = newIndex;

    renderFeature();
};


/* ================= ENTER / OK ================= */

window.activateEducationalSelection = function() {

    if (educationalMode !== "topics") return;

    openEducationalTopic(
        educationalTopicIndex
    );
};