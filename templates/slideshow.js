(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var slideshows = document.querySelectorAll('.slideshow');
    for (var i = 0; i < slideshows.length; i++) {
      initSlideshow(slideshows[i]);
    }
  });

  function initSlideshow(container) {
    var slides = container.querySelectorAll('.slideshow-slide');
    var dots = container.querySelectorAll('.slideshow-dot');
    var thumbs = container.querySelectorAll('.slideshow-thumb');
    var caption = container.querySelector('.slideshow-caption');
    var prevBtn = container.querySelector('.slideshow-prev');
    var nextBtn = container.querySelector('.slideshow-next');
    var current = 0;
    var count = slides.length;

    if (count === 0) return;

    function goToSlide(index) {
      if (index < 0) index = count - 1;
      if (index >= count) index = 0;

      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      if (thumbs[current]) thumbs[current].classList.remove('active');

      current = index;

      slides[current].classList.add('active');
      dots[current].classList.add('active');
      if (thumbs[current]) {
        thumbs[current].classList.add('active');
        thumbs[current].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }

      if (caption) {
        caption.textContent = slides[current].alt || '';
      }
    }

    prevBtn.addEventListener('click', function () { goToSlide(current - 1); });
    nextBtn.addEventListener('click', function () { goToSlide(current + 1); });

    for (var i = 0; i < dots.length; i++) {
      dots[i].addEventListener('click', function () {
        goToSlide(parseInt(this.getAttribute('data-index'), 10));
      });
    }

    for (var j = 0; j < thumbs.length; j++) {
      thumbs[j].addEventListener('click', function () {
        goToSlide(parseInt(this.getAttribute('data-index'), 10));
      });
    }

    // Click main slide to open lightbox
    var viewport = container.querySelector('.slideshow-viewport');
    viewport.addEventListener('click', function (e) {
      if (e.target.classList.contains('slideshow-slide')) {
        openLightbox(e.target.src, e.target.alt);
      }
    });

    // Keyboard navigation when slideshow is focused/hovered
    container.setAttribute('tabindex', '0');
    container.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { goToSlide(current - 1); e.preventDefault(); }
      if (e.key === 'ArrowRight') { goToSlide(current + 1); e.preventDefault(); }
    });
  }

  // Lightbox singleton
  var lightbox = null;
  var lightboxImg = null;

  function createLightbox() {
    lightbox = document.createElement('div');
    lightbox.className = 'slideshow-lightbox';

    var close = document.createElement('button');
    close.className = 'slideshow-lightbox-close';
    close.setAttribute('aria-label', 'Close lightbox');
    close.innerHTML = '&times;';
    close.addEventListener('click', closeLightbox);

    lightboxImg = document.createElement('img');

    lightbox.appendChild(close);
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  function openLightbox(src, alt) {
    if (!lightbox) createLightbox();
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('active');
    document.addEventListener('keydown', lightboxKeyHandler);
  }

  function closeLightbox() {
    if (lightbox) lightbox.classList.remove('active');
    document.removeEventListener('keydown', lightboxKeyHandler);
  }

  function lightboxKeyHandler(e) {
    if (e.key === 'Escape') closeLightbox();
  }
})();
