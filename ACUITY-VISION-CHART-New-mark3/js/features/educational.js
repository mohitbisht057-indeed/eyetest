/* EDUCATIONAL */
FEATURES["educational"] = {
    render(area, size) {

        const topics = [
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

        area.innerHTML = `
           <div style="
    width:100%;
    height:100%;
    display:grid;
    grid-template-columns:repeat(6, 1fr);
  grid-template-rows:repeat(3, 165px);
    gap:18px;
    padding:10px 30px 25px;
    box-sizing:border-box;
    overflow:hidden;
">
            

                ${topics.map((topic, index) => `
                    <button
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
                        "
                    >
                        ${topic}
                    </button>
                `).join("")}

            </div>
        `;
    }
};


let educationalTopicIndex = 0;
let educationalImageIndex = 0;

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
    "icons/Educational/anatomy-1.png",
    "icons/Educational/anatomy-2.png",
    "icons/Educational/anatomy-3.png",
    "icons/Educational/anatomy-4.png",
    "icons/Educational/anatomy-5.png",
    "icons/Educational/anatomy-6.png",
    "icons/Educational/anatomy-7.png"

],
    "ASTIGMATISM": [
        "icons/Educational/astigmatism-1.png",
        "icons/Educational/astigmatism-2.png",
        "icons/Educational/astigmatism-3.png",
        "icons/Educational/astigmatism-5.png",
        "icons/Educational/astigmatism-6.png"
    ],

    "CATARACT": [
        "icons/Educational/cataract-1.png",
        "icons/Educational/cataract-2.png",
        "icons/Educational/cataract-3.png",
        "icons/Educational/cataract-4.png",
        "icons/Educational/cataract-5.png",
        "icons/Educational/cataract-6.png"
    ],

    "CONTACTS": [
        "icons/Educational/contacts-1.png",
        "icons/Educational/contacts-2.png",
        "icons/Educational/contacts-3.png",
        "icons/Educational/contacts-4.png",
        "icons/Educational/contacts-5.png",
        "icons/Educational/contacts-6.png",   

    ],

    "DIABETIC": [
        "icons/Educational/diabetic-2.png",
        "icons/Educational/diabetic-3.png",
        "icons/Educational/diabetic-4.png",
        "icons/Educational/diabetic-6.png",
        "icons/Educational/diabetic-7.png"

    ],

    "DRY EYE": [
        "icons/Educational/dry-eye-1.png",
        "icons/Educational/dry-eye-2.png",
        "icons/Educational/dry-eye-3.png",
        "icons/Educational/dry-eye-4.png",
        "icons/Educational/dry-eye-5.png"
    ],

    "GENERAL": [
        "icons/Educational/general-1.png",
        "icons/Educational/general-2.png",
        "icons/Educational/general-3.png",
        "icons/Educational/general-4.png",
        "icons/Educational/general-5.png"

    ],

    "GLAUCOMA": [
        "icons/Educational/glaucoma-1.png",
        "icons/Educational/glaucoma-2.png",
        "icons/Educational/glaucoma-3.png",
        "icons/Educational/glaucoma-4.png",
        "icons/Educational/glaucoma-5.png"
    ],

    "IOL": [
        "icons/Educational/iol-1.png",
        "icons/Educational/iol-2.png",
        "icons/Educational/iol-3.png",
        "icons/Educational/iol-4.png",
        "icons/Educational/iol-5.png",
        "icons/Educational/iol-6.png"
    ],

    "LASIK": [
        "icons/Educational/lasik-1.png",
        "icons/Educational/lasik-2.png",
        "icons/Educational/lasik-3.png",
        "icons/Educational/lasik-4.png",
        "icons/Educational/lasik-5.png",
        "icons/Educational/lasik-6.png"
    ],
    "MACULAR": [
        "icons/Educational/macular-1.png",
        "icons/Educational/macular-2.png",
        "icons/Educational/macular-3.png",
        "icons/Educational/macular-4.png",
        "icons/Educational/macular-5.png"
    ],
    "MYOPIA": [
        "icons/Educational/myopia-1.png",
        "icons/Educational/myopia-2.png",
        "icons/Educational/myopia-3.png",
        "icons/Educational/myopia-4.png",
        "icons/Educational/myopia-5.png"
    ],
    "OPTICALS": [
        "icons/Educational/opticals-1.png",
        "icons/Educational/opticals-2.png",
        "icons/Educational/opticals-3.png",
        "icons/Educational/opticals-4.png",
        "icons/Educational/opticals-5.png"
    ],
    "RETINAL": [
        "icons/Educational/retinal-1.png",
        "icons/Educational/retinal-2.png",
        "icons/Educational/retinal-3.png",
        "icons/Educational/retinal-4.png",
        "icons/Educational/retinal-5.png"
         
    ]
};


/* CLICK ON EDUCATIONAL BOX */
window.openEducationalTopic = function(index) {

    educationalTopicIndex = index;
    educationalImageIndex = 0;

    showEducationalImage();
};


/* SHOW SELECTED TOPIC */
function showEducationalImage() {

    const topic = educationalTopics[educationalTopicIndex];
    const images = educationalImages[topic] || [];

    const area = document.getElementById("testArea");

    if (!area) return;

    if (images.length === 0) {

        area.innerHTML = `
            <div style="
                width:100%;
                height:100%;
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:60px;
                font-weight:bold;
                color:#000;
            ">
                ${topic}
            </div>
        `;

        return;
    }

    area.innerHTML = `
        <div style="
            width:100%;
            height:100%;
            display:flex;
            align-items:center;
            justify-content:center;
        ">
            <img
                src="${images[educationalImageIndex]}"
                style="
                    max-width:90%;
                    max-height:90%;
                    object-fit:contain;
                "
            >
        </div>
    `;
}


/* NEXT IMAGE */
window.nextEducationalImage = function() {

    const topic = educationalTopics[educationalTopicIndex];
    const images = educationalImages[topic] || [];

    if (educationalImageIndex < images.length - 1) {
        educationalImageIndex++;
        showEducationalImage();
    }
};


/* PREVIOUS IMAGE */
window.previousEducationalImage = function() {

    if (educationalImageIndex > 0) {
        educationalImageIndex--;
        showEducationalImage();
    }
};