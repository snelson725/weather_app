// Hex color variables
const HEX_COLD = "#0078FF";
const HEX_WARM = "#FFA500";
const HEX_HOT  = "#FF0000";

// Convert hex → RGB
function hexToRgb(hex) {
    const clean = hex.replace("#", "");
    return {
        r: parseInt(clean.substring(0, 2), 16),
        g: parseInt(clean.substring(2, 4), 16),
        b: parseInt(clean.substring(4, 6), 16)
    };
}

// Color stops
const COLOR_COLD = hexToRgb(HEX_COLD);
const COLOR_WARM = hexToRgb(HEX_WARM);
const COLOR_HOT  = hexToRgb(HEX_HOT);

// Temperature range
const TEMP_MIN = 30;
const TEMP_MAX = 100;

// Helpers
function lerp(a, b, t) {
    return a + (b - a) * t;
}

function blend(c1, c2, t) {
    return {
        r: Math.round(lerp(c1.r, c2.r, t)),
        g: Math.round(lerp(c1.g, c2.g, t)),
        b: Math.round(lerp(c1.b, c2.b, t))
    };
}

// Main temperature → color
function getTempColor(temp) {
    const t = Math.max(TEMP_MIN, Math.min(TEMP_MAX, temp));
    const ratio = (t - TEMP_MIN) / (TEMP_MAX - TEMP_MIN);

    let color;

    if (ratio < 0.5) {
        color = blend(COLOR_COLD, COLOR_WARM, ratio / 0.5);
    } else {
        color = blend(COLOR_WARM, COLOR_HOT, (ratio - 0.5) / 0.5);
    }

    return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

// Update legend gradient
function updateLegendGradient() {
    const bar = document.querySelector('.legend-bar');
    bar.style.background = `linear-gradient(
        to right,
        ${HEX_COLD},
        ${HEX_WARM},
        ${HEX_HOT}
    )`;
}
