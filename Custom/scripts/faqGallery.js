function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


var faqGalleryData = new Array();
var faqGalleryImages;
var faqGalleryFilters;
var faqGallerySort;
var faqGalleryLiveData = new Array();

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
    $('.faq-gallery').each(function(galleryIndex, gallery) {
        
        // create an array from the gallery data
        $(gallery).find('ul.gallery-data li').each(function(itemIndex, item) {
            faqGalleryData.push({
                'filter'            : $(item).attr('data-filter'),
                'question'            : $(item).attr('data-question'),
                'answer'            : $(item).attr('data-answer')
            });
        });
        
        if(getParameterByName('filters') != '')
        {
            $.cookie('faqGalleryFilters', getParameterByName('filters'));

            if(getParameterByName('sort') != '')
            {
                $.cookie('faqGallerySort', getParameterByName('sort'));
            }

            if (history.pushState) {
                var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                window.history.pushState({path:newurl},'',newurl);
            }
        }
        
        // get filters from cookie
        if($.cookie('faqGalleryFilters') != undefined)
        {
            faqGalleryFilters = $.cookie('faqGalleryFilters');

            // set the filter selected items
            $('.faq-gallery .filter-child').each(function(i, e) {
                if(faqGalleryFilters.indexOf($(e).attr('data-filter')) == -1)
                {
                    $(e).removeClass('selected');
                }
                else
                {
                    $(e).addClass('selected');
                }
            });

            $('.faq-gallery .filter-section').each(function(i, e) {

                if($(e).find('.filter-child.selected').length == 0)
                {
                    $(e).find('.filter-parent').removeClass('all half').addClass('none');
                } 
                else if($(e).find('.filter-child').not('.selected').length == 0)
                {
                    $(e).find('.filter-parent').removeClass('none half').addClass('all');
                }
                else
                {
                    $(e).find('.filter-parent').removeClass('all none').addClass('half');
                }
            });
        }

        if($.cookie('faqGallerySort') != undefined)
        {
            $('.sort .sort-option').removeClass('selected');
            $('.sort .sort-option a[data-sort="' + $.cookie('faqGallerySort') + '"]').parent().addClass('selected');
        }
        else
        {
            // set default to name
            $.cookie('faqGallerySort', 'name');
        }

        updateFaqGallyByFilter();

    });

    $('.sort-option a').click(function(e) {
        e.preventDefault();
        sortFaqGallery($(this).attr('data-sort'));
    });

    $('.faq-gallery .filter-parent a.label').click(function(e) {
        e.preventDefault();
        //$(this).parents('.filter-section').toggleClass('selected').siblings('.filter-section').removeClass('selected');
        $(this).parents('.filter-section').toggleClass('selected').siblings('.filter-section').removeClass('selected');
        $(this).parents('.filter-section').siblings().find('.filter-children').slideUp(400);
        $(this).parent().siblings().slideToggle(400);
        setTimeout(minHeight, 400);
    });

    function minHeight()
    {
        $('.filter-gallery').each(function(i, e) {
            $(e).css('min-height', $(e).find('.filters').height());
        });
    }

    $('.faq-gallery .filter-parent a.dot-overlay').click(function(e) {
        e.preventDefault();
        if($(this).parents('.filter-parent').hasClass('all'))
        {
            $(this).parents('.filter-parent').removeClass('all').addClass('none');
            $(this).parents('.filter-section').find('.filter-child').removeClass('selected');

        }
        else
        {
            $(this).parents('.filter-parent').addClass('all').removeClass('none half');
            $(this).parents('.filter-section').find('.filter-child').addClass('selected');
        }

        updateFaqGallyByFilter();
    });

    $('.faq-gallery .filter-child a').click(function(e) {
        e.preventDefault();
        $(this).parents('.filter-child').toggleClass('selected');

        // check parent
        if($(this).parents('.filter-children').find('.filter-child.selected').length == 0)
        {
            $(this).parents('.filter-section').find('.filter-parent').removeClass('all half').addClass('none');
        } 
        else if($(this).parents('.filter-children').find('.filter-child').not('.selected').length == 0)
        {
            $(this).parents('.filter-section').find('.filter-parent').removeClass('none half').addClass('all');
        }
        else
        {
            $(this).parents('.filter-section').find('.filter-parent').removeClass('all none').addClass('half');
        }

        updateFaqGallyByFilter();
    });

    handleGalleryResize();
});

function sortFaqGallery(sortBy)
{
    $.cookie('faqGallerySort', sortBy);
    updateFaqGallyByFilter();
}

function updateFaqGallyByFilter()
{
    var f = '';
    $('.faq-gallery .filter-section .filter-child').each(function(i, e) {
        if($(e).hasClass('selected'))
        {
            f += '|' + $(e).attr('data-filter') + '|';
        }
    });

    $.cookie('faqGalleryFilters', f);

    // if nothing, assume all?
    if(f.length == 0)
    {
        $('.faq-gallery .filter-section .filter-child').each(function(i, e) {
            f += '|' + $(e).attr('data-filter') + '|';
            //$(e).addClass('selected');
        });
    }

    faqGalleryLiveData = _.filter(faqGalleryData, function(item){
        var match = false;
        var fa = item.filter.split('|');
        
        for (var i = 0; i < fa.length; i++) {
            if(f.indexOf(fa[i]) != -1)
            {
                match = true;
            }
        };
        return match;        
    });

    // handle sorting from cookie in there
    var iteratee = '';
    var reverse = false;

    if($.cookie('faqGallerySort').substr(0,1) == '-')
    {
        reverse = true;
        iteratee = $.cookie('faqGallerySort').substr(1);
    }
    else
    {
        iteratee = $.cookie('faqGallerySort');
    }

    var dataSorted = _.sortBy(faqGalleryLiveData, iteratee);

    if(reverse)
    {
        dataSorted.reverse();
    }

    faqGalleryLiveData = dataSorted;

    createFaqGallery(faqGalleryLiveData, $('.faq-gallery .item-container'));

    handleGalleryResize();
}

function handleGalleryScroll()
{
    
}


function handleGalleryResize()
{
    var h = 0;
    $('.gallery .item .container').css('height', 'auto');
    $('.gallery .item .container').each(function(index, el) {
        if($(el).height() > h)
        {
            h = $(el).height();
        }
    });

    $('.gallery .item .container').height(h);
}


function createFaqGallery(data, container)
{
    // clear the loading array
    faqGalleryImages = new Array(data.length);

    // clear the container
    $(container).html('');

    // for each item in the array
    for (var i = 0; i < data.length; i++) {
        html = getFaqGalleryHTML(data[i].question, data[i].answer, i);
        addGalleryItem(container, html, i);
    };
}

function getFaqGalleryHTML(question, answer, index)
{
    var faqItemHTML = '<div class="faq-item" data-index="' + index + '">';
    faqItemHTML += '<div class="question"><div class="blip"></div><div class="icon icon-plus"></div><div class="icon icon-minus"></div>' + question + '</div>';
    faqItemHTML += '<div class="answer">';
    faqItemHTML += '<div class="inner">';
    faqItemHTML += answer;
    faqItemHTML += '</div>';
    faqItemHTML += '</div>';
    faqItemHTML += '</div>';            
                                
    return faqItemHTML;
}

function addGalleryItem(container, html, index)
{
    // add the item to the container
    $(container).append(html);
}


