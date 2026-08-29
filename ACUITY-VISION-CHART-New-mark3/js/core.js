
/* =====================================================
            CORE
   Shared state, constants, FEATURES registry,
   and navigation/dispatch logic.
===================================================== */

let currentTest = null;

/*
 * Normal acuity-test level.
 *
 * 0 = 6/60
 * 1 = 6/36
 * ...
 * 7 = 6/4
 */
let currentLevel = 0;

/*
 * Ishihara has its own independent page/plate index.
 *
 * 0 = Plate 1
 * 1 = Plate 2
 * ...
 * 27 = Plate 28
 */
let currentIshiharaPlate = 0;

let alphabetRowIndex = 0;
let numericRowIndex = 0;
let numericSixFourIndex = 0;

let languageRowIndex = 0;
let languageSixFourIndex = 0;

let alphabetSixFourIndex = 0;

let currentEye = "RIGHT EYE";


/* ================= TEST GROUPS ================= */

const CORE_TESTS = [
    "landolt",
    "tumbling",
    "alphabets",
    "numerics"
];

const EXTRA_TESTS = [
    "pediatric",
    "snellen",
    "logmar",
    "dots",
    "redgreen",
    "peripheral",
    "contrast",
    "misc",
    "ishihara",
    "astig",
    "educational"
];

// Arrow navigation is deliberately shorter than the home menu. All special
// tests, including Pediatric, remain available from their home-screen cards.
// Right navigation stops at the last selected language.
const NAVIGATION_TESTS_AFTER_LANGUAGES = [];


/* ================= NUMERICS ================= */

const numericSingleNumbers = [
    "1", "7", "3", "9", "4",
    "6", "2", "8", "5", "0"
];

const numericSets = [
    ["1"],
    ["2", "7"],
    ["3", "8", "4"],
    ["5", "1", "9", "6"],
    ["7", "3", "2", "8", "5"],
    ["4", "9", "1", "6", "3", "7"],
    ["8", "2", "5", "4", "9", "1", "6"],
    ["3", "7", "1", "9", "4", "6", "2", "8"]
];

const numericSixFourRows = [
    ["3", "7", "1", "9", "4", "6", "2", "8"],
    ["6", "2", "9", "4", "1", "7", "8", "3"],
    ["8", "5", "2", "6", "9", "1", "4", "7"],
    ["1", "9", "6", "3", "8", "2", "7", "4"],
    ["5", "3", "8", "1", "6", "9", "2", "7"],
    ["7", "4", "1", "8", "3", "6", "9", "2"],
    ["2", "8", "5", "7", "1", "4", "6", "9"],
    ["9", "1", "7", "3", "5", "8", "2", "6"],
    ["4", "6", "2", "9", "7", "1", "8", "3"],
    ["6", "9", "3", "5", "2", "8", "4", "1"]
];


/* ================= ALPHABETS ================= */

const alphabetLettersAt6_4 = [
    "K",
    "O",
    "L",
    "G",
    "D",
    "J",
    "E",
    "A",
    "R",
    "S",
    "N",
    "H",
    "P",
    "Z"
];


/* ================= ACUITY ================= */

const ACUITY_LEVELS = [
    { label: "6/60" },
    { label: "6/36" },
    { label: "6/24" },
    { label: "6/18" },
    { label: "6/12" },
    { label: "6/9" },
    { label: "6/6" },
    { label: "6/4" }
];


/* ================= LANGUAGES ================= */

const LANGUAGE_NAMES = {

    hindi: "Hindi",
    punjabi: "Punjabi",
    urdu: "Urdu",
    gujarati: "Gujarati",
    odia: "Odia",
    bengali: "Bengali",
    marathi: "Marathi",
    nepali: "Nepali",
    assamese: "Assamese",
    tamil: "Tamil",
    telugu: "Telugu",
    kannada: "Kannada",
    malayalam: "Malayalam",
    sanskrit: "Sanskrit",
    konkani: "Konkani",
    sindhi: "Sindhi",
    kashmiri: "Kashmiri",
    maithili: "Maithili",
    dogri: "Dogri",
    manipuri: "Manipuri",

    english: "English",
    french: "French",
    german: "German",
    spanish: "Spanish",
    italian: "Italian",
    portuguese: "Portuguese",
    russian: "Russian",
    chinese: "Chinese",
    japanese: "Japanese",
    korean: "Korean",
    thai: "Thai",
    vietnamese: "Vietnamese",
    indonesian: "Indonesian",
    malay: "Malay",
    turkish: "Turkish",
    persian: "Persian",
    arabic: "Arabic",
    hebrew: "Hebrew",
    greek: "Greek",
    dutch: "Dutch",
    swedish: "Swedish",
    norwegian: "Norwegian",
    danish: "Danish",
    finnish: "Finnish",
    polish: "Polish",
    ukrainian: "Ukrainian",
    romanian: "Romanian",
    hungarian: "Hungarian",
    czech: "Czech",
    slovak: "Slovak",
    bulgarian: "Bulgarian",
    serbian: "Serbian",
    croatian: "Croatian",
    slovenian: "Slovenian"
};


