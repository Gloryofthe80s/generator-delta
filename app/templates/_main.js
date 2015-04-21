$(document).ready(function () {

	// Vertical drawers for pricing component
	if( $('.membership-pricing-accordion') ) {

		$('.see-more').on('click', function() {
			$(this).siblings('.reveal').toggleClass('active');
		});

		$('.see-less').on('click', function() {
			$(this).parents('.reveal').toggleClass('active');
		});
	}

});