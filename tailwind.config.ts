import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        fontFamily: {
            'body': ['Montserrat']
        },
        extend: {
            boxShadow: {
                'custom': '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
            },
            backgroundImage: {
                'custom-pattern':
                    "linear-gradient(to right, #FF4B2B, #FF416C)",
                'courseImage': "url('/course-pic.jpg')",
            },
            colors: {
                "custom-primary": "#1F2937",
                "custom-border-primary": "#1F2937"
            },
            textColor: {
                "custom-primary": "#4b5563",
            },
        },
    },
    plugins: [],
};
export default config;
