/* =====================================================
                    CONTRAST TEST
===================================================== */

FEATURES["contrast"] = (() => {
    const contrastStates = [
        [100, 95, 90, 85, 80],
        [75, 70, 65, 50, 45],
        [40, 35, 30, 25, 20],
        [15, 10, 5, 0, 0]
    ];
    const letters = ["K", "N", "R", "S", "D", "Z", "H"];
    let state = 0;
    let area = null;

    function generateLetters() {
        return Array.from(
            { length: 5 },
            () => letters[Math.floor(Math.random() * letters.length)]
        );
    }

    function shuffleLetters() {
        if (!area) return;

        area.querySelectorAll(".contrast-letters").forEach(container => {
            const randomLetters = generateLetters();
            container.querySelectorAll("span").forEach((span, index) => {
                span.textContent = randomLetters[index];
            });
        });
    }

    function updateChart() {
        if (!area) return;

        area.querySelectorAll(".contrast-row").forEach((row, index) => {
            const contrast = contrastStates[state][index];
            const label = row.querySelector(".contrast-label.left");
            const container = row.querySelector(".contrast-letters");

            if (label) label.textContent = `< ${contrast}%`;
            if (container) {
                container.style.color = contrast <= 10
                    ? "transparent"
                    : `rgba(0, 0, 0, ${contrast / 100})`;
            }
        });

        const indicator = document.getElementById("levelIndicator");
        if (indicator) {
            indicator.innerText = `CONTRAST ${state + 1} / ${contrastStates.length}`;
        }
    }

    function changeState(direction) {
        const nextState = Math.max(
            0,
            Math.min(contrastStates.length - 1, state + direction)
        );

        if (nextState === state) return;

        state = nextState;
        updateChart();
        shuffleLetters();
    }

    function chartMarkup() {
        return Array.from({ length: 5 }, () => `
            <div class="contrast-row">
                <div class="contrast-label left"></div>
                <div class="contrast-letters">
                    ${generateLetters().map(letter => `<span>${letter}</span>`).join("")}
                </div>
                <div class="contrast-label right">&gt;</div>
            </div>
        `).join("");
    }

    return {
        render(testArea) {
            area = testArea;
            state = 0;
            area.innerHTML = `<div class="contrast-chart">${chartMarkup()}</div>`;
            updateChart();
        },
        next() { changeState(1); },
        prev() { changeState(-1); },
        shuffle() { shuffleLetters(); },
        getState() { return state; },
        totalStates: contrastStates.length
    };
})();
