class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
        name: {
          $regex: this.queryStr.keyword,
          $options: "i",
        },
      }
      : {}





    this.query = this.query.find({ ...keyword })
    return this;
  }

  find() {
    const queryCopy = { ...this.queryStr }

    const removeFields = ['keyword', 'page', 'limit']

    removeFields.forEach(key => delete queryCopy[key])
  }

}

module.exports = ApiFeatures;
