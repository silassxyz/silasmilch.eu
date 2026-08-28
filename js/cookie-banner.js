/**
 * Simple Cookie Banner
 * Handles cookie consent and storage
 */

(function () {
  const COOKIE_NAME = 'cookie-consent';
  const COOKIE_EXPIRY_DAYS = 365;

  function createCookieBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <p class="cookie-banner-text">
        This website uses cookies to improve your experience. 
        <a href="/privacy-policy" target="_blank">Learn more</a>
      </p>
      <div class="cookie-banner-buttons">
        <button class="cookie-banner-button cookie-banner-button-reject" data-action="reject">Reject</button>
        <button class="cookie-banner-button cookie-banner-button-accept" data-action="accept">Accept</button>
      </div>
    `;

    document.body.appendChild(banner);
    return banner;
  }

  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
  }

  function getCookie(name) {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length);
      }
    }
    return null;
  }

  function showBanner(banner) {
    banner.classList.add('show');
  }

  function hideBanner(banner) {
    banner.classList.remove('show');
    // Remove after animation completes
    setTimeout(() => {
      if (banner && banner.parentNode) {
        banner.parentNode.removeChild(banner);
      }
    }, 300);
  }

  function initCookieBanner() {
    // Check if user has already made a choice
    const consent = getCookie(COOKIE_NAME);
    if (consent) {
      return; // Don't show banner if consent already given
    }

    // Create and show banner
    const banner = createCookieBanner();
    showBanner(banner);

    // Handle button clicks
    const rejectBtn = banner.querySelector('[data-action="reject"]');
    const acceptBtn = banner.querySelector('[data-action="accept"]');

    if (rejectBtn) {
      rejectBtn.addEventListener('click', function () {
        setCookie(COOKIE_NAME, 'rejected', COOKIE_EXPIRY_DAYS);
        hideBanner(banner);
      });
    }

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        setCookie(COOKIE_NAME, 'accepted', COOKIE_EXPIRY_DAYS);
        hideBanner(banner);
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieBanner);
  } else {
    initCookieBanner();
  }
})();
