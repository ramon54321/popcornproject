/**
 * @module Database
 */

import {Client} from "pg"
import {readFileSync} from "fs"

export default class Database {
    constructor() {
        console.log("[INFO] Loading environment variables where ENV_NAME = "
        + process.env.ENV_NAME)

        this.client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true,
        })

        this.connect()
    }

    async connect() {
        console.log("[INFO][Database] Trying to connect to database")
        await this.client.connect()
        console.log("[INFO][Database] Successfully connected to database")
    }

    async runQuery(filename) {
        const query = readFileSync(filename, {encoding: "UTF8"}).substring(1)
        const res = await this.client.query(query)
		return res.rows
    }

    // -- Admin
    init() {
        console.log("[ADMIN][Database] Initializing database")
        this.runQuery("./src/queries/init.sql")
    }

    // -- Person table
    getPersonAll() {
        return this.runQuery("./src/queries/person_select_all.sql")
    }
    getPersonById(id) {
        return this.runQuery("./src/queries/person_select_by_id.sql")
    }
    getPersonByNickname(nickname) {
        return this.runQuery("./src/queries/person_select_by_nickname.sql")
    }
    createPerson(nickname, password) {
        // return this.runQuery("./src/queries/person_select_all.sql")
    }

    // -- Blockchain table
    getBlockById(id) {}
    getBlockByHash(hash) {}
    getBlocksAll() {}
    createBlock(previousHash, data, nonce, hash) {} // MAKE SURE PREHASH MATCHES
}
