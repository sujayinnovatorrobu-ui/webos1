
let highestZ = 10;


const originalSizes = {};


const roboPlaylist = [
  {
    id: "TY4hEmsmVYM",
    title: "Robofest Gujarat 4.0 (Highlights & Winners)",
    desc: "Highlights and winners showcase from India's biggest robotics event hosted at Science City.",
    embedUrl: "https://www.youtube-nocookie.com/embed/TY4hEmsmVYM?autoplay=1",
    directUrl: "https://www.youtube.com/watch?v=TY4hEmsmVYM"
  },
  {
    id: "_iuVUyZySqQ",
    title: "Swadeshi Parakh Launch Video",
    desc: "Official launch video showcasing the Swadeshi Parakh diagnostic and innovation initiative features.",
    embedUrl: "https://www.youtube-nocookie.com/embed/_iuVUyZySqQ?autoplay=1",
    directUrl: "https://www.youtube.com/watch?v=_iuVUyZySqQ"
  },
  {
    id: "qIMhXg9YGY",
    title: "Maze Solver with Space Mapping (AlphaBot2)",
    desc: "Custom maze solver project utilizing AlphaBot2 and Raspberry Pi 3 to navigate and map the arena.",
    embedUrl: "https://www.youtube-nocookie.com/embed/qIMhXg9YGY?autoplay=1",
    directUrl: "https://www.youtube.com/watch?v=qIMhXg9YGY"
  },
  {
    id: "videoseries",
    title: "Ciia -4 (Innovation Exhibition & Competition)",
    desc: "Exhibition highlights showcasing creative ideas and technical innovations in action.",
    embedUrl: "https://www.youtube-nocookie.com/embed/videoseries?list=PLYGIFPfRi3VJzikjK_l6aucUSShordDzk&autoplay=1",
    directUrl: "https://www.youtube.com/playlist?list=PLYGIFPfRi3VJzikjK_l6aucUSShordDzk"
  },
  {
    id: "UMdNogwi1eU",
    title: "Technoxian 2024 Maze Solver Challenge",
    desc: "Autonomous navigation and speed run calibrations for the Technoxian global maze solver challenge.",
    embedUrl: "https://www.youtube-nocookie.com/embed/UMdNogwi1eU?autoplay=1",
    directUrl: "https://www.youtube.com/watch?v=UMdNogwi1eU"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  
  const savedTheme = localStorage.getItem("system-theme") || "cyan";
  document.body.setAttribute("data-theme", savedTheme);

  const savedWall = localStorage.getItem("system-wallpaper") || "ironman";
  const startBgEl = document.getElementById("desktop-bg");
  if (startBgEl) {
    if (savedWall === "gradient") {
      startBgEl.style.backgroundImage = "linear-gradient(135deg, #020713 0%, #071530 100%)";
    } else if (savedWall === "glowing") {
      startBgEl.style.backgroundImage = "radial-gradient(circle, #0e1b30 0%, #040812 100%)";
    } else if (savedWall === "cyberspace") {
      startBgEl.style.backgroundImage = "radial-gradient(circle, #001220 0%, #000407 100%)";
    } else if (savedWall === "roboart") {
      let roboArtPath = localStorage.getItem("robo-art-wallpaper") || "assets/robo_wallpaper.png";
      if (roboArtPath.includes(":\\") || roboArtPath.includes(":/") || roboArtPath.startsWith("file:")) {
        roboArtPath = "assets/robo_wallpaper.png";
      }
      startBgEl.style.backgroundImage = `url('${roboArtPath}')`;
    } else if (savedWall === "ironman") {
      startBgEl.style.backgroundImage = "url('wallpaper/wp11991604-neon-4k-iron-man-wallpapers.jpg')";
    } else if (savedWall === "custom-url") {
      const url = localStorage.getItem("custom-wallpaper-url");
      if (url) startBgEl.style.backgroundImage = `url('${url}')`;
    } else if (savedWall === "custom-file") {
      const base64 = localStorage.getItem("custom-wallpaper-data");
      if (base64) startBgEl.style.backgroundImage = `url('${base64}')`;
    }
  }

  
  initClock();

  
  const windows = document.querySelectorAll(".window");
  windows.forEach(win => {
    makeDraggable(win);
    
    win.addEventListener("mousedown", () => {
      focusWindow(win);
    });
  });

  
  const startBtn = document.getElementById("start-menu-trigger");
  const startMenu = document.getElementById("start-menu");
  
  startBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isShowing = startMenu.style.display === "flex";
    startMenu.style.display = isShowing ? "none" : "flex";
    synthSound("click");
  });

  document.addEventListener("click", () => {
    startMenu.style.display = "none";
  });
  
  startMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  
  document.body.addEventListener("click", () => {
    synthSound("startup");
  }, { once: true });

  
  initSettings();

  
  initYouTubeLab();

  
  initShowcase();

  
  initGallery();

  
  initHUDSystem();

  
  initBootSequence();
});


