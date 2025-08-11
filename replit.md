# Kecamatan Rajagaluh Website

## Overview

This is a static website for the official government portal of Kecamatan Rajagaluh, Kabupaten Majalengka. The site serves as an information hub for local government services, providing citizens with access to public services, news, events, and organizational information. The website is built using vanilla HTML, CSS, and JavaScript with a focus on accessibility and responsive design.

## System Architecture

### Frontend Architecture
- **Technology Stack**: Pure HTML5, CSS3, and vanilla JavaScript
- **Design Pattern**: Multi-page static website with shared navigation and styling
- **CSS Architecture**: Custom CSS with CSS variables for consistent theming
- **Font System**: Google Fonts (Poppins) for typography
- **Icon System**: Font Awesome 6.4.0 for iconography

### File Structure
The project follows a flat directory structure with all files in the root:
- All HTML pages are in the root directory
- Static resources (CSS, JS, images) are also in the root directory
- Files have been renamed to avoid conflicts:
  - `ai/index.html` → `ai-assistant.html`
  - `kontak/index.html` → `kontak.html` 
  - `pkl/index.html` → `pkl.html`
  - Main `index.html` remains as homepage
- All navigation links updated to reflect flat structure

### Responsive Design Strategy
- Mobile-first approach with responsive navigation
- Flexible container system with max-width constraints
- CSS variables for consistent spacing and colors
- Font scaling and layout adjustments for different screen sizes

## Key Components

### Navigation System
- **Header Component**: Consistent across all pages with logo, title, and navigation menu
- **Dropdown Menus**: Hierarchical navigation for organized content access
- **Mobile Navigation**: Responsive hamburger menu for mobile devices
- **Active State Management**: Visual indication of current page location

### Content Management
- **Static Content Pages**: Individual HTML files for each service/information page
- **Shared Styling**: Common CSS file maintaining visual consistency
- **Asset Management**: Centralized resources in `/assets/` directory

### User Interface Elements
- **Government Branding**: Official logo and color scheme
- **Professional Typography**: Poppins font family for readability
- **Icon Integration**: Font Awesome icons for enhanced visual communication
- **Consistent Layouts**: Standardized page structures across sections

## Data Flow

### Navigation Flow
1. User enters through homepage (`index.html`)
2. Navigation menu provides access to main sections
3. Dropdown menus reveal subsection options
4. Each page maintains consistent navigation for easy traversal

### Content Organization
- **Profile Section**: Organizational information and structure
- **Services Section**: Public service offerings and procedures
- **Information Section**: News, events, and reports
- **Contact Section**: Communication channels and location

## External Dependencies

### Third-Party Resources
- **Google Fonts**: Poppins font family for typography
- **Font Awesome**: Version 6.4.0 for iconography
- **CDN Delivery**: External resources loaded via CDN for performance

### Browser Compatibility
- Modern browsers supporting CSS3 and ES6 JavaScript
- Responsive design principles for mobile and desktop
- Progressive enhancement approach for older browsers

## Deployment Strategy

### Static Hosting
- **Deployment Type**: Static file hosting (suitable for GitHub Pages, Netlify, etc.)
- **File Structure**: Self-contained with relative paths
- **Asset Organization**: Centralized resources for efficient caching
- **SEO Optimization**: Meta tags and structured content for search engines

### Performance Considerations
- Minimal external dependencies
- Optimized CSS with variables for consistency
- Lazy loading considerations for images
- Compressed and minified assets for production

## Changelog

Changelog:
- July 02, 2025. Initial setup
- July 02, 2025. Enhanced functionality and mobile responsiveness:
  * Added complete JavaScript functionality for all buttons and interactive elements
  * Implemented report preview and download functions for laporan.html
  * Added contact form submission handler with validation
  * Created social media link handlers and map integration
  * Added calendar navigation functions for agenda.html
  * Enhanced mobile responsiveness with CSS fixes for inline grid layouts
  * Fixed button functionality across all pages including category filters
  * Added event registration modal and form handling
  * Improved user notifications and loading states for better UX
- July 02, 2025. Added AI Assistant and About page:
  * Created AI Assistant page with Gemini API integration for Q&A functionality
  * Built comprehensive chat interface with typing indicators and formatted responses
  * Added "Tentang" page showcasing kecamatan activities with photo/video placeholders
  * Updated all navigation menus across website to include AI and Tentang links
  * Implemented responsive design for activity galleries and mobile optimization
  * Added activity descriptions, statistics, and engagement features
- July 03, 2025. Updated images and added PKL menu:
  * Fixed AI Assistant sendMessage JavaScript error - removed inline onclick handler
  * Updated all activity photos in Tentang page with provided image URL
  * Created new PKL (Praktik Kerja Lapangan) page with program information and activities
  * Added PKL menu to all navigation menus across the website
  * Updated chat interface width and corrected Gemini API endpoint
  * Fixed mobile responsiveness for news section and updated contact information
