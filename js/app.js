/**
 * Сайт-запрошення на весілля — анімації при скролі та таймер
 */
(function () {
  'use strict';

  // Класи для анімації при появі в viewport
  var firstVisible = 'firstSection_visible__vbJLq';
  var dressVisible = 'dressSection_visible__O19wU';
  var endVisible = 'endSection_visible__J60Sj';

  var firstSelectors = [
    '.firstSection_title__ndW6g',
    '.firstSection_subtitle__nLaDx',
    '.firstSection_oneTitle__TWUHR',
    '.firstSection_man__5sRrT',
    '.firstSection_woman__VYXy4',
    '.firstSection_name__ovdD_',
    '.firstSection_date__hdOZ5',
    '.firstSection_titleTwo__CrE8O',
    '.firstSection_clock__ueaJe',
    '.firstSection_timeTitle__5NpW8'
  ].join(', ');

  var dressSelectors = [
    '.dressSection_title__6goHY',
    '.dressSection_color__Ce_0X',
    '.dressSection_peopleOne__iuIAv',
    '.dressSection_peopleTwo__ObNm3',
    '.dressSection_titleTwo__kvjwC'
  ].join(', ');

  var endSelectors = [
    '.endSection_title__lgG2u',
    '.endSection_number__mgL5C',
    '.endSection_footerText__zoV_f'
  ].join(', ');

  function addVisibleClass(el, visibleClass) {
    if (el && el.classList && !el.classList.contains(visibleClass)) {
      el.classList.add(visibleClass);
    }
  }

  function initIntersectionObserver(selector, visibleClass) {
    var elements = document.querySelectorAll(selector);
    if (!elements.length) return;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            addVisibleClass(entry.target, visibleClass);
          }
        });
      },
      { rootMargin: '0px 0px -50px 0px', threshold: 0.1 }
    );
    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Підключити спостерігачі
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  function run() {
    initIntersectionObserver(firstSelectors, firstVisible);
    initIntersectionObserver(dressSelectors, dressVisible);
    initIntersectionObserver(endSelectors, endVisible);

    // Кнопка стрілки — плавний скрол до #row
    var arrowBtn = document.querySelector('.firstSection_arrow__yPOeP');
    if (arrowBtn) {
      arrowBtn.addEventListener('click', function () {
        var row = document.getElementById('row');
        if (row) {
          row.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Таймер до дати весілля (15.05.2026 11:00)
    var weddingDate = new Date('2026-05-15T11:00:00');
    var daysEl = document.querySelector('.timer__days');
    var hoursEl = document.querySelector('.timer__hours');
    var minutesEl = document.querySelector('.timer__minutes');
    var secondsEl = document.querySelector('.timer__seconds');

    function pluralForm(n, forms) {
      var idx = n % 100 > 4 && n % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][n % 10 < 5 ? n % 10 : 5];
      return forms[idx];
    }

    function updateTimer() {
      var now = new Date();
      var diff = weddingDate - now;

      if (diff <= 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minutesEl) minutesEl.textContent = '00';
        if (secondsEl) secondsEl.textContent = '00';
        return;
      }

      var days = Math.floor(diff / 1000 / 60 / 60 / 24);
      var hours = Math.floor(diff / 1000 / 60 / 60) % 24;
      var minutes = Math.floor(diff / 1000 / 60) % 60;
      var seconds = Math.floor(diff / 1000) % 60;

      if (daysEl) {
        daysEl.textContent = days < 10 ? '0' + days : String(days);
        daysEl.dataset.title = pluralForm(days, ['день', 'дні', 'днів']);
      }
      if (hoursEl) {
        hoursEl.textContent = hours < 10 ? '0' + hours : String(hours);
        hoursEl.dataset.title = pluralForm(hours, ['година', 'години', 'годин']);
      }
      if (minutesEl) {
        minutesEl.textContent = minutes < 10 ? '0' + minutes : String(minutes);
        minutesEl.dataset.title = pluralForm(minutes, ['хвилина', 'хвилини', 'хвилин']);
      }
      if (secondsEl) {
        secondsEl.textContent = seconds < 10 ? '0' + seconds : String(seconds);
        secondsEl.dataset.title = pluralForm(seconds, ['секунда', 'секунди', 'секунд']);
      }
    }

    if (daysEl || hoursEl || minutesEl || secondsEl) {
      updateTimer();
      setInterval(updateTimer, 1000);
    }
  }
})();
