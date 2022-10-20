let preload = null;

window.addEventListener("scroll", function() {
    const element = document.querySelector(".header");
    const scroll = (document.body.scrollTop || document.documentElement.scrollTop) ?? 0;

    if(!element) return ;

    const { height } = preload ?? element.getBoundingClientRect();

    if (scroll > height) {
        element.style.position = "fixed";
        element.classList.add("short-header");
        preload = { height };
        return ;
    }

    element.style.position = "absolute";
    element.classList.remove("short-header");
    preload = null;
});