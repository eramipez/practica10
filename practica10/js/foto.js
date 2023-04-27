class Image {
  constructor(src) {
    this.element = document.createElement('img');
    this.element.src = src;
  }
}

class Modal {
  constructor() {
    this.currentIndex = null;
    this.modalView = document.querySelector('#modal-view');
    this.albumView = document.querySelector('#album-view');
    this.createThumbnails();
    this.setupEventListeners();
  }

  createThumbnails() {
    for (let i = 0; i < PHOTO_LIST.length; i++) {
      const photoSrc = PHOTO_LIST[i];
      const image = new Image(photoSrc);
      image.element.dataset.index = i;
      image.element.addEventListener('click', this.onThumbnailClick.bind(this));
      this.albumView.appendChild(image.element);
    }
  }

  setupEventListeners() {
    this.modalView.addEventListener('click', this.onModalClick.bind(this));
  }

  hideModal() {
    document.body.classList.remove('no-scroll');
    this.modalView.classList.add('hidden');
    this.modalView.innerHTML = '';
    document.removeEventListener('keydown', this.nextPhoto.bind(this));
  }

  nextPhoto(event) {
    if (event.key === 'Escape') {
      this.hideModal();
      return;
    }

    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }

    let nextIndex = this.currentIndex;

    if (event.key === 'ArrowLeft') {
      nextIndex--;

    } else {
      nextIndex++;
    }

    if (nextIndex < 0 || nextIndex === PHOTO_LIST.length) {
      return;
    }

    const photoSrc = PHOTO_LIST[nextIndex];

    this.modalView.innerHTML = '';

    const image = new Image(photoSrc);

    this.modalView.appendChild(image.element);
    this.currentIndex = nextIndex;
  }

  onThumbnailClick(event) {
    this.currentIndex = event.currentTarget.dataset.index;

    const image = new Image(event.currentTarget.src);

    document.body.classList.add('no-scroll');
    this.modalView.style.top = window.pageYOffset + 'px';
    this.modalView.appendChild(image.element);
    this.modalView.classList.remove('hidden');

    document.addEventListener('keydown', this.nextPhoto.bind(this));
  }

  onModalClick() {
    this.hideModal();
  }
}

// Main
const modal = new Modal();
