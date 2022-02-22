class InMemoryForumRepository {
    // data: {id: Number, title: String, Body: String}[]
    constructor(data) {
        // : {id: Number, title: String, Body: String}[]
        this.data = data
    }
    savePost(postData) {
        console.log(postData)
        // : {id: Number, title: String, Body: String}
        this.data.unshift(postData)
        console.log(this.data)
    }
}

module.exports = InMemoryForumRepository