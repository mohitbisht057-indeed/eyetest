/* =====================================================
            SETTINGS
   Settings panel, distance, calibration and the
   language-selection UI. Also owns the calibration
   globals used by calculateLandoltSize().
===================================================== */

let selectedLanguages = [
    "hindi",
    "punjabi",
    "urdu"
];

const DEFAULT_SELECTED_LANGUAGES = ["hindi", "punjabi", "urdu"];

const DEFAULT_PANEL_DPI = 127;
let calibrationOffset = 0;
let calibrationPreviewLevel = 0;
let currentDistanceMeters = 3.0;
let panelDpi = DEFAULT_PANEL_DPI;
let selectedDistanceLabel = "10 Feet (3.0 Mtrs)";
// Device Grid is the default layout for new installs. A user's later choice
// is still preserved in local storage.
let currentUiId = "device";
let themeAnimationTimer = null;

/* ================= SETTINGS PANEL ================= */

function openSettings() {
    showScreen("settingsPanel");
}

function closeSettings() {
    showScreen("menu");
}

/* ================= UI MODE ================= */

const APP_UIS = {
    modern: "Modern Sections",
    device: "Device Grid"
};

function openUiSettings() {
    const list = document.getElementById("uiList");

    if (list) {
        list.innerHTML = "";

        Object.keys(APP_UIS).forEach(uiId => {
            const button = document.createElement("button");
            button.className = "theme-choice";
            button.innerHTML =
                `<span style="background:${uiId === "device" ? "var(--theme-strong)" : "var(--theme-color)"}"></span>` +
                APP_UIS[uiId];
            button.onclick = () => selectUi(uiId);

            if (uiId === currentUiId) {
                button.classList.add("selected");
            }

            list.appendChild(button);
        });
    }

    showScreen("uiScreen");
}

function closeUiSettings() {
    showScreen("settingsPanel");
}

function selectUi(uiId) {
    if (!APP_UIS[uiId]) return;

    currentUiId = uiId;
    applyUi(uiId);
    localStorage.setItem("selectedUiId", uiId);
    openUiSettings();
}

function applyUi(uiId) {
    const selectedUi = APP_UIS[uiId] ? uiId : "modern";
    const body = document.body;

    body.classList.toggle("ui-modern", selectedUi === "modern");
    body.classList.toggle("ui-device", selectedUi === "device");

    const modern = document.getElementById("homeUiModern");
    const device = document.getElementById("homeUiDevice");

    if (modern) {
        modern.setAttribute("aria-hidden", selectedUi === "modern" ? "false" : "true");
    }

    if (device) {
        device.setAttribute("aria-hidden", selectedUi === "device" ? "false" : "true");
    }
}

/* ================= LANGUAGE SETTINGS ================= */

function openLanguageSettings() {
    showScreen("languageScreen");
    renderLanguages();
}

function closeLanguageSettings() {
    if (!selectedLanguages.length) {
        selectedLanguages = [...DEFAULT_SELECTED_LANGUAGES];
    }
    localStorage.setItem("selectedLanguages", JSON.stringify(selectedLanguages));
    renderLanguageMenuCards();
    showScreen("settingsPanel");
}

/* ================= THEME ================= */

