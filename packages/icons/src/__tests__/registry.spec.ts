import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('lazy icon registry', () => {
	const builtin = { name: 'SyAimIcon', render: () => null };
	const readBuiltin = vi.fn();

	beforeEach(() => {
		vi.resetModules();
		readBuiltin.mockClear();
		vi.doMock('../built-in-icons', () => ({
			builtInIcons: Object.defineProperty({}, 'aim', {
				enumerable: true,
				get: () => {
					readBuiltin();
					return builtin;
				},
			}),
		}));
	});

	afterEach(() => {
		vi.doUnmock('../built-in-icons');
		vi.resetModules();
	});

	it('does not initialize on import or empty lookup and seeds only once on first use', async () => {
		const registry = await import('../registry');
		expect(readBuiltin).not.toHaveBeenCalled();
		expect(registry.getIconComponent()).toBeUndefined();
		expect(registry.getIconComponent('')).toBeUndefined();
		expect(readBuiltin).not.toHaveBeenCalled();
		expect(registry.getIconComponent('aim')).toBe(builtin);
		expect(registry.getIconComponent('SyAimIcon')).toBe(builtin);
		expect(registry.listRegisteredIcons()).toContain('aim');
		expect(readBuiltin).toHaveBeenCalledTimes(1);
	});

	it('initializes builtins when listing before any lookup', async () => {
		const registry = await import('../registry');
		expect(registry.listRegisteredIcons()).toEqual(['aim']);
		expect(readBuiltin).toHaveBeenCalledTimes(1);
	});

	it('preserves a custom override registered before the first lookup', async () => {
		const registry = await import('../registry');
		const custom = { name: 'BrandIcon', render: () => null };
		registry.registerIcon('aim', custom, { aliases: ['brand-logo', 'Brand Logo'] });
		expect(registry.getIconComponent('aim')).toBe(custom);
		expect(registry.getIconComponent('brand-logo')).toBe(custom);
		expect(registry.getIconComponent('Brand Logo')).toBe(custom);
		expect(registry.getIconComponent('SyAimIcon')).toBe(custom);
		expect(readBuiltin).toHaveBeenCalledTimes(1);
	});

	it('supports batch registration and preserves builtin aliases and unknown-name behavior', async () => {
		const registry = await import('../registry');
		const custom = { name: 'CustomIcon', render: () => null };
		registry.registerIcons({ 'extra-mark': custom });
		expect(registry.getIconComponent('sy-aim-icon')).toBe(builtin);
		expect(registry.getIconComponent('extra_mark')).toBe(custom);
		expect(registry.getIconComponent('custom')).toBe(custom);
		expect(registry.getIconComponent('unknown')).toBeUndefined();
		expect(readBuiltin).toHaveBeenCalledTimes(1);
	});
});
