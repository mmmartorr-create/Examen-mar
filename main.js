/**
 * Global JavaScript for the 8-page website
 */

document.addEventListener('DOMContentLoaded', () => {
    highlightActiveLink();
    initGlobalFeatures();
});

/**
 * Highlights the current page in the navigation menu
 */
function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Common utilities and UI enhancements
 */
function initGlobalFeatures() {
    // Add page transitions appearance
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 50);

    // Global console log for debugging navigation
    console.log(`Página cargada: ${window.location.pathname}`);
}

/**
 * Helper to count words in an element
 * @param {string} elementId 
 * @param {string} displayId 
 * @param {number} targetCount 
 */
function countWords(elementId, displayId, targetCount) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const text = element.innerText.trim();
    const words = text.split(/\s+/).filter(w => w.length > 0).length;

    const display = document.getElementById(displayId);
    if (display) {
        display.innerText = `Total de palabras: ${words} (${words === targetCount ? 'Exactamente' : 'Aproximadamente'} ${targetCount})`;
    }
    console.log(`Conteo de palabras (${elementId}):`, words);
}

/**
 * Helper to read and display a local file
 */
function setupFilePreview(inputId, mode, outputId) {
    const input = document.getElementById(inputId);
    const output = document.getElementById(outputId);
    if (!input || !output) return;

    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (mode === 'text') {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const content = ev.target.result;
                console.log("Contenido del archivo:", content);
                output.textContent = content;
                output.parentElement.style.display = 'block';
            };
            reader.readAsText(file);
        } else if (mode === 'url') {
            const url = URL.createObjectURL(file);
            output.src = url;
            output.style.display = 'block';
            if (output.parentElement) output.parentElement.style.display = 'block';
        }
    });
}

/**
 * Generic function to clear inputs and hide result containers
 * @param {string[]} inputIds 
 * @param {string[]} displayIds 
 * @param {string[]} containerIds 
 */
function clearContent(inputIds = [], displayIds = [], containerIds = []) {
    inputIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (el.type === 'file') el.value = '';
            else if (el.type === 'color') el.value = '#000000';
            else el.value = '';
        }
    });

    displayIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (el.tagName === 'IMG' || el.tagName === 'VIDEO' || el.tagName === 'AUDIO' || el.tagName === 'IFRAME') {
                el.src = '';
                el.style.display = 'none';
            } else {
                el.textContent = '';
            }
        }
    });

    containerIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    console.log("Contenido limpiado.");
}
