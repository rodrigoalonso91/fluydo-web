// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import path from 'path';
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      DIRECTUS_ADMIN_APIKEY: envField.string({ context: "server", access: "secret" }),
      DIRECTUS_BO_URL: envField.string({ context: "server", access: "public" }),
      DIRECTUS_SETTINGS_ID: envField.string({ context: "server", access: "secret", default: "" })
    }
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src')
      }
    }
  },
  output: 'server',
  adapter: netlify()
});