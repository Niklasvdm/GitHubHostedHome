// toggles = document.querySelectorAll(".toggle");
// toggles.forEach(toggle => toggle.addEventListener("click", () => toggleClick(toggle)))

// // search_icon = document.querySelector("#search-icon");
// // search_icon.addEventListener("click", () => toggleTogglesVisibility());

// content_boxes = document.querySelectorAll(".content-box");

// function toggleClick(target) {
//     target.classList.toggle("highlighted");
//     if (target.classList.contains("highlighted")) {
//         addContentHighlighting(target.textContent);
//     } else {
//         removeContentHighlighting();
//         addHighlightingForActiveToggles();
//     }
// }

// function addContentHighlighting(toggleText) {
//     content_boxes.forEach(content_box => {
//         if (content_box.dataset.toggles.includes(toggleText)) {
//             content_box.classList.add("highlighted");
//         }
//     });
// }

// function addHighlightingForActiveToggles() {
//     toggles.forEach(toggle => {
//         if (toggle.classList.contains("highlighted")) {
//             addContentHighlighting(toggle.textContent);
//         }
//     });
// }

// function removeContentHighlighting() {
//     content_boxes.forEach(content_box => content_box.classList.remove("highlighted"));
// }

// function removeToggleHighlighting() {
//     toggles.forEach(toggle => toggle.classList.remove("highlighted"));
// }

// function toggleTogglesVisibility() {
//     document.body.classList.toggle("hide-toggle");
//     removeContentHighlighting();
//     removeToggleHighlighting();
// }


document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const boxes = Array.from(section.querySelectorAll('.content-box'));

        const sortedBoxes = boxes
            .map((box, index) => ({
                element: box,
                order: Number(box.dataset.order),
                originalIndex: index,
            }))
            .sort((a, b) => {
                const orderA = Number.isFinite(a.order) ? a.order : Number.MAX_SAFE_INTEGER;
                const orderB = Number.isFinite(b.order) ? b.order : Number.MAX_SAFE_INTEGER;

                if (orderA === orderB) {
                    return a.originalIndex - b.originalIndex;
                }

                return orderA - orderB;
            });

        sortedBoxes.forEach(item => {
            section.appendChild(item.element);
        });
    });

    if (typeof LINK_URLS === 'object' && LINK_URLS !== null) {
        const linkNodes = document.querySelectorAll('[data-link-key]');
        linkNodes.forEach(node => {
            const key = node.dataset.linkKey;
            const url = LINK_URLS[key];

            if (!key || !url) {
                return;
            }

            node.setAttribute('href', url);

            const isHttpLink = /^https?:/i.test(url);
            const hasTarget = node.hasAttribute('target');

            if (isHttpLink && !hasTarget) {
                node.setAttribute('target', '_blank');
                node.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

});
