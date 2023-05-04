import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";

export default defineConfig({
  server: {
    open: "index.html",
  },
  assetsInclude: ["**/*.md"],
  plugins: [UnoCSS()],
});
