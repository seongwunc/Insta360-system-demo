# Insta360 一体化营销工作台 Demo

这是一个使用 `Vite + D3` 搭建的前端原型，入口在 `demo/index.html`。

## 目录说明

- `demo/index.html`：页面入口
- `demo/app.js`：页面逻辑、跳转关系、交互状态
- `demo/styles.css`：页面样式
- `vite.config.js`：构建配置，已设置为适配 GitHub Pages 的相对路径
- `package.json`：项目脚本
- `dist/`：构建产物，由 `npm run build` 生成
- `Insta360_opening_report_part2.docx`、`Insta360_DJI_market_research_part1.docx`、`*.png`：参考资料和示意图，不影响页面运行

## 本地运行

```cmd
npm install
npm run dev
```

打开终端显示的本地地址即可预览页面。

## 构建发布版

```cmd
npm run build
```

构建完成后，静态文件会输出到 `dist/`。

## 部署到 GitHub Pages

### 方式一：使用 `gh-pages` 分支

```cmd
npm install
npm install -D gh-pages
npm run build
npx gh-pages -d dist
```

然后到 GitHub 仓库的 `Settings > Pages`，把发布源设置为 `gh-pages` 分支的根目录。

### 方式二：只推送源码到 GitHub

如果你只是想把项目源码放到 GitHub 仓库：

```cmd
git init
git add .
git commit -m "feat: add Insta360 demo"
git branch -M main
git remote add origin https://github.com/<你的账号>/<你的仓库名>.git
git push -u origin main
```

## 推荐的最小部署文件

如果目标只是部署这个 Demo，通常只需要这些内容：

- `demo/`
- `package.json`
- `vite.config.js`
- `README.md`
- `pnpm-lock.yaml` 或其他锁文件（按你的包管理器决定）

`node_modules/`、`dist/` 可以不提交到 Git 仓库；`dist/` 由构建命令生成。
