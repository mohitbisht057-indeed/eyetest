/* RED / GREEN DUOCHROME - CYCLING OPTOTYPES */

FEATURES["redgreen"] = {
    // State trackers
    directions: [],
    letters: [],
    numbers: [],

    // Base modes are followed by the currently selected language optotypes.
    modeIndex: 0,
    modes: ["landolt", "tumbling", "alphabets", "numerics"],

    getModes() {
        const languages =
            typeof selectedLanguages !== "undefined" &&
            Array.isArray(selectedLanguages) &&
            selectedLanguages.length
                ? selectedLanguages
                : ["hindi", "punjabi", "urdu"];

        return [
            ...this.modes,
            ...languages.filter(language =>
                typeof LANGUAGE_NAMES !== "undefined" &&
                LANGUAGE_NAMES[language]
            )
        ];
    },

    render(area, size) {
        const count = currentLevel + 1;
        const rotations = [0, 90, 180, 270];

        // Optotype pools for random generation (matches standard vision test letters/numbers)
        const alphabetPool = "CDHKNORSVZ";
        const numericPool = "123456789";

        const level = ACUITY_LEVELS[currentLevel] || { label: "6/60" };
        const cSize = typeof calculateLandoltSize === "function"
            ? calculateLandoltSize(level.label)
            : size || 80;

        /*
         * Generate state arrays if they don't match the current level count.
         */
        if (this.directions.length !== count) {
            this.directions = Array.from({ length: count }, (_, i) => rotations[i % 4]);
            this.letters = Array.from({ length: count }, () => alphabetPool[Math.floor(Math.random() * alphabetPool.length)]);
            this.numbers = Array.from({ length: count }, () => numericPool[Math.floor(Math.random() * numericPool.length)]);
        }

        /*
         * Create a Landolt C whose opening matches the background color.
         */
        function createRedGreenC(pixelSize, rotation, backgroundColor) {
            const svgSize = Math.max(1, Number(pixelSize)).toFixed(3);
            return `
                <svg
                    class="landolt-c-svg"
                    width="${svgSize}" height="${svgSize}" viewBox="0 0 100 100"
                    role="img" aria-label="Landolt C"
                    style="width:${svgSize}px; height:${svgSize}px; display:block; flex:none;"
                >
                    <g transform="rotate(${rotation} 50 50)">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#000" stroke-width="20" shape-rendering="geometricPrecision"></circle>
                        <rect x="70" y="40" width="30" height="20" fill="${backgroundColor}"></rect>
                    </g>
                </svg>
            `;
        }

        // Shared CSS for text-based optotypes (E, Alphabets, Numerics)
        const textStyle = `
            width:${cSize}px;
            height:${cSize}px;
            color:#000000;
            font-family:Arial,sans-serif;
            font-size:${cSize}px;
            font-weight:700;
            line-height:1;
            display:flex;
            align-items:center;
            justify-content:center;
            flex:none;
        `;

        const modes = this.getModes();

        if (this.modeIndex >= modes.length) {
            this.modeIndex = 0;
        }

        const currentMode = modes[this.modeIndex];
        let redIcons = "";
        let greenIcons = "";

        const rtlLanguages = [
            "urdu",
            "arabic",
            "persian",
            "hebrew",
            "sindhi",
            "kashmiri"
        ];

        const isLanguageMode =
            typeof LANGUAGE_NAMES !== "undefined" &&
            LANGUAGE_NAMES[currentMode];

        const languageLetters =
            isLanguageMode &&
            typeof LANGUAGE_LETTERS !== "undefined"
                ? LANGUAGE_LETTERS[currentMode] || ["A", "B", "C", "D"]
                : [];

        // Generate the icons based on the currently selected right-click mode
        for (let i = 0; i < count; i++) {
            if (currentMode === "landolt") {
                redIcons += createRedGreenC(cSize, this.directions[i], "#ff0000");
                greenIcons += createRedGreenC(cSize, this.directions[i], "#00a000");
            }
            else if (currentMode === "tumbling") {

    const eIcon =
        createTumblingESvg(
            cSize,
            this.directions[i]
        );

    redIcons += eIcon;
    greenIcons += eIcon;
}

else if (currentMode === "alphabets") {

    const letterIcon =
        createAlphabetSvg(
            this.letters[i],
            cSize
        );

    redIcons += letterIcon;
    greenIcons += letterIcon;
}

else if (currentMode === "numerics") {

    const numberIcon =
        createNumericSvg(
            this.numbers[i],
            cSize
        );

    redIcons += numberIcon;
    greenIcons += numberIcon;
}
            
            else if (isLanguageMode) {
                const direction = rtlLanguages.includes(currentMode)
                    ? " direction:rtl;"
                    : "";
                const letter =
                    currentLevel === 0
                        ? languageLetters[languageRowIndex % languageLetters.length]
                        : languageLetters[i % languageLetters.length];
                const languageIcon = `<span class="language" style="${textStyle}${direction}">${letter}</span>`;
                redIcons += languageIcon;
                greenIcons += languageIcon;
            }
        }

        const gap = count > 1 ? getOptotypeGap(cSize) : 0;

        area.innerHTML = `
            <div
                class="redgreen-chart"
                style="position:absolute; inset:0; width:100%; height:100%; display:flex; overflow:hidden;"
            >
                <!-- RED HALF -->
                <div style="position:relative; width:50%; height:100%; background:#ff0000; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                    <div style="display:flex; align-items:center; justify-content:center; flex-wrap:wrap; gap:${gap}px; width:100%; height:100%;">
                        ${redIcons}
                    </div>
                </div>

                <!-- GREEN HALF -->
                <div style="position:relative; width:50%; height:100%; background:#00a000; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                    <div style="display:flex; align-items:center; justify-content:center; flex-wrap:wrap; gap:${gap}px; width:100%; height:100%;">
                        ${greenIcons}
                    </div>
                </div>
            </div>
        `;
    },

    cycleMode() {
        this.modeIndex = (this.modeIndex + 1) % this.getModes().length;

        if (typeof renderFeature === "function") {
            renderFeature();
        }
    },
    previousMode() {
    const modes = this.getModes();

    this.modeIndex =
        (this.modeIndex - 1 + modes.length) % modes.length;

    if (typeof renderFeature === "function") {
        renderFeature();
    }
},

    randomize() {
        const count = currentLevel + 1;
        const rotations = [0, 90, 180, 270];
        const alphabetPool = "CDHKNORSVZ";
        const numericPool = "123456789";

        // Randomize all modes
        this.directions = Array.from(
            { length: count },
            () => rotations[Math.floor(Math.random() * rotations.length)]
        );
        this.letters = Array.from(
            { length: count },
            () => alphabetPool[Math.floor(Math.random() * alphabetPool.length)]
        );
        this.numbers = Array.from(
            { length: count },
            () => numericPool[Math.floor(Math.random() * numericPool.length)]
        );

        if (typeof renderFeature === "function") {
            renderFeature();
        }
    }
};

/* =====================================================
 * RIGHT-CLICK (MOUSEDOWN) LISTENER
 * Uses 'mousedown' checking for button === 2 to bypass
 * any oncontextmenu="return false" blocks in your HTML.
 * ===================================================== */

document.addEventListener("mousedown", function(e) {
    // Check if it's a right-click (2) AND we are on the redgreen test
    if (e.button === 2 && typeof currentTest !== "undefined" && currentTest === "redgreen") {
        e.preventDefault();
        e.stopPropagation();

        if (
            FEATURES["redgreen"] &&
            typeof FEATURES["redgreen"].cycleMode === "function"
        ) {
            FEATURES["redgreen"].cycleMode();
        }
    }
}, true); // 'true' forces it into the capture phase, overriding other scripts

// Simply block the browser's default dropdown menu from appearing
document.addEventListener("contextmenu", function(e) {
    if (typeof currentTest !== "undefined" && currentTest === "redgreen") {
        e.preventDefault();
    }
}, true);
