# mcmurray.tech — Hugo Personal Website

Minimal, dark, fast personal website with interactive filtering and perfect dual-theme support. Built with [Hugo](https://gohugo.io) and the [PaperMod](https://github.com/adityatelange/hugo-PaperMod) theme.

## Quick Start

```bash
# 1) Ensure Hugo (extended) v0.128.0+
hugo version

# 2) Clone this repo and initialize submodules
git clone <repository>
cd hugo-mcmurray-tech
git submodule update --init --recursive

# 3) Run locally
hugo server -D

# 4) Build for production
rm -rf public && hugo --minify
```

Publish the contents of `public/` via Nginx, Nginx Proxy Manager, or Cloudflare Tunnel.

## Content Editing Guide

All content is located in: `content/_index.md`

### Professional Experience

#### Structure
Each job follows this pattern:
```html
<div class="experience-entry" data-tags="FILTER_TAGS">
<h3>Job Title - Company Name (Year)</h3>
<div class="experience-tags">
  <span class="exp-tag CATEGORY">Technology/Skill</span>
  <!-- Add more tags as needed -->
</div>
<p>Optional introduction paragraph</p>
<ul>
<li>Bullet point describing what you did</li>
<li>Another accomplishment</li>
<!-- Add more bullet points -->
</ul>
</div>
```

#### Example - Adding a New Job
```html
<div class="experience-entry" data-tags="cloud,security,automation">
<h3>Senior Cloud Engineer - Tech Corp (2023)</h3>
<div class="experience-tags">
  <span class="exp-tag cloud">AWS</span>
  <span class="exp-tag security">IAM</span>
  <span class="exp-tag automation">Terraform</span>
  <span class="exp-tag container">Docker</span>
</div>
<p>Led cloud infrastructure initiatives for a growing tech company:</p>
<ul>
<li>Migrated legacy systems to AWS, reducing costs by 40%</li>
<li>Implemented Infrastructure as Code using Terraform</li>
<li>Set up automated CI/CD pipelines</li>
</ul>
</div>
```

#### Available Tag Categories & Colors
- `security` - Red (#ef4444) - HIPAA, Security Audits, Incident Response
- `cloud` - Blue (#3b82f6) - AWS, Azure, Microsoft 365, Google Workspace  
- `container` - Green (#10b981) - Docker, Kubernetes
- `automation` - Purple (#a855f7) - Scripting, Zero-touch provisioning
- `programming` - Green (#22c55e) - PowerShell, Python, JavaScript
- `systems` - Blue (#3b82f6) - Active Directory, Multi-OS, Hardware
- `tools` - Amber (#f59e0b) - Jamf Pro, Wireshark, ELK Stack
- `networking` - Sky Blue (#0ea5e9) - Network Design, SSO, Network Security
- `database` - Indigo (#6366f1) - Database Admin
- `collaboration` - Purple (#a855f7) - SharePoint, Training

#### Filter Integration
The `data-tags` attribute controls filtering. Use these exact values:
- `all` (always available)
- `cloud`, `security`, `automation`, `networking`, `systems`, `collaboration`

Add jobs in **reverse chronological order** (newest first).

### Education

#### Structure
```html
<div class="education-entry">
<h3>Degree Name</h3>
<p><strong>School Name (Year)</strong></p>
<div class="education-tags">
  <span class="edu-tag CATEGORY">Skill/Technology</span>
  <!-- Add more tags -->
</div>
<ul>
<li>What you learned or accomplished</li>
<li>Projects or experiences</li>
<li><strong>Special Achievement:</strong> Awards or recognition</li>
</ul>
</div>
```

#### Example - Adding New Education
```html
<div class="education-entry">
<h3>M.S. in Cybersecurity</h3>
<p><strong>University of Washington (2024)</strong></p>
<div class="education-tags">
  <span class="edu-tag security">Threat Hunting</span>
  <span class="edu-tag tools">SIEM</span>
  <span class="edu-tag programming">Python</span>
  <span class="edu-tag cloud">Cloud Security</span>
</div>
<ul>
<li>Specialized in advanced threat detection and response</li>
<li>Completed capstone project on cloud security architecture</li>
<li><strong>Dean's List:</strong> Maintained 3.8+ GPA throughout program</li>
</ul>
</div>
```

Education tags use the same categories as Professional Experience.

### Notable Achievements

#### Structure
```html
<div class="achievement-item">
<div class="achievement-icon">
<img src="/images/achievements/FILENAME.png" alt="Alt Text" />
</div>
<div class="achievement-content">
<h3>Achievement Title</h3>
<p>Description of what you accomplished and its significance.</p>
<!-- OR use <ul><li> for multiple items -->
</div>
</div>
```

#### Example - Adding New Achievement
```html
<div class="achievement-item">
<div class="achievement-icon">
<img src="/images/achievements/aws-certified.png" alt="AWS Certification" />
</div>
<div class="achievement-content">
<h3>AWS Solutions Architect Certified</h3>
<p>Earned AWS Solutions Architect Professional certification, demonstrating expertise in designing distributed systems and cloud architecture best practices.</p>
</div>
</div>
```

#### Adding Achievement Icons
1. **Save your icon image** to `static/images/achievements/`
2. **Recommended specs:**
   - Format: PNG with transparent background
   - Size: 200x200px minimum (will be scaled automatically)
   - Good contrast colors (works in both light/dark modes)

#### Achievement Icons are Auto-Styled
The CSS automatically handles:
- Perfect sizing (95px containers with proper padding)
- Backgrounds and borders for both light/dark modes
- Drop shadows for visibility
- Mobile responsiveness
- Special scaling for smaller icons

## Editing Best Practices

### Before You Edit
1. **Make a backup**: `cp content/_index.md content/_index.md.backup`
2. **Test locally**: `hugo server -D` to preview changes

### While Editing
- **Keep the exact HTML structure** - the CSS depends on specific classes
- **Use proper tag categories** for consistent colors
- **Add jobs/education in reverse chronological order** (newest first)  
- **Test filtering** by clicking filter buttons after adding experience entries

### After Editing
- **Test both themes** - Toggle light/dark mode to ensure visibility
- **Check mobile view** - Resize browser or use mobile device
- **Verify filtering** - Make sure new jobs show up when filtering by their tags

## Common Commands

```bash
# Edit the content
nano content/_index.md

# Preview changes
hugo server -D

# Open in browser
open http://localhost:1313

# Build for production  
hugo --minify

# Commit changes
git add .
git commit -m "Updated professional experience"
git push
```

## Site Features

- **Interactive Experience Filtering** - Filter professional experience by technology
- **Dual Theme Support** - Perfect visibility in both light and dark modes
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Achievement Showcases** - Visual icons with professional accomplishments
- **Clean Typography** - Minimal design with excellent readability
- **Fast Loading** - Optimized static site generation
