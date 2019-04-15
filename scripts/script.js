let galleryFolder = '';
let activeImage = 0;
let folderTotal = 0;
const gallery = document.getElementById('gallery');
const carousel = document.getElementById('carousel');
const carouselImg = document.getElementById('carouselImg');
const container = document.getElementById('container');

function renderThumbnails(folder, total){
    let thumbnails = '';
    if (total > 1) {
        for (let i = 0; i < total; i++) {
            thumbnails += `<a href="javascript:void(0)" class="thumbnail-link" onclick="showCarousel('${folder}', ${i + 1}, ${total})">
                <div class="thumbnail" style="background-image: url('img/${folder}/${i + 1}.png')"></div>
            </a>`;
        }
    } else {
        for (let i = 0; i < total; i++) {
            thumbnails += `<a href="javascript:void(0)" class="thumbnail-link" onclick="showCarousel('${folder}', ${i + 1}, ${total})">
                <div class="thumbnail-large" style="background-image: url('img/${folder}/${i + 1}.png')"></div>
            </a>`;
        }
    }
    
    gallery.innerHTML = thumbnails;
}

function changeImg(number) {
    carouselImg.style.backgroundImage = `url('img/${galleryFolder}/${number}.png')`;
}

function showCarousel(folder, img, total) {
    galleryFolder = folder;
    activeImage = img;
    folderTotal = total;
    changeImg(activeImage);
    carousel.style.display = 'block';
    container.style.display = 'none';
}

function hideCarousel() {
    carousel.style.display = 'none';
    container.style.display = 'block';
}

function carouselNext(){
    activeImage++;
    if (activeImage > folderTotal)
        activeImage = 1;
    changeImg(activeImage);
}

function carouselPrev(){
    activeImage--;
    if (activeImage == 0)
        activeImage = folderTotal;
    changeImg(activeImage);
}

function checkKey(e) {	
	evt = e.keyCode || e.charCode;
    
    if (carousel.style.display == 'block') {
        if (evt == 37) // left
            carouselPrev();

        else if (evt == 39) // right
            carouselNext();
        
        else if (evt == 27) // esc
            hideCarousel();
    }
}

// document.addEventListener("keydown", checkKey(event), false);