(() => {
  const counter = document.getElementById('counter');

  const plusOneBtn = document.getElementById('plusOneBtn');
  const resetBtn = document.getElementById('resetBtn');
  const longRunningTaskBtn = document.getElementById('longRunningTaskBtn');
  const log = document.getElementById('log');

  let counterValue = 0;

  if (!window.Worker) {
    console.error('Workers are not supported');
  }

  const myWorker = new Worker("src/worker.js");

  plusOneBtn.addEventListener("click", e => {
    counterValue++;
    counter.textContent = counterValue;
  });

  resetBtn.addEventListener("click", () => {
    counterValue = 0;
    log.textContent = '';
    counter.textContent = counterValue;
  });

  longRunningTaskBtn.addEventListener("click", () => {
    log.textContent = 'Counting....';
    myWorker.postMessage("Count to a billion");
  });

  myWorker.onmessage = e => {
    console.log(`Main Received: ${e.data}`);
    log.textContent = e.data;
  };

  myWorker.onerror = (error) => {
    console.log('Error!', error);
  };
})();