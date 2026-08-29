/* SNELLEN — full multi-row chart from the current app. */
let snellenPage = 0;
let snellenOffset = 0;

FEATURES["snellen"] = {
    render(area) {
        const pages = [
            ["8", "8 1", "9 2 3", "1 6 3 7", "4 7 3 9 8", "3 8 6 1 5 9", "7 2 9 4 6 1 8", "5 8 3 7 1 9 4 6"],
            ["6", "6 2", "3 6 5", "8 7 9 2", "0 3 8 6 1", "2 7 4 9 5 8", "4 1 7 3 9 6 2", "8 5 2 6 1 4 7 3"],
            ["E", "E E", "E E E", "E E E E", "E E E E E", "E E E E E E", "E E E E E E E", "E E E E E E E E"],
            ["C", "C C", "C C C", "C C C C", "C C C C C", "C C C C C C", "C C C C C C C", "C C C C C C O"]
        ];
        const acuities = ["6/60", "6/36", "6/24", "6/18", "6/12", "6/9", "6/6", "6/4"];
        const rowSizes = [92, 66, 51, 41, 34, 29, 24, 20];

        area.innerHTML = `<div class="snellen" style="position:relative;width:100%;padding-top:80px;box-sizing:border-box;transition:transform .15s ease;">
            ${pages[snellenPage].map((text, index) => `<div style="position:relative;width:100%;height:${rowSizes[index] + 55}px;margin-bottom:18px;display:flex;align-items:center;justify-content:center;box-sizing:border-box;">
                <div style="position:absolute;left:8%;font:16px Arial,sans-serif;color:#333;">${acuities[index]}</div>
                <div style="font-family:Arial,sans-serif;font-size:${rowSizes[index]}px;font-weight:700;line-height:1;letter-spacing:${rowSizes[index] * .32}px;white-space:nowrap;text-align:center;">${text}</div>
                <div style="position:absolute;right:8%;font:16px Arial,sans-serif;color:#777;">${acuities[index]}</div>
            </div>`).join("")}
        </div>`;
        snellenOffset = 0;
        this.updateIndicator();
    },

    next() {
        this.scroll(300);
    },

    prev() {
        this.scroll(-300);
    },

    scroll(amount) {
        const chart = document.querySelector(".snellen");
        if (!chart) return;
        const minOffset = Math.min(0, window.innerHeight - chart.scrollHeight - 70);
        snellenOffset = Math.max(minOffset, Math.min(0, snellenOffset - amount));
        chart.style.transform = `translateY(${snellenOffset}px)`;
    },

    updateIndicator() {
        const indicator = document.getElementById("levelIndicator");
        if (indicator) indicator.innerText = `CHART ${snellenPage + 1} / 4`;
    }
};
