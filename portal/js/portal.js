/* ========================================
   Hype Foundry Client Portal
   ======================================== */

// Project data - access codes and documents
const PROJECTS = {
    'VIRTUS-2026': {
        client: 'Virtus',
        subtitle: 'Brand Identity & Website Project',
        tiles: [
            {
                id: 'proposal',
                title: 'Proposal',
                subtitle: 'Brand Identity & Website',
                status: 'available',
                file: 'documents/proposal.pdf',
                icon: 'document'
            },
            {
                id: 'timeline',
                title: 'Project Timeline',
                subtitle: 'Key dates & milestones',
                status: 'available',
                file: 'documents/timeline.pdf',
                icon: 'calendar'
            },
            {
                id: 'phase-1',
                title: 'Phase 1: Discovery',
                subtitle: 'Positioning & direction',
                status: 'unavailable',
                file: null,
                icon: 'search'
            },
            {
                id: 'phase-2',
                title: 'Phase 2: Brand Identity',
                subtitle: 'Logo, colours & style guide',
                status: 'unavailable',
                file: null,
                icon: 'palette'
            },
            {
                id: 'phase-3',
                title: 'Phase 3: Website Design',
                subtitle: 'Design mockups & layouts',
                status: 'unavailable',
                file: null,
                icon: 'layout'
            },
            {
                id: 'phase-4',
                title: 'Phase 4: Website Build',
                subtitle: 'Development & launch',
                status: 'unavailable',
                file: null,
                icon: 'code'
            }
        ]
    }
};

// Icon SVGs
const ICONS = {
    document: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
    </svg>`,
    calendar: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>`,
    search: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>`,
    palette: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/>
        <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/>
        <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/>
        <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/>
    </svg>`,
    layout: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="9" y1="21" x2="9" y2="9"/>
    </svg>`,
    code: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
    </svg>`,
    lock: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>`,
    arrow: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>`
};

// Session management
const SESSION_KEY = 'hf_portal_session';

function getSession() {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
}

function setSession(accessCode, projectData) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
        accessCode,
        client: projectData.client,
        loginTime: Date.now()
    }));
}

function clearSession() {
    localStorage.removeItem(SESSION_KEY);
}

// Login page logic
function initLoginPage() {
    const form = document.getElementById('login-form');
    const input = document.getElementById('access-code');
    const errorMessage = document.getElementById('error-message');

    // Check if already logged in
    const session = getSession();
    if (session && PROJECTS[session.accessCode]) {
        window.location.href = 'dashboard.html';
        return;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const code = input.value.trim().toUpperCase();

        if (PROJECTS[code]) {
            setSession(code, PROJECTS[code]);
            window.location.href = 'dashboard.html';
        } else {
            errorMessage.textContent = 'Invalid access code. Please try again.';
            errorMessage.classList.add('show');
            input.focus();
            input.select();
        }
    });

    // Clear error on input
    input.addEventListener('input', () => {
        errorMessage.classList.remove('show');
    });
}

// Dashboard page logic
function initDashboardPage() {
    const session = getSession();

    // Redirect to login if no session
    if (!session || !PROJECTS[session.accessCode]) {
        window.location.href = 'index.html';
        return;
    }

    const project = PROJECTS[session.accessCode];

    // Set client name
    document.getElementById('client-name').textContent = project.client;
    document.getElementById('project-subtitle').textContent = project.subtitle;

    // Render tiles
    const tilesGrid = document.getElementById('tiles-grid');
    tilesGrid.innerHTML = project.tiles.map(tile => renderTile(tile)).join('');

    // Add click handlers for available tiles
    document.querySelectorAll('.tile.available').forEach(tileEl => {
        tileEl.addEventListener('click', () => {
            const file = tileEl.dataset.file;
            if (file) {
                window.open(file, '_blank');
            }
        });
    });

    // Logout handler
    document.getElementById('logout-btn').addEventListener('click', () => {
        clearSession();
        window.location.href = 'index.html';
    });
}

function renderTile(tile) {
    const isAvailable = tile.status === 'available';
    const icon = isAvailable ? ICONS[tile.icon] : ICONS.lock;
    const statusLabel = isAvailable ? 'Available' : 'Coming Soon';

    return `
        <div class="tile ${tile.status}" data-id="${tile.id}" data-file="${tile.file || ''}">
            <div class="tile-header">
                <div class="tile-icon">
                    ${icon}
                </div>
                <span class="tile-status ${tile.status}">${statusLabel}</span>
            </div>
            <div class="tile-content">
                <h3 class="tile-title">${tile.title}</h3>
                <p class="tile-subtitle">${tile.subtitle}</p>
            </div>
            ${isAvailable ? `
                <div class="tile-footer">
                    View document ${ICONS.arrow}
                </div>
            ` : ''}
        </div>
    `;
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('login-page')) {
        initLoginPage();
    } else if (document.body.classList.contains('dashboard-page')) {
        initDashboardPage();
    }
});
