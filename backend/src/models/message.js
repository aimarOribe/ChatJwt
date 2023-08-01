module.exports = {
    get: (con, callback) => {
        con.query("SELECT messages.id, messages.userId, messages.content,  messages.date, user.firstName, user.lastName FROM messages INNER JOIN user ON messages.userId = user.id", callback);
    },
    getById: (con, id, callback) => {
        con.query(`SELECT * FROM messages WHERE id = ${id}`, callback);
    },
    create: (con, data, callback) => {
        con.query(`INSERT INTO messages SET 
            content = "${data.content}",
            userId = "${data.userId}"
        `, callback);
    },
    destroy: (con, id, callback) => {
        con.query(`DELETE FROM messages WHERE id = ${id}`, callback);
    },
}