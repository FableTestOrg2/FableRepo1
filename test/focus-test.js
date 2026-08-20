const { JSDOM } = require('jsdom');

console.log('Starting focus test...');

JSDOM.fromFile('index.html', { runScripts: 'dangerously', resources: 'usable' })
  .then(dom => {
    const { window } = dom;
    // Wait for load event or timeout
    function check() {
      const active = window.document.activeElement;
      console.log('activeElement id:', active && active.id);
      if (active && active.id === 'page-title') {
        console.log('PASS: H1 received focus');
        process.exit(0);
      } else {
        console.error('FAIL: H1 did not receive focus');
        process.exit(2);
      }
    }

    window.addEventListener('load', () => {
      // small delay to allow scripts to run
      setTimeout(check, 50);
    });

    // Fallback in case load already happened or resources are ready
    setTimeout(check, 1000);
  })
  .catch(err => {
    console.error('ERROR running test:', err);
    process.exit(1);
  });
