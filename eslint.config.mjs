// eslint.config.mjs
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default tseslint.config(
  // 0) 무시할 파일/폴더 (설정 파일은 린트 대상 제외)
  {
    ignores: [
      'eslint.config.*',
      '**/postcss.config.*',
      '**/tailwind.config.*',
      '**/next.config.*',
      '**/vite.config.*',
      '**/vitest.config.*',
      'node_modules/**',
      '.next/**',
      'dist/**',
      'build/**',
      'coverage/**',
    ],
  },

  // 1) JS 권장
  eslint.configs.recommended,

  // 2) TS 권장(타입체크 모드)
  tseslint.configs.recommendedTypeChecked,

  // 3) TS 타입 정보 제공 방식 (projectService 사용)
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // 4) Next 권장 + Core Web Vitals (FlatCompat로 공식 공유설정 확장)
  ...compat.config({ extends: ['next/core-web-vitals'] }),

  // 5) 공통 옵션/규칙 + Prettier 에러화
  {
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // 6) 항상 마지막: 충돌 규칙 끄기
  prettier,
);
