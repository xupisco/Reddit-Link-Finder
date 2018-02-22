var popup_tpl = "<div id='rlinks_popup' class='thing'><span class='rlinks_title'>Thread links:</span><ul id='rlinks_holder'></ul></div>";

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		var links = $('.comment .usertext-body .md a');
		
		if(links.length) {
			$('.commentarea').find('.menuarea').next().append(popup_tpl);
			var ar_links = []

			$(links).each(function() {
				var link_id = $(this).parent().parent().parent().prev().val();
				var comment_author = $(this).parent().parent().parent().parent().parent().find('.author').html() || '---';
				var comment_score = $(this).parent().parent().parent().parent().parent().find('.score.unvoted').html() || '0 points';

				ar_links.push([parseInt(comment_score.replace(' points', '')), link_id, comment_author, comment_score, $(this).attr('href'), $(this).html(), $(this).parent().parent().text()]);
			})


			ar_links.sort(function(a, b){
				return b[0] - a[0]
			})

			$('#rlinks_holder').append("<table class='rlinks_table'></table>");
			$.each(ar_links, function(i, v) {
				$('.rlinks_table').append("<tr><td><a href='#thing_" + v[1] + "' class='rlinks_author'>#</a> <a href='" + v[4] + "' title='" + v[6] + "'>" + v[5] + "</a></td><td><span class='rlinks_score'>" + v[3] + "</span></td><td><a href='#thing_" + v[1] + "' class='rlinks_author'>" + v[2] + "</a></td></tr>")
				//$('#rlinks_holder').append("<li class='rlinks_content'><a href='" + v[4] + "'>" + v[5] + "</a> <span class='rlinks_score'>[" + v[3] + "]</span> <a href='#thing_" + v[1] + "' class='rlinks_author'>#" + v[2] + "</a> </li>")
			})

		}

	}
	}, 10);
});