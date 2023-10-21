const MAX_COUNT_TITLE = 15

export const checkValidateFields = (title?: string, author?: string, availableResolutions?: string[]) => {
  const errorsMessages = []

  if (!title || title?.length > MAX_COUNT_TITLE) {
    errorsMessages.push({
      message: 'error validation',
      field: 'title'
    })
  }

  if (!author) {
    errorsMessages.push({
      message: 'error validation',
      field: 'author'
    })
  }

  if (!availableResolutions?.length) {
    errorsMessages.push({
      message: 'error validation',
      field: 'availableResolutions'
    })
  }

  return {
    errorsMessages
  }
}