const LANGUAGE_LETTERS = {

    hindi: ["अ", "क", "म", "र"],
    punjabi: ["ਅ", "ਕ", "ਮ", "ਰ"],
    urdu: ["ا", "ب", "م", "ر"],
    gujarati: ["અ", "ક", "મ", "ર"],
    odia: ["ଅ", "କ", "ମ", "ର"],
    bengali: ["অ", "ক", "ম", "র"],
    marathi: ["अ", "क", "म", "र"],
    nepali: ["अ", "क", "म", "र"],
    assamese: ["অ", "ক", "ম", "ৰ"],
    tamil: ["அ", "க", "ம", "ர"],
    telugu: ["అ", "క", "మ", "ర"],
    kannada: ["ಅ", "ಕ", "ಮ", "ರ"],
    malayalam: ["അ", "ക", "മ", "ര"],
    sanskrit: ["अ", "क", "म", "र"],
    konkani: ["अ", "क", "म", "र"],
    sindhi: ["ا", "ب", "م", "ر"],
    kashmiri: ["ا", "ب", "م", "ر"],
    maithili: ["अ", "क", "म", "र"],
    dogri: ["अ", "क", "म", "र"],
    manipuri: ["অ", "ক", "ম", "র"],

    english: ["A", "B", "C", "D"],
    french: ["A", "B", "C", "D"],
    german: ["A", "B", "C", "D"],
    spanish: ["A", "B", "C", "D"],
    italian: ["A", "B", "C", "D"],
    portuguese: ["A", "B", "C", "D"],
    russian: ["А", "Б", "В", "Г"],
    chinese: ["中", "日", "人", "大"],
    japanese: ["あ", "か", "さ", "た"],
    korean: ["가", "나", "다", "라"],
    thai: ["ก", "ข", "ค", "ง"],
    vietnamese: ["A", "B", "C", "D"],
    indonesian: ["A", "B", "C", "D"],
    malay: ["A", "B", "C", "D"],
    turkish: ["A", "B", "C", "D"],
    persian: ["ا", "ب", "م", "ر"],
    hebrew: ["א", "ב", "ג", "ד"],
    greek: ["Α", "Β", "Γ", "Δ"],
    dutch: ["A", "B", "C", "D"],
    swedish: ["A", "B", "C", "D"],
    norwegian: ["A", "B", "C", "D"],
    danish: ["A", "B", "C", "D"],
    finnish: ["A", "B", "C", "D"],
    polish: ["A", "B", "C", "D"],
    ukrainian: ["А", "Б", "В", "Г"],
    romanian: ["A", "B", "C", "D"],
    hungarian: ["A", "B", "C", "D"],
    czech: ["A", "B", "C", "D"],
    slovak: ["A", "B", "C", "D"],
    bulgarian: ["А", "Б", "В", "Г"],
    serbian: ["А", "Б", "В", "Г"],
    croatian: ["A", "B", "C", "D"],
    slovenian: ["A", "B", "C", "D"]
};


/* ================= FEATURE REGISTRY ================= */

const FEATURES = {};


/* =====================================================
                    OPEN TEST
===================================================== */

function openTest(test) {

    currentTest = test;

    /*
     * Ishihara has completely separate navigation.
     */
    if (test === "ishihara") {

        const savedPlate =
            localStorage.getItem("ishihara_plate");

        currentIshiharaPlate =
            savedPlate !== null
                ? parseInt(savedPlate, 10)
                : 0;

        if (
            !Number.isInteger(currentIshiharaPlate) ||
            currentIshiharaPlate < 0 ||
            currentIshiharaPlate >= 28
        ) {
            currentIshiharaPlate = 0;
        }

    } else {

        /*
         * Normal acuity tests.
         */
        const savedLevel =
            localStorage.getItem("level_" + test);

        currentLevel =
            savedLevel !== null
                ? parseInt(savedLevel, 10)
                : 0;

        if (
            !Number.isInteger(currentLevel) ||
            currentLevel < 0 ||
            currentLevel >= ACUITY_LEVELS.length
        ) {
            currentLevel = 0;
        }
    }

    showScreen("testScreen");

    const title =
        document.getElementById("testTitle");

    if (title) {
        title.innerText =
            getTestName(test);
    }

    renderFeature();
}


