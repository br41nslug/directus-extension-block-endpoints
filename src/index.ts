import { defineHook } from '@directus/extensions-sdk';

function getEnv<T>(variable: string, env: Record<string, any>, fallback: T): T {
	if (!(variable in env)) return fallback;
	return env[variable] as T;
}

export default defineHook(({ init }: any, { env, logger }: any) => {
	const enabled = getEnv<boolean>('BLOCKED_ENDPOINTS_ENABLED', env, true);
	const paths = getEnv<string[]>('BLOCKED_ENDPOINTS_PATHS', env, []);
	const status = getEnv<number>('BLOCKED_ENDPOINTS_STATUS', env, 418);
	const type = getEnv<string>('BLOCKED_ENDPOINTS_TYPE', env, 'application/json');
	const body = getEnv<string>('BLOCKED_ENDPOINTS_BODY', env, '{ "error": "Page blocked! I\'m a teapot now" }');
	if (!enabled) return logger.warn('Block Endpoints extension is disabled');
	if (paths.length === 0)  return logger.error('Environment variable "BLOCKED_ENDPOINTS_PATHS" needs to contain at least one path! try: /server/info');
	init("app.before", ({ app }: any) => {
		paths.forEach(p => logger.debug(`Blocking route "${p}"`));
		app.get(paths, (_req: any, res: any) => {
			res.set("Content-Type", type);
			res.status(status);
			res.send(body);
		});
	});
});
