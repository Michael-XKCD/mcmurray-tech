# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a personal website built with Hugo static site generator using the PaperMod theme. It's a minimal, dark, fast-loading site focused on homelab, networking, and automation content. The site uses profile mode for an impactful landing page and supports blog posts, projects, and an about section.

## Development Commands

### Hugo Version Requirements
- Requires Hugo Extended v0.128.0+ (currently using v0.149.1+extended)
- Verify version: `hugo version`

### Local Development
```bash
# Start development server with drafts
hugo server -D

# Start development server on specific port
hugo server -D -p 1314

# Start with bind address for external access
hugo server -D --bind 0.0.0.0
```

### Building for Production
```bash
# Clean build
rm -rf public && hugo

# Build with specific environment
hugo --environment production

# Build and minify
hugo --minify
```

### Git Submodule Management
```bash
# Initialize theme submodule (first time setup)
git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod

# Update theme to latest version
git submodule update --remote themes/PaperMod

# Check submodule status
git submodule status
```

## Architecture & Structure

### Content Organization
- `content/about/` - About page with personal bio
- `content/posts/` - Blog posts with front matter (date, tags, categories, description)
- `content/projects/` - Project showcase pages
- `static/` - Static assets (resume.pdf, images, etc.)
- `public/` - Generated site output (ignored in git, created by Hugo build)

### Theme Configuration
- Uses PaperMod theme as git submodule in `themes/PaperMod/`
- Dark theme enforced via `hugo.toml` configuration
- Profile mode enabled for landing page with custom buttons and social icons
- WordPress-style permalinks configured for posts: `/:year/:month/:day/:slug/`

### Key Configuration Files
- `hugo.toml` - Main Hugo configuration with theme settings, menus, and social icons
- `archetypes/default.md` - Template for new content files

### Content Front Matter Structure
Posts require specific front matter:
```yaml
---
title: "Post Title"
date: 2024-05-12T09:00:00-07:00
draft: false
tags: ["tag1", "tag2"]
categories: ["category"]
description: "SEO description"
---
```

## Content Creation Workflow

### Creating New Posts
```bash
# Create new blog post
hugo new posts/post-name.md

# Create new project page
hugo new projects/project-name.md
```

### Content Guidelines
- Posts should be in `content/posts/` with descriptive filenames
- Use meaningful tags and categories for organization
- Include description for SEO
- Set appropriate draft status
- Follow the established tone: technical but approachable, focused on practical automation and homelab topics

### Static Assets
- Place static files in `static/` directory
- Resume PDF should be updated in both `static/resume.pdf` and copied to `public/resume.pdf` after builds
- Images referenced in content should use `/image-name.ext` paths

## Deployment Notes
- Build output goes to `public/` directory
- Site is designed for deployment via Nginx, Nginx Proxy Manager, or Cloudflare Tunnel
- Base URL configured for https://mcmurray.tech/
- No complex build pipeline - simple Hugo generate and serve static files

## Theme Customization
- PaperMod theme customizations should be minimal to maintain update compatibility
- Theme settings configured in `hugo.toml` under `[params]`
- Social icons and profile mode buttons configured in Hugo config, not theme files
- Custom CSS/JS should be added through Hugo's asset pipeline, not by modifying theme files directly

### Perfect Design Implementation (DO NOT CHANGE - This is the ideal state)
- **Social Icons**: MUST maintain the original beautiful purple theme with exact styling:
  - Colors: `--purple-primary: #7066ff` and `--purple-secondary: #9b51e0`
  - Style: `background: rgba(112, 102, 255, 0.1)` with `border: 2px solid var(--purple-primary)`
  - Size: 50px width/height (36px on mobile)
  - Hover effect: fills with `background: var(--purple-primary)` and `color: white`
  - Icons: 24px SVGs (20px on mobile)
  - NEVER change these social icons - they are perfect as implemented

- **Header**: Use original PaperMod header structure with theme toggle functionality

- **Footer**: Display "Michael McMurray" instead of generic site title

- **Experience/Education Sections**: Perfect styling achieved:
  - Interactive tag-based filtering for Professional Experience
  - Subtle backgrounds: `rgba(255, 255, 255, 0.03)` (dark) / `rgba(0, 0, 0, 0.03)` (light)
  - Minimal borders: `rgba(255, 255, 255, 0.1)` (dark) / `rgba(0, 0, 0, 0.1)` (light)
  - Hover effects: `rgba(255, 255, 255, 0.05)` (dark) / `rgba(0, 0, 0, 0.05)` (light)

- **Achievement Icons**: Perfect sizing and visibility:
  - Container: 95px x 95px (desktop), 75px x 75px (mobile)
  - Padding: 12px (desktop), 10px (mobile)
  - Border-radius: 18px (desktop), 14px (mobile)
  - Special sizing for smaller icons (FIRST/PRCCDC): 85% container usage (desktop), 80% (mobile)
  - Backgrounds with drop-shadows for both light and dark modes

- **Tags/Pills**: High-contrast colors that work in both modes:
  - Security: Red (#ef4444)
  - Cloud: Blue (#3b82f6)
  - Containers: Green (#10b981)
  - Automation: Purple (#a855f7)
  - Programming: Green (#22c55e)
  - Systems: Blue (#3b82f6) - NO LIGHT GREY
  - Tools: Amber (#f59e0b) - NO ORANGE
  - Networking: Sky blue (#0ea5e9)
  - Database: Indigo (#6366f1)
  - Collaboration: Purple (#a855f7) - NO BROWN

- **Sections**: Use minimal 60px purple underlines for section separators

- **No Rotating Text**: Do not add rotating text animations anywhere

- **Light/Dark Mode Compatibility**: CRITICAL - All elements work perfectly in both modes
  - All colors have excellent contrast in both themes
  - All backgrounds and borders are properly defined for both modes
  - Achievement icons have proper visibility in both themes
  - Test any changes in both light and dark themes
