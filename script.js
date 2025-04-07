// const carousel = document.querySelector(".carousel"),
// firstImg = carousel.querySelectorAll("img")[0];
// arrowIcons = document.querySelectorAll(".wrapper i");

// let isDragStart = false, prevPageX, prevScrollLeft;
// let firstImgWidth = firstImg.clientWidth + 14; //getting first img width & adding 14 margin value
// let scrollWidth = carousel.scrollWidth - carousel.clientWidth; //


// const showHideIcons = () => {
//   //
//   arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
//   arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
//   }

//   arrowIcons.forEach(icon => {
//   icon.addEventListener("click", () => {
//   // if clicked icon is laft, reduce width value from the carousel scroll left else add to it
//   carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
//   setTimeout(() => showHideIcons(), 60); //
//   });
//   });

// const dragStart = (e) => {
//   // updatating global variables value on mouse down event
//   isDragStart = true;
//   prevPageX = carousel.scrollLeft;
// }

// const dragging = (e) => {
//   // scrolling images/carousel to left according to mouse pointer
//   if(!isDragStart) return;
//   e.preventDefault();
//   carousel.classList.add("dragging");
//   let positionDiff= prevScrollLeft - positionDiff;
// }

// const dragStop = () => {
//   isDragStart = false;
//   carousel.classList.remove("dragging");
// }

// carousel.addEventListener("mousedown",dragStart)
// carousel.addEventListener("mousemove",dragging)
// carousel.addEventListener("mouseup",dragStop)


const carousel = document.querySelector(".carousel"),
    firstImg = carousel.querySelectorAll("img")[0],
    arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    //
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; //
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth -1 ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth - 30; //getting first img width & adding 14 margin value
        // if clicked icon is laft, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); //
    });
});

const autoSlide = () => {
    //
    if (carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) {
        showHideIcons();
        return;
    }
    positionDiff = Math.abs(positionDiff); //
    let firstImgWidth = firstImg.clientWidth - 30;
    //
    let valDifference = firstImgWidth - positionDiff;

    if (carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;

    showHideIcons();
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if (!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging, { passive: false });

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop); 