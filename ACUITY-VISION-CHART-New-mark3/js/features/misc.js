/* MISC — IMAGE NAVIGATION */

const MISC_IMAGES = [
    "icons/Educational/misc1.png",
    "icons/Educational/misc2.png",
    "icons/Educational/misc3.png",
    "icons/Educational/misc4.png",
    "icons/Educational/misc5.png",
    "icons/Educational/misc6.png"
];

let miscImageIndex = 0;

FEATURES["misc"] = {

    render(area, size) {

        miscImageIndex = Math.max(
            0,
            Math.min(miscImageIndex, MISC_IMAGES.length - 1)
        );

        area.innerHTML = `
            <div style="
                width:100%;
                height:100%;
                display:flex;
                align-items:center;
                justify-content:center;
            ">
                <img
                    src="${MISC_IMAGES[miscImageIndex]}"
                    alt="Misc image ${miscImageIndex + 1} of ${MISC_IMAGES.length}"
                    style="
                        max-width:80%;
                        max-height:80%;
                        object-fit:contain;
                        display:block;
                    "
                >
            </div>
        `;
    },

    next() {
        if (miscImageIndex < MISC_IMAGES.length - 1) {
            miscImageIndex++;
            renderFeature();
        }
    },

    prev() {
        if (miscImageIndex > 0) {
            miscImageIndex--;
            renderFeature();
        }
    }
};
