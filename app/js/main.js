$('.reviews__slider').slick({
	dots: true,
	prevArrow:
		'<button type="button" class="slick-prev"><img class="slick-icon icon" src="../images/sprite.svg#icon-left" alt=""/></button>',
	nextArrow:
		'<button type="button" class="slick-next"><img class="slick-icon icon" src="../images/sprite.svg#icon-left" alt=""/></button>',
	customPaging: function (slider, i) {
		return '<button type="button"></button>'  
	},
})

var mixer = mixitup('.popular-categories__list')
