const menuSection = document.getElementById("menu-section");



function toNewMenu(sectionId){
    const sectionToShow = document.getElementById(sectionId);
    menuSection.classList.add("d-none");
    sectionToShow.classList.remove("d-none");
}  

function toMainMenu(sectionId){
    const sectionToHide = document.getElementById(sectionId);
    sectionToHide.classList.add("d-none");
    menuSection.classList.remove("d-none");
}
