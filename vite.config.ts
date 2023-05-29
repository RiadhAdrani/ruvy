import path from "path";

export default {
  plugins: [],
  test: {
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@branch": path.resolve(__dirname, "./src/branch"),
      "@router": path.resolve(__dirname, "./src/router"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@scheduler": path.resolve(__dirname, "./src/scheduler"),
      "@core": path.resolve(__dirname, "./src/core"),
    },
  },
};
