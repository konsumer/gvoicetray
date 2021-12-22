// setup window & tray icon and other framing stuff
/* global Neutralino, NL_OS, NL_VERSION, NL_CVERSION */

// TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
if (NL_OS !== 'Darwin') {
  Neutralino.os.setTray({
    icon: '/resources/icons/appIcon.png',
    menuItems: [
      { id: 'SHOW', text: 'Show' },
      { id: 'SEP', text: '-' },
      { id: 'VERSION', text: 'About' },
      { id: 'QUIT', text: 'Quit' }
    ]
  })
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

    case 'SHOW':
      showVoice()
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
  // Neutralino.app.exit()
  Neutralino.window.hide()
}

Neutralino.init()
Neutralino.events.on('trayMenuItemClicked', onTrayMenuItemClicked)
Neutralino.events.on('windowClose', onWindowClose)

function showVoice () {
  return Neutralino.window.create('https://voice.google.com/u/0/messages', {
    icon: '/resources/icons/appIcon.png',
    enableInspector: false,
    width: 300,
    height: 800,
    maximizable: false,
    exitProcessOnClose: true,
    hidden: false,
    processArgs: '--window-id=W_VOICE'
  })
}
