(() => {
  'use strict';

  // Данные по фасовкам
  const PACKAGES = {
    100:  { sku: '01306', price: '326,40 ₽', oldPrice: '349,20 ₽' },
    500:  { sku: '01307', price: '1 432 ₽',  oldPrice: '1 646 ₽'  },
    1000: { sku: '01308', price: '2 064 ₽',  oldPrice: '2 592 ₽'  },
    5000: { sku: '01309', price: '6 320 ₽',  oldPrice: '8 710 ₽'  },
  };

  const items       = document.querySelectorAll('.packages__item');
  const skuEl       = document.querySelector('[data-sku]');
  const priceEl     = document.querySelector('[data-price]');
  const oldPriceEl  = document.querySelector('[data-old-price]');
  const oldPriceBox = oldPriceEl.parentElement; // для скрытия, если скидки нет

  function selectPackage(weight) {
    const data = PACKAGES[weight];
    if (!data) return;

    // Состояние кнопок
    items.forEach((btn) => {
      const isActive = btn.dataset.package === String(weight);
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    // Обновление данных
    skuEl.textContent = data.sku;
    priceEl.textContent = data.price;

    if (data.oldPrice) {
      oldPriceEl.textContent = data.oldPrice;
      oldPriceEl.hidden = false;
    } else {
      oldPriceEl.hidden = true;
    }
  }

  // Делегирование событий
  document.querySelector('.packages').addEventListener('click', (e) => {
    const btn = e.target.closest('.packages__item');
    if (!btn) return;
    selectPackage(btn.dataset.package);
  });

  // Кнопка «В корзину» (демо)
  document.querySelector('[data-add-to-cart]').addEventListener('click', (e) => {
    const active = document.querySelector('.packages__item.is-active');
    const weight = active ? active.dataset.package : '—';
    e.currentTarget.textContent = 'Добавлено ✓';
    setTimeout(() => (e.currentTarget.textContent = 'В корзину'), 1200);
    console.log(`Товар добавлен: Ананасовый улун, ${weight} г`);
  });

  // Инициализация
  selectPackage(100);
})();