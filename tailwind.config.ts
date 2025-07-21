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
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))',
					dark: 'hsl(var(--primary-dark))'
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
				ai: {
					core: 'hsl(var(--ai-core))',
					pulse: 'hsl(var(--ai-pulse))',
					ring: 'hsl(var(--ai-ring))',
					particle: 'hsl(var(--ai-particle))',
					glow: 'hsl(var(--ai-glow))'
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
				'pulse-glow': {
					'0%, 100%': {
						transform: 'scale(1)',
						boxShadow: 'var(--glow-primary)'
					},
					'50%': {
						transform: 'scale(1.05)',
						boxShadow: 'var(--glow-strong)'
					}
				},
				'rotate-ring': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.8)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'ripple': {
					'0%': {
						transform: 'scale(0)',
						opacity: '1'
					},
					'100%': {
						transform: 'scale(2)',
						opacity: '0'
					}
				},
				
				// Cog machine orb keyframes
				"rotate-clockwise": {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
				"rotate-counter-clockwise": {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(-360deg)" },
				},
				"listening-halo": {
					"0%, 100%": { transform: "scale(1)", opacity: "0.6" },
					"50%": { transform: "scale(1.1)", opacity: "0.8" },
				},
				"breathe": {
					"0%, 100%": { transform: "scale(1)" },
					"50%": { transform: "scale(1.03)" },
				},
				"fade-in": {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"slide-in-from-right": {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(0)" },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'rotate-ring': 'rotate-ring 20s linear infinite',
				'fade-in-up': 'fade-in-up 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'ripple': 'ripple 1s ease-out infinite',
				
				// Cog machine orb animations
				"rotate-clockwise": "rotate-clockwise 60s linear infinite",
				"rotate-counter-clockwise": "rotate-counter-clockwise 40s linear infinite",
				"listening-halo": "listening-halo 1s ease-in-out infinite",
				"breathe": "breathe 2s ease-in-out infinite",
				"ripple-1": "ripple 0.6s ease-out infinite",
				"ripple-2": "ripple 0.6s ease-out 0.2s infinite",
				"ripple-3": "ripple 0.6s ease-out 0.4s infinite",
				"fade-in": "fade-in 0.3s ease-out",
				"slide-in-from-right": "slide-in-from-right 0.3s ease-out",
			},
			boxShadow: {
				'glow': 'var(--glow-primary)',
				'glow-strong': 'var(--glow-strong)',
				'glow-soft': 'var(--glow-soft)'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-pulse': 'var(--gradient-pulse)',
				'gradient-tech': 'var(--gradient-tech)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
