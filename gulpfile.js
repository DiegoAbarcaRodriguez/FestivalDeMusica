// Se solicitan los elementos o funciones de interès de las dependencias instaladas en el package.json
const {src,dest,watch}=require("gulp");

//css
const    sass   =require("gulp-sass")(require("sass"));
const    plumber=require("gulp-plumber");
const autoprefixer=require("autoprefixer");
const cssnano=require("cssnano");
const postcss=require("gulp-postcss");
const sourcemaps=require("gulp-sourcemaps");

//imagènes
const avif=require("gulp-avif");
const cache=require("gulp-cache");
const webp=require("gulp-webp");
const imagemin=require("gulp-imagemin");

//javaScript
const terser=require("gulp-terser-js");



function CSS(done){

    //1. Identificar ruta del archivo scss.
    //2. Compilarlo mediante la dependencia Sass del package.json
    //3. Almacenarla en el file system de nuestro aplicativo

    //Los pipes ejecutan los 3 pasos de forma subsiguiente sobre el archivo identificado en el paso 1.
    src("src/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(),cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/css"));


    done();// Callback que avisa a Gulp cuando llegamos al final de la funciòn.

}

function javaScript(done) {
    src("src/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/js"))
        

    done();
}

function imagenes(done) {

    const opciones={
        optimizationLevel:3
    }
    src("img/**/*.{jpg,png}")
        .pipe(cache(imagemin(opciones)))
        .pipe(dest("build/img"))
    

    done();
}

function versionWebp(done){

    const opciones={
        quality:50
    };

    src("img/**/*.{jpg,png}")
        .pipe(webp(opciones))
        .pipe(dest("build/img"))


    done();
}

function versionAvif(done){

    const opciones={
        quality:50
    };

    src("img/**/*.{jpg,png}")
        .pipe(avif(opciones))
        .pipe(dest("build/img"))


    done();
}





function dev(done) {
    watch("src/scss/**/*.scss",CSS);
    watch("src/js/**/*.js",javaScript);
}

exports.CSS=CSS;
exports.js=javaScript;
exports.dev=dev;
exports.imagenes=imagenes;
exports.versionAvif=versionAvif;
exports.versionWebp=versionWebp