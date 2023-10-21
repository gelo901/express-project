const MAX_COUNT_TITLE = 20

export const checkValidateFields = (
  title?: string,
  author?: string,
  availableResolutions?: string[],
  canBeDownloaded?: boolean | string
) => {
  const errorsMessages = []

  if (!title || title?.length > MAX_COUNT_TITLE) {
    errorsMessages.push({
      message: 'error validation',
      field: 'title'
    })
  }

  if (!author || author?.length > MAX_COUNT_TITLE) {
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

  if (canBeDownloaded && typeof canBeDownloaded !== 'boolean') {
    errorsMessages.push({
      message: 'error validation',
      field: 'canBeDownloaded'
    })
  }

  return {
    errorsMessages
  }
}
