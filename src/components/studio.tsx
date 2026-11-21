import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Command } from "cmdk";
import { Menu, Search, Volume2, VolumeX, X } from "lucide-react";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { EMAIL, PROJECTS, SOCIALS, getProject } from "@/lib/content";
import { play, setSound } from "@/lib/sound";

type Toast = { id: number; text: string };
type Wipe = { slug: string; x: number; y: number; phase: "in" | "out" };

type StudioApi = {
  depart: (slug: string, x: number, y: number) => void;
  toast: (text: string) => void;
  openSearch: () => void;
};

const StudioContext = createContext<StudioApi | null>(null);

export function useStudio() {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error("Studio missing");
  return ctx;
}

function applyTheme(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* ignore */
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#121110" : "#F5F3EE");
}

export function Studio({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState("");
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [wipe, setWipe] = useState<Wipe | null>(null);
  const [clock, setClock] = useState("--:--");
  const menuRef = useRef<HTMLDialogElement>(null);
  const lock = useRef(false);
  const timers = useRef<number[]>([]);
  const buffer = useRef("");
  const taps = useRef(0);
  const tapTimer = useRef(0);

  const notify = (text: string) => {
    const id = Date.now();
    setToast({ id, text });
    window.setTimeout(() => setToast((t) => (t?.id === id ? null : t)), 3200);
  };

  const depart = (slug: string, x: number, y: number) => {
    if (lock.current) return;
    const project = getProject(slug);
    if (!project) return;
    lock.current = true;
    timers.current.forEach((id) => window.clearTimeout(id));
    setWipe({ slug, x, y, phase: "in" });
    play("click");
    timers.current = [
      window.setTimeout(() => {
        void navigate({ to: "/work/$slug", params: { slug } });
        setWipe((w) => (w ? { ...w, phase: "out" } : w));
        timers.current.push(
          window.setTimeout(() => {
            setWipe(null);
            lock.current = false;
          }, 360),
        );
      }, 460),
    ];
  };

  useEffect(() => {
    const onScroll = () => {
      setStuck(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty(
        "--progress",
        String(max > 0 ? Math.min(1, window.scrollY / max) : 0),
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    let io: IntersectionObserver | undefined;
    let raf = 0;
    let tries = 0;
    const attach = () => {
      const nodes = ["about", "work", "skills", "contact"]
        .map((id) => document.getElementById(id))
        .filter((node): node is HTMLElement => Boolean(node));
      if (!nodes.length) {
        setActive("");
        // The new route may not be in the DOM yet; look again for a few frames.
        if (tries++ < 30) raf = window.requestAnimationFrame(attach);
        return;
      }
      io = new IntersectionObserver(
        (entries) => {
          const hit = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (hit?.target.id) setActive(hit.target.id);
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6] },
      );
      nodes.forEach((node) => io?.observe(node));
    };
    attach();
    return () => {
      window.cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    // Route content can mount a frame after `pathname` changes, so a one-off
    // querySelectorAll misses it and the page stays invisible until reload.
    // Watch the DOM instead and pick up every .reveal as it appears.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    const seen = new WeakSet<Element>();
    const timers: number[] = [];
    const scan = () => {
      document.querySelectorAll(".reveal:not(.in)").forEach((node) => {
        if (seen.has(node)) return;
        seen.add(node);
        io.observe(node);
        timers.push(window.setTimeout(() => node.classList.add("in"), 1600));
      });
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).format(new Date());
    setClock(fmt());
    const id = window.setInterval(() => setClock(fmt()), 15000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const dialog = menuRef.current;
    if (!dialog) return;
    if (menu && !dialog.open) dialog.showModal();
    if (!menu && dialog.open) dialog.close();
  }, [menu]);

  useEffect(() => {
    document.documentElement.classList.toggle("locked", menu || search);
  }, [menu, search]);

  const jelly = () => {
    document.documentElement.classList.add("jelly");
    play("boing");
    notify("You found the jelly.");
    window.setTimeout(() => document.documentElement.classList.remove("jelly"), 2200);
  };

  useEffect(() => {
    let last = 0;
    const onOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !document.documentElement.dataset.sound) return;
      const el = (event.target as HTMLElement | null)?.closest("a, button, .work-row");
      if (!el) return;
      const now = performance.now();
      if (now - last < 80) return;
      last = now;
      play("tick");
    };
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearch((open) => !open);
        return;
      }
      if (typing || event.metaKey || event.ctrlKey || event.altKey || event.key.length !== 1) return;
      buffer.current = (buffer.current + event.key.toLowerCase()).slice(-5);
      if (buffer.current === "jelly") {
        buffer.current = "";
        jelly();
      }
    };
    window.addEventListener("pointerover", onOver);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      notify("Email copied");
    } catch {
      notify(EMAIL);
    }
  };

  const go = (hash: string) => {
    setSearch(false);
    setMenu(false);
    void navigate({ to: "/", hash }).then(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const wipeProject = wipe ? getProject(wipe.slug) : undefined;

  return (
    <StudioContext.Provider value={{ depart, toast: notify, openSearch: () => setSearch(true) }}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className={stuck ? "nav is-stuck" : "nav"}>
        <div className="nav-bar">
          <Link to="/" hash="hero" className="logo" onClick={() => setMenu(false)}>
            Chix<i>.</i>dev
          </Link>
          <nav aria-label="Primary">
            <ul className="nav-links">
              {[
                ["about", "About"],
                ["work", "Work"],
                ["skills", "Skills"],
                ["contact", "Contact"],
              ].map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`/#${id}`}
                    aria-current={active === id ? "true" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      go(id);
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav-tools">
            <button className="icon-btn" type="button" aria-label="Search" onClick={() => setSearch(true)}>
              <Search />
            </button>
            <button
              className="icon-btn"
              type="button"
              aria-pressed={false}
              aria-label="Toggle sound"
              onClick={(event) => {
                const next = document.documentElement.dataset.sound !== "on";
                setSound(next);
                event.currentTarget.setAttribute("aria-pressed", String(next));
                if (next) play("on");
              }}
            >
              <VolumeX className="sound-off" />
              <Volume2 className="sound-on" />
            </button>
            <button
              className="icon-btn theme-btn"
              type="button"
              aria-label="Toggle color theme"
              onClick={() => {
                const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
                applyTheme(next);
                play("click");
              }}
            >
              <span className="switch" aria-hidden>
                <i />
              </span>
            </button>
            <button
              className="icon-btn menu-btn"
              type="button"
              aria-label="Open menu"
              aria-expanded={menu}
              onClick={() => setMenu(true)}
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={menuRef}
        className="menu"
        aria-label="Menu"
        onClose={() => setMenu(false)}
      >
        <div className="menu-top">
          <button className="icon-btn" type="button" aria-label="Close menu" onClick={() => setMenu(false)}>
            <X />
          </button>
        </div>
        <ul className="menu-links">
          {[
            ["about", "About", "01"],
            ["work", "Work", "02"],
            ["skills", "Skills", "03"],
            ["contact", "Contact", "04"],
          ].map(([id, label, n]) => (
            <li key={id}>
              <a
                href={`/#${id}`}
                onClick={(event) => {
                  event.preventDefault();
                  go(id);
                }}
              >
                {label}
                <span>{n}</span>
              </a>
            </li>
          ))}
        </ul>
      </dialog>

      <div key={pathname} className="page-enter" data-clock={clock}>
        <ClockContext.Provider value={clock}>{children}</ClockContext.Provider>
      </div>

      <footer className="footer">
        <div className="footer-bar">
          <p>© 2026 chixnotfound</p>
          <p>
            Designed & built with{" "}
            <button
              type="button"
              className="care"
              onClick={() => {
                window.clearTimeout(tapTimer.current);
                tapTimer.current = window.setTimeout(() => {
                  taps.current = 0;
                }, 1500);
                taps.current += 1;
                if (taps.current >= 5) {
                  taps.current = 0;
                  jelly();
                }
              }}
            >
              care.
            </button>
          </p>
          <button type="button" onClick={() => setSearch(true)}>
            Search <kbd>⌘K</kbd>
          </button>
        </div>
      </footer>

      {toast ? (
        <div className="toast" role="status">
          {toast.text === "You found the jelly." ? (
            <>
              You found the jelly.{" "}
              <Link to="/work/$slug" params={{ slug: "melon-jelly" }}>
                Open it
              </Link>
            </>
          ) : (
            toast.text
          )}
        </div>
      ) : null}

      <Command.Dialog
        open={search}
        onOpenChange={setSearch}
        label="Search the portfolio"
        overlayClassName="cmdk-overlay"
        contentClassName="cmdk-dialog"
        loop
      >
        <Command.Input placeholder="Jump to a project, page, or action" />
        <Command.List>
          <Command.Empty>Nothing matches.</Command.Empty>
          <Command.Group heading="Pages">
            <Command.Item onSelect={() => go("about")}>About</Command.Item>
            <Command.Item onSelect={() => go("work")}>Work</Command.Item>
            <Command.Item onSelect={() => go("skills")}>Skills</Command.Item>
            <Command.Item onSelect={() => go("contact")}>Contact</Command.Item>
          </Command.Group>
          <Command.Group heading="Projects">
            {PROJECTS.map((project) => (
              <Command.Item
                key={project.slug}
                value={`${project.title} ${project.kind}`}
                onSelect={() => {
                  setSearch(false);
                  void navigate({ to: "/work/$slug", params: { slug: project.slug } });
                }}
              >
                {project.title}
                <small>{project.kind}</small>
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Actions">
            <Command.Item
              onSelect={() => {
                setSearch(false);
                void copyEmail();
              }}
            >
              Copy email
            </Command.Item>
            <Command.Item
              onSelect={() => {
                applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
                setSearch(false);
              }}
            >
              Toggle theme
            </Command.Item>
            {SOCIALS.map((social) => (
              <Command.Item
                key={social.href}
                onSelect={() => {
                  window.open(social.href, "_blank", "noopener,noreferrer");
                  setSearch(false);
                }}
              >
                {social.label}
                <small>External</small>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command.Dialog>

      {wipe && wipeProject ? (
        <div
          className={`wipe tone-${wipeProject.tone} ${wipe.phase === "out" ? "out" : ""}`}
          style={{ ["--x" as string]: `${wipe.x}px`, ["--y" as string]: `${wipe.y}px` }}
          aria-hidden
        >
          <span>{wipeProject.title}</span>
        </div>
      ) : null}
    </StudioContext.Provider>
  );
}

const ClockContext = createContext("--:--");
export function useClock() {
  return useContext(ClockContext);
}

export function ProjectLink({
  slug,
  className,
  children,
}: {
  slug: string;
  className?: string;
  children: ReactNode;
}) {
  const { depart } = useStudio();
  return (
    <Link
      to="/work/$slug"
      params={{ slug }}
      className={className}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        event.preventDefault();
        depart(slug, event.clientX, event.clientY);
      }}
    >
      {children}
    </Link>
  );
}

export async function copyText(value: string) {
  await navigator.clipboard.writeText(value);
}