const APP_THEMES = {
    "default-green": {
        name: "Clinical Sage (Default)",
        colors: {
            "--theme-color": "#111111",
            "--theme-strong": "#0a0a0a",
            "--theme-soft": "#c7d1c9",
            "--theme-tint": "#dce3dd",
            "--theme-text": "#111111",
            "--theme-on-color": "#ffffff",
            "--theme-box-bg": "#1a1a1a",
            "--theme-box-text": "#ffffff",
            "--theme-muted": "#4b5563",
            "--theme-border": "rgba(17, 17, 17, 0.15)"
        }
    },
    "midnight-dark": {
        name: "Midnight Mode",
        colors: {
            "--theme-color": "#3b82f6",
            "--theme-strong": "#000000",
            "--theme-soft": "#1f2937",
            "--theme-tint": "#111827",
            "--theme-text": "#f9fafb",
            "--theme-on-color": "#ffffff",
            "--theme-box-bg": "#1f2937",
            "--theme-box-text": "#f9fafb",
            "--theme-muted": "#9ca3af",
            "--theme-border": "rgba(255, 255, 255, 0.1)"
        }
    },
    "classic-blue": {
        name: "Optometric Blue",
        colors: {
            "--theme-color": "#285f8f",
            "--theme-strong": "#1d4568",
            "--theme-soft": "#dce9f4",
            "--theme-tint": "#f3f8fc",
            "--theme-text": "#18202a",
            "--theme-on-color": "#ffffff",
            "--theme-box-bg": "rgba(255, 255, 255, 0.9)",
            "--theme-box-text": "#18202a",
            "--theme-muted": "#5d6670",
            "--theme-border": "rgba(24, 32, 42, 0.14)"
        }
    },
    "warm-sepia": {
        name: "Warm Minimalist",
        colors: {
            "--theme-color": "#5c4033",
            "--theme-strong": "#3d2a21",
            "--theme-soft": "#e8e1d9",
            "--theme-tint": "#f4f1eb",
            "--theme-text": "#2b1c15",
            "--theme-on-color": "#ffffff",
            "--theme-box-bg": "#ffffff",
            "--theme-box-text": "#2b1c15",
            "--theme-muted": "#8c7b70",
            "--theme-border": "rgba(43, 28, 21, 0.12)"
        }
    },
    "surgical-teal": {
        name: "Surgical Teal",
        colors: {
            "--theme-color": "#087f8c",
            "--theme-strong": "#063b45",
            "--theme-soft": "#c9e7e8",
            "--theme-tint": "#edf7f6",
            "--theme-text": "#102f35",
            "--theme-on-color": "#ffffff",
            "--theme-box-bg": "#ffffff",
            "--theme-box-text": "#102f35",
            "--theme-muted": "#527077",
            "--theme-border": "rgba(16, 47, 53, 0.14)"
        }
    },
    "high-contrast": {
        name: "High Contrast",
        colors: {
            "--theme-color": "#000000",
            "--theme-strong": "#000000",
            "--theme-soft": "#f2f2f2",
            "--theme-tint": "#ffffff",
            "--theme-text": "#000000",
            "--theme-on-color": "#ffffff",
            "--theme-box-bg": "#ffffff",
            "--theme-box-text": "#000000",
            "--theme-muted": "#333333",
            "--theme-border": "rgba(0, 0, 0, 0.28)"
        }
    },
    "ruby-clinic": {
        name: "Ruby Clinic",
        colors: {
            "--theme-color": "#a73548",
            "--theme-strong": "#641b2a",
            "--theme-soft": "#efd3d9",
            "--theme-tint": "#faf1f3",
            "--theme-text": "#33121a",
            "--theme-on-color": "#ffffff",
            "--theme-box-bg": "#ffffff",
            "--theme-box-text": "#33121a",
            "--theme-muted": "#76525b",
            "--theme-border": "rgba(51, 18, 26, 0.14)"
        }
    },
    "graphite": {
        name: "Graphite",
        colors: {
            "--theme-color": "#374151",
            "--theme-strong": "#111827",
            "--theme-soft": "#d1d5db",
            "--theme-tint": "#f3f4f6",
            "--theme-text": "#111827",
            "--theme-on-color": "#ffffff",
            "--theme-box-bg": "#ffffff",
            "--theme-box-text": "#111827",
            "--theme-muted": "#6b7280",
            "--theme-border": "rgba(17, 24, 39, 0.14)"
        }
    }
};

let currentThemeId = "default-green";

function openThemeSettings() {
    const list = document.getElementById("themeList");

    if (list) {
        list.innerHTML = "";

        Object.keys(APP_THEMES).forEach(themeId => {
            const theme = APP_THEMES[themeId];

            const button = document.createElement("button");
            button.className = "theme-choice";
            button.innerHTML =
                `<span style="background:${theme.colors["--theme-color"]}"></span>` +
                theme.name;
            button.onclick = () => selectTheme(themeId);

            if (themeId === currentThemeId) {
                button.classList.add("selected");
            }

            list.appendChild(button);
        });
    }

    showScreen("themeScreen");
}

