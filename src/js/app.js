document.addEventListener('DOMContentLoaded',function (){
    iniciarApp();
});

function iniciarApp() {
    crearGaleria();
    scrollNav();
    navegacionFija();

};


function navegacionFija() {
    const barra=document.querySelector('.header');//Elemento a mantener fijo en la pàgina
    const sobreFestival=document.querySelector('.sobre-festival');//Elemento de refencia para ejecutar una acción, en funcion del nivel de scroll aplicado sobre este.
    const body=document.querySelector('body');

    window.addEventListener('scroll',function(){

        if(sobreFestival.getBoundingClientRect().top<0){
            barra.classList.add('header-fijo');
            body.classList.add('body-scroll');
        }else{
            barra.classList.remove('header-fijo');
            body.classList.remove('body-scroll');
        }
    })
}

//Función que añade efecto de scroll automatizado y lento hacìa los id definidos en la pàgina
function scrollNav() {
    const enlaces=document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach(element=>{
        element.addEventListener('click',function(e){
            e.preventDefault();

            const seccionScroll=e.target.attributes.href.value;//Obtener el id que referencia a la sección a la que se aplicarà el Scroll
            const seccion=document.querySelector(seccionScroll);
            seccion.scrollIntoView({ //Automatizaciòn del scroll
                behavior:'smooth'
            });
        })
    })
    
}

function crearGaleria() {
   const galeria= document.querySelector('.galeria-imagenes');
 

   for(let i=1;i<=12;i++){
        const imagen=document.createElement('picture');
      
        imagen.innerHTML=`
            <source loading="lazy" srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">

            <img loading="lazy" src="build/img/thumb/${i}.jpg" alt="imagen galería">

        `;

        imagen.onclick=function () {
           mostrarImagen(i);
            
        }

        galeria.appendChild(imagen);

   }
}

function mostrarImagen(id){
    const imagen=document.createElement('picture');
    imagen.innerHTML=`
        <source loading="lazy" srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">

        <img loading="lazy" src="build/img/grande/${id}.jpg" alt="imagen galería">

    `;

    const overlay=document.createElement('div');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick=function(){
        overlay.remove();
        const body=document.querySelector('body');
        body.classList.remove('fijar-body');
    }

    const boton=document.createElement('p');
    boton.textContent='X';
    boton.classList.add('btn-cerrar');
    boton.onclick=function() {
        overlay.remove();
        const body=document.querySelector('body');
        body.classList.remove('fijar-body');

    }

    overlay.appendChild(boton);


    const body=document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');

}

