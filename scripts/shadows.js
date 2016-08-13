$(document).ready(function() {

  function loadPageFromHash() {
    var hash = getHashOfWindow();
    var page;

    if(hash !== '') {
      if(pageExists(hash)) {
        page = hash;
      }
    }
    if(page) { navigateTo(page); }
  }

  $('.link').click(function(){
    switchPage(this);
    return false;
  });

  loadPageFromHash();
});

function getHashOfWindow() {
  return window.location.hash.substr(1);
}

function nextPage() {
  var code = getHashOfWindow();

  if( getPageNumFromCode(code) || getPageNumFromCode(code) === 0 ) {
    navigateTo( "i-0" + getChapterNumFromCode(code) + "-" + (getPageNumFromCode(code) + 1 < 10 ? "0" : "") + (getPageNumFromCode(code) + 1) );
  }
  scrollToTop();
}

function nextChapter() {
  var code = getHashOfWindow();
  if( getPageNumFromCode(code) ) {
    navigateTo( "i-0" + (getChapterNumFromCode(code) + 1) + "-0" + chapters[getChapterNumFromCode(code) + 1].startPage );
  }
  scrollToTop();
}

function calculateNextButton() {
  var code = getHashOfWindow();

  if( findChapterByCode(code) ) {
    if( chapters[ getChapterNumFromCode(code) ].endPage >= (getPageNumFromCode(code)) + 1 ) {
      // not yet end of chapter -- next page still available
      $('.next-page').removeClass('hidden');
      $('.next-chapter').addClass('hidden');
    } else {
      if( chapters[ getChapterNumFromCode(code) + 1 ] ) {
        // end of chapter -- and there is another one afterwards
        $('.next-page').addClass('hidden');
        $('.next-chapter').removeClass('hidden');
      } else {
        // final page of final chapter -- hide all
        $('.next-page').addClass('hidden');
        $('.next-chapter').addClass('hidden');
      }
    }
  } else {
    // not a story page -- hide all
    $('.next-page').addClass('hidden');
    $('.next-chapter').addClass('hidden');
  }
}

function pageExists(pageName) {
  if(pageName) {
    for (var i = 0; i < pages.length; i++) {
      if(pageName === pages[i]) {
        return true;
      }
    }
    return findChapterByCode(pageName);
  } else {
    return false;
  }
}

function findChapterByCode(code) {
  // from a string like 'i-03-02'
  var chapterNum = getChapterNumFromCode(code);
  var pageNum = getPageNumFromCode(code);

  return ( chapters[chapterNum] && chapters[chapterNum].endPage >= pageNum );
}

function getChapterNumFromCode(code) {
  return parseInt( code.substr(2, 4) );
}

function getPageNumFromCode(code) {
  return parseInt( code.substr(code.length - 2, code.length) );
}

function switchPage(context) {
  var codeOfClicked = $(context).attr('href').substr(0, $(context).attr('href').length - 4);

  hash = getHashOfWindow();
  if(hash !== codeOfClicked) {
    navigateTo(codeOfClicked);
  }
  scrollToTop();
};

function navigateTo(codeClicked) {
  window.location.hash = codeClicked;
  $('#footer-bar').hide();
  $('#content').fadeOut('slow', function() {
    $('#page-switcher').load("pages/" + codeClicked + ".php", function() {
      if(codeClicked.indexOf('i-') !== -1) {
        $('#header-switcher').load("read-header.php");
      } else {
        $('#header-switcher').load("main-header.php");
      }
      calculateNextButton();
      buildProgressTable();

      refreshTwitterScript(window.location, "Tweet about Those Without Shadows!");

      $('#content').fadeIn('slow');
      $('#footer-bar').fadeIn('slow');
    });
  });
};

function scrollToTop() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
};

function switchToLatestPage() {
  latestPage = latestUpdate();

  hash = getHashOfWindow();
  if(hash !== latestPage) {
    navigateTo(latestPage);
  }
  scrollToTop();
}

function latestUpdate() {
  var finalChapter = chapters.length - 1;
  var lastPageOfFinalChapter = chapters[finalChapter].endPage;
  return "i-0" + finalChapter + "-" + ( lastPageOfFinalChapter >= 10 ? lastPageOfFinalChapter : "0" + lastPageOfFinalChapter );
}

function generateArchive() {
  for (var i = 0; i < chapters.length; i++) {
    $('#archive-contents').append("<h4>" + chapters[i].title + "</h4>");
    for (var j = chapters[i].startPage; j < chapters[i].endPage + 1; j++) {
      $('#archive-contents').append(
        "<a href=\"i-0" + i + "-" + ( j >= 10 ? j : "0" + j ) + ".php\" class=\"link bigger-text\">" + j + "</a> ");
    }
  }
}

function refreshTwitterScript(share_url, title) {
  $('#twitter-button-holder').html('&nbsp;');
  $('#twitter-button-holder').html('<a href="https://twitter.com/share" class="twitter-share-button" data-url="' + share_url +'" data-size="large" data-text="' + title + '" data-count="none">Tweet</a>');
  twttr.widgets.load();
}
