import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

export default {
  input: "src/main.tsx",
  output: {
    file: "dist/bundle.js",
    format: "iife", // Используйте 'iife' для браузера, 'esm' для модулей ES
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }), // Убедитесь, что путь к tsconfig.json верный
    terser(),
    serve({
      contentBase: "dist",
      open: true,
      port: 3000,
    }),
    livereload("dist"),
  ],
};
