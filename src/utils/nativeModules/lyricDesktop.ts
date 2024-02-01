import { NativeModules, NativeEventEmitter } from 'react-native'

const { LyricModule } = NativeModules

let isShowLyric = false
let isUseDesktopLyric = true

// export const themes = [
//   { id: 'green', value: '#07c556' },
//   { id: 'yellow', value: '#fffa12' },
//   { id: 'blue', value: '#19b5fe' },
//   { id: 'red', value: '#ff1222' },
//   { id: 'pink', value: '#f1828d' },
//   { id: 'purple', value: '#c851d4' },
//   { id: 'orange', value: '#ffad12' },
//   { id: 'grey', value: '#bdc3c7' },
//   { id: 'black', value: '#333333' },
//   { id: 'white', value: '#ffffff' },
// ]

// export const textPositionX = [
//   { id: 'left', value: 'LEFT' },
//   { id: 'center', value: 'CENTER' },
//   { id: 'right', value: 'RIGHT' },
// ]
// export const textPositionY = [
//   { id: 'top', value: 'TOP' },
//   { id: 'center', value: 'CENTER' },
//   { id: 'bottom', value: 'BOTTOM' },
// ]

// const getThemeColor = themeId => (themes.find(t => t.id == themeId) || themes[0]).value
// const getTextPositionX = x => (textPositionX.find(t => t.id == x) || textPositionX[0]).value
// const getTextPositionY = y => (textPositionY.find(t => t.id == y) || textPositionY[0]).value
const getAlpha = (num: number) => num / 100
const getTextSize = (num: number) => num / 10

interface Options {
  enable: boolean
  isUseDesktopLyric: boolean
  isAutoPause: boolean
  isShowToggleAnima: boolean
  isSingleLine: boolean
  width: number
  maxLineNum: number
  isLock: boolean
  unplayColor: string
  playedColor: string
  shadowColor: string
  opacity: number
  textSize: number
  positionX: number
  positionY: number
  textPositionX: LX.AppSetting['desktopLyric.textPosition.x']
  textPositionY: LX.AppSetting['desktopLyric.textPosition.y']
}

/**
 * show lyric
 */
export const showLyric = async(options: Options): Promise<void> => {
  // if (isShowLyric) return Promise.resolve()
  isUseDesktopLyric = options.isUseDesktopLyric
  return LyricModule.showLyric({
    isUseDesktopLyric: options.isUseDesktopLyric,
    isAutoPause: options.isAutoPause,
    isSingleLine: options.isSingleLine,
    isShowToggleAnima: options.isShowToggleAnima,
    isLock: options.isLock,
    unplayColor: options.unplayColor,
    playedColor: options.playedColor,
    shadowColor: options.shadowColor,
    alpha: getAlpha(options.opacity),
    textSize: getTextSize(options.textSize),
    lyricViewX: options.positionX,
    lyricViewY: options.positionY,
    textX: options.textPositionX.toUpperCase(),
    textY: options.textPositionY.toUpperCase(),
    width: options.width,
    maxLineNum: options.maxLineNum,
  }).then(() => {
    isShowLyric = true
  })
}

/**
 * hide lyric
 */
export const hideLyric = async(): Promise<void> => {
  if (!isShowLyric) return Promise.resolve()
  return LyricModule.hideLyric().then(() => {
    isShowLyric = false
  })
}


/**
 * play lyric
 * @param {Number} time play time
 * @returns {Promise} Promise
 */
export const play = async(time: number): Promise<void> => {
  if (!isShowLyric) return Promise.resolve()
  return LyricModule.play(time)
}

/**
 * pause lyric
 */
export const pause = async(): Promise<void> => {
  if (!isShowLyric) return Promise.resolve()
  return LyricModule.pause()
}

/**
 * set lyric
 * @param lyric lyric str
 * @param translation lyric translation
 * @param romalrc lyric translation
 */
export const setLyric = async(lyric: string, translation: string, romalrc: string): Promise<void> => {
  if (!isShowLyric) return Promise.resolve()
  return LyricModule.setLyric(lyric, translation || '', romalrc || '')
}

export const setPlaybackRate = async(rate: number): Promise<void> => {
  // if (!isShowLyric) return Promise.resolve()
  return LyricModule.setPlaybackRate(rate)
}

