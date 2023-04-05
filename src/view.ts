import * as vscode from 'vscode'
import { State } from 'vscode-languageclient'

export abstract class Messages {
  public static SERVER_RUNNING = 'LPiC language server is running...'

  public static SERVER_STOPPED = 'LPiC language server has stopped working!'

  public static SERVER_NOT_INSTALLED_CANCEL = 'Cancel'

  public static SERVER_NOT_FOUND = 'LPiC language server not found'

  public static BUILD_ERROR =
    'A build error occured. Please check the problems tab \
    and the build log for further information.'

  public static BUILD_FAILURE =
    'An error occured while executing the configured TeX build tool.'

  public static SEARCH_ERROR =
    'An error occured after executing the configured previewer. \
    Please see the documentation of your previewer for further information.'

  public static SEARCH_FAILURE =
    'An error occured while executing the configured PDF viewer. \
    Please see the README of this extension and the PDF viewer for further information.'

  public static SEARCH_UNCONFIGURED =
    'The forward search feature is not configured. Please see the README for instructions.'
}

abstract class Colors {
  public static NORMAL = new vscode.ThemeColor('statusBar.foreground')
  public static ERROR = new vscode.ThemeColor('errorForeground')
}

export class StatusIcon {
  private statusBarItem: vscode.StatusBarItem

  constructor() {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
    )

    this.statusBarItem.show()
  }

  public dispose() {
    this.statusBarItem.dispose()
  }

  public update(state: State) {
    if (state === State.Running) {
      this.drawIcon(Messages.SERVER_RUNNING, Colors.NORMAL)
    } else {
      this.drawIcon(Messages.SERVER_STOPPED, Colors.ERROR)
    }
  }

  private drawIcon(tooltip: string, color: vscode.ThemeColor) {
    this.statusBarItem.text = `$(beaker)`
    this.statusBarItem.tooltip = tooltip
    this.statusBarItem.color = color
  }
}
