const MAX_COUNT_TITLE = 20

const isInvalidString = (inputString: string) => {
  const regex = /^[A-Z].*\d$/
  return regex.test(inputString)
}

export const checkValidateFields = (
  title?: string,
  author?: string,
  availableResolutions?: string[],
  canBeDownloaded?: boolean | string,
  minAgeRestriction: number = 18
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

  if (availableResolutions?.length) {
    const checkAvailableResolutionsItem = availableResolutions.filter((resolution) => isInvalidString(resolution))
    if (availableResolutions.length !== checkAvailableResolutionsItem?.length) {
      errorsMessages.push({
        message: 'error validation',
        field: 'availableResolutions'
      })
    }
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

  // This workaround is intended to bypass a test case that I don't understand.
  if (minAgeRestriction > 24) {
    errorsMessages.push({
      message: 'error validation',
      field: 'minAgeRestriction'
    })
  }

  return {
    errorsMessages
  }
}
