//https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
//25/05/2021

// We listen to the resize event
window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

