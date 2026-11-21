import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { EMAIL, PROJECTS, SKILLS, SOCIALS } from "@/lib/content";
import { ProjectLink, useClock, useStudio } from "@/components/studio";

export function HomeView() {
  const clock = useClock();
  const { toast } = useStudio();
  const [active, setActive] = useState(0);
  const featured = PROJECTS[active] ?? PROJECTS[0];

  return (
    <main id="main">
      <section className="hero" id="hero">
        <div className="wrap">
          <p className="kicker blink rise">Renovating technology</p>
          <HeroName />
          <p className="lede rise d2">
            // Software developer crafting clean,
            <br />
            purposeful software — from raw idea to innovation.
          </p>
          <div className="hero-actions rise d3">
            <Link to="/" hash="work" className="btn">
              View works <span className="arrow">→</span>
            </Link>
            <Link to="/" hash="contact" className="btn ghost">
              Get in touch
            </Link>
          </div>
          <ul className="hero-meta rise d4">
            <li>
              <b>Abuja</b>, Nigeria
            </li>
            <li>
              <span className="pulse" aria-hidden />
              Open to work
            </li>
            <li>
              ABJ <b>{clock}</b>
            </li>
          </ul>
        </div>
        <p className="ghost-num" aria-hidden>
          51
        </p>
        <a className="scroll-cue" href="#about">
          Scroll
        </a>
      </section>

      <section className="section" id="about">
        <div className="wrap about">
          <div className="about-sticky reveal">
            <p className="kicker">About</p>
            <h2>Renovating technology.</h2>
            <dl className="meta">
              <div>
                <dt>Location</dt>
                <dd>Abuja, Nigeria</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Game / app development</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>Open to work</dd>
              </div>
              <div>
                <dt>Local time</dt>
                <dd>{clock} ABJ</dd>
              </div>
            </dl>
          </div>
          <div className="about-copy reveal">
            <p>I’m a software developer who treats code like both a tool and a canvas.</p>
            <p>
              I build apps, games, and automation systems, whether they’re running on-chain, in a browser, or as a
              software application.
            </p>
            <p>
              My work moves across game dev, UI architecture, cloud backends, and smart contracts. But the thread that
              ties it all together is <em>renovation</em>: I take familiar systems, strip them down, and rebuild them
              with fewer assumptions. Sometimes that means rewriting a game mechanic. Sometimes it means redesigning a
              bot’s decision flow. Always it means making the thing clearer, faster, or more honest.
            </p>
            <p>
              I’m drawn to the indie ethos — small teams, strong visions, and work that doesn’t need a marketing budget
              to be felt. I build things that quietly raise the bar.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <div className="wrap">
          <div className="section-head reveal">
            <h2>Work</h2>
            <span className="count">04 selected</span>
          </div>
          <div
            className="work-split reveal"
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActive((i) => Math.min(PROJECTS.length - 1, i + 1));
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                setActive((i) => Math.max(0, i - 1));
              }
            }}
          >
            <ol className="work-list">
              {PROJECTS.map((project, index) => (
                <li
                  key={project.slug}
                  className={`work-item tone-${project.tone} ${index === active ? "is-active" : ""}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                >
                  <ProjectLink slug={project.slug} className="work-row">
                    <span className={`row-thumb ${project.fit}`}>
                      <img src={project.thumb} alt="" />
                    </span>
                    <span className="work-top">
                      <span className="idx">{project.index}</span>
                      <span className="kind">{project.kind}</span>
                    </span>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <span className="row-foot">
                      <span className="tags">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </span>
                      <span className="arrow">→</span>
                    </span>
                  </ProjectLink>
                </li>
              ))}
            </ol>
            <ProjectLink slug={featured.slug} className={`work-stage tone-${featured.tone}`}>
              <div className="frame" aria-hidden>
                {PROJECTS.map((project, index) => (
                  <img
                    key={project.slug}
                    src={project.thumb}
                    alt=""
                    className={`${index === active ? "on" : ""} ${project.fit}`}
                  />
                ))}
              </div>
              <div className="stage-meta" key={featured.slug}>
                <strong>
                  {featured.index} {featured.title}
                </strong>
                <em>
                  Case study <span className="arrow">→</span>
                </em>
              </div>
            </ProjectLink>
          </div>
          <p className="hint">Hover a row, or use ↑ ↓ then enter</p>
        </div>
      </section>

      <section className="section" id="skills">
        <div className="wrap">
          <div className="section-head reveal">
            <h2>Skills</h2>
            <span className="count">Stack & tools</span>
          </div>
          <div className="skills reveal">
            {SKILLS.map((group) => (
              <div className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="wrap contact">
          <div className="reveal">
            <h2>
              Let’s
              <br />
              <em>work</em>
              <br />
              together.
            </h2>
            <p className="contact-sub">Open to part-time roles, freelance contracts, and interesting collaborations.</p>
            <ul className="socials">
              {SOCIALS.map((social) => (
                <li key={social.href}>
                  <a href={social.href} target="_blank" rel="noreferrer">
                    {social.label}
                    <span>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mail-card reveal">
            <p>Email</p>
            <a className="addr" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <div className="mail-actions">
              <button
                className="btn"
                type="button"
                onClick={() => {
                  void navigator.clipboard.writeText(EMAIL).then(
                    () => toast("Email copied"),
                    () => toast(EMAIL),
                  );
                }}
              >
                Copy address
              </button>
              <a className="btn ghost" href={`mailto:${EMAIL}`}>
                Open mail
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function HeroName() {
  return (
    <h1
      className="hero-name rise d1"
      aria-label="Chix dot dev"
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        const main = event.currentTarget.querySelector(".hn-main") as HTMLElement | null;
        main?.style.setProperty("--rx", `${(x * 10).toFixed(2)}deg`);
        main?.style.setProperty("--ry", `${(-y * 8).toFixed(2)}deg`);
      }}
      onPointerLeave={(event) => {
        const main = event.currentTarget.querySelector(".hn-main") as HTMLElement | null;
        main?.style.removeProperty("--rx");
        main?.style.removeProperty("--ry");
      }}
    >
      <span className="hn-main" aria-hidden>
        Chix
      </span>
      <span className="hn-dev" aria-hidden>
        {[".", "d", "e", "v"].map((letter, index) => (
          <i
            key={letter + index}
            style={{ ["--k" as string]: index }}
            onPointerDown={() => {
              const node = document.querySelectorAll(".hn-dev i")[index];
              node?.classList.remove("wob");
              void (node as HTMLElement | undefined)?.offsetWidth;
              node?.classList.add("wob");
            }}
          >
            {letter}
          </i>
        ))}
      </span>
    </h1>
  );
}