/* =====================================================
                    SCREEN MANAGEMENT
===================================================== */

function showScreen(screenId) {

    [
        "menu",
        "settingsPanel",
        "uiScreen",
        "languageScreen",
        "themeScreen",
        "distanceScreen",
        "calibrationScreen",
        "testScreen"
    ].forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {

            element.style.display =
                id === screenId
                    ? (id === "menu" ? "flex" : "block")
                    : "none";
        }
    });
}


function closeTest() {
    showScreen("menu");
}


/* =====================================================
                    TEST NAME
===================================================== */

function getTestName(test) {

    const names = {

        landolt: "LANDOLT C",
        tumbling: "TUMBLING E",
        alphabets: "ALPHABETS",
        numerics: "NUMERICS",
        pediatric: "PEDIATRIC",
        snellen: "SNELLEN",
        logmar: "LOGMAR",
        dots: "DOTS",
        redgreen: "RED / GREEN",
        peripheral: "PERIPHERAL",
        contrast: "CONTRAST",
        misc: "MISC",
        ishihara: "ISHIHARA",
        astig: "ASTIG FAN",
        educational: "EDUCATIONAL"
    };

    return names[test] ||
        LANGUAGE_NAMES[test];
}


/* =====================================================
                    EYE
===================================================== */

function setEye(eye) {

    currentEye = eye;

    const eyeTitle =
        document.getElementById("eyeTitle");

    if (eyeTitle) {
        eyeTitle.innerText = eye;
    }

    document
        .querySelectorAll(".eye-btn")
        .forEach(btn => {

            btn.classList.remove("active");
        });

    const buttons =
        document.querySelectorAll(".eye-btn");

    buttons.forEach(btn => {

        if (
            btn.innerText.trim() === eye
        ) {
            btn.classList.add("active");
        }
    });
}


/* =====================================================
                    RENDER DISPATCHER
===================================================== */

function renderFeature() {

    const area =
        document.getElementById("testArea");

    if (!area) return;

    /*
     * Ishihara does NOT use ACUITY_LEVELS.
     */
    if (currentTest === "ishihara") {

        const handler =
            FEATURES["ishihara"];

        if (
            handler &&
            typeof handler.render === "function"
        ) {
            handler.render(area);
        }

        updateLevelIndicator();

        return;
    }

    if (currentTest === "snellen" && FEATURES.snellen) {
        area.innerHTML = "";
        FEATURES.snellen.render(area);
        return;
    }


    /*
     * Normal tests.
     */
    const level =
        ACUITY_LEVELS[currentLevel];

    const size =
        calculateOptotypeSize(level.label);

    area.innerHTML = "";

    const handler =
        FEATURES[currentTest] ||
        (
            LANGUAGE_NAMES[currentTest]
                ? FEATURES["_language"]
                : null
        );

    if (
        handler &&
        handler.render
    ) {
        handler.render(area, size);
    }

    updateLevelIndicator();
}


/* =====================================================
                    LEVEL INDICATOR
===================================================== */

function updateLevelIndicator() {

    const indicator =
        document.getElementById("levelIndicator");

    if (!indicator) return;


    /*
     * Ishihara indicator.
     */
    if (currentTest === "ishihara") {

        const total =
            FEATURES.ishihara &&
            FEATURES.ishihara.totalPlates
                ? FEATURES.ishihara.totalPlates
                : 28;

        indicator.innerText =
            `PLATE ${currentIshiharaPlate + 1} / ${total}`;

        return;
    }


    /*
     * Normal acuity indicator.
     */
    indicator.innerText =
        `${ACUITY_LEVELS[currentLevel].label} ` +
        `(${currentLevel + 1} / ${ACUITY_LEVELS.length})`;
}


/* =====================================================
                    NEXT LEVEL / NEXT PLATE
===================================================== */

function nextLevel() {

    /*
     * Ishihara:
     * SIZE + becomes NEXT PLATE.
     */
    if (currentTest === "ishihara") {

        if (
            FEATURES.ishihara &&
            typeof FEATURES.ishihara.next === "function"
        ) {
            FEATURES.ishihara.next();
        }

        return;
    }


    /*
     * Feature-specific forward logic.
     */
    if (
        FEATURES[currentTest] &&
        FEATURES[currentTest].next
    ) {

        FEATURES[currentTest].next();

        return;
    }


    /*
     * Language forward logic.
     */
    if (LANGUAGE_NAMES[currentTest]) {

        FEATURES["_language"].next();

        return;
    }


    /*
     * Generic acuity forward.
     */
    if (
        currentLevel <
        ACUITY_LEVELS.length - 1
    ) {

        currentLevel++;

        localStorage.setItem(
            "level_" + currentTest,
            currentLevel
        );

        renderFeature();
    }
}


