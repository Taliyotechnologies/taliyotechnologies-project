// minimize and maximize buttons



function enterFullScreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}



// for moving elements


const elements = gsap.utils.toArray('.float-item');

  elements.forEach(item => {
    floating(item);

    item.addEventListener('mouseenter', (e) => bounceAway(e, item));
    item.addEventListener('click', (e) => bounceAway(e, item));
  });

  function floating(item) {
    gsap.to(item, {
      x: () => Math.random() * 100 - 50,
      y: () => Math.random() * 100 - 50,
      rotation: () => Math.random() * 60 - 30,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  function bounceAway(event, item) {
    const rect = item.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Get mouse position
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Calculate direction
    const angle = Math.atan2(centerY - mouseY, centerX - mouseX);

    // Calculate new x and y based on angle
    const distance = 150; // bounce distance
    const newX = Math.cos(angle) * distance;
    const newY = Math.sin(angle) * distance;

    // Animate bounce
    gsap.to(item, {
      x: `+=${newX}`,
      y: `+=${newY}`,
      rotation: () => Math.random() * 360 - 180,
      duration: 0.8,
      ease: "power2.out"
    });
  }



  //  This code animates the letters of headings when they come into view on scroll

  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
  
    const headings = document.querySelectorAll(".main-heading, .project-heading, .client-heading");
  
    headings.forEach(heading => {
      const childNodes = Array.from(heading.childNodes);
      heading.innerHTML = "";
  
      childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent.split("").forEach(char => {
            const span = document.createElement("span");
            span.className = "letter-span";
            span.textContent = char === " " ? "\u00A0" : char;
            heading.appendChild(span);
          });
        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "SPAN") {
          node.textContent.split("").forEach(char => {
            const span = document.createElement("span");
            span.className = "letter-span green";
            span.textContent = char === " " ? "\u00A0" : char;
            heading.appendChild(span);
          });
        }
      });
  
      const spans = heading.querySelectorAll(".letter-span");
  
      // Set initial state
      gsap.set(spans, { opacity: 0, y: 30 });
  
      // Animate with scrollTrigger that reverses
      gsap.to(spans, {
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse", // ✅ plays on scroll down & up
          markers: false,
        },
        opacity: 1,
        y: 0,
        stagger: {
          each: 0.01,
          from: "start"
        },
        ease: "power2.out",
        duration: 0.2,
      });
    });
  });

  // time

function updateIndiaTime() {
  const indiaTime = new Date().toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  const timeSpan = document.getElementById("india-time");
  if (timeSpan) {
    timeSpan.textContent = indiaTime;
  }
}

setInterval(updateIndiaTime, 1000);
updateIndiaTime();


// search

const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const panel = document.getElementById("slidePanel");
const nav = document.querySelector(".slide-navigation");

openBtn.addEventListener("click", () => {
  panel.classList.add("open");
  if (nav) nav.style.zIndex = "1200";
});

closeBtn.addEventListener("click", () => {
  panel.classList.remove("open");
  if (nav) nav.style.zIndex = "1000";
});
