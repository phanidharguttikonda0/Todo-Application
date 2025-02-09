/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", // Include the root App file
    "./screens/**/*.{js,jsx,ts,tsx}", // Include all files inside the screens folder
    "./components/**/*.{js,jsx,ts,tsx}", // Include all files inside the components folder
  ],
  theme: {
    extend: {
      colors:{
        background: 'bg-slate-900'
      }
    },
  },
  plugins: [],
};

// When content folder is empty then it doesn't gonna scan the class names
