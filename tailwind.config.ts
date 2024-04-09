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
        screens: {
            '2xs': '280px',
            xs: '375px',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
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
    safelist: [
        // For the tailwind classes
        {
            pattern: /w-(16|32|52|96)/,
        },
        {
            pattern: /h-(16|32|52|96)/
        },
    ]
};
export default config;
