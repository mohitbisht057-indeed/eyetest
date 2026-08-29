/* PEDIATRIC */
const pediatricImages = [
    "icons/Pasted image.png",
    "icons/Pasted image (2).png",
    "icons/Pasted image (3).png",
    "icons/Pasted image (4).png",
    "icons/Pasted image (5).png",
    "icons/Pasted image (6).png",
    "icons/Pasted image (7).png",
    "icons/Pasted image (8).png",
    "icons/Pasted image (9).png"
];

let pediatricRowIndex = 0;

FEATURES["pediatric"] = {
    render(area, size) {

        let currentImages = [];

        if (currentLevel === 0) {
            currentImages.push(pediatricImages[pediatricRowIndex]);
        } else {
            const count = currentLevel + 1;

            for (let i = 0; i < count; i++) {
                let randomIndex;

                do {
                    randomIndex = Math.floor(Math.random() * pediatricImages.length);
                } while (i > 0 && pediatricImages[randomIndex] === currentImages[i - 1]);

                currentImages.push(pediatricImages[randomIndex]);
            }
        }

        area.innerHTML = `
            <div style="
                display:flex;
                justify-content:center;
                align-items:center;
                flex-wrap:wrap;
                gap:${Math.max(20, size * 0.15)}px;
                width:100%;
            ">
                ${currentImages.map(src => `
                    <img
                        src="${src}"
                        alt=""
                        style="
                            width:${size}px;
                            height:${size}px;
                            object-fit:contain;
                        "
                    >
                `).join("")}
            </div>
        `;
    },

    prev() {

        if (currentLevel === 0) {
            let newIndex;

            do {
                newIndex = Math.floor(Math.random() * pediatricImages.length);
            } while (newIndex === pediatricRowIndex);

            pediatricRowIndex = newIndex;
            renderFeature();
            return;
        }

        if (currentLevel > 0) {
            currentLevel--;
            localStorage.setItem("level_" + currentTest, currentLevel);

            if (currentLevel === 0) {
                pediatricRowIndex = Math.floor(Math.random() * pediatricImages.length);
            }

            renderFeature();
        }
    }
};
