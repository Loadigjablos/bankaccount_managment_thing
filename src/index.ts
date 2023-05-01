class Logic {

    database: Database


    constructor() {
        this.database = new Database()

        this.say()
    }

    say() {

    }

}

class BankAccount  {
    
    number: number
    money: number
    pin: string

    constructor(number: number, money: number, pin: string) {
        this.number = number
        this.money = money
        this.pin = pin
    }
}

import mariadb from 'mariadb'
import { Pool } from 'mariadb'

class Database {
      // Properties
  private _pool: Pool
  // Constructor
  constructor() {
    this._pool = mariadb.createPool({
      database: 'thing',
      host: 'localhost',
      user: 'thing',
      password: 'name123456789',
      connectionLimit: 5,
    })
    this.initializeDBSchema()
  }
  // Methods
  private initializeDBSchema = async () => {
    console.log('Initializing DB schema...')
    
    this.executeSQL(`
    CREATE TABLE IF NOT EXISTS accounts (
        number INT(11) NOT NULL AUTO_INCREMENT,
        money INT(11) NOT NULL,
        pin varchar(255) NOT NULL,
        PRIMARY KEY (number)
    );
    `)
  }

  public executeSQL = async (query: string) => {
    try {
      const conn = await this._pool.getConnection()
      const res = await conn.query(query)
      conn.end()
      return res
    } catch (err) {
      console.log(err)
    }
  }
}




new Logic()
