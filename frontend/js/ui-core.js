document.addEventListener("DOMContentLoaded", () => {
    // MENU TOGGLE:
    let menu = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');

    menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };

    window.onscroll = () => {
        menu.classList.remove('bx-x');
        navbar.classList.remove('active');
    };

    const typed = new Typed('.multiple-text', {
        strings: ['Aplicaciones Web', 'Desarrollo Backend'],
        typeSpeed: 90,
        backSpeed: 90,
        backDelay: 1300,
        loop: true,
    });

    // LIGHTBOX:
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close");

    document.querySelectorAll(".cert-image").forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.getAttribute("data-full");
        });
    });

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    // WHATSAPP CONTACT:
    document.getElementById('wpp-link').addEventListener('click', function (e) {
        e.preventDefault();
        const country = "54";
        const area = "3445";
        const phoneNumber = "431141";

        const fullUrl = "https://wa.me/" + country + area + phoneNumber;
        window.open(fullUrl, '_blank');
    });
});