function initClock() {
  const clockEl = document.getElementById("system-clock");
  const update = () => {
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
    const monthIndex = now.getMonth();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayName = days[now.getDay()];
    const monthName = monthNames[monthIndex];
    const date = now.getDate();
    
    let hrs = now.getHours();
    const ampm = hrs >= 12 ? 'AM' : 'PM'; 
    const ampmText = hrs >= 12 ? 'PM' : 'AM';
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12;
    const mins = String(now.getMinutes()).padStart(2, '0');
    
    clockEl.textContent = `${dayName}, ${monthName} ${date}  ${hrs}:${mins} ${ampmText}`;
  };
  update();
  setInterval(update, 1000);
}


function focusWindow(win) {
  if (win.classList.contains("active-window")) return;
  
  document.querySelectorAll(".window").forEach(w => w.classList.remove("active-window"));
  
  
  highestZ++;
  win.style.zIndex = highestZ;
  win.classList.add("active-window");
  synthSound("click");
}

function toggleWindow(winId) {
  const win = document.getElementById(winId);
  const indicator = document.getElementById(`indicator-${winId}`);
  const dockItem = indicator ? indicator.parentElement : null;

  if (win.style.display === "none" || win.style.display === "") {
    
    win.style.display = "flex";
    if (dockItem) dockItem.classList.add("app-open");
    focusWindow(win);
    synthSound("success");
    if (winId === "win-terminal") setTimeout(focusTerminalInput, 50);
  } else if (win.classList.contains("active-window")) {
    
    win.style.display = "none";
    if (dockItem) dockItem.classList.remove("app-open");
    synthSound("click");
  } else {
    
    focusWindow(win);
  }
}

function closeWindow(winId) {
  const win = document.getElementById(winId);
  win.style.display = "none";
  const indicator = document.getElementById(`indicator-${winId}`);
  if (indicator) {
    indicator.parentElement.classList.remove("app-open");
  }
  synthSound("click");
}

function minimizeWindow(winId) {
  closeWindow(winId); 
}

function maximizeWindow(winId) {
  const win = document.getElementById(winId);
  focusWindow(win);
  synthSound("click");

  
  if (win.classList.contains("maximized-window")) {
    win.classList.remove("maximized-window");
    const orig = originalSizes[winId];
    if (orig) {
      win.style.top = orig.top;
      win.style.left = orig.left;
      win.style.width = orig.width;
      win.style.height = orig.height;
    }
  } else {
    
    originalSizes[winId] = {
      top: win.style.top,
      left: win.style.left,
      width: win.style.width,
      height: win.style.height
    };
    win.classList.add("maximized-window");
    win.style.top = "38px";
    win.style.left = "0";
    win.style.width = "100vw";
    win.style.height = "calc(100vh - 38px)";
  }
}


