

let audioMuted = localStorage.getItem("system-audio") === "off";
let voiceSynthesisEnabled = true;
let recognition = null;
let speechIsActive = false;


let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}


function synthSound(type) {
  if (audioMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    switch (type) {
      case "click": {
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
        break;
      }
      case "success": {
        
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = "triangle";
        osc1.frequency.setValueAtTime(600, now);
        osc1.frequency.setValueAtTime(900, now + 0.08);
        gain1.gain.setValueAtTime(0.08, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.22);
        break;
      }
      case "error": {
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(120, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.26);
        break;
      }
      case "scan": {
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(2200, now + 0.5);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.51);
        break;
      }
      case "startup": {
        
        const freqs = [150, 300, 450, 600, 900];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + (idx * 0.08));
          gain.gain.setValueAtTime(0.04, now + (idx * 0.08));
          gain.gain.exponentialRampToValueAtTime(0.001, now + (idx * 0.08) + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + (idx * 0.08));
          osc.stop(now + (idx * 0.08) + 0.31);
        });
        break;
      }
    }
  } catch (err) {
    console.error("Synthesizer error:", err);
  }
}


function jarvisSpeak(text) {
  if (audioMuted || !voiceSynthesisEnabled) return;
  
  
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(voice => 
    voice.lang.includes("en-US") || voice.lang.includes("en-GB")
  );
  if (preferredVoice) utterance.voice = preferredVoice;

  utterance.pitch = 0.92; 
  utterance.rate = 1.05;  
  
  
  const core = document.getElementById("jarvis-core");
  utterance.onstart = () => {
    if (core) core.style.animation = "sphere-pulse 0.4s infinite ease-in-out";
  };
  utterance.onend = () => {
    if (core) core.style.animation = "sphere-pulse 3s infinite ease-in-out";
  };

  window.speechSynthesis.speak(utterance);
}


document.addEventListener("DOMContentLoaded", () => {
  setupAudioToggle();
  setupJarvisUI();
  setupSpeechRecognition();
  
  
  document.body.addEventListener("click", () => {
    if (getAudioContext().state === 'suspended') {
      getAudioContext().resume();
    }
  }, { once: true });
});


function setupAudioToggle() {
  const audioBtn = document.getElementById("audio-toggle-btn");
  const audioIcon = document.getElementById("audio-icon");
  
  const updateBtnUI = () => {
    if (audioMuted) {
      audioBtn.innerHTML = `
        <svg id="audio-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
        Audio: OFF
      `;
      audioBtn.style.color = "var(--text-dim)";
      audioBtn.style.borderColor = "transparent";
    } else {
      audioBtn.innerHTML = `
        <svg id="audio-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
        Audio: ON
      `;
      audioBtn.style.color = "var(--primary)";
      audioBtn.style.borderColor = "var(--border-dim)";
    }
  };

  updateBtnUI();

  audioBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    audioMuted = !audioMuted;
    localStorage.setItem("system-audio", audioMuted ? "off" : "on");
    updateBtnUI();
    if (!audioMuted) {
      synthSound("click");
    } else {
      window.speechSynthesis.cancel();
    }
  });
}


function setupJarvisUI() {
  const sendBtn = document.getElementById("jarvis-send-btn");
  const textInput = document.getElementById("jarvis-text-input");
  const ttsCheckbox = document.getElementById("jarvis-voice-toggle");

  sendBtn.addEventListener("click", () => {
    processTextQuery(textInput.value);
    textInput.value = "";
  });

  textInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      processTextQuery(textInput.value);
      textInput.value = "";
    }
  });

  ttsCheckbox.addEventListener("change", () => {
    voiceSynthesisEnabled = ttsCheckbox.checked;
    synthSound("click");
  });
}


function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const micBtn = document.getElementById("jarvis-voice-btn");
  const statusIndicator = document.getElementById("voice-indicator");

  if (!SpeechRecognition) {
    statusIndicator.textContent = "STT: Unsuported";
    micBtn.disabled = true;
    micBtn.style.opacity = "0.4";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  micBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (speechIsActive) {
      recognition.stop();
    } else {
      getAudioContext().resume();
      synthSound("click");
      recognition.start();
    }
  });

  recognition.onstart = () => {
    speechIsActive = true;
    micBtn.classList.add("listening-mode");
    statusIndicator.textContent = "STT: Listening...";
    statusIndicator.style.color = "#ff5f56";
  };

  recognition.onend = () => {
    speechIsActive = false;
    micBtn.classList.remove("listening-mode");
    statusIndicator.textContent = "STT: Standby";
    statusIndicator.style.color = "var(--primary)";
  };

  recognition.onerror = () => {
    synthSound("error");
  };

  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;
    document.getElementById("jarvis-text-input").value = speechResult;
    processTextQuery(speechResult);
  };
}


function logDialogue(sender, text) {
  const dialogueBox = document.getElementById("jarvis-dialogue");
  const bubble = document.createElement("div");
  bubble.className = `jarvis-bubble jarvis-${sender}`;
  
  if (sender === "ai") {
    bubble.style.color = "var(--primary)";
    bubble.innerHTML = text;
  } else {
    bubble.textContent = text;
  }
  
  dialogueBox.appendChild(bubble);
  dialogueBox.scrollTop = dialogueBox.scrollHeight;
}


