$(document).ready(function () {

    var a = $('#theTeamTiles > a');

    var betweenRange = $();
    var outRange = $();

    for (i = 0; i < a.length; i++) {
        var element = $(a[i]).data('name');
        var letter = element.substring(0, 1);

        if (letter == 'J') {
            betweenRange = (a[i]);
        }
        else {
            outRange[i] = (a[i]);
        }

    }
    $('#theTeamTiles').append($(betweenRange));

    Shuffle._getItemTransformString(opts.point, opts.scale);
});