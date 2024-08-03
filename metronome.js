window.addEventListener("load", function () {
  const pendulum = this.document.querySelector(".pendulum");
  const bpmSlider = this.document.querySelector(".bpm-slider");
  const bpmValue = this.document.querySelector(".bpm-value");
  const startBtn = this.document.querySelector(".start-btn");
  const stopBtn = this.document.querySelector(".stop-btn");

  let audioContext;
  let gainNode;
  let isRunning = false;
  let timer;
  let duration = Math.round((60 * 1000) / bpmSlider.value);

  startBtn.addEventListener("click", function () {
    if (isRunning) {
      return;
    }

    pendulum.style.animationDelay = -duration / 2 + "ms";
    pendulum.style.animationDuration = duration + "ms";
    pendulum.style.animationName = "pendulum";
    if (!audioContext) {
      audioContext = new AudioContext();
      gainNode = audioContext.createGain();
      gainNode.connect(audioContext.destination);
    }

    timer = setInterval(() => {
      const oscillator = audioContext.createOscillator();
      oscillator.type = "square";
      oscillator.frequency.value = 800;
      oscillator.connect(gainNode);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    }, duration);

    isRunning = true;
  });

  stopBtn.addEventListener("click", function () {
    if (!isRunning) {
      return;
    }

    pendulum.style.animationName = "none";
    clearInterval(timer);
    isRunning = false;
  });

  bpmSlider.addEventListener("input", (e) => {
    duration = Math.round((60 * 1000) / bpmSlider.value);
    bpmValue.textContent = e.target.value;
  });
});