function closeThemeSettings() {
    showScreen("settingsPanel");
}

function selectTheme(themeId) {
    if (!APP_THEMES[themeId]) return;

    currentThemeId = themeId;
    applyTheme(themeId);
    localStorage.setItem("selectedThemeId", themeId);
    openThemeSettings();
}

function applyTheme(themeId) {
    const theme = APP_THEMES[themeId].colors;
    const root = document.documentElement;
    const body = document.body;

    if (body) {
        body.classList.remove("theme-changing");

        if (themeAnimationTimer) {
            clearTimeout(themeAnimationTimer);
        }

        requestAnimationFrame(() => {
            body.classList.add("theme-changing");

            themeAnimationTimer = setTimeout(() => {
                body.classList.remove("theme-changing");
                themeAnimationTimer = null;
            }, 180);
        });
    }

    // Loop through the palette and apply each exact variable to the CSS
    for (const [property, value] of Object.entries(theme)) {
        root.style.setProperty(property, value);
    }

    // Update browser header tab color for PWA
    const themeMeta = document.querySelector('meta[name="theme-color"]');

    if (themeMeta) {
        themeMeta.setAttribute("content", theme["--theme-strong"]);
    }
}

function renderLanguages() {

    const indian = document.getElementById("indianLanguages");
    const international =
        document.getElementById("internationalLanguages");
    const other =
        document.getElementById("otherLanguages");

    if (!indian || !international || !other) return;

    indian.innerHTML = "";
    international.innerHTML = "";
    other.innerHTML = "";

    const indianLanguages = [
        "hindi",
        "punjabi",
        "urdu",
        "gujarati",
        "odia",
        "bengali",
        "marathi",
        "nepali",
        "assamese",
        "tamil",
        "telugu",
        "kannada",
        "malayalam",
        "sanskrit",
        "konkani",
        "sindhi",
        "kashmiri",
        "maithili",
        "dogri",
        "manipuri"
    ];

    const internationalLanguages = [
        "english",
        "french",
        "german",
        "spanish",
        "italian",
        "portuguese",
        "russian",
        "chinese",
        "japanese",
        "korean",
        "thai",
        "vietnamese",
        "indonesian",
        "malay",
        "turkish",
        "persian",
        "hebrew",
        "greek"
    ];

    const otherLanguages = [
        "dutch",
        "swedish",
        "norwegian",
        "danish",
        "finnish",
        "polish",
        "ukrainian",
        "romanian",
        "hungarian",
        "czech",
        "slovak",
        "bulgarian",
        "serbian",
        "croatian",
        "slovenian"
    ];

    createLanguageButtons(indian, indianLanguages);
    createLanguageButtons(international, internationalLanguages);
    createLanguageButtons(other, otherLanguages);

    updateLanguageCount();
    renderLanguageMenuCards();
}

/* Keep both home layouts in sync as soon as a language is selected. */
function renderLanguageMenuCards() {
    const modern = document.getElementById("modernLanguageCards");
    const device = document.getElementById("deviceLanguageCards");
    // Old installs may have an empty saved selection. Do not leave the home
    // screen without language cards in that case.
    const languagesToShow = selectedLanguages.length
        ? selectedLanguages
        : DEFAULT_SELECTED_LANGUAGES;

    if (modern) {
        modern.innerHTML = languagesToShow.map(language => `
            <button class="menu-btn" onclick="openTest('${language}')">
                <div class="menu-icon">${LANGUAGE_LETTERS[language]?.[0] || "A"}</div>
                <div class="menu-name">${(LANGUAGE_NAMES[language] || language).toUpperCase()}</div>
            </button>
        `).join("");
    }

    if (device) {
        device.innerHTML = languagesToShow.map(language => `
            <button class="vision-card" onclick="openTest('${language}')">
                <div class="card-icon dynamic-language-icon">${LANGUAGE_LETTERS[language]?.[0] || "A"}</div>
                <div class="card-name">${(LANGUAGE_NAMES[language] || language).toUpperCase()}</div>
            </button>
        `).join("");
    }
}

