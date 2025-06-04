
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Enhanced vibrant color palette
				'yellow': {
					50: '#fffef0',
					100: '#fffacd',
					200: '#fff59d',
					300: '#ffed4e',
					400: '#ffdd00',
					500: '#ffd700',
					600: '#d4af37',
					700: '#b8860b',
					800: '#9a7c0a',
					900: '#7c6309'
				},
				'pink': {
					50: '#fff0f5',
					100: '#ffe4e8',
					200: '#ffcdd6',
					300: '#ffa8b8',
					400: '#ff69b4',
					500: '#ff1493',
					600: '#e91e63',
					700: '#c2185b',
					800: '#9c1458',
					900: '#7b1043'
				},
				'baby-blue': {
					50: '#f0f8ff',
					100: '#e0f0ff',
					200: '#b8e0ff',
					300: '#87ceeb',
					400: '#5bb8e8',
					500: '#3ba3d4',
					600: '#2e8bb8',
					700: '#26709c',
					800: '#1e5580',
					900: '#164466'
				},
				habit: {
					green: '#4CAF50',
					blue: '#87CEEB',
					purple: '#DDA0DD',
					orange: '#FFD700',
					red: '#FF69B4'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				'pulse-light': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.8'
					}
				},
				'check-mark': {
					'0%': {
						transform: 'scale(0)',
						opacity: '0'
					},
					'50%': {
						transform: 'scale(1.3)',
						opacity: '1'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px) rotate(0deg)'
					},
					'25%': {
						transform: 'translateY(-20px) rotate(5deg)'
					},
					'50%': {
						transform: 'translateY(0px) rotate(0deg)'
					},
					'75%': {
						transform: 'translateY(-10px) rotate(-3deg)'
					}
				},
				'rainbow': {
					'0%': { color: '#FFD700' },
					'33%': { color: '#FF69B4' },
					'66%': { color: '#87CEEB' },
					'100%': { color: '#FFD700' }
				},
				'bounce-gentle': {
					'0%, 20%, 50%, 80%, 100%': {
						transform: 'translateY(0)'
					},
					'40%': {
						transform: 'translateY(-8px)'
					},
					'60%': {
						transform: 'translateY(-4px)'
					}
				},
				'wiggle': {
					'0%, 7%': {
						transform: 'rotateZ(0)'
					},
					'15%': {
						transform: 'rotateZ(-15deg)'
					},
					'20%': {
						transform: 'rotateZ(10deg)'
					},
					'25%': {
						transform: 'rotateZ(-10deg)'
					},
					'30%': {
						transform: 'rotateZ(6deg)'
					},
					'35%': {
						transform: 'rotateZ(-4deg)'
					},
					'40%, 100%': {
						transform: 'rotateZ(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'pulse-light': 'pulse-light 2s infinite ease-in-out',
				'check-mark': 'check-mark 0.4s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'rainbow': 'rainbow 3s ease-in-out infinite',
				'bounce-gentle': 'bounce-gentle 1s ease-in-out',
				'wiggle': 'wiggle 0.8s ease-in-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
