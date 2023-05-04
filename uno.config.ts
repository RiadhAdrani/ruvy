import presetUno from "@unocss/preset-uno";
import presetWebFonts from "@unocss/preset-web-fonts";
import { defineConfig, presetWind, presetAttributify } from "unocss";
import transformerDirectives from "@unocss/transformer-directives";

export default defineConfig({
  transformers: [transformerDirectives()],
  presets: [
    presetUno(),
    presetWind(),
    presetAttributify(),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: "Tajawal",
        monospace: "Ubuntu Mono",
      },
    }),
  ],
  shortcuts: [
    {
      "text-h1": "@apply w-full text-[36px] font-normal leading-[50px]",
      "text-h2": "@apply w-full text-[24px] font-normal leading-[36px]",
      "text-h3": "@apply w-full text-[20px] font-medium leading-[30px]",
      "text-h4": "@apply w-full text-[16px] font-semibold leading-[24px]",
      "text-h5": "@apply w-full text-[14px] font-bold leading-[20px]",
      "text-h6": "@apply w-full text-[12px] font-bold leading-[20px]",
      "text-display-lg": "@apply text-[92px] font-light leading-[100px]",
      "text-display-md": "@apply text-[62px] font-light leading-[75px]",
      "text-display-sm": "@apply text-[52px] font-normal leading-[70px]",
      "text-paragraph-lg": "@apply text-[18px] font-normal leading-[28px]",
      "text-paragraph-md": "@apply text-[16px] font-normal leading-[24px]",
      "text-paragraph-sm": "@apply text-[14px] font-normal leading-[20px]",
      "text-caption": "@apply text-[12px] font-normal leading-[18px]",
      "text-disabled": "@apply text-[color:var(--u-color-text-disabled)]",
      "text-0": "@apply text-[color:var(--u-color-text-highest-emphasis)]",
      "text-1": "@apply text-[color:var(--u-color-text-high-emphasis)]",
      "text-2": "@apply text-[color:var(--u-color-text-medium-emphasis)]",
      "text-3": "@apply text-[color:var(--u-color-text-low-emphasis)]",

      col: "@apply flex flex-col",
      row: "@apply flex flex-row",

      "col-center": "@apply col justify-center items-center",
      "row-center": "@apply row justify-center items-center",
    },
  ],
});