- July 03, 2025. Flattened file structure:
  * Moved all files from subdirectories to root directory
  * Renamed duplicate index.html files to avoid conflicts (ai-assistant.html, kontak.html, pkl.html)
  * Updated all navigation links and asset paths to reflect flat structure
  * Simplified file organization for easier maintenance and deployment
- July 03, 2025. Enhanced UI and mobile responsiveness:
  * Added professional photos for Camat and Sekretaris Camat in structure page
  * Improved mobile responsiveness for news section with better grid layouts
  * Increased AI chat container height from 400px to 600px for better user experience
  * Fixed remaining navigation path issues for tentang.html across all pages
  * Enhanced search filter mobile layout with single-column design
- July 03, 2025. Visual updates and modal functionality:
  * Updated homepage hero background with provided government building image and white gradient overlay
  * Added PKL schedule image to the PKL page in dedicated schedule section
  * Implemented functional modal system for "Ajukan pengantar" and "Ajukan sekarang" buttons
  * Added clickable close (×) and cancel buttons with proper JavaScript functionality
  * Enhanced user experience with modal backdrop clicks and overflow management
- July 03, 2025. Contact information and styling updates:
  * Fixed homepage background image URL to use direct download link for proper display
  * Updated all working hours from 16:00 to 15:00 across all HTML files
  * Changed address to: Jalan Mutiara No. 189, Rajagaluh Lor, Rajagaluh, Rajagaluh Lor, Majalengka, Kabupaten Majalengka, Jawa Barat 45472
  * Renamed all "footer-logo" classes to "logo" for consistency across HTML files and CSS
  * Ensured consistent contact information throughout the website
- July 03, 2025. AI formatting and footer alignment updates:
  * Enhanced AI Assistant to support markdown bold text formatting with ** syntax
  * Updated footer address alignment from center to left-aligned for better readability
  * Improved AI response formatting for better user experience
- July 03, 2025. Logo and news section visual improvements:
  * Fixed logo visibility by removing white filter that was making logo invisible
  * Added photos to news section on homepage with relevant government/community images
  * Updated remaining old address references to new Jalan Mutiara location
  * Enhanced news cards with proper image styling and responsive design
- July 03, 2025. Mobile optimization for newsletter subscription:
  * Reduced newsletter subscription form size and padding for better mobile experience
  * Made email input and button smaller with proper mobile sizing
  * Added mobile-specific CSS media queries for subscription section
  * Improved text sizing and spacing for mobile devices
- July 03, 2025. Separated CSS and JavaScript from HTML files:
  * Extracted embedded JavaScript from 7 HTML files (administrasi, agenda, berita, kontak, ktp-kk-akta, laporan, surat-domisili)
  * Created individual JavaScript files matching HTML names for better organization
  * Extracted embedded CSS from berita.html into separate berita.css file
  * Updated all HTML files to reference external CSS and JS files instead of embedded code
  * Improved code maintainability and separation of concerns
- July 03, 2025. Enhanced AI Assistant to SuperAssistant with advanced capabilities:
  * Integrated real Gemini 2.0 Flash API with user's API key for actual AI responses
  * Added advanced code copying functionality with syntax highlighting using Prism.js
  * Implemented modern UI with animations, gradients, and interactive elements
  * Enhanced chat interface with typing indicators and professional message styling
  * Added support for code blocks with one-click copy functionality
  * Created comprehensive capability showcase with 6 major AI features
  * Updated from basic mock responses to full Gemini API integration
  * Added support for markdown formatting, bold text, and inline code
  * Implemented supercharged modern design with floating animations and glassmorphism effects
- July 03, 2025. Enhanced AI SuperAssistant with Deep Thinking, Image Analysis & Kecamatan Info:
  * Added Deep Thinking capability with comprehensive analysis before responding
  * Integrated image upload and analysis functionality using Gemini vision capabilities
  * Added complete Kecamatan Rajagaluh information database (services, requirements, costs)
  * Updated quick question buttons to focus on KTP/KK/Akta and other government services
  * Added detailed information for all 8 villages in Kecamatan Rajagaluh
  * Enhanced AI knowledge base with specific office hours, contact details, and service procedures
  * Implemented image preview system with drag-and-drop functionality
  * Created dedicated sections for Deep Thinking mode visualization
- July 03, 2025. Enhanced AI with token authentication and mobile optimization:
  * Removed Deep Thinking functionality as requested by user
  * Added token authentication system with valid tokens: kecamatan123, admin999, rajagaluh
  * Made recommendation buttons stylish with gradients and mobile-responsive design
  * Updated AI introduction to focus specifically on Kecamatan Rajagaluh services
  * Added blue verified badge next to "AI SuperAssistant" text in header and chat
  * Implemented secure access control requiring token before AI chat usage
  * Added shake animation for invalid token attempts and success notifications
