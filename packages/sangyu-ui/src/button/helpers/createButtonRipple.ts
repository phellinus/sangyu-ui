export function createButtonRipple(event: MouseEvent, color?: string) {
	const target = event.currentTarget;

	if (!(target instanceof HTMLElement)) return;

	const rect = target.getBoundingClientRect();
	const size = Math.max(rect.width, rect.height);
	const ripple = document.createElement('span');

	ripple.className = 'sy-button__ripple';
	ripple.style.width = `${size}px`;
	ripple.style.height = `${size}px`;
	ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
	ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

	if (color) {
		ripple.style.setProperty('--sy-button-ripple-color', color);
	}

	const removeRipple = () => ripple.remove();

	ripple.addEventListener('animationend', removeRipple, {
		once: true,
	});

	target.appendChild(ripple);
}
