
/*///////////////////////Spinner loader////////////////////////*/

class SpinningDots extends HTMLElement {
  //create svg with dot

  constructor() {
    super();
    const width =
      parseInt(window.getComputedStyle(this).width.replace("px", "")) || 28;
    const circleRadius = (2 / 28) * width;
    const circles = parseInt(this.getAttribute("dots"), 10) || 8; //nombre de cercle
    //shadow dom isolé chaque chose + mode ouvert (inspecté en css et javascript)
    const root = this.attachShadow({ mode: "open" });
    //j'appel ma méthode
    root.innerHTML = `<div>
${this.buildStyle(width, circleRadius * 2, circles)}
${this.buildTrail(width / 2 - circleRadius, circleRadius * 2)}
${this.buildCircles(width, circles, circleRadius)} 
</div>
`;
  }
  /**
   *trainée de point dashoff 7
   * @param {number} r rayon du cercle
   * @param {number} stroke epaisseur du trait
   */

  buildTrail(r, stroke) {
    const w = r * 2 + stroke;
    let dom = `
  <svg class="trail" width ="${w}" height="${w}" viewBox="0 0 ${w} ${w}" fill="none">`;
    // permettre d'itérer 8 fois notre point
    dom += `<circle 
  cx="${w / 2}" 
  cy="${w / 2}" 
  r="${r}" 
  stroke= "currentColor"
  stroke-width= "${stroke}"
  stroke-linecap="round" 
  />`;
    return dom + "</svg>";
  }

  /**
   * method construction de notre svg avec no différents cercles ( taille, le nombre, et le radius)
   * @param {number} w largeur svg
   * @param {number} n nombre de cercle
   * @param {number} r rayon de chaque cercle
   */
  buildCircles(w, n, r) {
    //chaine de caractère représentant notre dom
    // class "circle" css pour faire tourner les ronds
    let dom = `
  <svg class="circle" width ="${w}" height="${w}" viewBox="0 0 ${w} ${w}">`;
    // permettre d'itérer 8 fois notre point
    const radius = w / 2 - r;
    for (let i = 0; i < n; i++) {
      const a = (i * (Math.PI * 2)) / n;
      const x = radius * Math.sin(a) + w / 2;
      const y = radius * Math.cos(a) + w / 2;
      dom += `<circle cx="${x}" cy="${y}" r="${r}" 
  fill= "currentColor" />"`;
    }
    return dom + "</svg>";
  }

  /**
   * constuit le style de notre loader
   * ne bave pas sur le css de notre page d'acceuil
   * porté limité de notre élémént
   * @param {number} w largeur de l'élément
   * @param {number}stroke largeur du trait
   * @param {number}n nombre de section
   * @return {string}
   */
  //preciser que notre div est en position absolute pour que les cercles se chevauchent
  buildStyle(w, stroke, n) {
    const perimeter = Math.PI * (w - stroke);
    return `
  <style>
  :host {
    display : inline-block;
  }
  div {
    width: $(w)px;
    height: $(w)px;
    position : relative;
    
    }
    svg {
      position : absolute;
      top : 0;
      left : 0;
    }
    .circle {
      animation: spin 16s linear infinite;

    }
    @keyframes spin {
      from {transform: rotate(0deg)}
      to {transform: rotate(360deg)}
    }
    .trail {
      stroke-dasharray : ${perimeter};
      stroke-dashoffset : ${perimeter + perimeter / n};
      animation : spin2 1.6s cubic-bezier(.5, .15, .5, .85) infinite;
      
    }
    .trail circle {
      animation : trail 1.6s cubic-bezier(.5, .15, .5, .85) infinite;
    }
    @keyframes spin2 {
      from {transform: rotate(0deg)}
      to {transform: rotate(360deg)}
      
    }

    @keyframes trail {
      0% {
        stroke-dashoffset : ${perimeter + perimeter / n};
      }
      50% {
        stroke-dashoffset : ${perimeter + (2.5 * perimeter) / n};
      }
      100% {
        stroke-dashoffset : ${perimeter + perimeter / n};
      }
       
    }
  </style>
  `;
  }
}
try {
  customElements.define("spinning-dots", SpinningDots);
} catch (e) {
  if (e instanceof DOMException) {
    console.error("DOMEXCEPTION : " + e.message);
  } else {
    throw e;
  }
}

//loader element 
const accueil = document.querySelector(".accueil");
window.addEventListener('load', () => {
  accueil.classList.add('fondu-out');
});

/*///////////////////////navbar/////////////////////////////*/
/*create hamburger */

const hamburger = document.querySelector(".hamburger");
hamburger.onclick = function() {
    const navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
}


/*////////////////////////////////DARK MODE//////////////////////////////*/

/* dark mode ////
const toggleLight = document.querySelector('.switch__light');
toggleLight.addEventListener('click', () => {
    //wrapper.classList.toggle('dark');
    body.classList.toggle('dark');
    clearBulb.classList.toggle('dark-bulb');
    toggleLight.classList.toggle('yellow-border');
    //presentationArea.classList.toggle('dark-pres');
    //projectDiv.classList.toggle('dark-pres');
    //occupationArea.classList.toggle('dark-pres');
  });*/
