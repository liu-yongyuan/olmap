# 🧪 JS Code Runner Playground

这是一个基于 React + TypeScript 的在线代码运行环境，支持通过 CodeMirror 编辑器编写并实时运行 JavaScript/TypeScript 示例代码，适合练习《JavaScript 高级程序设计》等书籍中的章节代码。

---

## ✨ 特性 Features

- 💡 支持加载 `.ts` 源文件为字符串并动态运行
- 🖊️ 集成 CodeMirror 编辑器，支持语法高亮
- ⚡ 通过 iframe 或 Babel 实现浏览器内代码沙箱执行
- 🎨 使用 Tailwind CSS 构建美观 UI
- 🧰 使用 Webpack 打包，内置 ESlint + Prettier

---

## 🛠️ 快速开始

```bash
git clone https://github.com/liu-yongyuan/react-codemirror-tailwind-template.git
cd react-codemirror-tailwind-template
npm install
npm run dev
```

浏览器自动打开：http://localhost:3000

---

## 📁 项目结构

```
.
├── public/
│   └── index.html
├── src/
│   ├── code/                      # 存放每个章节的代码示例（.ts）
│   ├── components/CodeRunner.tsx # 主运行组件
│   ├── index.tsx                 # 入口文件
│   └── index.css                 # TailwindCSS 样式入口
├── tailwind.config.js
├── postcss.config.js
├── webpack.config.js
└── README.md
```

---

## 📦 依赖说明

- React 18
- TypeScript
- Webpack 5
- Tailwind CSS 4
- CodeMirror 6
- Babel Standalone（可选）
- ESLint + Prettier

---

## 📚 示例章节代码添加方式

在 `src/code` 下添加 `.ts` 文件，如：

```ts
// variable-scope.ts
let a = 10;
{
  let a = 20;
  console.log(a); // 20
}
console.log(a); // 10
```

然后在 `App.tsx` 中引入：

```tsx
import code from './code/variable-scope.ts?raw';
```

---

## 🧑‍💻 开发者

Made with ❤️ by yongyuan[https://github.com/liu-yongyuan]

---

## 📄 License

MIT