- July 04, 2025. Added dark/light mode toggle and login authentication system:
  * Implemented complete dark mode support with CSS variables for all UI elements
  * Added theme toggle button in mobile navigation menu with local storage persistence
  * Created comprehensive login system with beautiful beta testing design
  * Added authentication checks to all HTML pages with automatic redirect to login
  * Implemented login.html with gradient design, beta badge, and demo credentials
  * Added logout functionality in mobile menu with confirmation dialog
  * Login credentials: admin/admin123, demo/demo123, rajagaluh/rajagaluh123
  * Enhanced mobile responsiveness for login page and dark mode toggle
- July 04, 2025. Enhanced login page with particle background and improved theme system:
  * Added animated particle background using particles.js library similar to provided design
  * Implemented dedicated theme toggle button on login page with smooth transitions
  * Enhanced dark/light mode styling with proper contrast and visibility
  * Added comprehensive responsive design for desktop, tablet, and mobile devices
  * Removed theme toggle notifications from all HTML files for cleaner UX
  * Integrated glassmorphism effects with dynamic background gradients
  * Added floating particle animations with interactive hover and click effects
- July 06, 2025. Enhanced login security and updated copyright information:
  * Added password visibility toggle button with eye icon to login.html password field
  * Implemented togglePassword() JavaScript function for show/hide password functionality
  * Updated copyright text across all 15 HTML files to "© 2025 Kecamatan Rajagaluh. All rights reserved."
  * Enhanced password input with modern toggle styling and smooth transitions
- July 06, 2025. Complete dark/light theme consistency across all HTML files:
  * Added theme initialization script to all 14 HTML files for proper theme detection
  * Enhanced style.css with comprehensive dark mode support for all UI components
  * Added dark mode variables and styles for cards, navigation, forms, modals, and tables
  * Enhanced AI Assistant embedded CSS with complete dark mode support for chat interface
  * Added dark mode support to berita.css for newsletter subscription components
  * Updated logout modal in main.js to properly support both light and dark themes
  * Ensured all text colors have proper contrast in both themes for accessibility
  * Fixed white elements appearing in dark mode and black text on dark backgrounds
- July 06, 2025. Fixed AI chat colors, header theme switching, and logout modal button:
  * Fixed AI chat bubbles to show dark bubbles with white text in dark mode (not white bubbles with white text)
  * Enhanced AI Assistant CSS with proper [data-theme="dark"] and [data-theme="light"] selectors
  * Fixed header theme switching to update immediately without requiring scroll
  * Fixed "BATAL" button in logout modal with proper event listeners and click handling
  * Added preventDefault and stopPropagation to ensure modal buttons work reliably
  * Enhanced theme toggle function to force immediate header background color update
- July 04, 2025. Fixed mobile navigation and added desktop "Lainnya" menu grouping:
  * Fixed mobile dropdown menus to be hidden by default instead of always showing
  * Added click functionality for mobile dropdown toggles with smooth animations
  * Fixed desktop menu overflow by repositioning right-side dropdowns
  * Created "Lainnya" (Others) dropdown for desktop grouping PKL, Tentang, and Kontak
  * Maintained individual menu items for mobile while grouping them for desktop
  * Added outside click detection to automatically close mobile menus
  * Enhanced mobile menu behavior with proper active states and arrow rotations
- July 04, 2025. Enhanced AI Assistant with dark mode support and aesthetic logout dialog:
  * Added comprehensive dark mode support for AI chat interface using CSS variables
  * Updated chat container, messages, input fields to adapt to light/dark themes
  * Created aesthetic logout confirmation dialog with animations and blur effects
  * Replaced simple confirm dialog with modern modal featuring "YA" and "BATAL" buttons
  * Added pulse animations, glassmorphism effects, and smooth transitions
  * Implemented escape key and background click functionality for modal dismissal
- July 06, 2025. Fixed AI chat colors, header theme switching, and logout modal button:
  * Fixed AI chat bubbles to show white bubbles with black text in both light and dark modes
  * Enhanced header theme switching to update immediately without requiring scroll
  * Fixed "BATAL" button in logout modal with proper event listeners and click handling
  * Added preventDefault and stopPropagation to ensure modal buttons work reliably
  * Enhanced theme toggle function to force immediate header background color update
  * Fixed AI chat bubble structure to prevent double bubble effect
  * Improved laporan.js download function with proper notification system
  * Created favicon.svg from logo.svg and added to all HTML files for better branding

## User Preferences

Preferred communication style: Simple, everyday language.