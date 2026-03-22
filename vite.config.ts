import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg,json}"],
			},
			devOptions: {
				enabled: true,
			},
			injectRegister: "inline",
			manifest: {
				name: "Moving Averages",
				short_name: "Moving Averages",
				description: "Crypto Fear and Greed Index Moving Averages",
				display: "standalone",
				background_color: "#2B2D42",
				theme_color: "#8884d8",
				start_url: "/moving-averages/",
				scope: "/moving-averages/",
				icons: [
					{
						src: "icons/android-chrome-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "icons/android-chrome-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "icons/android-chrome-maskable-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "maskable",
					},
					{
						src: "icons/android-chrome-maskable-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
			},
		}),
	],
	base: "/moving-averages/",
});
