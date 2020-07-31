(() => {
  const counter = document.getElementById('counter');
  const plusOneBtn = document.getElementById('plusOneBtn');
  const resetBtn = document.getElementById('resetBtn');
  const longRunningTaskBtn = document.getElementById('longRunningTaskBtn');
  const log = document.getElementById('log');

  let counterValue = 0;

  plusOneBtn.addEventListener("click", e => {
    counterValue++;
    counter.textContent = counterValue;
  });

  resetBtn.addEventListener("click", () => {
    counterValue = 0;
    log.textContent = '';
    counter.textContent = counterValue;
  });

  longRunningTaskBtn.addEventListener('click', () => {
    log.textContent = 'Counting....';
    longRunningTask();
  });

  function longRunningTask() {
    // based on an example from: https://javascript.info/event-loop
    let i = 0;

    const start = Date.now();

    function count() {
      for (let j = 0; j < 1e9; j++) {
        i++;
      }

      log.textContent = `Done in  ${(Date.now() - start)} ms`;
    }

    count();
  }
})();