// setup window & tray icon and other framing stuff
/* global Neutralino, NL_OS, NL_VERSION, NL_CVERSION */

// TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
if (NL_OS !== 'Darwin') {
  Neutralino.os.setTray({
    icon: '/resources/icons/trayIcon.png',
    menuItems: [
      { id: 'VERSION', text: 'About' },
      { id: 'SEND', text: 'Send Message' },
      { id: 'SEP', text: '-' },
      { id: 'QUIT', text: 'Quit' }
    ]
  })
}

function checkMessages () {
  Neutralino.debug.log('Check messages not implemented.')
}

function onTrayMenuItemClicked (event) {
  switch (event.detail.id) {
    case 'VERSION':
      Neutralino.os.showMessageBox(
        'About',
        `Neutralinojs server: v${NL_VERSION} | Neutralinojs client: v${NL_CVERSION}`
      )
      break

    case 'QUIT':
      Neutralino.app.exit()
      break

    default:
      Neutralino.debug.log(`${event.detail.id} not implemented.`)
      Neutralino.os.showMessageBox(
        'Not Implemented',
        `Sorry, ${event.detail.id} is not implemented, yet.`
      )
  }
}

function onWindowClose () {
  Neutralino.app.exit()
}

Neutralino.init()
Neutralino.events.on('trayMenuItemClicked', onTrayMenuItemClicked)
Neutralino.events.on('windowClose', onWindowClose)

// every 10 second, check for new messages
setInterval(checkMessages, 10000)
checkMessages()
