/// dark mode ////
const toggleLight = document.querySelector('.switch__light');
toggleLight.addEventListener('click', () => {
    //wrapper.classList.toggle('dark');
    body.classList.toggle('dark');
    clearBulb.classList.toggle('dark-bulb');
    toggleLight.classList.toggle('yellow-border');
    //presentationArea.classList.toggle('dark-pres');
    //projectDiv.classList.toggle('dark-pres');
    //occupationArea.classList.toggle('dark-pres');
  });