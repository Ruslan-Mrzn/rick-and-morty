import { defineConfig } from 'orval';

export default defineConfig({
  rm_api: {
    input: {
      target: './docs/swagger.yaml'
    },
    output: {
      target: './src/shared/types/api-types.ts',
      client: 'axios'
    }
  }
});
