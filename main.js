const track = document.querySelector('.slider_track');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentSlide = 0;
const totalSlides = slides.length;

function updateSlidePosition(){
    const offset = currentSlide * -100;
    track.style.transform = `translateX(${offset}%)`;
    applySlideEffects();
}
function applySlideEffects(){
    slides.forEach((slide, index) => {
        slide.style.transform = 'rotateY(0)';
        if(index === currentSlide){
            slide.style.transform = 'scale(1) rotateY(0deg)';
        } else {
            slide.style.transform = 'scale(.8) rotateY(-15deg)';
        }
    });
}
prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide === 0) ? totalSlides - 1 : currentSlide - 1;
    updateSlidePosition();
});
nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide === totalSlides - 1) ? 0 : currentSlide + 1;
    updateSlidePosition();
});
updateSlidePosition();
