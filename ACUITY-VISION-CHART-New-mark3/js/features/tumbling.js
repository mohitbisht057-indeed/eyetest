/* TUMBLING E — retains the current app's row/direction behaviour. */
let tumblingRowIndex = 0;
let tumblingSixFourIndex = 0;

FEATURES["tumbling"] = {
    render(area, size) {
        const rotations = [0, 90, 180, 270];
        const count = currentLevel === 7 ? 8 : currentLevel + 1;
        const directionOffset = currentLevel === 0
            ? tumblingRowIndex
            : currentLevel === 7
                ? tumblingSixFourIndex
                : 0;

        area.innerHTML = `
            <div style="display:flex;justify-content:center;align-items:center;gap:${Math.max(20, size * 0.15)}px;width:100%;">
                ${Array.from({ length: count }, (_, index) => `
                    <span style="display:inline-block;font-size:${size}px;font-weight:bold;line-height:1;transform:rotate(${rotations[(index + directionOffset) % rotations.length]}deg);">E</span>
                `).join("")}
            </div>
        `;
    },

    next() {
        if (currentLevel === 7) {
            tumblingSixFourIndex = (tumblingSixFourIndex + 1) % 10;
        } else {
            currentLevel++;
            localStorage.setItem("level_" + currentTest, currentLevel);
        }
        renderFeature();
    },

    prev() {
        if (currentLevel === 0) {
            tumblingRowIndex = (tumblingRowIndex + 1) % 4;
        } else {
            currentLevel--;
            localStorage.setItem("level_" + currentTest, currentLevel);
        }
        renderFeature();
    }
};
