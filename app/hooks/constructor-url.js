export function urlConstructor(key) {
	const domain_access = process.env.NEXT_PUBLIC_R2_ACCESS_DOMAIN;
	return `${domain_access}/${encodeURIComponent(key)}`;
}
