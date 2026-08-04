export default class Alert {
  constructor({ id, url = "/json/alerts.json", container = "body" } = {}) {
    this.id = id;
    this.url = url;
    this.container = container;
  }

  async loadAndRender() {
    try {
      const res = await fetch(this.url);
      if (!res.ok) throw new Error(`Failed to fetch alerts (${res.status})`);

      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) return null;

      const alert = data.find((item) => item && item.id === this.id);
      if (!alert) return null;

      const section = document.createElement("section");
      section.className = "alert-list";

      const p = document.createElement("p");
      p.textContent = alert.message || "";
      if (alert.background) p.style.backgroundColor = alert.background;
      if (alert.color) p.style.color = alert.color;

      section.appendChild(p);

      const containerEl =
        typeof this.container === "string"
          ? document.querySelector(this.container)
          : this.container;

      (containerEl || document.body).appendChild(section);
      
      setTimeout(() => {
        section.remove();
      }, 2000);

      return { section, alert };
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
