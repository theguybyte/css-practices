const imagenes = document.querySelectorAll('.propiedad__imagen');

window.addEventListener('scroll', () => {

    imagenes.forEach( (imagen) => {
        const scroll = this.scrollY / -20;
        imagen.style.backgroundPositionY = `${scroll}px`;
    } )

})