/* DOTS */
FEATURES["dots"] = {
    boxes: [
        { className: "d5-rotated", dots: 5 },
        { className: "d3-tri", dots: 3 },
        { className: "d1-topleft", dots: 1 },
        { className: "d1-botright", dots: 1 },
        { className: "d2-diag", dots: 2 },
        { className: "d2-vert", dots: 2 },
        { className: "d3-diag", dots: 3 },
        { className: "d4-skew", dots: 4 },
        { className: "d4-diamond", dots: 4 },
        { className: "d5-cross", dots: 5 },
        { className: "d5-alt", dots: 5 }
  ],
  shuffle() {
      for (let i = this.boxes.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.boxes[i], this.boxes[j]] =
              [this.boxes[j], this.boxes[i]];
      }
  },

    render(area, size) {
        const count =
            Math.min(currentLevel + 1, 8);

        const visibleBoxes =
            this.boxes.slice(0, count);

        const gap =
            count > 1 ? getOptotypeGap(size) : 0;

        const dotSize =
            Math.max(4, size * (15 / 96));

        area.innerHTML = `
            <style>
                .dots-test-row {
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    flex-wrap:wrap;
                    gap:${gap}px;
                    opacity:1;
                }

                .dots-test-box {
                    width:${size}px;
                    height:${size}px;
                    background:#f5f2e8;
                    border:1px solid #d8d3c2;
                    border-radius:${Math.max(2, size * (6 / 96))}px;
                    position:relative;
                    box-shadow:inset 0 0 0 1px rgba(0,0,0,0.02);
                    flex:0 0 auto;
                    box-sizing:border-box;
                }

                .dots-test-dot {
                    position:absolute;
                    width:${dotSize}px;
                    height:${dotSize}px;
                    background:#1c2340;
                    border-radius:50%;
                    transform:translate(-50%, -50%);
                }

                .d1-topleft .dots-test-dot { top:25%; left:25%; }
                .d1-botright .dots-test-dot { top:75%; left:75%; }
                .d1-center .dots-test-dot { top:50%; left:50%; }

                .d2-diag .dots-test-dot:nth-child(1) { top:25%; left:25%; }
                .d2-diag .dots-test-dot:nth-child(2) { top:75%; left:75%; }

                .d2-vert .dots-test-dot:nth-child(1) { top:25%; left:50%; }
                .d2-vert .dots-test-dot:nth-child(2) { top:75%; left:50%; }

                .d2-classic .dots-test-dot:nth-child(1) { top:25%; left:75%; }
                .d2-classic .dots-test-dot:nth-child(2) { top:75%; left:25%; }

                .d3-tri .dots-test-dot:nth-child(1) { top:22%; left:30%; }
                .d3-tri .dots-test-dot:nth-child(2) { top:55%; left:62%; }
                .d3-tri .dots-test-dot:nth-child(3) { top:82%; left:30%; }

                .d3-diag .dots-test-dot:nth-child(1) { top:22%; left:22%; }
                .d3-diag .dots-test-dot:nth-child(2) { top:50%; left:50%; }
                .d3-diag .dots-test-dot:nth-child(3) { top:78%; left:78%; }

                .d4-skew .dots-test-dot:nth-child(1) { top:20%; left:35%; }
                .d4-skew .dots-test-dot:nth-child(2) { top:35%; left:78%; }
                .d4-skew .dots-test-dot:nth-child(3) { top:65%; left:22%; }
                .d4-skew .dots-test-dot:nth-child(4) { top:80%; left:65%; }

                .d4-diamond .dots-test-dot:nth-child(1) { top:15%; left:50%; }
                .d4-diamond .dots-test-dot:nth-child(2) { top:50%; left:18%; }
                .d4-diamond .dots-test-dot:nth-child(3) { top:50%; left:82%; }
                .d4-diamond .dots-test-dot:nth-child(4) { top:85%; left:50%; }

                .d4-classic .dots-test-dot:nth-child(1) { top:25%; left:25%; }
                .d4-classic .dots-test-dot:nth-child(2) { top:25%; left:75%; }
                .d4-classic .dots-test-dot:nth-child(3) { top:75%; left:25%; }
                .d4-classic .dots-test-dot:nth-child(4) { top:75%; left:75%; }

                .d5-rotated .dots-test-dot:nth-child(1) { top:18%; left:55%; }
                .d5-rotated .dots-test-dot:nth-child(2) { top:35%; left:25%; }
                .d5-rotated .dots-test-dot:nth-child(3) { top:50%; left:65%; }
                .d5-rotated .dots-test-dot:nth-child(4) { top:70%; left:35%; }
                .d5-rotated .dots-test-dot:nth-child(5) { top:85%; left:75%; }

                .d5-cross .dots-test-dot:nth-child(1) { top:22%; left:22%; }
                .d5-cross .dots-test-dot:nth-child(2) { top:22%; left:78%; }
                .d5-cross .dots-test-dot:nth-child(3) { top:50%; left:50%; }
                .d5-cross .dots-test-dot:nth-child(4) { top:78%; left:22%; }
                .d5-cross .dots-test-dot:nth-child(5) { top:78%; left:78%; }

                .d5-alt .dots-test-dot:nth-child(1) { top:15%; left:25%; }
                .d5-alt .dots-test-dot:nth-child(2) { top:30%; left:60%; }
                .d5-alt .dots-test-dot:nth-child(3) { top:55%; left:30%; }
                .d5-alt .dots-test-dot:nth-child(4) { top:65%; left:75%; }
                .d5-alt .dots-test-dot:nth-child(5) { top:85%; left:50%; }
            </style>

            <div class="dots-test-row">
                ${visibleBoxes.map(box => `
                    <div class="dots-test-box ${box.className}">
                        ${Array.from(
                            { length: box.dots },
                            () => `<span class="dots-test-dot"></span>`
                        ).join("")}
                    </div>
                `).join("")}
            </div>
        `;
    }
};