function makeDraggable(win) {
  const header = document.getElementById(`${win.id}header`);
  if (!header) return;

  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  header.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    if (win.classList.contains("maximized-window")) return; 
    e = e || window.event;
    e.preventDefault();
    focusWindow(win);

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    let targetTop = win.offsetTop - pos2;
    let targetLeft = win.offsetLeft - pos1;

    
    if (targetTop < 38) targetTop = 38; 
    if (targetTop > window.innerHeight - 50) targetTop = window.innerHeight - 50;
    if (targetLeft < -win.offsetWidth + 100) targetLeft = -win.offsetWidth + 100;
    if (targetLeft > window.innerWidth - 100) targetLeft = window.innerWidth - 100;

    win.style.top = targetTop + "px";
    win.style.left = targetLeft + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


function initSettings() {
  const themeBtns = document.querySelectorAll(".theme-btn");
  const wallCards = document.querySelectorAll(".wallpaper-card");
  const bgEl = document.getElementById("desktop-bg");

  
  const currentTheme = document.body.getAttribute("data-theme") || "cyan";
  themeBtns.forEach(btn => {
    if (btn.getAttribute("data-select") === currentTheme) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  
  const currentWall = localStorage.getItem("system-wallpaper") || "ironman";
  wallCards.forEach(card => {
    if (card.getAttribute("data-bg") === currentWall) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });

  
  themeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      themeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const selection = btn.getAttribute("data-select");
      document.body.setAttribute("data-theme", selection);
      localStorage.setItem("system-theme", selection);
      synthSound("success");
    });
  });

  
  wallCards.forEach(card => {
    card.addEventListener("click", () => {
      wallCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      synthSound("click");
      
      const bgType = card.getAttribute("data-bg");
      localStorage.setItem("system-wallpaper", bgType);
      
      if (bgType === "gradient") {
        bgEl.style.backgroundImage = "linear-gradient(135deg, #020713 0%, #071530 100%)";
      } else if (bgType === "glowing") {
        bgEl.style.backgroundImage = "radial-gradient(circle, #0e1b30 0%, #040812 100%)";
      } else if (bgType === "cyberspace") {
        bgEl.style.backgroundImage = "radial-gradient(circle, #001220 0%, #000407 100%)";
      } else if (bgType === "roboart") {
        let roboArtPath = localStorage.getItem("robo-art-wallpaper") || "assets/robo_wallpaper.png";
        if (roboArtPath.includes(":\\") || roboArtPath.includes(":/") || roboArtPath.startsWith("file:")) {
          roboArtPath = "assets/robo_wallpaper.png";
        }
        bgEl.style.backgroundImage = `url('${roboArtPath}')`;
      } else if (bgType === "ironman") {
        bgEl.style.backgroundImage = "url('wallpaper/wp11991604-neon-4k-iron-man-wallpapers.jpg')";
      }
    });
  });

  
  const customWallUrlBtn = document.getElementById("custom-wall-url-btn");
  const customWallUrlInput = document.getElementById("custom-wall-url");
  if (customWallUrlBtn && customWallUrlInput) {
    customWallUrlBtn.addEventListener("click", () => {
      const url = customWallUrlInput.value.trim();
      if (url) {
        wallCards.forEach(c => c.classList.remove("active"));
        localStorage.setItem("system-wallpaper", "custom-url");
        localStorage.setItem("custom-wallpaper-url", url);
        bgEl.style.backgroundImage = `url('${url}')`;
        synthSound("success");
      }
    });
  }

  
  const customWallFileInput = document.getElementById("custom-wall-file");
  if (customWallFileInput) {
    customWallFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target.result;
          wallCards.forEach(c => c.classList.remove("active"));
          localStorage.setItem("system-wallpaper", "custom-file");
          localStorage.setItem("custom-wallpaper-data", base64);
          bgEl.style.backgroundImage = `url('${base64}')`;
          synthSound("success");
        };
        reader.readAsDataURL(file);
      }
    });
  }

  
  const crtCheckbox = document.getElementById("crt-toggle");
  const scanlinesEl = document.getElementById("scanlines-layer");
  crtCheckbox.addEventListener("change", () => {
    synthSound("click");
    if (crtCheckbox.checked) {
      scanlinesEl.classList.add("crt-glow");
      scanlinesEl.style.display = "block";
    } else {
      scanlinesEl.classList.remove("crt-glow");
      scanlinesEl.style.display = "none";
    }
  });
}


function initYouTubeLab() {
  const feedContainer = document.getElementById("yt-feed-container");
  const playerContainer = document.getElementById("yt-player-container");
  const activeTitle = document.getElementById("yt-video-active-title");
  const activeDesc = document.getElementById("yt-video-active-desc");

  feedContainer.innerHTML = "";
  
  roboPlaylist.forEach((video, index) => {
    const item = document.createElement("div");
    item.className = "yt-video-item";
    if (index === 0) item.classList.add("active");

    item.innerHTML = `
      <div class="yt-video-thumb-sim">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
      </div>
      <div class="yt-video-title">${video.title}</div>
    `;

    item.addEventListener("click", () => {
      document.querySelectorAll(".yt-video-item").forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      synthSound("click");
      playVideo(video);
    });

    feedContainer.appendChild(item);
  });

  
  if (roboPlaylist.length > 0) {
    playVideo(roboPlaylist[0], false); 
  }

  function playVideo(video, autoplay = true) {
    activeTitle.textContent = video.title;
    activeDesc.textContent = video.desc;

    const directBtn = document.getElementById("yt-video-direct-btn");
    if (directBtn) {
      directBtn.href = video.directUrl;
      directBtn.style.display = "inline-flex";
    }

    let url = video.embedUrl;
    if (!autoplay) {
      url = url.replace("?autoplay=1", "?autoplay=0");
    }

    playerContainer.innerHTML = `
      <iframe src="${url}" style="width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `;
  }
}