function createLanguageButtons(container, languages) {

    languages.forEach(language => {

        const button =
            document.createElement("button");

        button.className = "language-btn";

        button.innerText =
            LANGUAGE_NAMES[language] || language;

        if (selectedLanguages.includes(language)) {
            button.classList.add("selected");
        }

        button.onclick = function () {

            if (selectedLanguages.includes(language)) {

                selectedLanguages =
                    selectedLanguages.filter(
                        item => item !== language
                    );

                button.classList.remove("selected");

            } else {

                if (selectedLanguages.length >= 3) {
                    return;
                }

                selectedLanguages.push(language);

                button.classList.add("selected");
            }

            updateLanguageCount();
            renderLanguageMenuCards();
            localStorage.setItem("selectedLanguages", JSON.stringify(selectedLanguages));
        };

        container.appendChild(button);
    });
}

function updateLanguageCount() {

    const count =
        document.getElementById("languageCount");

    if (count) {
        count.innerText =
            `${selectedLanguages.length} / 3 SELECTED`;
    }
}

/* ================= DISTANCE ================= */

function openDistanceSettings() {
    showScreen("distanceScreen");
    syncSelectedDistanceButton();
}

function closeDistanceSettings() {
    showScreen("settingsPanel");
}

function updateDistance(selectedDistance) {

    const distanceMeters = {
        "5 Feet (1.5 Mtrs)": 1.5,
        "6 Feet (2.0 Mtrs)": 2.0,
        "8 Feet (2.5 Mtrs)": 2.5,
        "10 Feet (3.0 Mtrs)": 3.0,
        "12 Feet (3.5 Mtrs)": 3.5,
        "15 Feet (4.5 Mtrs)": 4.5,
        "20 Feet (6.0 Mtrs)": 6.0
    };

    currentDistanceMeters =
        distanceMeters[selectedDistance] || 3.0;

    selectedDistanceLabel =
        distanceMeters[selectedDistance] ? selectedDistance : "10 Feet (3.0 Mtrs)";

    localStorage.setItem("selectedDistance", selectedDistanceLabel);

    renderFeature();
}

function selectDistance(distance) {

    updateDistance(distance);

    document.querySelectorAll(".distance-options button")
        .forEach(button => {

            button.classList.remove("selected");

            if (button.innerText.trim() === distance) {
                button.classList.add("selected");
            }
        });
}

function syncSelectedDistanceButton() {

    document.querySelectorAll(".distance-options button")
        .forEach(button => {

            button.classList.toggle(
                "selected",
                button.innerText.trim() === selectedDistanceLabel
            );
        });
}

/* ================= CALIBRATION ================= */

// All acuity optotypes use this calibrated physical size: Landolt C,
// Tumbling E, and every selected language chart.
function calculateOptotypeSize(levelLabel) {

    const denominator = parseFloat(levelLabel.split("/")[1]);

    // Landolt C = 5 arcminutes × acuity denominator / 6
    const angleMinutes = 5 * (denominator / 6);

    // Convert arcminutes to radians
    const angleRadians = (angleMinutes / 60) * Math.PI / 180;

    // Physical C size in mm
    const distanceMm = currentDistanceMeters * 1000;

    const physicalSizeMm =
        2 * distanceMm * Math.tan(angleRadians / 2);

    // Convert the required physical size to panel pixels. 25.4 mm = 1 inch.
    // The optional offset remains available for a ruler-based fine adjustment.
    const pixelsPerMm = (panelDpi / 25.4) * (1 + calibrationOffset / 100);

    return physicalSizeMm * pixelsPerMm;
}

// The standard Landolt C used by the calibration card: 1/5 stroke and 1/5 gap.
function createLandoltCSvg(pixelSize, rotation = 0) {
    const size = Math.max(1, Number(pixelSize));
    const svgSize = size.toFixed(3);

    return `
        <svg class="landolt-c-svg" width="${svgSize}" height="${svgSize}" viewBox="0 0 100 100" role="img" aria-label="Landolt C">
            <g transform="rotate(${rotation} 50 50)">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#000" stroke-width="20" shape-rendering="geometricPrecision"></circle>
                <!-- The cutout overlaps the inner white circle so no black sliver
                     remains at either end of the opening. The visible gap remains
                     exactly 20 viewBox units high (one-fifth of the optotype). -->
                <rect x="70" y="40" width="30" height="20" fill="#fff"></rect>
            </g>
        </svg>`;
}

