function toggleMenu() {
    var x = document.querySelector(".navbar-right");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}