import * as flsFunctions from "./modules/functions.js";
import * as slick from "./modules/slick.js";


flsFunctions.isWebp();


"use strict";

//================== Mobile Menu ===========================
const burger = document.querySelector(".burger"),
      menuBody = document.querySelector(".menu-body"),
      body = document.querySelector("body")

if (burger) {
  burger.addEventListener("click", function (e) {
    bodyLock()
    burger.classList.toggle("active")
    menuBody.classList.toggle("active")
  })
}

function closeMenu() {
  burger.classList.remove("active")
  menuBody.classList.remove("active")
  bodyLockRemove()
}


function bodyLock() {
  if (body.classList.contains('lock')) {
    bodyLockRemove()
  } else {
    bodyLockAdd()
  }
}

function bodyLockRemove() {
  body.classList.remove("lock")
}

function bodyLockAdd() {
  body.classList.add("lock")
}
//================== Mobile Menu ===========================

// Smooth scroll to section
document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(link.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
      })
      closeMenu()
  })
})


// Nav active class
function activeSection() {
  const sections = ['home', 'about', 'testimonials', 'projects','contact']
  sections.forEach(section => {
    const scrollTop = window.scrollY + window.outerHeight / 2,
        sectionNode = document.getElementById(section),
        link = document.querySelector(`.${section}-link`),
        links = document.querySelectorAll(`.${section}-link`)
    if (sectionNode.nextElementSibling) {
      if (scrollTop > sectionNode.offsetTop && scrollTop < sectionNode.nextElementSibling.offsetTop) {
        if (!link.classList.contains('active')) {
          clearNavigation()
          links.forEach(item => item.classList.add('active'))
        }
      }
    } else {
      if (scrollTop > sectionNode.offsetTop) {
        if (!link.classList.contains('active')) {
          clearNavigation()
          links.forEach(item => item.classList.add('active'))
        }
      }
    }
  })
}

// Clear all active class
function clearNavigation() {
  const nav = document.querySelectorAll('.menu-list li')
  nav.forEach(item => item.classList.remove('active'))
}

// Change header style on scroll
function  progresScroll() {
  const scroll = document.body.scrollTop || document.documentElement.scrollTop,
        height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
        header = document.querySelector('.header'),
        headerPosition = (scroll / height) * 100

  if (header !== null && headerPosition > 1){
    header.style.transition = 'all 0.3s ease'
    header.style.background = 'rgba(255, 255, 255, 0.95)'
    header.style.boxShadow = '0px 0px 5px 0px #a3a3a3'
  } else {
    header.style.transition = 'all 0.3s ease'
    header.style.background = 'rgba(255, 255, 255, 255)'
    header.style.boxShadow = 'none'
  }
}

// Add animation on scroll
function animation() {
  const anims = document.querySelectorAll('.anim')
  anims.forEach(anim => {
    if(window.scrollY + (window.outerHeight) > anim.offsetTop){
      anim.classList.add('anim-active')
    }
  })
}

// animation on load
function animateBanner() {
  const top = document.querySelector('.banner')
  top.classList.add('banner-active')
}

window.onscroll = () => {
  setTimeout(()=>{
    activeSection()
    progresScroll()
  }, 500)
  animation()
}

window.onload = () => {
  windowLoad()
  animateBanner()
}

function windowLoad() {
  // init counter function
  function countersInit(countersItems) {
    let counters = countersItems ? countersItems : document.querySelectorAll("[data-num]")
    if (counters.length) {
      counters.forEach(counter => {
        countersAnimate(counter)
      })
    }
  }

  // anim function
  function countersAnimate(counter) {
    let start = null
    const duration = parseInt(counter.dataset.counter) ? parseInt(counter.dataset.counter) : 1000,
          startValue = parseInt(counter.innerHTML),
          startPosition = 0,
          step = (timestamp) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            counter.innerHTML = Math.floor(progress * (startPosition + startValue))
            if (progress < 1) {
              window.requestAnimationFrame(step)
            }
          };
    window.requestAnimationFrame(step)
  }
  // start counter animation when page load
  // countersInit();


  // start counter animation on scroll
  let options = {
    threshold: 0.3
  }
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetElement = entry.target
        const nums = targetElement.querySelectorAll("[data-num]")
        if (nums.length) {
          countersInit(nums)
        }
        // Turn off tracking after triggering
        observer.unobserve(targetElement)
      }
    });
  }, options)

  let numBlock = document.querySelector('.innumbers')
  if(numBlock !== null){
    observer.observe(numBlock)
  }
}