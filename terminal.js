const termInput = document.getElementById("term-input");
const termHistory = document.getElementById("term-history");


function focusTerminalInput() {
  termInput.focus();
}


termInput.addEventListener("keydown", (e) => {
  
  if (e.key.length === 1 || e.key === "Backspace" || e.key === "Delete") {
    synthSound("click");
  }
  if (e.key === "Enter") {
    const rawVal = termInput.value;
    const cleanCmd = rawVal.trim().toLowerCase();
    
    
    printLine(`sujay@robo-pc:~$ ${rawVal}`, "");

    if (cleanCmd !== "") {
      handleCommand(cleanCmd);
    }
    
    termInput.value = "";
    
    const contentContainer = termHistory.parentElement;
    contentContainer.scrollTop = contentContainer.scrollHeight;
  }
});

function printLine(text, color = "") {
  const line = document.createElement("div");
  line.className = "terminal-line";
  if (color) line.style.color = color;
  line.innerHTML = text;
  termHistory.appendChild(line);
}

function handleCommand(cmdStr) {
  const parts = cmdStr.split(" ");
  const baseCmd = parts[0];
  const args = parts.slice(1).join(" ");

  switch (baseCmd) {
    case "help":
      printLine("AVAILABLE COMMANDS:", "var(--primary)");
      printLine("  <span style='color: var(--primary)'>neofetch</span>     - Display system info & robot ASCII art");
      printLine("  <span style='color: var(--primary)'>robo-status</span>  - Run diagnostics on robot core systems");
      printLine("  <span style='color: var(--primary)'>showcase</span>     - Open Trophy Showcase cabinet");
      printLine("  <span style='color: var(--primary)'>gallery</span>      - Open Achievements Gallery Hub");
      printLine("  <span style='color: var(--primary)'>socials</span>      - Print social links (YouTube, LinkedIn, Instagram)");
      printLine("  <span style='color: var(--primary)'>ls / dir</span>     - List root workspace folders");
      printLine("  <span style='color: var(--primary)'>date</span>        - Output system date and clock");
      printLine("  <span style='color: var(--primary)'>clear</span>       - Clear command interface terminal");
      printLine("  <span style='color: var(--primary)'>calc [exp]</span>  - Compute mathematical calculations (ex: calc 2+2)");
      break;

    case "clear":
      termHistory.innerHTML = "";
      break;

    case "date":
      printLine(new Date().toString());
      break;

    case "ls":
    case "dir":
      printLine("<span style='color: #27c93f'>youtube_lab/</span>  <span style='color: #27c93f'>portfolio/</span>  <span style='color: #27c93f'>subsystems/</span>  <span style='color: #27c93f'>robo_scheduler/</span>", "");
      break;

    case "socials":
      printLine("--- SUJAY'S CONNECTED SOCIALS ---", "var(--primary)");
      printLine("• YouTube:   <a href='https://www.youtube.com/@roboticengineerwala' target='_blank' style='color:#ff0000; text-decoration: underline;'>@roboticengineerwala</a>");
      printLine("• LinkedIn:  <a href='https://www.linkedin.com/in/sujay-patel-38a460283/' target='_blank' style='color:#0072b1; text-decoration: underline;'>Sujay Patel</a>");
      printLine("• Instagram: <a href='https://www.instagram.com/sujayr07/' target='_blank' style='color:#e1306c; text-decoration: underline;'>@sujayr07</a>");
      printLine("• Portfolio: <a href='https://sujayr07.netlify.app/' target='_blank' style='color:#00f0ff; text-decoration: underline;'>sujayr07.netlify.app</a>");
      break;

    case "neofetch":
      const robotArt = `
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;_______
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;_/ &nbsp; &nbsp; &nbsp; \\_
      &nbsp; &nbsp; &nbsp; &nbsp; / | <span style="color:#ff5f56">●</span> &nbsp; <span style="color:#ff5f56">●</span> | \\
      &nbsp; &nbsp; &nbsp; &nbsp;| &nbsp;| &nbsp; <span style="color:var(--primary)">▱</span> &nbsp; | &nbsp;|
      &nbsp; &nbsp; &nbsp; &nbsp;| &nbsp; \\_____/ &nbsp; |
      &nbsp; &nbsp; &nbsp; &nbsp; \\___________/
      `;
      printLine(`<pre class="ascii-art">${robotArt}</pre>`);
      printLine("<span style='color: var(--primary); font-weight: bold;'>sujay@robo-pc</span>");
      printLine("---------------------");
      printLine("<b>OS:</b> SujayOS v1.0.0 (RoboOS Kernel)");
      printLine("<b>Shell:</b> RoboTerminal v1.0");
      printLine("<b>Core Temp:</b> 42°C (Optimal)");
      printLine("<b>Up-Time:</b> Simulated 4 hrs, 32 mins");
      printLine("<b>Memory:</b> 4820 MB / 8192 MB (Joint Actuator Buffer)");
      printLine("<b>CPU:</b> Neural Actuator v4.2 @ 3.4GHz");
      printLine("<b>User Profile:</b> Robotic Engineer & Content Creator");
      break;

    case "robo-status":
      printLine("RUNNING CORE SYSTEM DIAGNOSTICS...", "var(--primary)");
      setTimeout(() => {
        printLine("[OK] Neural Core Interface: Online");
        printLine("[OK] Joint Actuator Pins: Calibrated");
        printLine("[OK] Computer Vision Node: Processing at 60 FPS");
        printLine("[WARN] Energy Cell: 85% remaining (Low Coffee Buffer Warning)");
        printLine("[OK] Active Mission System: Nominal diagnostics");
        
        const contentContainer = termHistory.parentElement;
        contentContainer.scrollTop = contentContainer.scrollHeight;
      }, 300);
      break;

    case "showcase":
      toggleWindow("win-showcase");
      printLine("Opening Trophy Showcase cabinet...", "var(--primary)");
      break;

    case "gallery":
      toggleWindow("win-gallery");
      printLine("Opening Achievements Gallery Hub...", "var(--primary)");
      break;

    case "calc":
      if (!args) {
        printLine("Usage: calc [mathematical expression] (e.g. calc 12 * 8)", "#ff5f56");
      } else {
        try {
          
          const cleanExp = args.replace(/[^0-9+\-*/().\s]/g, "");
          const result = Function(`"use strict"; return (${cleanExp})`)();
          printLine(`${args} = <span style="color: var(--primary); font-weight: bold;">${result}</span>`);
        } catch (err) {
          printLine("Error: Invalid Expression", "#ff5f56");
        }
      }
      break;

    default:
      synthSound("error");
      printLine(`Command not found: <span style="color:#ff5f56">${baseCmd}</span>. Type <span style="color:var(--primary)">help</span> for options.`, "");
  }
}
