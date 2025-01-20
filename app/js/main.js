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
	let slickInitialized = false // Флаг для проверки инициализации слайдера

	function initSlickSlider() {
		const screenWidth = $(window).width() // Определяем ширину экрана

		if (screenWidth <= 768) {
			// Слайдер включается только на экранах <= 768px
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
				// Если слайдер был инициализирован, удаляем его
				$('.restaurant__list').slick('unslick')
				slickInitialized = false // Сбрасываем флаг
			}
		}
	}

	// Вызываем функцию при загрузке страницы и изменении размера экрана
	initSlickSlider()
	$(window).resize(initSlickSlider)
})

var mixer = mixitup('.popular-categories__list')
