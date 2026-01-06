const slider = document.getElementById("lampSwitch");
const light = document.getElementById("lightCone");
const bulb = document.getElementById("bulb");
const btn = document.getElementById("loginBtn");
const room = document.getElementById("room");
const userInput = document.getElementById("username");
const passInput = document.getElementById("password");
const powerSwitch = document.getElementById("powerSwitch");
let powerOn = false;

let brightness = 0;

/* Lamp control */
slider.oninput = () => {
  if (!powerOn) return;

  brightness = slider.value / 100;
  light.style.opacity = brightness;
  bulb.style.opacity = brightness;

  brightness > 0.05
    ? document.body.classList.add("lit")
    : document.body.classList.remove("lit");
};

/* LOGIN LOGIC */
btn.onclick = () => {
  if (!powerOn) return;

  const username = userInput.value.trim();
  const password = passInput.value.trim();

  const success = username === "admin" && password === "admin";

  if (!success) {
    /* HORROR FAIL */
    room.classList.add("shake");
    light.style.opacity = 0;
    bulb.style.opacity = 0;

    setTimeout(() => {
      light.style.opacity = brightness * 0.4;
      bulb.style.opacity = brightness * 0.4;
      room.classList.remove("shake");
    }, 500);
  } else {
    /* SUCCESS */
    light.style.opacity = 1;
    bulb.style.opacity = 1;
    confettiBurst("left");
    confettiBurst("right");
  }
};

/* CONFETTI */
function confettiBurst(side) {
  for (let i = 0; i < 35; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.background = `hsl(${Math.random() * 360},80%,60%)`;

    const startX = side === "left" ? 0 : window.innerWidth;
    const startY = window.innerHeight;

    c.style.left = startX + "px";
    c.style.top = startY + "px";

    c.style.setProperty(
      "--x",
      (side === "left" ? 1 : -1) * (200 + Math.random() * 200) + "px"
    );
    c.style.setProperty("--y", -(300 + Math.random() * 300) + "px");

    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3000);
  }
}

/* DUST */
for (let i = 0; i < 50; i++) {
  const d = document.createElement("div");
  d.className = "dust";
  d.style.left = Math.random() * 100 + "%";
  d.style.top = Math.random() * 200 + 160 + "px";
  d.style.animationDuration = 6 + Math.random() * 8 + "s";
  document.body.appendChild(d);
}

powerSwitch.onclick = () => {
  powerOn = !powerOn;
  powerSwitch.classList.toggle("on", powerOn);

  if (!powerOn) {
    slider.value = 0;
    slider.classList.add("opacity-40", "pointer-events-none");
    light.style.opacity = 0;
    bulb.style.opacity = 0;
    document.body.classList.remove("lit");
  } else {
    slider.classList.remove("opacity-40", "pointer-events-none");
    slider.value = 40;
    slider.dispatchEvent(new Event("input"));
  }
};
