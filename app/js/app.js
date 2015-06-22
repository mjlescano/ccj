NodeList.prototype.__proto__ = Array.prototype

void function(){
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

    if (location.hash !== menuItem.href) {
      if (history && history.replaceState) {
        history.replaceState({}, '', menuItem.href)
      } else {
        location.hash = menuItem.href
      }
    }
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
