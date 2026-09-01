/* MISC — IMAGE NAVIGATION */

const MISC_IMAGES = [
    "icons/misc1.png",
   "icons/misc-2.png",
   "icons/misc3.png",
   "icons/misc4.png",
   "icons/misc5.png",
   "icons/misc6.png",
   "icons/misc7.png",
   "icons/misc8.png",
   "icons/misc9.png",
   "icons/misc10.png"
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
