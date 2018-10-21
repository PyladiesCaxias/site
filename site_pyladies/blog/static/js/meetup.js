/* Note: Updated to reflect JS Module pattern for encapsulation (v2)
 * To call: PyladiesMeetupWidget.addUpcomingMeetups(chapterIds)
 * Requests location meetups from Meetup.com coming up in the next month
 * and uses data to construct html entries for each event that are appended
 * to an '#upcomingMeetupsList' div in page's html.
 * Can be given any number of chapterIds.
 */

var PyladiesMeetupWidget = (function() {
  var key = '772b514b2dbe5e5d335895f47072';

  // Private methods //

  _createEventUrls = function(url) {
    // creates <a href> links from urls for event clickthroughs
    return url
      .replace(/(ftp|http|https|file):\/\/[\S]+(\b|$)/gim, '"$&" target="_blank"')
      .replace(/([^\/])(www[\S]+(\b|$))/gim, '"http://$2" target="_blank"');
  };

  _createGroupUrl = function(group) {
    return 'http://meetup.com/' + group.urlname;
  };

  _convertMilisecondsToDate = function(ms) {
    // converts miliseconds since epoch to date format
    var date = new Date(ms);
    return String(date).slice(0, 11);
  };

  _makeAjaxRequest = function(ids) {
    // fetch data
    $.ajax({
      url: 'https://api.meetup.com/'+ids+'/events?&sign=true&photo-host=secure&page=20&status=upcoming',
      dataType: 'jsonp',
      success: function(data) {
        _buildHtml(data);
      },
      error: function(data) {
        _handleError(data);
      }
    });
  };

  _getJSON = function(response) {
    // {_buildHtml helper}
    // note: Not every meetup group event request returns a photo--not sure why, but
    // noticed that neither Taiwan or Bangalore's logos returned, so perhaps there
    // is some difference in data offered in parts of Asia?

     try {
        var local_var = response.venue.name + ' - '+ response.how_to_find_us;
      }
      catch(err) {
         var local_var = '';
      }
    var json = {
      local: local_var,
      link: response.link,
      description: response.description,
      eventName: response.name,
      eventDate: response.local_date,
      eventTime: response.local_time,

    };

    return json;
  };

  _buildHtml = function(data) {
    var html;
    var datum;
    var json;

    // remove any old meetup list still attached to dom and append new $ul
    $('#upcomingMeetupsList div').remove();
    console.log(data.data);
    for (var i = 0; i < data.data.length; i++) {
      datum = data.data[i];
      json = _getJSON(datum);

      html = '<div class="col-md-6 col-sm-12 col-xs-12"><div class="card"><div class="card-header">';
      html += '<h5><a href="'+json.link+'">'+ json.eventName +'</a></h5></div>';
      html += '<div class="card-body"><p><b>Data:</b>'+json.eventDate +'</p><p><b>Hora:</b>' + json.eventTime + '</p>';
      html += '<p><b>Local:</b>'+ json.local+ '</p><p>'+json.description+'</p>';
      html += '<p><a class="btn btn-secondary btn-sm btn-pydefault" href="'+ json.link +'" role="button">Saiba mais e Inscreva-se »</a></p></div></div></div>';

      $('#upcomingMeetupsList').append(html);
    }
  }

  _handleError = function(data) {
    // remove any stale list attached to dom and print error message
    $('#upcomingMeetupsList ').remove();
    $('#upcomingMeetupsList')
      .append('<div>Sorry, we are unable to reach Meetup.com at this time</div>');
  };

  return {
    // returns public method
    addUpcomingMeetups: function(chapterIds) {
      _makeAjaxRequest(chapterIds);
    }
  };
})();