function initBootSequence() {
  const bootScreen = document.getElementById("boot-screen");
  const loginScreen = document.getElementById("login-screen");
  const desktopArea = document.getElementById("desktop-area");
  const bootStatusText = document.getElementById("boot-status-text");
  const bootProgress = document.getElementById("boot-progress");
  
  const bootSteps = [
    { progress: 15, text: "LOADING DEVICE HARDWARE PINS..." },
    { progress: 30, text: "INITIALIZING SPEECH CO-PILOT COEFFICIENTS..." },
    { progress: 50, text: "ESTABLISHING SECURE WEB INTERRUPTS..." },
    { progress: 70, text: "DECRYPTING CORE MISSION CONTROLLER KERNEL..." },
    { progress: 85, text: "CONNECTING J.A.R.V.I.S. QUANTUM NETWORK MATRIX..." },
    { progress: 100, text: "SYSTEM REBOOT SUCCESSFUL." }
  ];

  let currentStep = 0;

  function runNextBootStep() {
    if (currentStep < bootSteps.length) {
      const step = bootSteps[currentStep];
      bootProgress.style.width = step.progress + "%";
      bootStatusText.textContent = step.text;
      
      if (typeof synthSound === "function") {
        synthSound("click");
      }
      
      currentStep++;
      
      setTimeout(runNextBootStep, 80 + Math.random() * 50);
    } else {
      setTimeout(() => {
        bootScreen.style.opacity = "0";
        setTimeout(() => {
          bootScreen.style.display = "none";
          loginScreen.style.display = "flex";
          loginScreen.style.opacity = "1";
        }, 500);
      }, 300);
    }
  }

  
  const loginBtn = document.getElementById("login-signin-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      if (typeof synthSound === "function") {
        synthSound("success");
      }
      loginScreen.style.opacity = "0";
      
      
      if (desktopArea) {
        desktopArea.style.display = "block";
        setTimeout(() => {
          desktopArea.style.opacity = "1";
        }, 50);
      }
      
      setTimeout(() => {
        loginScreen.style.display = "none";
        triggerTerminalBootLogs();
      }, 800);
    });
  }

  
  window.addEventListener("keydown", (e) => {
    if (loginScreen && loginScreen.style.display === "flex" && e.key === "Enter") {
      if (loginBtn) loginBtn.click();
    }
  });

  setTimeout(runNextBootStep, 300);
}


function triggerTerminalBootLogs() {
  const win = document.getElementById("win-terminal");
  if (!win) return;
  
  
  win.style.display = "flex";
  win.style.zIndex = highestZ++;
  
  const historyEl = document.getElementById("term-history");
  if (!historyEl) return;
  
  historyEl.innerHTML = `<div class="terminal-line" style="color: var(--primary);">sujay@robo-pc:~$ ./init_robo_os.sh</div>`;
  
  const initLogs = [
    "[ OK ] INITIALIZING CORE MEMORY SUBSYSTEMS...",
    "[ OK ] DETECTING USER DIRECTORIES...",
    "[ OK ] ACTIVE WORKSPACE: 'My very own WebOS' (.wakatime-project active)",
    "[ OK ] MOUNTING J.A.R.V.I.S. HOLOGRAPHIC AI INTERFACE MODULES...",
    "[ OK ] MAPPING YOUTUBE LAB STREAMS (@roboticengineerwala)",
    "[ OK ] PARSING CERTIFICATES AND AWARDS DATABASE...",
    "[ OK ] REGISTERING DYNAMIC FILESYSTEM EXPLORER...",
    "INIT COMPLETED successfully. SECURE SHELL SESSION SECURED.",
    "READY TO LAUNCH GRAPHICAL WORKSPACE ENVIRONMENT."
  ];

  let logIndex = 0;

  function printLine() {
    if (logIndex < initLogs.length) {
      const line = document.createElement("div");
      line.className = "terminal-line";
      line.textContent = initLogs[logIndex];
      if (initLogs[logIndex].includes("[ OK ]")) {
        line.style.color = "var(--primary)";
      }
      historyEl.appendChild(line);
      historyEl.scrollTop = historyEl.scrollHeight;
      
      if (typeof synthSound === "function") {
        synthSound("click");
      }
      
      logIndex++;
      setTimeout(printLine, 180 + Math.random() * 100);
    } else {
      setTimeout(() => {
        
        win.style.display = "none";
        
        
        const showcaseWin = document.getElementById("win-showcase");
        if (showcaseWin) {
          showcaseWin.style.display = "flex";
          showcaseWin.style.zIndex = highestZ++;
          
          if (typeof jarvisSpeak === "function") {
            setTimeout(() => {
              jarvisSpeak("Welcome back, Sujay. Your awards and honors cabinet is loaded, and system core temperature is nominal.");
            }, 600);
          }
        }
      }, 1200);
    }
  }

  setTimeout(printLine, 400);
}


