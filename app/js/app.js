NodeList.prototype.__proto__ = Array.prototype

void function(){
  // http://davidwalsh.name/javascript-debounce-function
  function debounce(func, wait, immediate) {
    var timeout
    return function() {
      var context = this, args = arguments
      var later = function() {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }

  var hrefToSet = null
  var setHashDebounced = debounce(function(){
    if (history && history.replaceState) {
      history.replaceState({}, '', hrefToSet)
    } else {
      location.hash = hrefToSet
    }
  }, 300)

  function setHash(href) {
    hrefToSet = href
    setHashDebounced()
  }

  var menuItems = document.querySelectorAll('header > a')
  var pages = document.querySelectorAll('.page')

  var active = null
  function activate(menuItem) {
    if (active) {
      active.classList.remove('active')
      active = null
    }

    menuItem.classList.add('active')
    active = menuItem

    setHash(menuItem.href)
  }

  function getMenuItem(pageName) {
    var item
    menuItems.forEach(function(el){
      if (pageName === el.attributes['data-page'].value) {
        item = el
      }
    })
    return item
  }

  var initialPage = location.hash && RegExp(location.hash + '$')

  pages.forEach(function(page){
    var menuItem = getMenuItem(page.id)
    if (initialPage && initialPage.test(menuItem.href)) {
      activate(menuItem)
    }

    function handler() { activate(menuItem) }

    new Waypoint({
      element: page,
      handler: handler,
      offset: '40%'
    })
    new Waypoint({
      element: page,
      handler: handler,
      offset: '-40%'
    })
  })
}()
