
/* =====================================================
                    ISHIHARA
   28 actual Ishihara plates converted from PDF.

   UP / SIZE +       -> Next plate
   DOWN / SIZE -     -> Previous plate
   LEFT              -> Previous test
   RIGHT             -> Next test

   Files:
   icons/ishihara/plate-1.png
   icons/ishihara/plate-2.png
   ...
   icons/ishihara/plate-28.png
===================================================== */

FEATURES["ishihara"] = {

    totalPlates: 24,

    render(area) {

        /*
         * IMPORTANT:
         * Remove cleanup from an earlier render before
         * attaching anything new.
         */
        if (area._ishiharaCleanup) {
            area._ishiharaCleanup();
        }


        /*
         * Keep the plate index safely within range.
         */
        if (
            !Number.isInteger(currentIshiharaPlate) ||
            currentIshiharaPlate < 0 ||
            currentIshiharaPlate >= this.totalPlates
        ) {
            currentIshiharaPlate = 0;
        }


        const plateNumber =
            currentIshiharaPlate + 1;


        /*
         * Display the actual converted PDF page.
         */
        area.innerHTML = `

            <div class="ishihara-container">

                <img
                    class="ishihara-image"
                    src="icons/ishihara/plate-${plateNumber}.png"
                    alt="Ishihara test plate ${plateNumber}"
                    draggable="false"
                >

            </div>
        `;


        const image =
            area.querySelector(".ishihara-image");


        if (image) {

            /*
             * Let CSS control the maximum size so the
             * plate remains inside the viewport.
             */
            image.style.userSelect = "none";
            image.style.webkitUserDrag = "none";
            image.style.display = "block";
        }


        /*
         * Cleanup hook.
         *
         * Kept here so render() can safely clean up
         * future listeners/resources.
         */
        area._ishiharaCleanup = function () {

            area._ishiharaCleanup = null;
        };
    },


    /* =================================================
                    NEXT PLATE
    ================================================= */

    next() {

        if (
            currentIshiharaPlate <
            this.totalPlates - 1
        ) {

            currentIshiharaPlate++;

            localStorage.setItem(
                "ishihara_plate",
                currentIshiharaPlate
            );

            renderFeature();
        }
    },


    /* =================================================
                    PREVIOUS PLATE
    ================================================= */

    prev() {

        if (
            currentIshiharaPlate > 0
        ) {

            currentIshiharaPlate--;

            localStorage.setItem(
                "ishihara_plate",
                currentIshiharaPlate
            );

            renderFeature();
        }
    }
};