const showcaseData = [
  {
    src: "showcase ui + image/1.png",
    title: "Robofest Gujarat 3.0 Winner Certificate",
    badge: "Robofest Gujarat 3.0",
    desc: "Recognized as the 1st prize winner for our autonomous maze solving robotics entry."
  },
  {
    src: "showcase ui + image/2.png",
    title: "Robofest Gujarat 3.0 - 1st Prize Winner Trophy",
    badge: "Robofest 3.0 Championship",
    desc: "Trophy awarded by GUJCOST for outstanding engineering and design in robotics."
  },
  {
    src: "showcase ui + image/3.png",
    title: "Swadeshi Parakh Diagnostic Award",
    badge: "HealthTech Innovation",
    desc: "Award certificate acknowledging development contributions for localized diagnostics."
  },
  {
    src: "showcase ui + image/4.png",
    title: "Ciia Nehru Center - National Winner",
    badge: "National Innovation Expo",
    desc: "Creative Ideas & Innovations exhibition certificate representing our national winning project design."
  },
  {
    src: "showcase ui + image/5.png",
    title: "Ciia Nehru Center - Winner Gold Medal",
    badge: "Gold Medal Honors",
    desc: "Gold medal awarded at the Nehru Science Centre for creative ideas and innovations."
  },
  {
    src: "showcase ui + image/6.png",
    title: "Government Polytechnic Ahmedabad - Appreciation Honors",
    badge: "Academic Distinction",
    desc: "Appreciation certificate for leading academic and institutional robotics workshops."
  },
  {
    src: "showcase ui + image/7.png",
    title: "State Level Project Exhibition - Finalist Trophies",
    badge: "Exhibition Highlights",
    desc: "Trophies and shields won at various state-level innovation expos and project displays."
  },
  {
    src: "showcase ui + image/8.png",
    title: "Swadeshi Parakh - Prototype Certificate",
    badge: "Prototype Recognition",
    desc: "Official prototype validation certificate acknowledging excellent functional design."
  }
];

let currentShowcaseIndex = 0;

function initShowcase() {
  const activeImg = document.getElementById("showcase-active-img");
  const titleEl = document.getElementById("showcase-title");
  const badgeEl = document.getElementById("showcase-badge");
  const descEl = document.getElementById("showcase-desc");
  const thumbsTray = document.getElementById("showcase-thumbs-tray");
  
  if (!activeImg || !thumbsTray) return;

  
  thumbsTray.innerHTML = "";
  showcaseData.forEach((item, idx) => {
    const thumb = document.createElement("div");
    thumb.className = `showcase-thumb-item ${idx === 0 ? 'active' : ''}`;
    thumb.innerHTML = `<img src="${item.src}" alt="${item.title}">`;
    thumb.onclick = () => loadShowcaseSlide(idx);
    thumbsTray.appendChild(thumb);
  });
  
  function loadShowcaseSlide(idx) {
    currentShowcaseIndex = idx;
    const item = showcaseData[idx];
    
    
    activeImg.style.opacity = "0.3";
    setTimeout(() => {
      activeImg.src = item.src;
      titleEl.textContent = item.title;
      badgeEl.textContent = item.badge;
      descEl.textContent = item.desc;
      activeImg.style.opacity = "1";
    }, 150);
    
    
    document.querySelectorAll(".showcase-thumb-item").forEach((thumb, tIdx) => {
      if (tIdx === idx) {
        thumb.classList.add("active");
        thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        thumb.classList.remove("active");
      }
    });
    
    if (typeof synthSound === "function") {
      synthSound("click");
    }
  }
  
  document.getElementById("showcase-prev-btn").onclick = () => {
    let nextIdx = currentShowcaseIndex - 1;
    if (nextIdx < 0) nextIdx = showcaseData.length - 1;
    loadShowcaseSlide(nextIdx);
  };
  
  document.getElementById("showcase-next-btn").onclick = () => {
    let nextIdx = currentShowcaseIndex + 1;
    if (nextIdx >= showcaseData.length) nextIdx = 0;
    loadShowcaseSlide(nextIdx);
  };

  
  document.getElementById("showcase-active-frame").onclick = () => {
    const activeItem = showcaseData[currentShowcaseIndex];
    openLightbox(activeItem.src, activeItem.title);
  };
}


