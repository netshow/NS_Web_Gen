# Repository Guidelines

This repository stores a collection of **static websites** for different AI-related domains. Follow these rules when contributing.

---

## 1) Structure & Files
- **Separate folders:** Each AI domain must live in its own top-level folder.  
- **Static only:** Use plain **HTML, CSS, and vanilla JavaScript**.  
  - ❌ Do not use CSS/JS frameworks (e.g., Bootstrap, Tailwind), build systems, or icon fonts.  
  - ✅ Use inline SVGs or local SVG files for icons.  
- **Readmes:** **Do not** create a `README.md` inside new domain folders.  
- **Testing:** No automated tests. Manually open pages in at least one modern desktop and one mobile browser to verify they load and behave correctly.  

---

## 2) Content & Design
- **Reference Website Replication:**  
  Each domain website should *closely* replicate a chosen public reference site’s overall *feel*, with:  
  - Updated content aligned to the specific business idea.  
  - A slightly modified layout/structure for differentiation.  
  - A similar tone/structure, **without** copying assets or text verbatim.  

- **Unique Domain Identity:**  
  - All text and visuals must reflect the specific AI domain/business idea.  
  - Content must be substantially different from other domain folders (titles, descriptions, CTAs, imagery).  
  - **Do not** reuse content, titles, text, or icons from `agentide-website`.  
  - Each page requires unique titles, meta descriptions, and iconography tailored to the domain.  

---

## 3) Design Rules
- **Custom Color Palette per Domain:**  
  Each domain must define a unique color palette with tokens for both **light** and **dark** modes. Ensure proper contrast (WCAG AA+).  

- **Modern & Professional Look:**  
  Use clean typography, generous spacing, clear hierarchy, and accessible components.  

- **Distinct Layout Across Domains:**  
  Vary at least two of the following vs. other domain folders:  
  - Navigation style  
  - Font pairing  
  - Grid system  
  - Section arrangements  

- **Light & Dark Mode Support:**  
  Every element (text, backgrounds, cards, buttons, navs, forms) must switch correctly between themes via a site-wide toggle.  

- **Icons & Images:**  
  - Use **inline SVGs** or local `images/icons/*.svg`.  
  - Use **placeholder images** where needed; replace later with domain-relevant assets.  

---

## 4) Pull Requests Must Include
- **Summary of changes**  
- **Reference site used** (URL) if applicable  
- **Manual verification steps** (e.g., “Tested in Chrome 127 / Firefox 129; inspected responsive layout at 360px, 768px, 1280px.”)  
- **Checklist confirming guidelines were followed**, including:  
  - No frameworks/build tools used  
  - Unique palette + dark mode implemented  
  - Unique copy vs. other domains and `agentide-website`  
  - Inline/local SVG icons only  
  - All pages load and are responsive  
  
