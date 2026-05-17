(function () {
  var KEY = 'bp_unlocked';
  var PASS = 'password';

  if (sessionStorage.getItem(KEY) === '1') return;

  document.documentElement.style.visibility = 'hidden';

  function mount() {
    var overlay = document.createElement('div');
    overlay.id = 'bp-gate';
    overlay.style.cssText =
      'position:fixed;inset:0;background:#0a0a0a;color:#f5f0e8;' +
      'display:flex;align-items:center;justify-content:center;' +
      'z-index:2147483647;font-family:-apple-system,BlinkMacSystemFont,system-ui,sans-serif;' +
      'padding:1.5rem;';

    overlay.innerHTML =
      '<div style="max-width:380px;width:100%;text-align:center">' +
        '<div style="font-size:0.72rem;letter-spacing:0.3em;text-transform:uppercase;color:#7a746a;margin-bottom:0.75rem">Barbershop Press</div>' +
        '<h2 style="font-size:1.6rem;margin:0 0 1.5rem;font-weight:400;letter-spacing:-0.01em">Enter password</h2>' +
        '<form id="bp-gate-form" style="display:flex;flex-direction:column;gap:0.75rem">' +
          '<input id="bp-gate-input" type="password" autocomplete="off" autofocus ' +
          'style="background:transparent;border:1px solid #333;color:#fff;padding:0.85rem 1rem;' +
          'font-size:1rem;text-align:center;letter-spacing:0.15em;outline:none;border-radius:0">' +
          '<button type="submit" ' +
          'style="background:#c9a84c;color:#0a0a0a;border:0;padding:0.85rem 1rem;font-size:0.85rem;' +
          'letter-spacing:0.2em;text-transform:uppercase;cursor:pointer;font-weight:600">Unlock</button>' +
          '<div id="bp-gate-err" style="color:#ff7066;font-size:0.85rem;min-height:1em;margin-top:0.25rem"></div>' +
        '</form>' +
      '</div>';

    document.body.appendChild(overlay);
    document.documentElement.style.visibility = '';

    var form = document.getElementById('bp-gate-form');
    var input = document.getElementById('bp-gate-input');
    var err = document.getElementById('bp-gate-err');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (input.value === PASS) {
        sessionStorage.setItem(KEY, '1');
        overlay.remove();
      } else {
        err.textContent = 'Incorrect — try again.';
        input.value = '';
        input.focus();
      }
    });

    input.focus();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
