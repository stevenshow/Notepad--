import react from '@vitejs/plugin-react';
import { join } from 'path';
import { ConfigEnv, UserConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const srcRoot = join(__dirname, 'src');

export default ({ command }: ConfigEnv): UserConfig => {
	const baseConfig: UserConfig = {
		root: srcRoot,
		base: '/',
		plugins: [react(), tsconfigPaths({ root: __dirname })],
		resolve: {
			alias: {
				'/@': srcRoot,
			},
		},
		server: {
			port: process.env.PORT === undefined ? 3000 : +process.env.PORT,
		},
		optimizeDeps: {
			exclude: ['path'],
		},
	};

	return command === 'serve'
		? baseConfig // dev
		: {
				...baseConfig,
				base: '/.',
				build: {
					outDir: join(__dirname, 'dist'),
					emptyOutDir: true,
					rollupOptions: {},
				},
		  }; // prod
};
