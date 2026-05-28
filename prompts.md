# AI Model Prompts: ValanWebcraft Studio Portfolio

Use the guidelines, instructions, and structure below to guide other AI models in editing, rebuilding, or extending your professional web & mobile app design portfolio.

---

## 1. Project Overview & Tech Stack
*   **Brand Name**: ValanWebcraft Studio
*   **Target Audience**: Small-scale businesses (cafes, retail stores, gyms, local wellness centers, service providers).
*   **Tech Stack**: Vanilla HTML5, CSS3 (variables, transitions, custom mockups), ES6 JavaScript.
*   **Theme**: Modern dark mode/obsidian palette with vibrant indigo, purple, and emerald glow overlays. Heavy use of glassmorphism (`backdrop-filter`).
*   **Fonts**: Google Fonts - Outfit.
*   **Icons**: Lucide Icons CDN.
*   **Hosting Target**: Optimized for instant deployment on Vercel.

---

## 2. Core Site Architecture
The site is single-page, responsive, and contains the following sections:
1.  **Navbar**: Sticky glassmorphic navbar with logo (`ValanWebcraft Studio`), menu options, and mobile hamburger toggle.
2.  **Hero Section**: Text value proposition with call-to-actions, stats counter, and CSS-drawn device mockups (responsive laptop + floating Android phone).
3.  **Services Section**: Three-column grid displaying key services (Single-page sites, Multi-page sites, and Android App development).
4.  **Website Models Section**: A category-filterable grid of pre-designed templates with an interactive "Preview" modal containing browser mockups.
5.  **Contact Section**: An inquiry form that automatically generates a WhatsApp redirection message containing formatted inputs on form submission.
6.  **Footer**: Brand logo, quick links, copyright, and deployment/hosting credits.

---

## 3. Design Tokens (CSS Variables)
When adding styles or modifying layouts, always adhere to the design system:
```css
:root {
    --bg-dark: #07080e;
    --bg-darker: #040509;
    --card-bg: rgba(13, 15, 24, 0.45);
    --card-border: rgba(255, 255, 255, 0.05);
    --primary: #4f46e5;
    --primary-light: #6366f1;
    --secondary: #10b981;
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --gradient-primary: linear-gradient(135deg, #4f46e5 0%, #818cf8 100%);
    --gradient-glow: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(0, 0, 0, 0) 70%);
}
```

---

## 4. Feature Implementation Details

### A. Responsive Device Mockups
*   Both the laptop and phone mockups are drawn with pure CSS.
*   In mobile breakpoints, avoid absolute pixel widths or `transform: scale()`. Instead, scale down widths and fonts linearly to avoid horizontal overflow:
    *   **Tablet Layout (<768px)**: Limit `.mockup-container` to `max-width: 380px`, `.laptop-mockup` to `320px`, and `.phone-mockup` to `110px`.
    *   **Mobile Layout (<480px)**: Limit `.mockup-container` to `max-width: 290px`, `.laptop-mockup` to `250px`, and `.phone-mockup` to `90px` with proportionally scaled text.

### B. Pre-Designed Models with Image Fallback
*   Models showcase contains: *BakeHouse* (Food/Cafe), *FreshCart* (Retail/Stores), *FitLife* (Services/Fitness), and *UrbanSalon* (Services/Beauty).
*   Each model card's visual div supports displaying screenshot images overlays:
    ```html
    <div class="model-visual cafe-visual">
        <img src="images/bakehouse.png" alt="BakeHouse Model" class="model-img" onerror="this.style.display='none'">
        <div class="visual-inner">...</div>
    </div>
    ```
*   **Fallback Behavior**: If a screenshot (e.g. `bakehouse.png`) is missing or fails to load, `onerror="this.style.display='none'"` executes automatically. The CSS fallback mockup is displayed immediately, ensuring the site looks complete.

### C. Contact Form & WhatsApp Integration
*   The form collects `Name`, `Email`, `Business Name`, `Sector`, `Service Needed`, `Model Pattern`, and `Message`.
*   Form submit processes inputs and formats a direct WhatsApp text:
    ```javascript
    const waText = `Hi! I just submitted a project request on ValanWebcraft Studio:\n\n` +
                   `👤 Name: ${nameVal}\n` +
                   `💼 Business: ${businessVal} (${sectorVal})\n` +
                   `🛠️ Needed: ${serviceVal}\n` +
                   `🎨 Model Selected: ${modelVal}\n` +
                   `📝 Requirements: ${messageVal}`;
    ```
*   The WhatsApp redirect URL points to `https://wa.me/918248074540?text=[waText]`.

---

## 5. Model System Prompts
To prompt an AI model to make adjustments or create additional templates, use this structure:

> **System Prompt**:
> "You are an expert front-end developer refining a premium glassmorphic portfolio website.
> Maintain the Obsidian theme variables (deep blue/black, indigo accents, and frosted transparent cards).
> Any new section must include class names from the design system (`.card`, `.btn-primary`, `.section-tag`, `.text-muted`).
> Do not use utility classes (like Tailwind) unless explicitly asked.
> Ensure all interactive layouts use transition variables (`transition: var(--transition-smooth)`) for hover states.
> Make sure `overflow-x` is hidden at the html and body levels, and all child layouts fit within 100% viewport width."