const galleryData = {
  "Designs": {
    path: "gallery/Designs/",
    type: "image",
    files: [
      "IMG-20240328-WA0006.jpg", "IMG-20240328-WA0007.jpg", "IMG-20240425-WA0020.jpg",
      "IMG-20240425-WA0021.jpg", "IMG-20240425-WA0022.jpg", "IMG-20240425-WA0023.jpg",
      "IMG-20240425-WA0024.jpg", "IMG-20240425-WA0025.jpg", "IMG-20240425-WA0026.jpg",
      "IMG-20240425-WA0030.jpg", "IMG-20240425-WA0031.jpg", "IMG-20240425-WA0032.jpg",
      "IMG-20240425-WA0034.jpg", "IMG-20240425-WA0035.jpg", "IMG-20240425-WA0036.jpg",
      "IMG-20240425-WA0037.jpg", "IMG-20240426-WA0002.jpg", "IMG-20240426-WA0003.jpg",
      "IMG-20240426-WA0004.jpg", "IMG-20240426-WA0005.jpg", "IMG-20240426-WA0006.jpg",
      "IMG-20240426-WA0007.jpg", "IMG-20240426-WA0008.jpg", "IMG-20240426-WA0009.jpg",
      "IMG-20240426-WA0010.jpg", "IMG-20240426-WA0011.jpg", "IMG-20240426-WA0012.jpg",
      "IMG-20240426-WA0013.jpg", "IMG-20240426-WA0014.jpg", "IMG-20240426-WA0015.jpg",
      "IMG-20240426-WA0016.jpg", "IMG-20240509-WA0004.jpg", "IMG-20240509-WA0005.jpg",
      "IMG-20240509-WA0006.jpg", "IMG-20240509-WA0007.jpg", "IMG-20240509-WA0008.jpg",
      "IMG-20240509-WA0009.jpg", "IMG-20240509-WA0010.jpg", "IMG-20240509-WA0011.jpg",
      "IMG-20240509-WA0012.jpg", "IMG-20240509-WA0013.jpg", "IMG-20240509-WA0014.jpg",
      "IMG-20240509-WA0015.jpg", "IMG-20240611-WA0026.jpg", "IMG-20240611-WA0027.jpg",
      "IMG-20240611-WA0028.jpg", "IMG-20240611-WA0029.jpg", "IMG-20240611-WA0030.jpg",
      "IMG-20240704-WA0003.jpg", "IMG-20240927-WA0032.jpg", "Screenshot 2024-04-26 123402.png",
      "Screenshot 2024-04-26 123618.png", "Screenshot 2024-04-26 123706.png", "Screenshot 2024-04-26 123911.png",
      "Screenshot 2024-04-26 123952.png", "Screenshot 2024-04-26 124335.png", "Screenshot 2024-04-26 124427.png",
      "Screenshot 2024-04-26 153222.png", "Screenshot 2024-04-26 153309.png", "Screenshot 2024-04-26 153625.png",
      "Screenshot 2024-04-26 153754.png", "Screenshot 2024-04-26 160449.png", "Screenshot 2024-04-26 160526.png",
      "Screenshot 2024-04-26 160611.png", "Screenshot 2024-04-26 160742.png"
    ]
  },
  "Internship 1": {
    path: "gallery/Internship 1/",
    type: "image",
    files: [
      "IMG-20240711-WA0011.jpg", "IMG-20240711-WA0020.jpg", "IMG-20240711-WA0026.jpg"
    ]
  },
  "Newspaper & Media": {
    path: "gallery/Newspaper + Social media/",
    type: "image",
    files: [
      "20241201_114657.jpg", "IMG-20231207-WA0003.jpg", "IMG-20241120-WA0001.jpg",
      "Screenshot_20241114-194617_Instagram.jpg", "Screenshot_20241114-195103_Facebook.jpg",
      "Screenshot_20241126-183232_Gujarat Samachar.jpg", "Screenshot_20241126-183306_Gujarat Samachar.jpg",
      "Screenshot_20241126-183358_Gujarat Samachar.jpg", "WhatsApp Image 2025-03-19 at 15.46.10_24d3fc8c.jpg"
    ]
  },
  "Robofest 4.0 Engineers": {
    path: "gallery/Robofest 4.0 Working Engineers/",
    type: "image",
    files: [
      "20241220_165049.jpg"
    ]
  },
  "Robofest Stage 2 Finals": {
    path: "gallery/Robofest Stage 2 Finals/",
    type: "image",
    files: [
      "20241205_142941.jpg", "20241205_142944.jpg", "20241205_143004.jpg",
      "IMG-20241206-WA0005.jpg", "IMG-20241206-WA0008.jpg", "IMG-20241206-WA0076.jpg"
    ]
  },
  "Robofest Stage 2 Photos": {
    path: "gallery/Robofest stage 2 Photos/",
    type: "image",
    files: [
      "20241025_165245.jpg", "IMG-20241025-WA0030.jpg", "IMG-20241025-WA0032.jpg",
      "IMG-20241025-WA0034.jpg", "IMG-20241025-WA0038.jpg", "IMG-20241025-WA0058.jpg"
    ]
  },
  "News & Fame Highlights": {
    path: "gallery/news + fame/",
    type: "image",
    files: [
      "IMG_20231207_085333_375.jpg", "IMG_20231231_201331_344.jpg", "IMG_20231231_201331_413.jpg",
      "IMG_20240102_121026_212.jpg", "IMG_20240325_120307_648.jpg"
    ]
  },
  "Robofest 3.0 Videos": {
    path: "gallery/robofest 3.0/",
    type: "video",
    files: [
      "VID-20231227-WA0002.mp4", "VID-20240107-WA0002.mp4", "video_20231218_162052.mp4"
    ]
  },
  "3D Printing Videos": {
    path: "gallery/3d print videos/",
    type: "video",
    files: [
      "20250313_152546.mp4", "20250313_152610.mp4", "20250313_170908.mp4",
      "20250318_180651.mp4", "20250318_180708.mp4", "20250318_180732.mp4",
      "WhatsApp Video 2025-03-18 at 14.56.11_674d33db.mp4"
    ]
  }
};

