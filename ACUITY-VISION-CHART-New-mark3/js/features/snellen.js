/* SNELLEN — calibrated multi-row charts */

let snellenPage = 0;
let snellenOffset = 0;

const SNELLEN_PAGES = [
    ["8", "8 1", "9 2 3", "1 6 3 7", "4 7 3 9 8", "3 8 6 1 5 9", "7 2 9 4 6 1 8", "5 8 3 7 1 9 4 6"],
    ["6", "6 2", "3 6 5", "8 7 9 2", "0 3 8 6 1", "2 7 4 9 5 8", "4 1 7 3 9 6 2", "8 5 2 6 1 4 7 3"],
    ["E", "E E", "E E E", "E E E E", "E E E E E", "E E E E E E", "E E E E E E E", "E E E E E E E E"],
    ["C", "C C", "C C C", "C C C C", "C C C C C", "C C C C C C", "C C C C C C C", "C C C C C C C C"]
];

FEATURES["snellen"] = {
    render(area) {
        const rows = SNELLEN_PAGES[snellenPage];

        area.innerHTML = `
            <div id="snellenChart" class="calibrated-chart-scroll">
                <div class="calibrated-chart-content" style="transform:translateY(${snellenOffset}px)">
                    ${ACUITY_LEVELS.map((level, index) => {
                        const size = calculateOptotypeSize(level.label);
                        const symbols = rows[index].split(" ");
                        const isLandolt = snellenPage === 3;
                        const spacing = getOptotypeGap(size);

                        return `
                            <div class="calibrated-chart-row" style="min-height:${Math.ceil(size + 42)}px">
                                <div class="chart-acuity chart-acuity-left">${level.label}</div>
                                <div class="chart-optotypes snellen-optotypes" style="gap:${spacing}px">
                                    ${isLandolt
                                        ? symbols.map((_, i) => createLandoltCSvg(size, [0, 90, 180, 270][i % 4])).join("")
                                        : symbols.map(symbol => `
                                            <span class="snellen-symbol acuity-optotype-box" style="width:${Math.round(size)}px;height:${Math.round(size)}px;font-size:${Math.round(size)}px">${symbol}</span>
                                        `).join("")}
                                </div>
                                <div class="chart-acuity chart-acuity-right">${imperialAcuityLabel(level.label)}</div>
                            </div>`;
                    }).join("")}
                </div>
            </div>`;

        this.clampOffset();
        this.updateIndicator();
    },

    next() { this.scroll(300); },
    prev() { this.scroll(-300); },

    scroll(amount) {
        snellenOffset -= amount;
        this.clampOffset();
    },

    clampOffset() {
        const container = document.getElementById("snellenChart");
        const content = container?.querySelector(".calibrated-chart-content");
        if (!container || !content) return;

        const minimum = Math.min(0, container.clientHeight - content.scrollHeight);
        snellenOffset = Math.max(minimum, Math.min(0, snellenOffset));
        content.style.transform = `translateY(${snellenOffset}px)`;
    },

    updateIndicator() {
        const indicator = document.getElementById("levelIndicator");
        if (indicator) indicator.textContent = `CHART ${snellenPage + 1} / ${SNELLEN_PAGES.length}`;
    }
};
