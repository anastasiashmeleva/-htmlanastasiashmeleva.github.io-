let questions = document.querySelectorAll('.question');
questions.forEach(function(item) {
	item.addEventListener('click', function() {
		this.classList.toggle('mirror');
	});  
});

/*
let imgs = document.querySelectorAll('.img');
imgs.forEach(function(item) {
	item.addEventListener('click', function() {
		this.classList.toggle('mirror');
	});  
});
*/

let imgs = document.querySelectorAll('.img');
imgs.forEach( function( item ) {
	let img = item.querySelector('img'); img.classList.toggle('hide');
	
	img.onload = function( ){
		let orig = document.createElement('div');  orig.className = "orig";
		let wrap_o = document.createElement('div'); wrap_o.className = "wrap";
		let orig_img = document.createElement('img');  orig_img.src = img.src;
		wrap_o.append(orig_img); orig.append(wrap_o); item.append(orig);
		
		let clone = document.createElement('div'); clone.className = "clone";
		let wrap_c = document.createElement('div'); wrap_c.className = "wrap";
		let clone_img = document.createElement('img'); clone_img.src = img.src;
		wrap_c.append(clone_img); clone.append(wrap_c); item.append(clone);

		setTimeout(function(){
			item.style._padding = ( item.querySelector('.wrap').clientHeight / 2 / 2 ) + "px";
		},100);
	}
	
	
	//innerHTML
//						<div class="orig"><img title="BLAH BLAH BLAH" alt="BLAH BLAH BLAH" border="0" src="assets/cover.jpg" /></div>
//					<div class="clone"><img title="BLAH BLAH BLAH" alt="BLAH BLAH BLAH" border="0" src="assets/cover.jpg" /></div>

	item.addEventListener('click', function() {
		this.classList.toggle('mirror');
		if ( this.classList.contains("mirror") ){
			this.querySelector(".orig").style.paddingTop = this.style._padding;
			this.querySelector(".orig").style.paddingBottom = this.style._padding;
			this.querySelector(".clone").style.paddingTop = this.style._padding;
			this.querySelector(".clone").style.paddingBottom = this.style._padding;
		} else {
			this.querySelector(".orig").style.paddingTop = 0;
			this.querySelector(".orig").style.paddingBottom = 0;
			this.querySelector(".clone").style.paddingTop = 0;
			this.querySelector(".clone").style.paddingBottom = 0;
		}
	});  
});
