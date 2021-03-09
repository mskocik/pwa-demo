const divInstall = document.getElementById('installContainer');
const butInstall = document.getElementById('butInstall');

let deferredPrompt;

/* Put code here */
window.addEventListener('appinstalled', () => {
  // Hide the app-provided install promotion
  // Clear the deferredPrompt so it can be garbage collected
  deferredPrompt = null;
  // Optionally, send analytics event to indicate successful install
  console.log('PWA was installed');
});

window.addEventListener('beforeinstallprompt', event => {
  console.log('before install event');
  deferredPrompt = event;
  divInstall.classList.toggle('hidden', false);
});

butInstall.onclick = () => {
  console.log('install button clicked');
  const promptEvent = deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  }
  promptEvent.prompt();
  
  deferredPrompt = null;
  divInstall.classList.toggle('hidden', true);
};




/* Only register a service worker if it's supported */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

/**
 * Warn the page must be served over HTTPS
 * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
 * Installability requires a service worker with a fetch event handler, and
 * if the page isn't served over HTTPS, the service worker won't load.
 */
if (window.location.protocol === 'http:') {
  const requireHTTPS = document.getElementById('requireHTTPS');
  const link = requireHTTPS.querySelector('a');
  link.href = window.location.href.replace('http://', 'https://');
  requireHTTPS.classList.remove('hidden');
}