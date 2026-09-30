const openButtons = document.querySelectorAll<HTMLButtonElement>('[data-project-open]');
const modals = document.querySelectorAll<HTMLElement>('[data-project-modal]');

function setModalState(modal: HTMLElement, isOpen: boolean) {
	modal.classList.toggle('hidden', !isOpen);
	modal.setAttribute('aria-hidden', String(!isOpen));
	document.body.classList.toggle('overflow-hidden', isOpen);
	modal.querySelectorAll<HTMLVideoElement>('video').forEach((video) => {
		if (!isOpen) video.pause();
	});
}

function showSlide(modal: HTMLElement, nextIndex: number) {
	const slides = Array.from(modal.querySelectorAll<HTMLElement>('[data-slide-index]'));
	if (slides.length === 0) return;
	const activeIndex = (nextIndex + slides.length) % slides.length;

	slides.forEach((slide, index) => {
		slide.classList.toggle('hidden', index !== activeIndex);
		slide.classList.toggle('flex', index === activeIndex);
		const video = slide.querySelector('video');
		if (video && index !== activeIndex) video.pause();
	});

	modal.querySelectorAll<HTMLElement>('[data-carousel-dot]').forEach((dot, index) => {
		dot.classList.toggle('bg-emerald-400', index === activeIndex);
		dot.classList.toggle('bg-slate-600', index !== activeIndex);
	});
}

openButtons.forEach((button) => button.addEventListener('click', () => {
	const modal = document.querySelector<HTMLElement>(`[data-project-modal="${button.dataset.projectOpen}"]`);
	if (!modal) return;
	setModalState(modal, true);
	showSlide(modal, 0);
	modal.querySelector<HTMLButtonElement>('[data-project-close]')?.focus();
}));

modals.forEach((modal) => {
	modal.querySelector<HTMLButtonElement>('[data-project-close]')?.addEventListener('click', () => setModalState(modal, false));
	modal.addEventListener('click', (event) => {
		if (event.target === modal) setModalState(modal, false);
	});
	modal.querySelector<HTMLButtonElement>('[data-carousel-prev]')?.addEventListener('click', () => {
		const active = modal.querySelector<HTMLElement>('.project-slide.flex');
		showSlide(modal, Number(active?.dataset.slideIndex ?? 0) - 1);
	});
	modal.querySelector<HTMLButtonElement>('[data-carousel-next]')?.addEventListener('click', () => {
		const active = modal.querySelector<HTMLElement>('.project-slide.flex');
		showSlide(modal, Number(active?.dataset.slideIndex ?? 0) + 1);
	});
	modal.querySelectorAll<HTMLButtonElement>('[data-carousel-dot]').forEach((dot) => dot.addEventListener('click', () => showSlide(modal, Number(dot.dataset.carouselDot))));
});

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		modals.forEach((modal) => setModalState(modal, false));
		return;
	}
	if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;

	const activeModal = Array.from(modals).find((modal) => !modal.classList.contains('hidden'));
	if (!activeModal) return;
	const activeSlide = activeModal.querySelector<HTMLElement>('.project-slide.flex');
	const currentIndex = Number(activeSlide?.dataset.slideIndex ?? 0);
	if (event.key === 'ArrowLeft') showSlide(activeModal, currentIndex - 1);
	if (event.key === 'ArrowRight') showSlide(activeModal, currentIndex + 1);
});
