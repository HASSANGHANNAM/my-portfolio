const lightboxes = document.querySelectorAll<HTMLElement>('[data-media-lightbox]');

function closeLightbox(lightbox: HTMLElement) {
	lightbox.classList.add('hidden');
	lightbox.classList.remove('flex');
	lightbox.setAttribute('aria-hidden', 'true');
	lightbox.querySelectorAll<HTMLVideoElement>('video').forEach((video) => {
		video.pause();
		video.removeAttribute('src');
		video.load();
	});
	lightbox.removeAttribute('data-gallery');
}

function showGallery(lightbox: HTMLElement, index: number) {
	const gallery = JSON.parse(lightbox.dataset.gallery ?? '[]') as { url: string; caption: string }[];
	const image = lightbox.querySelector<HTMLImageElement>('[data-media-lightbox-image]');
	if (!image || gallery.length === 0) return;
	const activeIndex = (index + gallery.length) % gallery.length;
	image.src = gallery[activeIndex].url;
	image.alt = gallery[activeIndex].caption;
	lightbox.dataset.galleryIndex = String(activeIndex);
	const hasMultiple = gallery.length > 1;
	lightbox.querySelector<HTMLButtonElement>('[data-gallery-prev]')?.classList.toggle('hidden', !hasMultiple);
	lightbox.querySelector<HTMLButtonElement>('[data-gallery-next]')?.classList.toggle('hidden', !hasMultiple);
}

function openLightbox(trigger: HTMLElement) {
	const target = trigger.dataset.mediaTarget;
	const lightbox = target ? document.querySelector<HTMLElement>(`[data-media-lightbox="${target}"]`) : null;
	if (!lightbox) return;
	const kind = trigger.dataset.mediaKind;
	const source = trigger.dataset.mediaSrc ?? '';
	const caption = trigger.dataset.mediaCaption ?? '';
	if (trigger.dataset.mediaGallery) lightbox.dataset.gallery = trigger.dataset.mediaGallery;
	const image = lightbox.querySelector<HTMLImageElement>('[data-media-lightbox-image]');
	const embed = lightbox.querySelector<HTMLIFrameElement>('[data-media-lightbox-embed]');
	const video = lightbox.querySelector<HTMLVideoElement>('[data-media-lightbox-video]');

	image?.classList.toggle('hidden', kind !== 'image');
	if (image && kind === 'image') {
		image.src = source;
		image.alt = caption;
		if (trigger.dataset.mediaGallery) showGallery(lightbox, 0);
	}
	embed?.classList.toggle('hidden', kind !== 'embed');
	if (embed && kind === 'embed') {
		embed.src = source;
		embed.title = caption;
	}
	video?.classList.toggle('hidden', kind !== 'video');
	if (video && kind === 'video') {
		video.src = source;
		video.setAttribute('aria-label', caption);
	}

	lightbox.classList.remove('hidden');
	lightbox.classList.add('flex');
	lightbox.setAttribute('aria-hidden', 'false');
	lightbox.querySelector<HTMLButtonElement>('[data-media-close]')?.focus();
}

document.querySelectorAll<HTMLElement>('[data-media-open]').forEach((trigger) => {
	trigger.addEventListener('click', () => openLightbox(trigger));
});

document.querySelectorAll<HTMLElement>('[data-certificate-gallery]').forEach((button) => {
	button.addEventListener('click', () => {
		const images = JSON.parse(button.dataset.certificateGallery ?? '[]') as { url: string; caption: string }[];
		const firstImage = images[0];
		if (!firstImage) return;
		const trigger = document.createElement('button');
		trigger.dataset.mediaTarget = 'certificates-media-lightbox';
		trigger.dataset.mediaKind = 'image';
		trigger.dataset.mediaSrc = firstImage.url;
		trigger.dataset.mediaCaption = firstImage.caption;
		trigger.dataset.mediaGallery = JSON.stringify(images);
		openLightbox(trigger);
	});
});

lightboxes.forEach((lightbox) => {
	lightbox.querySelector<HTMLButtonElement>('[data-gallery-prev]')?.addEventListener('click', () => showGallery(lightbox, Number(lightbox.dataset.galleryIndex ?? 0) - 1));
	lightbox.querySelector<HTMLButtonElement>('[data-gallery-next]')?.addEventListener('click', () => showGallery(lightbox, Number(lightbox.dataset.galleryIndex ?? 0) + 1));
});

lightboxes.forEach((lightbox) => {
	lightbox.querySelector<HTMLButtonElement>('[data-media-close]')?.addEventListener('click', () => closeLightbox(lightbox));
	lightbox.addEventListener('click', (event) => {
		if (event.target === lightbox) closeLightbox(lightbox);
	});
});

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		lightboxes.forEach(closeLightbox);
		return;
	}
	if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;

	const activeLightbox = Array.from(lightboxes).find((lightbox) => !lightbox.classList.contains('hidden'));
	if (!activeLightbox || !activeLightbox.dataset.gallery) return;
	const currentIndex = Number(activeLightbox.dataset.galleryIndex ?? 0);
	if (event.key === 'ArrowLeft') showGallery(activeLightbox, currentIndex - 1);
	if (event.key === 'ArrowRight') showGallery(activeLightbox, currentIndex + 1);
});