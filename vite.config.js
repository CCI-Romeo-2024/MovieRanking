import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    base: '',

    build: {
        target: 'es2022',
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
                movie: path.resolve(__dirname, 'movie.html'),
                saved: path.resolve(__dirname, 'saved.html'),
                suggest_lobby: path.resolve(__dirname, './suggest/index.html'),
                suggest_add_m: path.resolve(__dirname, './suggest/add_movie.html'),
                suggest_edit_m: path.resolve(__dirname, './suggest/edit_movie.html'),
                suggest_add_c: path.resolve(__dirname, './suggest/add_category.html'),
                suggest_edit_c: path.resolve(__dirname, './suggest/edit_category.html'),
            }
        },
    },

    resolve: {
        alias: {
            '@controllers': path.resolve(__dirname, 'src/controllers'),
            '@lib': path.resolve(__dirname, 'src/lib'),
            '@models': path.resolve(__dirname, 'src/models'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@renders': path.resolve(__dirname, 'src/renders'),
            '@svg': path.resolve(__dirname, 'public/svg')
        }
    },

    css: {
        preprocessorOptions: {
            scss: {
                additionalData: ``
            }
        }
    }
});
