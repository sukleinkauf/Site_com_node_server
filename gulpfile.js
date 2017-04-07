var gulp = require('gulp'), //requerindo ao móduo gulp
	imagemin = require('gulp-imagemin'), //minimizando imagens
    // minifycss = require('gulp-minify-css'),
    // refresh   = require('gulp-livereload'), //regarregar a página sem f5
    // server    = require('tiny-lr'),
	path = require ('path'),
	less = require('gulp-less'), //les para css
	open = require('gulp-open'),//abrir pagina quando iniciar server
	watch = require('gulp-watch'), //para assistir mudanças
	nodemon = require('gulp-nodemon');


// gulp.watch( 'src/less/*.less', ['less'] );
// gulp.task('watch', function() {
// 	gulp.watch('less/*.less', [
// 		'less'
// 	]);
// });


gulp.task('open', function(){ //função que abre janela ao iniciar servidor
	var options = {
		uri: 'http://localhost:5000/',
		app: 'chrome'
	};
	gulp.src('views/layout.pug')
	.pipe(open(options));
});

// gulp.task('build-img',function(){

// 	gulp.src('public/images/**/*')//fluxo de origem //os asterisco indicam os arquivos
// 		.pipe(imagemin()) //função pipe permite ligar funções entre elas
// 		.pipe(gulp.dest('public/images'));//destino das ações 
	
// });

gulp.task('less', function () {//transpilação de less para css
	return gulp.src('less/*.less')//origem
	.pipe(less())//transpilação
	.pipe(gulp.dest('public/stylesheets'));//destino
	console.log("less")
});

gulp.task('bootstrap',function(){ //copiando da pasta de origim e colando no destino

	gulp.src('bower_components/bootstrap/dist/css/bootstrap.min.css')//origem
		.pipe(gulp.dest('public/stylesheets'));//destino

	gulp.src('bower_components/bootstrap/dist/js/bootstrap.min.js')
		.pipe(gulp.dest('public/javascripts'));

	gulp.src('bower_components/bootstrap/dist/fonts/**/*')
		.pipe(gulp.dest('public/fonts'));
	console.log("bootstrap");
});

gulp.task('materialize',function(){ //copiando da pasta de origim e colando no destino

	gulp.src('bower_components/materialize/dist/css/materialize.min.css')//origem
		.pipe(gulp.dest('public/stylesheets'));//destino
	gulp.src('bower_components/materialize/dist/js/materialize.min.js')
		.pipe(gulp.dest('public/javascripts'));
	gulp.src('bower_components/materialize/dist/fonts/**/*')
		.pipe(gulp.dest('public/fonts'));
	console.log("materialize")
});
gulp.task('jquery',function(){ //copiando da pasta de origim e colando no destino
	gulp.src('bower_components/jquery/dist/jquery.min.js')//origem
		.pipe(gulp.dest('public/javascripts'));//destino
	console.log("jquery")
});
gulp.task('fontawesome',function(){ //copiando da pasta de origim e colando no destino

	gulp.src('bower_components/font-awesome/css/font-awesome.min.css')//origem
		.pipe(gulp.dest('public/stylesheets'));//destino

	gulp.src('bower_components/font-awesome/fonts/**/*')
		.pipe(gulp.dest('public/fonts'));
	console.log("font-awesome");
});

gulp.task('nodemon', function () {//função nodemon que reenicia o servidor quando erros ou mudanças
	nodemon({
		script: './bin/www',
		ext: 'js html'
	})
})

gulp.task('default', ['nodemon','less','open'], function(){
	gulp.watch("./less/**/*.less", ['less']);
});

path.join(__dirname)//para saber onde eu estou