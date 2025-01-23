$('.reviews__slider').slick({
	dots: true,
	infinite: false,
	prevArrow: `
			<button type="button" class="slick-prev">
					<svg class="slick-icon icon" width="11" height="19">
							<use xlink:href="../images/sprite.svg#icon-left"></use>
					</svg>
			</button>`,
	nextArrow: `
			<button type="button" class="slick-next">
					<svg class="slick-icon icon" width="11" height="19">
							<use xlink:href="../images/sprite.svg#icon-left"></use>
					</svg>
			</button>`,
	customPaging: function (slider, i) {
		return '<button type="button"></button>'
	},
})

$(document).ready(function () {
	let slickInitialized = false

	function initSlickSlider() {
		const screenWidth = $(window).width()

		if (screenWidth <= 768) {
			if (!slickInitialized) {
				$('.restaurant__list').slick({
					dots: true,
					arrows: false,
					infinite: true,
					centerMode: true,
					centerPadding: '15',
					slidesToShow: 1,
				})
				slickInitialized = true
			}
		} else {
			if (slickInitialized) {
				$('.restaurant__list').slick('unslick')
				slickInitialized = false
			}
		}
	}

	initSlickSlider()
	$(window).resize(initSlickSlider)
})

$('.menu-list__link').on('click', function (e) {
	$('.menu-list__link').removeClass('menu-list__link--active')
	$(this).addClass('menu-list__link--active')
})

var mixer = mixitup('.popular-categories__list')