// Kept as an alias for any future Landolt-specific callers.
function calculateLandoltSize(levelLabel) {
    return calculateOptotypeSize(levelLabel);
}

function imperialAcuityLabel(metricLabel) {
    const denominator = parseFloat(String(metricLabel).split("/")[1]);
    const imperialDenominator = (denominator * 20) / 6;

    if (!Number.isFinite(imperialDenominator)) return "";

    const displayDenominator = Number.isInteger(imperialDenominator)
        ? imperialDenominator
        : imperialDenominator.toFixed(1).replace(/\.0$/, "");

    return `20/${displayDenominator}`;
}

function addAcuitySideLabels(area, metricLabel) {
    if (!area || !metricLabel) return;

    const metric = document.createElement("div");
    const imperial = document.createElement("div");

    metric.className = "acuity-side-label acuity-side-label-left";
    imperial.className = "acuity-side-label acuity-side-label-right";
    metric.textContent = metricLabel;
    imperial.textContent = imperialAcuityLabel(metricLabel);

    area.classList.add("acuity-test-area");
    area.append(metric, imperial);
}

function openCalibrationSettings() {
    showScreen("calibrationScreen");

    syncCalibrationInputs();
    updateCalibrationPreview();
}

function syncCalibrationInputs() {
    const distanceInput = document.getElementById("calibrationDistance");
    const dpiInput = document.getElementById("calibrationDpi");

    if (distanceInput) distanceInput.value = currentDistanceMeters;
    if (dpiInput) dpiInput.value = panelDpi;
}

function updateCalibrationPhysicalSettings() {
    const distanceInput = document.getElementById("calibrationDistance");
    const dpiInput = document.getElementById("calibrationDpi");
    const distance = Number(distanceInput?.value);
    const dpi = Number(dpiInput?.value);

    if (Number.isFinite(distance) && distance > 0) {
        currentDistanceMeters = distance;
        selectedDistanceLabel = `${distance.toFixed(2)} Mtrs`;
        localStorage.setItem("selectedDistance", selectedDistanceLabel);
        localStorage.setItem("calibrationDistanceMeters", currentDistanceMeters);
    }

    if (Number.isFinite(dpi) && dpi > 0) {
        panelDpi = dpi;
        localStorage.setItem("panelDpi", panelDpi);
    }

    updateCalibrationPreview();
    if (currentTest) renderFeature();
}

function updateCalibrationPreview() {
    const calibrationLevels = [
        "6/60", "6/48", "6/38", "6/36", "6/30", "6/24", "6/19",
        "6/18", "6/15", "6/12", "6/9.5", "6/9", "6/7.5", "6/6", "6/5"
    ];
    const levelLabel = calibrationLevels[calibrationPreviewLevel];
    const preview = document.getElementById("calibrationOptotype");
    const value = document.getElementById("calibrationValue");
    const levelReadout = document.getElementById("calibrationLevel");

    if (!levelLabel) return;

    const size = calculateOptotypeSize(levelLabel);

    if (preview) {
        preview.innerHTML = createLandoltCSvg(size);
    }

    if (value) value.textContent = calibrationOffset.toFixed(1);
    if (levelReadout) levelReadout.textContent = levelLabel;
}

function changeCalibration(amount) {

    calibrationOffset = Math.round((calibrationOffset + amount * 0.1) * 10) / 10;

    if (calibrationOffset < -50) {
        calibrationOffset = -50;
    }

    if (calibrationOffset > 50) {
        calibrationOffset = 50;
    }

    updateCalibrationPreview();
}

function changeCalibrationLevel(amount) {
    calibrationPreviewLevel = Math.max(
        0,
        Math.min(14, calibrationPreviewLevel + amount)
    );

    updateCalibrationPreview();
}

