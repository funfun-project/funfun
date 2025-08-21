// eslint.config.mjs
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const eslintConfig = [
  // 0) 무시 경로(ESLint v9 flat config는 파일 안에서 지정)
  {
    ignores: ['node_modules/**', '.next/**', 'dist/**', 'build/**', 'coverage/**']
  },

  // 1) JS 기본 권장
  js.configs.recommended,

  // 2) TypeScript 권장 (필요 시 타입체크 규칙으로 강화 가능)
  ...tseslint.configs.recommended,
  // 타입 정보 활용한 규칙을 쓰려면 위 대신 다음을 사용:
  // ...tseslint.configs.recommendedTypeChecked,
  // 그리고 files/ languageOptions.parserOptions.project 설정 추가(아래 참고)

  // 3) Next.js 권장(+ Core Web Vitals)
  nextPlugin.configs.recommended,
  nextPlugin.configs['core-web-vitals'],

  // 4) Prettier와 충돌하는 규칙 끄기
  prettier,

  // 5) 공통 옵션/규칙
  {
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      // Prettier 결과를 ESLint 에러로 보이기
      'prettier/prettier': [
        'error',
        {
          semi: true,
          singleQuote: true,
          printWidth: 100,
          tabWidth: 2,
          useTabs: false,
          trailingComma: 'es5',
          bracketSpacing: true,
          arrowParens: 'always',
          endOfLine: 'lf'
        }
      ],

      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
  },

  // 6) TypeScript 전용(선택: 타입체크 규칙 사용 시에만 필요)
  // {
  //   files: ['**/*.{ts,tsx}'],
  //   languageOptions: {
  //     parserOptions: {
  //       project: ['./tsconfig.json'],
  //       tsconfigRootDir: import.meta.dirname
  //     }
  //   }
  // }
];

export default eslintConfig;