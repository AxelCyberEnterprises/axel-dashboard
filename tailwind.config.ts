export default {
  important: true,
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: { extend: {} },
  plugins: [require("tailwind-scrollbar")],
};
