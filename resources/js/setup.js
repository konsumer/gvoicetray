// setup window & tray icon and other framing stuff
/* global Neutralino, NL_OS, NL_VERSION, NL_CVERSION */

// TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
if (NL_OS !== 'Darwin') {
  Neutralino.os.setTray({
    icon: '/resources/icons/trayIcon.png',
    menuItems: [
      { id: 'VERSION', text: 'Get version' },
      { id: 'SEP', text: '-' },
      { id: 'QUIT', text: 'Quit' }
    ]
  })
}

function onTrayMenuItemClicked (event) {
  switch (event.detail.id) {
    case 'VERSION':
      Neutralino.os.showMessageBox(
        'Version information',
        `Neutralinojs server: v${NL_VERSION} | Neutralinojs client: v${NL_CVERSION}`
      )
      break
    case 'QUIT':
      Neutralino.app.exit()
      break
  }
}

function onWindowClose () {
  Neutralino.app.exit()
}

Neutralino.init()
Neutralino.events.on('trayMenuItemClicked', onTrayMenuItemClicked)
Neutralino.events.on('windowClose', onWindowClose)
