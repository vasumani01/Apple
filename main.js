

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const productSlider = document.querySelector(".product-slider");
const leftButton = document.querySelector(".product-arrow-left");
const rightButton = document.querySelector(".product-arrow-right");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("mobile-open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll(".footer-column").forEach((column) => {
    const originalChildren = Array.from(column.children);
    let currentGroup = null;

    originalChildren.forEach((element) => {
        if (element.tagName === "H4") {
            currentGroup = document.createElement("div");
            currentGroup.className = "footer-group";

            const heading = element.cloneNode(true);
            const toggle = document.createElement("button");
            toggle.type = "button";
            toggle.className = "footer-toggle";
            toggle.setAttribute("aria-expanded", "false");
            toggle.innerHTML = `${element.textContent}<span class="footer-chevron">⌄</span>`;

            const links = document.createElement("div");
            links.className = "footer-links";

            currentGroup.append(heading, toggle, links);
            column.appendChild(currentGroup);
            toggle.addEventListener("click", () => {
                if (window.innerWidth > 700) return;
                const isOpen = toggle.closest(".footer-group").classList.toggle("is-open");
                toggle.setAttribute("aria-expanded", isOpen);
            });
        } else if (currentGroup && element.tagName === "A") {
            currentGroup.querySelector(".footer-links").appendChild(element);
        }
    });

    // Remove the original nodes after their headings/links have been moved or copied.
    originalChildren.forEach((element) => {
        if (element.parentElement === column) element.remove();
    });
});

function currentGroupFor(toggle) {
    return toggle.closest(".footer-group");
}


leftButton.addEventListener("click", () => {
        productSlider.scrollBy({
            left: -300,
            behavior: "smooth"
        });
    });

rightButton.addEventListener("click", () => {
        productSlider.scrollBy({
            left: 300,
            behavior: "smooth"
        });
    });

