import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index'],
  outDir: 'dist',
  declaration: true, // 生成 TypeScript 类型声明文件
  clean: true, // 清理输出目录
  rollup: {
    emitCJS: false, // 仅生成 ESM 格式
  },
});