function initGallery() {
  const foldersList = document.getElementById("gallery-folders");
  const itemsGrid = document.getElementById("gallery-items-grid");
  const currentFolderLabel = document.getElementById("gallery-current-folder-label");
  
  if (!foldersList || !itemsGrid) return;

  
  foldersList.innerHTML = "";
  Object.keys(galleryData).forEach((folderName, idx) => {
    const li = document.createElement("li");
    const isActive = idx === 0;
    li.innerHTML = `
      <button class="gallery-folder-btn ${isActive ? 'active' : ''}" data-folder="${folderName}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
        ${folderName}
      </button>
    `;
    foldersList.appendChild(li);
    
    if (isActive) {
      loadGalleryFolder(folderName);
    }
  });
  
  
  foldersList.addEventListener("click", (e) => {
    const btn = e.target.closest(".gallery-folder-btn");
    if (!btn) return;
    
    document.querySelectorAll(".gallery-folder-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    
    const folderName = btn.getAttribute("data-folder");
    loadGalleryFolder(folderName);
    if (typeof synthSound === "function") {
      synthSound("click");
    }
  });
  
  function loadGalleryFolder(folderName) {
    currentFolderLabel.textContent = folderName;
    itemsGrid.innerHTML = "";
    
    const folder = galleryData[folderName];
    if (!folder) return;
    
    folder.files.forEach(fileName => {
      const card = document.createElement("div");
      card.className = "gallery-item-card";
      const fileUrl = folder.path + fileName;
      
      if (folder.type === "image") {
        card.innerHTML = `
          <div class="gallery-card-preview">
            <img src="${fileUrl}" alt="${fileName}">
          </div>
          <div class="gallery-card-label">${fileName}</div>
        `;
        card.onclick = () => openLightbox(fileUrl, fileName);
      } else {
        card.innerHTML = `
          <div class="gallery-card-preview video-preview">
            <div style="background: rgba(0,240,255,0.05); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 5px var(--primary));"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
            </div>
          </div>
          <div class="gallery-card-label">${fileName}</div>
        `;
        card.onclick = () => openVideoModal(fileUrl, fileName);
      }
      
      itemsGrid.appendChild(card);
    });
  }
}


function openLightbox(src, captionText) {
  const modal = document.getElementById("lightbox-modal");
  const modalImg = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  
  if (!modal || !modalImg) return;

  modal.style.display = "flex";
  modalImg.src = src;
  caption.textContent = captionText;
  if (typeof synthSound === "function") {
    synthSound("success");
  }
}

function closeLightbox() {
  const modal = document.getElementById("lightbox-modal");
  if (modal) modal.style.display = "none";
}

function openVideoModal(src, title) {
  const modal = document.getElementById("video-playback-modal");
  const player = document.getElementById("gallery-local-player");
  const titleEl = document.getElementById("video-modal-title");
  
  if (!modal || !player) return;

  modal.style.display = "flex";
  player.src = src;
  titleEl.textContent = title;
  if (typeof synthSound === "function") {
    synthSound("success");
  }
}

function closeVideoModal() {
  const modal = document.getElementById("video-playback-modal");
  const player = document.getElementById("gallery-local-player");
  if (player) {
    player.pause();
    player.src = "";
  }
  if (modal) modal.style.display = "none";
}


function initHUDSystem() {
  
  function updateClockWidget() {
    const now = new Date();
    const secs = now.getSeconds();
    const mins = now.getMinutes();
    const hours = now.getHours();

    const secDeg = (secs / 60) * 360;
    const minDeg = (mins / 60) * 360 + (secs / 60) * 6;
    const hourDeg = (hours / 12) * 360 + (mins / 60) * 30;

    const secHand = document.getElementById("analog-sec");
    const minHand = document.getElementById("analog-min");
    const hourHand = document.getElementById("analog-hour");

    if (secHand) secHand.style.transform = `rotate(${secDeg}deg)`;
    if (minHand) minHand.style.transform = `rotate(${minDeg}deg)`;
    if (hourHand) hourHand.style.transform = `rotate(${hourDeg}deg)`;

    const digitalReadout = document.getElementById("widget-digital-time");
    if (digitalReadout) {
      let ampm = hours >= 12 ? 'PM' : 'AM';
      let dispHour = hours % 12;
      dispHour = dispHour ? dispHour : 12;
      const dispMin = String(mins).padStart(2, '0');
      const dispSec = String(secs).padStart(2, '0');
      digitalReadout.textContent = `${dispHour}:${dispMin}:${dispSec} ${ampm}`;
    }
  }
  setInterval(updateClockWidget, 1000);
  updateClockWidget();

  
  function renderCalendarWidget() {
    const monthYear = document.getElementById("calendar-month-year");
    const datesGrid = document.getElementById("calendar-dates");
    if (!monthYear || !datesGrid) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();

    const monthNames = [
      "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
      "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];

    monthYear.textContent = `${monthNames[month]} ${year}`;

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    datesGrid.innerHTML = "";

    
    for (let i = 0; i < firstDayIndex; i++) {
      const blank = document.createElement("div");
      blank.className = "calendar-date blank";
      datesGrid.appendChild(blank);
    }

    
    for (let d = 1; d <= totalDays; d++) {
      const dateEl = document.createElement("div");
      dateEl.className = "calendar-date";
      dateEl.textContent = d;
      if (d === today) {
        dateEl.classList.add("today");
      }
      datesGrid.appendChild(dateEl);
    }
  }
  renderCalendarWidget();

  
  const searchInput = document.getElementById("desktop-search-input");
  const searchResults = document.getElementById("search-results");

  const apps = [
    { name: "J.A.R.V.I.S. AI Co-Pilot", id: "win-jarvis", keywords: ["jarvis", "ai", "speech", "copilot", "voice"] },
    { name: "Robotic Engineer Wala (YouTube Channel)", id: "win-youtube", keywords: ["youtube", "video", "channel", "playlist", "robot", "wala", "robotic"] },
    { name: "Netlify Portfolio", id: "win-portfolio", keywords: ["portfolio", "resume", "work", "cv", "netlify", "me"] },
    { name: "RoboTasks List", id: "win-tasks", keywords: ["tasks", "todo", "schedule", "planner", "organizer"] },
    { name: "RoboTerminal Console", id: "win-terminal", keywords: ["terminal", "shell", "cmd", "neofetch", "cli"] },
    { name: "Trophy Showcase", id: "win-showcase", keywords: ["showcase", "trophy", "awards", "medals", "certificates"] },
    { name: "Gallery Explorer", id: "win-gallery", keywords: ["gallery", "photos", "videos", "media", "designs"] },
    { name: "Socials Hub", id: "win-socials", keywords: ["socials", "instagram", "linkedin", "facebook", "github", "links"] },
    { name: "HUD Diagnostics", id: "win-diagnostics", keywords: ["diagnostics", "cpu", "ram", "memory", "temperature", "temp", "hud"] },
    { name: "System Settings", id: "win-settings", keywords: ["settings", "config", "theme", "wallpaper", "crt"] }
  ];

  if (searchInput && searchResults) {
    
    window.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInput.focus();
        if (typeof synthSound === "function") {
          synthSound("click");
        }
      }
    });

    
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchInput.value = "";
        searchResults.style.display = "none";
        searchInput.blur();
      }
    });

    searchInput.addEventListener("input", () => {
      const val = searchInput.value.trim().toLowerCase();
      if (val === "") {
        searchResults.style.display = "none";
        return;
      }

      const filtered = apps.filter(app => 
        app.name.toLowerCase().includes(val) || 
        app.keywords.some(kw => kw.includes(val))
      );

      if (filtered.length > 0) {
        searchResults.innerHTML = "";
        filtered.forEach(app => {
          const li = document.createElement("li");
          li.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> ${app.name}`;
          li.onclick = () => {
            toggleWindow(app.id);
            searchInput.value = "";
            searchResults.style.display = "none";
            searchInput.blur();
          };
          searchResults.appendChild(li);
        });
        searchResults.style.display = "block";
      } else {
        searchResults.style.display = "none";
      }
    });

    
    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = "none";
      }
    });
  }

  
  const contextMenu = document.getElementById("desktop-context-menu");

  if (contextMenu) {
    document.addEventListener("contextmenu", (e) => {
      
      if (e.target.closest(".window") || e.target.closest(".desktop-dock") || e.target.closest(".top-bar")) {
        return; 
      }
      
      e.preventDefault();
      contextMenu.style.display = "block";
      contextMenu.style.left = e.clientX + "px";
      contextMenu.style.top = e.clientY + "px";
      
      if (typeof synthSound === "function") {
        synthSound("click");
      }
    });

    
    document.addEventListener("click", () => {
      contextMenu.style.display = "none";
    });
  }

  
  setInterval(() => {
    const cpuVal = document.getElementById("diag-cpu-val");
    const cpuBar = document.getElementById("diag-cpu-bar");
    const ramVal = document.getElementById("diag-ram-val");
    const ramBar = document.getElementById("diag-ram-bar");
    const tempVal = document.getElementById("diag-temp-val");
    const tempBar = document.getElementById("diag-temp-bar");

    if (cpuVal && cpuBar) {
      const load = Math.floor(15 + Math.random() * 25);
      cpuVal.textContent = load + "%";
      cpuBar.style.width = load + "%";
    }
    if (ramVal && ramBar) {
      const ram = (3.1 + Math.random() * 0.4).toFixed(1);
      ramVal.textContent = ram + " GB / 8.0 GB";
      ramBar.style.width = ((ram / 8.0) * 100) + "%";
    }
    if (tempVal && tempBar) {
      const temp = Math.floor(43 + Math.random() * 6);
      tempVal.textContent = temp + "°C";
      tempBar.style.width = ((temp / 80) * 100) + "%";
    }
  }, 2000);
}