function processTextQuery(query) {
  const clean = query.trim();
  if (clean === "") return;

  logDialogue("user", clean);
  const cmd = clean.toLowerCase();

  
  const reply = (msg, sound = "click") => {
    setTimeout(() => {
      synthSound(sound);
      logDialogue("ai", msg);
      
      const plainMsg = msg.replace(/<[^>]*>/g, "");
      jarvisSpeak(plainMsg);
    }, 250);
  };

  
  if (cmd.includes("introduce") || cmd.includes("who are you")) {
    reply("I am J.A.R.V.I.S., Sujay's custom robotic command assistant. I coordinate hardware diagnostics, monitor his YouTube lab feed, and organize day-to-day projects.");
  } 
  else if (cmd.includes("diagnostics") || cmd.includes("scan") || cmd.includes("check")) {
    reply("Initiating holographic area scan... Calibration sequence loading. Subsystems nominal. Actuator pins validated.", "scan");
  } 
  else if (cmd.includes("status")) {
    reply("Core temperature is holding at 42 degrees. Memory buffers are nominal. Energy cell state is at 85 percent capacity. Status check: Optimal.");
  } 
  else if (cmd.includes("open") || cmd.includes("launch")) {
    if (cmd.includes("youtube") || cmd.includes("video")) {
      toggleWindow("win-youtube");
      reply("Opening the YouTube Lab window, loaded with recent robotic streams.");
    } else if (cmd.includes("portfolio") || cmd.includes("work")) {
      toggleWindow("win-portfolio");
      reply("Launching Netlify portfolio framework.");
    } else if (cmd.includes("task") || cmd.includes("schedule") || cmd.includes("todo")) {
      toggleWindow("win-tasks");
      reply("Opening task organizer. Standby.");
    } else if (cmd.includes("terminal") || cmd.includes("shell") || cmd.includes("cmd")) {
      toggleWindow("win-terminal");
      reply("Accessing terminal prompt interface.");
    } else if (cmd.includes("setting") || cmd.includes("config")) {
      toggleWindow("win-settings");
      reply("Opening OS system settings panel.");
    } else if (cmd.includes("showcase") || cmd.includes("award") || cmd.includes("trophy")) {
      toggleWindow("win-showcase");
      reply("Opening your awards and achievements cabinet.");
    } else if (cmd.includes("gallery") || cmd.includes("photo") || cmd.includes("design")) {
      toggleWindow("win-gallery");
      reply("Opening local achievements media gallery.");
    } else {
      reply("Launch query target unrecognized. Try specifying 'open youtube', 'open showcase', or 'open gallery'.", "error");
    }
  } 
  else if (cmd.includes("close") || cmd.includes("exit")) {
    if (cmd.includes("youtube")) {
      closeWindow("win-youtube");
      reply("Closing YouTube window.");
    } else if (cmd.includes("portfolio")) {
      closeWindow("win-portfolio");
      reply("Closing Portfolio window.");
    } else if (cmd.includes("task") || cmd.includes("schedule")) {
      closeWindow("win-tasks");
      reply("Closing task planner.");
    } else if (cmd.includes("terminal")) {
      closeWindow("win-terminal");
      reply("Closing terminal prompt.");
    } else if (cmd.includes("settings")) {
      closeWindow("win-settings");
      reply("Closing settings panel.");
    } else if (cmd.includes("showcase") || cmd.includes("award") || cmd.includes("trophy")) {
      closeWindow("win-showcase");
      reply("Closing awards cabinet.");
    } else if (cmd.includes("gallery") || cmd.includes("photo") || cmd.includes("design")) {
      closeWindow("win-gallery");
      reply("Closing media gallery explorer.");
    } else if (cmd.includes("jarvis") || cmd.includes("yourself")) {
      closeWindow("win-jarvis");
    } else {
      reply("Close target unrecognized.", "error");
    }
  }
  else if (cmd.includes("theme") || cmd.includes("color") || cmd.includes("accent")) {
    let targetTheme = "";
    if (cmd.includes("cyan")) targetTheme = "cyan";
    else if (cmd.includes("green")) targetTheme = "green";
    else if (cmd.includes("amber") || cmd.includes("yellow")) targetTheme = "amber";
    else if (cmd.includes("purple") || cmd.includes("rose") || cmd.includes("pink")) targetTheme = "purple";

    if (targetTheme) {
      document.body.setAttribute("data-theme", targetTheme);
      localStorage.setItem("system-theme", targetTheme);
      
      document.querySelectorAll(".theme-btn").forEach(b => {
        b.classList.remove("active");
        if (b.getAttribute("data-select") === targetTheme) b.classList.add("active");
      });
      reply(`Theme accent configuration adjusted to ${targetTheme} subsystem.`, "success");
    } else {
      reply("Theme target not supported. Try saying 'change theme to green' or 'set accent to amber'.", "error");
    }
  }
  else if (cmd.includes("clear")) {
    document.getElementById("jarvis-dialogue").innerHTML = "";
    reply("Console logs cleared. Ready for next query.");
  }
  else if (cmd.includes("joke") || cmd.includes("tell a joke")) {
    const jokes = [
      "Why did the robot go to the doctor? Because it had a bad case of the computer virus! And needed its core actuator lubricated.",
      "How many programmers does it take to change a lightbulb? None, that's a hardware problem! Ask Sujay instead.",
      "A SQL query walks into a bar, walks up to two tables and asks: Can I join you?"
    ];
    const randIdx = Math.floor(Math.random() * jokes.length);
    reply(jokes[randIdx]);
  }
  else {
    reply("Command protocol unmapped. Input directive bypassed to global system lookup.", "error");
  }
}
