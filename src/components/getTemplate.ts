export const getTemplate = ({
  templateRoot,
  dataInjects,
  templateInjects,
  templateReplaces,
  withVModel,
  shouldSkipRoot,
}: {
  templateRoot: string
  dataInjects?: Record<string, string>
  templateInjects?: Record<string, string>
  templateReplaces?: Record<string, string>
  withVModel?: Record<string, string>
  shouldSkipRoot?: boolean
}) => {
  const templateRootQueryString =
    templateRoot.startsWith('.') || templateRoot.startsWith('#')
      ? templateRoot
      : `[data-bdtl="${templateRoot}"]`
  const templateRootElement = document.querySelector(templateRootQueryString)

  if (!templateRootElement) {
    return ''
  }

  const templateElement = templateRootElement.cloneNode(true) as HTMLElement
  if (dataInjects) {
    Object.entries(dataInjects).forEach(([key, value]) => {
      const elements = templateElement.querySelectorAll(`[data-bdtl="${key}"]`)
      elements.forEach((element) => {
        element.textContent = `{{${value}}}`
      })
    })
  }
  if (templateInjects) {
    Object.entries(templateInjects).forEach(([key, value]) => {
      if (key === '&') {
        templateElement.innerHTML = value
        return
      }
      if (key.startsWith('.') || key.startsWith('#')) {
        const element = templateElement.querySelectorAll(key)
        element.forEach((element) => {
          element.innerHTML = value
        })
        return
      }
      const elements = templateElement.querySelectorAll(`[data-bdtl="${key}"]`)
      elements.forEach((element) => {
        element.innerHTML = value
      })
    })
  }
  if (templateReplaces) {
    Object.entries(templateReplaces).forEach(([key, value]) => {
      if (key === '&') {
        templateElement.outerHTML = value
        return
      }
      if (key.startsWith('.') || key.startsWith('#')) {
        const element = templateElement.querySelectorAll(key)
        element.forEach((element) => {
          element.outerHTML = value
        })
        return
      }
      const elements = templateElement.querySelectorAll(`[data-bdtl="${key}"]`)
      elements.forEach((element) => {
        element.outerHTML = value
      })
    })
  }
  if (withVModel) {
    Object.entries(withVModel).forEach(([key, value]) => {
      const element = templateElement.querySelector(`[data-bdtl="${key}"]`)
      if (element) {
        element.setAttribute('v-model', value)
      }
    })
  }

  return shouldSkipRoot ? templateElement.innerHTML : templateElement.outerHTML
}