function saveCalibration() {

    localStorage.setItem(
        "calibrationOffset",
        calibrationOffset
    );
    localStorage.setItem("panelDpi", panelDpi);
    localStorage.setItem("calibrationDistanceMeters", currentDistanceMeters);

    // Apply a newly saved calibration immediately if a chart is open.
    if (currentTest) {
        renderFeature();
    }

    showScreen("settingsPanel");
}

function loadSavedSettings() {
    const savedCalibrationOffset = localStorage.getItem("calibrationOffset");

    if (savedCalibrationOffset) {
        const parsedOffset = parseFloat(savedCalibrationOffset);
        if (Number.isFinite(parsedOffset)) {
            calibrationOffset = Math.max(-50, Math.min(50, parsedOffset));
        }
    }

    const savedDistance = localStorage.getItem("selectedDistance");

    if (savedDistance) {
        updateDistance(savedDistance);
    }

    const savedCalibrationDistance = parseFloat(
        localStorage.getItem("calibrationDistanceMeters")
    );

    if (Number.isFinite(savedCalibrationDistance) && savedCalibrationDistance > 0) {
        currentDistanceMeters = savedCalibrationDistance;
        selectedDistanceLabel = `${savedCalibrationDistance.toFixed(2)} Mtrs`;
    }

    const savedPanelDpi = parseFloat(localStorage.getItem("panelDpi"));

    if (Number.isFinite(savedPanelDpi) && savedPanelDpi > 0) {
        panelDpi = savedPanelDpi;
    }

    const savedTheme = localStorage.getItem("selectedThemeId");

    if (savedTheme && APP_THEMES[savedTheme]) {
        currentThemeId = savedTheme;
    }

    applyTheme(currentThemeId);

    const savedUi = localStorage.getItem("selectedUiId");

    if (savedUi && APP_UIS[savedUi]) {
        currentUiId = savedUi;
    }

    applyUi(currentUiId);

    const savedLanguages = localStorage.getItem("selectedLanguages");

    if (savedLanguages) {
        try {
            const parsedLanguages = JSON.parse(savedLanguages);

            if (Array.isArray(parsedLanguages) && parsedLanguages.length <= 3) {
                selectedLanguages = parsedLanguages.filter(language => LANGUAGE_NAMES[language]);
            }
        } catch (error) {
            selectedLanguages = ["hindi", "punjabi", "urdu"];
        }
    }

    if (!selectedLanguages.length) {
        selectedLanguages = [...DEFAULT_SELECTED_LANGUAGES];
        localStorage.setItem("selectedLanguages", JSON.stringify(selectedLanguages));
    }

    renderLanguageMenuCards();
}

/* ================= CALIBRATION KEYBOARD ================= */

document.addEventListener("keydown", function (event) {

    const screen = document.getElementById("calibrationScreen");

    if (!screen) return;

    /*
     * Only work while calibration screen is active.
     */
    const isVisible =
        window.getComputedStyle(screen).display !== "none";

    if (!isVisible) return;


    /* UP = increase C size */
    if (event.key === "ArrowUp") {

        event.preventDefault();
        event.stopPropagation();

        changeCalibration(1);

        return;
    }


    /* DOWN = decrease C size */
    if (event.key === "ArrowDown") {

        event.preventDefault();
        event.stopPropagation();

        changeCalibration(-1);

        return;
    }


    /* LEFT = previous calibration level */
    if (event.key === "ArrowLeft") {

        event.preventDefault();
        event.stopPropagation();

        changeCalibrationLevel(-1);

        return;
    }


    /* RIGHT = next calibration level */
    if (event.key === "ArrowRight") {

        event.preventDefault();
        event.stopPropagation();

        changeCalibrationLevel(1);

        return;
    }


    /* ENTER = SAVE & DONE */
    if (event.key === "Enter") {

        event.preventDefault();
        event.stopPropagation();

        saveCalibration();

        return;
    }


    /* ESC = close calibration */
    if (event.key === "Escape") {

        event.preventDefault();
        event.stopPropagation();

        showScreen("settingsPanel");

        return;
    }

});
