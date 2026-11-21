let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state !== "running") void ctx.resume();
  return ctx;
}

export function soundOn() {
  return document.documentElement.dataset.sound === "on";
}

export function setSound(on: boolean) {
  document.documentElement.dataset.sound = on ? "on" : "off";
  try {
    localStorage.setItem("sound", on ? "on" : "off");
  } catch {
    /* ignore private mode */
  }
  if (on) audio();
}

function tone(freq: number, dur: number, type: OscillatorType, vol: number, glide?: number, delay = 0) {
  if (!soundOn()) return;
  const c = audio();
  if (!c) return;
  const t = c.currentTime + delay;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (glide) o.frequency.exponentialRampToValueAtTime(Math.max(1, glide), t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  g.connect(c.destination);
  o.start(t);
  o.stop(t + dur + 0.03);
}

export function play(kind: "tick" | "click" | "on" | "boing") {
  if (kind === "tick") tone(1400, 0.045, "triangle", 0.03);
  if (kind === "click") tone(420, 0.07, "square", 0.02, 220);
  if (kind === "on") {
    tone(660, 0.09, "sine", 0.04);
    tone(990, 0.12, "sine", 0.04, undefined, 0.07);
  }
  if (kind === "boing") {
    tone(180, 0.55, "sine", 0.06, 90);
    tone(360, 0.55, "triangle", 0.03, 120);
  }
}
