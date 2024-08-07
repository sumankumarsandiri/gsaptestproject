const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const frames = {
  currentIndex: 0,
  maxIndex: 425,
};

let imagesLoaded = 0;
const images = [];

function preloadImages() {
  for (var i = 1; i <= frames.maxIndex; i++) {
    const imageUrl = `./test1/frame_${i.toString().padStart(4, "0")}.jpg`;
    //   console.log(imageUrl);
    const img = new Image();
    img.src = imageUrl;
    //   console.log(img);
    img.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === frames.maxIndex) {
        //   console.log("all images loaded");
        loadImage(frames.currentIndex); //function banahunga
        startAnimation();
      }
    };
    images.push(img);
  }
}

function loadImage(index) {
  if (index >= 0 && index <= frames.maxIndex) {
    const img = images[index];
    // console.log(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;

    const scale = Math.max(scaleX, scaleY);

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeight) / 2;

    //   context.clearRect(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.width);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    //img tags present in line 57 or starting may hai
    context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
    frames.currentIndex = index;
  }
}

function startAnimation() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".parent",
      start: " top top",
      scrub: 2,
      end: "bottom bottom",
      marker: true,
    },
  });
  tl.to(frames, {
    currentIndex: frames.maxIndex,
    onUpdate: function () {
      loadImage(Math.floor(frames.currentIndex));
    },
  });
}

preloadImages();
