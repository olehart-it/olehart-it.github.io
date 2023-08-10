const images = ['image1.jpg', 'image2.jpg', 'image3.jpg']; 
const imageElement = document.getElementById('image');
const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');
let currentIndex = 0;

function updateImage() {
  imageElement.src = images[currentIndex];
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === images.length - 1;

  if (currentIndex === 0) {
    prevButton.style.display = 'none';
  } else {
    prevButton.style.display = 'block';
  }

  if (currentIndex === images.length - 1) {
    nextButton.style.display = 'none';
  } else {
    nextButton.style.display = 'block';
  }
}

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateImage();
  }
});

nextButton.addEventListener('click', () => {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    updateImage();
  }
});

updateImage();
