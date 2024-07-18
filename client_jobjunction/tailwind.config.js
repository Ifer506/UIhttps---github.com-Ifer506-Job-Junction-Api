/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#20C6B1",    // Teal color for primary elements such as buttons
          secondary: "#FF6347",  // Tomato color for secondary elements
          accent: "#FFD700",     // Gold color for accent elements
          neutral: "#F5F5F5",    // Light gray for neutral backgrounds
          "base-100": "#FFFFFF", // White for the base background
          info: "#3B82F6",       // Light blue for informational elements
          success: "#10B981",    // Green for success messages
          warning: "#F59E0B",    // Amber for warning messages
          error: "#EF4444",      // Red for error messages
        },
      },
    ],
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true,
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss-flip"),
    require("@tailwindcss/forms"),
  ],
};