/**
 * toggle show translation
 * @param isShowTranslation is show translation
 */
export const toggleTranslation = async(isShowTranslation: boolean): Promise<void> => {
  // if (!isShowLyric) return Promise.resolve()
  return LyricModule.toggleTranslation(isShowTranslation)
}

/**
 * toggle show roma lyric
 * @param isShowRoma is show roma lyric
 */
export const toggleRoma = async(isShowRoma: boolean): Promise<void> => {
  // if (!isShowLyric) return Promise.resolve()
  return LyricModule.toggleRoma(isShowRoma)
}

/**
 * toggle is auto pause lyric
 * @param isAutoPause is auto pause lyric
 */
export const toggleAutoPause = async(isAutoPause: boolean): Promise<void> => {
  // if (!isShowLyric || !isUseDesktopLyric) return Promise.resolve()
  return LyricModule.toggleAutoPause(isAutoPause)
}

/**
 * toggle is lock lyric window
 * @param isLock is lock lyric window
 */
export const toggleLock = async(isLock: boolean): Promise<void> => {
  if (!isShowLyric || !isUseDesktopLyric) return Promise.resolve()
  return LyricModule.toggleLock(isLock)
}

/**
 * set color
 * @param unplayColor
 * @param playedColor
 * @param shadowColor
 */
export const setColor = async(unplayColor: string, playedColor: string, shadowColor: string): Promise<void> => {
  if (!isShowLyric || !isUseDesktopLyric) return Promise.resolve()
  return LyricModule.setColor(unplayColor, playedColor, shadowColor)
}

/**
 * set text alpha
 * @param alpha text alpha
 */
export const setAlpha = async(alpha: number): Promise<void> => {
  if (!isShowLyric || !isUseDesktopLyric) return Promise.resolve()
  return LyricModule.setAlpha(getAlpha(alpha))
}

/**
 * set text size
 * @param size text size
 */
export const setTextSize = async(size: number): Promise<void> => {
  if (!isShowLyric || !isUseDesktopLyric) return Promise.resolve()
  return LyricModule.setTextSize(getTextSize(size))
}

export const setShowToggleAnima = async(isShowToggleAnima: boolean): Promise<void> => {
  if (!isShowLyric || !isUseDesktopLyric) return Promise.resolve()
  return LyricModule.setShowToggleAnima(isShowToggleAnima)
}

export const setSingleLine = async(isSingleLine: boolean): Promise<void> => {
  if (!isShowLyric || !isUseDesktopLyric) return Promise.resolve()
  return LyricModule.setSingleLine(isSingleLine)
}

export const setPosition = async(x: number, y: number): Promise<void> => {
  if (!isShowLyric || !isUseDesktopLyric) return Promise.resolve()
  return LyricModule.setPosition(x, y)
}

export const setMaxLineNum = async(maxLineNum: number): Promise<void> => {
  if (!isShowLyric || !isUseDesktopLyric) return Promise.resolve()
  return LyricModule.setMaxLineNum(maxLineNum)
}

export const setWidth = async(width: number): Promise<void> => {
  if (!isShowLyric || !isUseDesktopLyric) return Promise.resolve()
  return LyricModule.setWidth(width)
}

// export const fixViewPosition = async(): Promise<void> => {
//   if (!isShowLyric|| !isUseDesktopLyric) return Promise.resolve()
//   return LyricModule.fixViewPosition()
// }

export const setLyricTextPosition = async(textX: LX.AppSetting['desktopLyric.textPosition.x'], textY: LX.AppSetting['desktopLyric.textPosition.y']): Promise<void> => {
  if (!isShowLyric || !isUseDesktopLyric) return Promise.resolve()
  return LyricModule.setLyricTextPosition(textX.toUpperCase(), textY.toUpperCase())
}

export const checkOverlayPermission = async(): Promise<void> => {
  return LyricModule.checkOverlayPermission()
}

export const openOverlayPermissionActivity = async(): Promise<void> => {
  return LyricModule.openOverlayPermissionActivity()
}

export const onPositionChange = (handler: (position: { x: number, y: number }) => void): () => void => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const eventEmitter = new NativeEventEmitter(LyricModule)
  const eventListener = eventEmitter.addListener('set-position', event => {
    handler(event as { x: number, y: number })
  })

  return () => {
    eventListener.remove()
  }
}

