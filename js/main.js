
console.clear();


gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.saveStyles(".container-hero div")
ScrollTrigger.matchMedia({

  // desktop
  "(min-width: 800px)": function() {

    var targets = document.querySelectorAll(".container-hero div");

    targets.forEach(target => {
      const tl = gsap.timeline({
        defaults: {duration: 1},
        scrollTrigger: {
          trigger: target,
          markers: false,
          scrub: true,
          start: "center 50%",
          end: "bottom top",
          pin: true
        }
      })
        .fromTo(target, {y: 25}, {y: -25})
        .from(target, {opacity: 0, duration: 0.2}, 0)
        .to(target, {opacity: 0, duration: 0.2}, 0.8)
    });

  },

  // mobile
  "(max-width: 799px)": function() {
    // The ScrollTriggers created inside these functions are segregated and get
    // reverted/killed when the media query doesn't match anymore.
    var targets = document.querySelectorAll(".container-hero div");

    targets.forEach(target => {
      const tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: target,
          markers: false,
          scrub: true,
          start: "center 50%",
          end: "bottom -50%",
          pin: true
        }
      })
        .fromTo(target, {y: 25}, {y: -25})
        .from(target, {opacity: 0, duration: 0.2}, 0)
        .to(target, {opacity: 0, duration: 0.2}, 0.8)
    });

  },

  "all": function() {

    const canvas = document.getElementById("scene");
    const context = canvas.getContext("2d");

    canvas.width = 1158;
    canvas.height = 770;

    const frameCount = 216;


    const images = []
    const image_frames = { frame: 0 };

    const currentFrame = index => ( `./img/media/frame_${ index.toString() }.png` );


    for (let i = 0; i < frameCount; i++) {

      const img = new Image();
      img.src = currentFrame(i);
      img.onerror = () => console.log('Failed to load image');
      images.push(img);

    }



    images[0].onload = render;

    function render() {

      context.clearRect(0, 0, canvas.width, canvas.height);

      const image = images[image_frames.frame];
      const x = (canvas.width - image.width * 0.8) / 2;
      const y = (canvas.height - image.height * 0.8) / 2;
      const scaledWidth = image.width * 0.8;
      const scaledHeight = image.height * 0.8;

      context.drawImage(image, x, y, scaledWidth, scaledHeight);

    }


    gsap.to(image_frames, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      duration: 2,
      scrollTrigger: { scrub: 0.5 },
      onUpdate: render
    });


    gsap.timeline({ scrollTrigger: { scrub: true } })
      .from("#scene", { scale: 1.3, duration: 1 }, 0)
      .to("#scene", { scale: 1, duration: 0.25 }, 0.75)


    gsap.to("#scroll_trigger", {
      scrollTrigger: {
        trigger: "#scene",
        markers: false,
        scrub: true,
        start: "top 100px",
      },
      opacity: 0
    });


  }

});
