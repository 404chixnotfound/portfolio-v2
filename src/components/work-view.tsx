import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { Block, Project } from "@/lib/content";
import { nextProject } from "@/lib/content";
import { ProjectLink, useStudio } from "@/components/studio";

export function WorkView({ project }: { project: Project }) {
  const next = nextProject(project.slug);
  const { toast } = useStudio();
  return (
    <main id="main" className={`case tone-${project.tone}`}>
      <header className="case-hero">
        <div className="wrap">
          <Link to="/" hash="work" className="back">
            ← All projects
          </Link>
          <p className="kicker">
            {project.index} — {project.kind}
            {project.badge ? <span className="badge">{project.badge}</span> : null}
          </p>
          <h1>{project.title}</h1>
          <p className="tagline">{project.tagline}</p>
          {project.links[0] ? (
            <div className="case-actions">
              <a className="btn" href={project.links[0].href} target="_blank" rel="noreferrer">
                {project.links[0].label} <span className="arrow">↗</span>
              </a>
            </div>
          ) : null}
        </div>
        <p className="ghost-index" aria-hidden>
          {project.index}
        </p>
      </header>

      <div className="wrap case-media">
        <Media project={project} />
        {project.caption ? <p className="caption">{project.caption}</p> : null}
      </div>

      <div className="wrap case-grid">
        <div>
          {project.blocks.map((block) => (
            <BlockView key={block.title} block={block} />
          ))}
        </div>
        <aside className="case-side">
          <h2>At a glance</h2>
          <dl className="meta">
            {project.facts.map((fact) => (
              <div key={fact.k}>
                <dt>{fact.k}</dt>
                <dd>{fact.v}</dd>
              </div>
            ))}
          </dl>
          <h2>Built with</h2>
          <div className="stack">
            {project.stack.map((item) => (
              <span className="chip" key={item}>
                {item}
              </span>
            ))}
          </div>
          <h2>Links</h2>
          <div className="link-list">
            {project.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label} <span>↗</span>
              </a>
            ))}
            <button
              type="button"
              className="text-btn"
              onClick={() => {
                const url = window.location.href;
                void navigator.clipboard.writeText(url).then(
                  () => toast("Link copied"),
                  () => toast(url),
                );
              }}
            >
              Copy page link
            </button>
          </div>
        </aside>
      </div>

      <ProjectLink slug={next.slug} className={`next-band tone-${next.tone}`}>
        <span>Next project</span>
        <strong>
          {next.title} <span className="arrow">→</span>
        </strong>
        <em>{next.index}</em>
      </ProjectLink>
    </main>
  );
}

function Media({ project }: { project: Project }) {
  const media = project.media;
  const [failed, setFailed] = useState(false);
  if (media.kind === "video") return <Film id={media.id} title={media.title} />;
  if (failed) {
    return (
      <div className={`shot ${media.ratio} plate`} role="img" aria-label={media.alt}>
        <span className="stage-meta">
          <strong>{project.title}</strong>
        </span>
      </div>
    );
  }
  return (
    <div className={`shot ${media.ratio} ${media.fit === "contain" ? "contain" : ""}`}>
      <img src={media.src} alt={media.alt} onError={() => setFailed(true)} />
    </div>
  );
}

function Film({ id, title }: { id: string; title: string }) {
  const [playOn, setPlay] = useState(false);
  if (playOn) {
    return (
      <div className="embed">
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <button type="button" className="facade" onClick={() => setPlay(true)}>
      <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" />
      <span>Play film</span>
    </button>
  );
}

function BlockView({ block }: { block: Block }) {
  if (block.kind === "prose") {
    return (
      <section className="block">
        <h2>{block.title}</h2>
        {block.lead ? <p className="lead">{block.lead}</p> : null}
        {block.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
    );
  }
  if (block.kind === "steps") {
    return (
      <section className="block">
        <h2>{block.title}</h2>
        <ol className="steps">
          {block.items.map((item, index) => (
            <li key={item.t}>
              <b>0{index + 1}</b>
              <span>
                {item.t}
                <small>{item.d}</small>
              </span>
            </li>
          ))}
        </ol>
      </section>
    );
  }
  if (block.kind === "cards") {
    return (
      <section className="block">
        <h2>{block.title}</h2>
        <ul className="cards">
          {block.items.map((item) => (
            <li key={item.t}>
              <h3>{item.t}</h3>
              <p>{item.d}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  return (
    <section className="block">
      <h2>{block.title}</h2>
      <p>{block.body}</p>
      <div className="chips">
        {block.chips.map((chip) => (
          <span className="swatch" key={chip.label}>
            {chip.hex ? <i style={{ background: chip.hex }} /> : null}
            {chip.label}
          </span>
        ))}
      </div>
    </section>
  );
}

export function MissingWork() {
  return (
    <main id="main" className="missing wrap">
      <p className="kicker">404</p>
      <h1>That project isn’t on the shelf.</h1>
      <p>The index has four works. This isn’t one of them.</p>
      <Link to="/" hash="work" className="btn">
        Back to work
      </Link>
    </main>
  );
}
