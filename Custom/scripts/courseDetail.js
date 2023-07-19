var teamGalleryImages;

$(window).resize(function(e) {
    handleGalleryResize();
});

$(window).load(function(e) {
    handleGalleryResize();
});

$(window).scroll(function(e) {
    handleGalleryScroll();
});




$(document).ready(function() {

    teamGalleryImages = new Array($('.meet-the-team .item').length);

    $('.meet-the-team .item').each(function(i, e) {
        $(e).attr('data-index', i);
    });

    $('.meet-the-team').find('.item').click(function(e) {
        $(this).toggleClass('selected').siblings().removeClass('selected');
        if($(this).hasClass('selected'))
        {
            $(this).find('.description').slideDown(400);
        }
        else
        {
            $(this).find('.description').slideUp(0);
        }
        $(this).siblings().find('.description').slideUp(0);
    });


    handleGalleryResize();
});

function checkTeamGalleryImages()
{
    // load all images that are on screen
    $('.meet-the-team .item.lazy').each(function(i, e) {
        if($(e).offset().top < $(document).scrollTop() + $(window).height())
        {
            teamGalleryImages[parseInt($(e).attr('data-index'))] = new Image();
            teamGalleryImages[parseInt($(e).attr('data-index'))].onload = function(){
                $(e).find('.image').css('background-image', 'url(' + $(e).find('.image').attr('data-image') + ')').parents('.item').removeClass('loading');  
            }
            $(e).removeClass('lazy');
            teamGalleryImages[parseInt($(e).attr('data-index'))].src = $(e).find('.image').attr('data-image');
        }
    });

    // set the width and offset of the description
    $('.meet-the-team .item').each(function(i, e) {
        $(e).find('.description').css({'left': Math.floor($(e).parents('.item-container').offset().left) - Math.floor($(e).offset().left), 'width': $(e).parents('.item-container').width()})
    });
    
}

function handleGalleryScroll()
{
    checkTeamGalleryImages();
}

function handleGalleryResize()
{
    handleGalleryScroll();
}

function animateInGalleryItem(item)
{
    $(item).removeClass('adding');
}