/* =====================================================
                    PREVIOUS LEVEL / PLATE
===================================================== */

function previousLevel() {

    /*
     * Ishihara:
     * SIZE - becomes PREVIOUS PLATE.
     */
    if (currentTest === "ishihara") {

        if (
            FEATURES.ishihara &&
            typeof FEATURES.ishihara.prev === "function"
        ) {
            FEATURES.ishihara.prev();
        }

        return;
    }


    /*
     * Feature-specific backward logic.
     */
    if (
        FEATURES[currentTest] &&
        FEATURES[currentTest].prev
    ) {

        FEATURES[currentTest].prev();

        return;
    }


    /*
     * Language backward logic.
     */
    if (LANGUAGE_NAMES[currentTest]) {

        FEATURES["_language"].prev();

        return;
    }


    /*
     * Generic acuity backward.
     */
    if (currentLevel > 0) {

        currentLevel--;

        localStorage.setItem(
            "level_" + currentTest,
            currentLevel
        );

        renderFeature();
    }
}


/* =====================================================
                    FEATURE NAVIGATION
===================================================== */

function nextFeature() {

    const features =
        getFeatureList();

    const index =
        features.indexOf(currentTest);

    if (
        index >= 0 &&
        index < features.length - 1
    ) {

        currentTest =
            features[index + 1];

        currentLevel = 0;

        /*
         * If entering Ishihara through TEST +,
         * restore its saved plate.
         */
        if (currentTest === "ishihara") {

            const savedPlate =
                localStorage.getItem(
                    "ishihara_plate"
                );

            currentIshiharaPlate =
                savedPlate !== null
                    ? parseInt(savedPlate, 10)
                    : 0;

            if (
                !Number.isInteger(
                    currentIshiharaPlate
                ) ||
                currentIshiharaPlate < 0 ||
                currentIshiharaPlate >= 28
            ) {
                currentIshiharaPlate = 0;
            }
        }

        document
            .getElementById("testTitle")
            .innerText =
                getTestName(currentTest);

        renderFeature();
    }
}


function previousFeature() {

    const features =
        getFeatureList();

    const index =
        features.indexOf(currentTest);

    if (index > 0) {

        currentTest =
            features[index - 1];

        currentLevel = 0;

        /*
         * If entering Ishihara through TEST -,
         * restore its saved plate.
         */
        if (currentTest === "ishihara") {

            const savedPlate =
                localStorage.getItem(
                    "ishihara_plate"
                );

            currentIshiharaPlate =
                savedPlate !== null
                    ? parseInt(savedPlate, 10)
                    : 0;

            if (
                !Number.isInteger(
                    currentIshiharaPlate
                ) ||
                currentIshiharaPlate < 0 ||
                currentIshiharaPlate >= 28
            ) {
                currentIshiharaPlate = 0;
            }
        }

        document
            .getElementById("testTitle")
            .innerText =
                getTestName(currentTest);

        renderFeature();
    }
}


/* =====================================================
                    FEATURE LIST
===================================================== */

function getFeatureList() {

    return [
        ...CORE_TESTS,
        ...selectedLanguages,
        ...NAVIGATION_TESTS_AFTER_LANGUAGES
    ].filter(
        (test, index, tests) =>
            tests.indexOf(test) === index
    );
}


/* =====================================================
                    KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        const testScreen =
            document.getElementById("testScreen");

        if (
            testScreen &&
            testScreen.style.display === "block"
        ) {

            if (event.key === "ArrowUp") {

                event.preventDefault();

                if (currentTest === "snellen") {
                    previousLevel();
                } else {
                    nextLevel();
                }
            }

            if (event.key === "ArrowDown") {

                event.preventDefault();

                if (currentTest === "snellen") {
                    nextLevel();
                } else {
                    previousLevel();
                }
            }

            if (event.key === "ArrowLeft") {

                event.preventDefault();

                if (currentTest === "snellen") {
                    snellenPage = (snellenPage + 3) % 4;
                    renderFeature();
                } else {
                    previousFeature();
                }
            }

            if (event.key === "ArrowRight") {

                event.preventDefault();

                if (currentTest === "snellen") {
                    snellenPage = (snellenPage + 1) % 4;
                    renderFeature();
                } else {
                    nextFeature();
                }
            }

            if (event.key === "Escape") {

                event.preventDefault();

                closeTest();
            }
        }
    }
);


/* =====================================================
                    START
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (
            typeof loadSavedSettings ===
            "function"
        ) {
            loadSavedSettings();
        }

        showScreen("menu");

        requestAnimationFrame(() => {
            document.body.classList.add("app-ready");
        });
    }
);
