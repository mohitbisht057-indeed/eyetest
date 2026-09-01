/* LOGMAR — calibrated five-optotype rows */

let logmarPage = 0;
let logmarOffset = 0;

const LOGMAR_PAGES = [
    ["A V Z D L", "N H J K A", "Q E R T Y", "R T Y U I", "O K M F R", "O L E R W", "W Q A S D", "D F U B C"],
    ["6 2 3 4 5", "6 2 3 1 3", "3 6 5 3 4", "8 7 9 2 4", "0 3 8 6 1", "2 7 4 9 5", "4 1 7 3 9", "8 5 2 6 1"],
    ["E E E E E", "E E E E E", "E E E E E", "E E E E E", "E E E E E", "E E E E E", "E E E E E", "E E E E E"],
    ["C C C C C", "C C C C C", "C C C C C", "C C C C C", "C C C C C", "C C C C C", "C C C C C", "C C C C C"]
];

FEATURES["logmar"] = {
    render(area) {
        const rows = LOGMAR_PAGES[logmarPage];
        const isLandolt = logmarPage === 3;

        area.innerHTML = `
            <div id="logmarChart" class="calibrated-chart-scroll">
                <div class="calibrated-chart-content" style="transform:translateY(${logmarOffset}px)">
                    ${ACUITY_LEVELS.map((level, index) => {
                        const size = calculateOptotypeSize(level.label);
                        const symbols = rows[index].split(" ");

                        return `
                            <div class="calibrated-chart-row" style="min-height:${Math.ceil(size + 42)}px">
                                <div class="chart-acuity chart-acuity-left">${level.label}</div>
                                <div class="chart-optotypes" style="gap:${getOptotypeGap(size)}px">
                                    ${isLandolt
                                        ? symbols.map((_, i) => createLandoltCSvg(size, [0, 90, 180, 270][i % 4])).join("")
                                        : symbols.map(symbol => `<span class="acuity-optotype-box" style="width:${Math.round(size)}px;height:${Math.round(size)}px;font-size:${Math.round(size)}px">${symbol}</span>`).join("")}
                                </div>
                                <div class="chart-acuity chart-acuity-right">${imperialAcuityLabel(level.label)}</div>
                            </div>`;
                    }).join("")}
                </div>
            </div>`;

        this.clampOffset();
        this.updateIndicator();
    },

    next() {
        logmarPage = (logmarPage + 1) % LOGMAR_PAGES.length;
        logmarOffset = 0;
        this.render(document.getElementById("testArea"));
    },

    prev() {
        logmarPage = (logmarPage + LOGMAR_PAGES.length - 1) % LOGMAR_PAGES.length;
        logmarOffset = 0;
        this.render(document.getElementById("testArea"));
    },

    scroll(amount) {
        logmarOffset -= amount;
        this.clampOffset();
    },

    clampOffset() {
        const container = document.getElementById("logmarChart");
        const content = container?.querySelector(".calibrated-chart-content");
        if (!container || !content) return;

        const minimum = Math.min(0, container.clientHeight - content.scrollHeight);
        logmarOffset = Math.max(minimum, Math.min(0, logmarOffset));
        content.style.transform = `translateY(${logmarOffset}px)`;
    },

    updateIndicator() {
        const indicator = document.getElementById("levelIndicator");
        if (indicator) indicator.textContent = `LOGMAR ${logmarPage + 1} / ${LOGMAR_PAGES.length}`;
    }
};
