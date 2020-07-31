onmessage = e => {
  console.log(`Worker Received: ${e.data}`);
  longRunningTask();
};

function longRunningTask() {
  let i = 0;

  const start = Date.now();

  function count() {
    for (let j = 0; j < 1e9; j++) {
      i++;
    }
    postMessage(`Done in  ${Date.now() - start} ms`);
  }

  count();
}
  