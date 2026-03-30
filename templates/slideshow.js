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

    // Build slide data for lightbox
    var slideData = [];
    for (var k = 0; k < slides.length; k++) {
      slideData.push({ src: slides[k].src, alt: slides[k].alt });
    }

    // Click main slide to open lightbox at current index
    var viewport = container.querySelector('.slideshow-viewport');
    viewport.addEventListener('click', function (e) {
      if (e.target.classList.contains('slideshow-slide')) {
        openLightbox(slideData, current, function (newIndex) {
          goToSlide(newIndex);
        });
      }
    });

    // Keyboard navigation when slideshow is focused/hovered
    container.setAttribute('tabindex', '0');
    container.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { goToSlide(current - 1); e.preventDefault(); }
      if (e.key === 'ArrowRight') { goToSlide(current + 1); e.preventDefault(); }
    });
  }

  // Lightbox with navigation
  var lightbox = null;
  var lightboxImg = null;
  var lightboxCaption = null;
  var lightboxCounter = null;
  var lightboxPrev = null;
  var lightboxNext = null;
  var lbSlides = [];
  var lbIndex = 0;
  var lbSyncCallback = null;

  function createLightbox() {
    lightbox = document.createElement('div');
    lightbox.className = 'slideshow-lightbox';

    var close = document.createElement('button');
    close.className = 'slideshow-lightbox-close';
    close.setAttribute('aria-label', 'Close lightbox');
    close.innerHTML = '&times;';
    close.addEventListener('click', closeLightbox);

    lightboxPrev = document.createElement('button');
    lightboxPrev.className = 'slideshow-lightbox-prev';
    lightboxPrev.setAttribute('aria-label', 'Previous slide');
    lightboxPrev.innerHTML = '&#8249;';
    lightboxPrev.addEventListener('click', function (e) {
      e.stopPropagation();
      lbGoTo(lbIndex - 1);
    });

    lightboxNext = document.createElement('button');
    lightboxNext.className = 'slideshow-lightbox-next';
    lightboxNext.setAttribute('aria-label', 'Next slide');
    lightboxNext.innerHTML = '&#8250;';
    lightboxNext.addEventListener('click', function (e) {
      e.stopPropagation();
      lbGoTo(lbIndex + 1);
    });

    lightboxImg = document.createElement('img');

    lightboxCaption = document.createElement('div');
    lightboxCaption.className = 'slideshow-lightbox-caption';

    lightboxCounter = document.createElement('div');
    lightboxCounter.className = 'slideshow-lightbox-counter';

    lightbox.appendChild(close);
    lightbox.appendChild(lightboxPrev);
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(lightboxNext);
    lightbox.appendChild(lightboxCaption);
    lightbox.appendChild(lightboxCounter);
    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  function lbGoTo(index) {
    if (lbSlides.length === 0) return;
    if (index < 0) index = lbSlides.length - 1;
    if (index >= lbSlides.length) index = 0;
    lbIndex = index;
    lightboxImg.src = lbSlides[lbIndex].src;
    lightboxImg.alt = lbSlides[lbIndex].alt || '';
    lightboxCaption.textContent = lbSlides[lbIndex].alt || '';
    lightboxCounter.textContent = (lbIndex + 1) + ' / ' + lbSlides.length;
    if (lbSyncCallback) lbSyncCallback(lbIndex);
  }

  function openLightbox(slides, startIndex, syncCallback) {
    if (!lightbox) createLightbox();
    lbSlides = slides;
    lbSyncCallback = syncCallback;
    lbGoTo(startIndex);
    lightbox.classList.add('active');
    document.addEventListener('keydown', lightboxKeyHandler);
  }

  function closeLightbox() {
    if (lightbox) lightbox.classList.remove('active');
    document.removeEventListener('keydown', lightboxKeyHandler);
  }

  function lightboxKeyHandler(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { lbGoTo(lbIndex - 1); e.preventDefault(); }
    if (e.key === 'ArrowRight') { lbGoTo(lbIndex + 1); e.preventDefault(); }
  }
})();
