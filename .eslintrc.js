module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    project: "./tsconfig.json",
    createDefaultProgram: true,
  },
  env: {
    browser: true, // document나 window 인식되게 함
    node: true,
    es6: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "airbnb-typescript",
    "plugin:prettier/recommended",
    "plugin:@next/next/recommended",
    "prettier",
  ],
  rules: {
    // 'React' must be in scope when using JSX 에러 지우기(Next.js)
    "react/react-in-jsx-scope": "off",
    // ts파일에서 tsx구문 허용(Next.js)
    "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }], // should add ".ts" if typescript project
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "import/prefer-default-export": "off",
  },
}
