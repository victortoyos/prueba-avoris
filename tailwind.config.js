export default {
  content: ["./index.html", "./src/**/*.{ts,html}"],
  theme: {
    screens: {
      tablet: "744px",
      desktop: "1024px",
    },
    extend: {
      fontFamily: {
        heading: "var(--font-heading)",
        body: "var(--font-body)",
      },
    },
  },
  plugins: [],
}; 
