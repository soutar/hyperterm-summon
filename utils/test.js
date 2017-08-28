exports.clearObjectMocks = obj => {
  for (let m in obj) {
    if (obj.hasOwnProperty(m) && typeof obj[m].mockClear === 'function') {
      obj[m].mockClear()
    }
  }
}
