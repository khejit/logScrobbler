const computedStyle = getComputedStyle(document.documentElement);

function getPropVal(name) {return computedStyle.getPropertyValue(name)};

export const colorMain = getPropVal('--color-main') || "#2C3E50";
export const colorAccent = getPropVal('--color-accent') || "#2C4F73";
export const colorAccentLight = getPropVal('--color-accent-light') || "#5183B5";
export const colorBackground = getPropVal('--color-background') || "#EBDFD3";
export const colorBackgroundLight = getPropVal('--color-background-light') || "#F0F0F0";
export const colorComplementary = getPropVal('--color-complementary') || "#57483A";
export const colorDanger = getPropVal("--color-danger") || "#B6174B";