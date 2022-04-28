module.exports = {
    darkMode: "class",
    content: ["./front/index.html", "./front/src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            scale: {
                "-1": "-1",
            },
        },
    },
    plugins: [require("tw-elements/dist/plugin")],
};
