import sqlite3

con = sqlite3.connect("smartpark.db")
cur = con.cursor()
cur.execute("CREATE TABLE IF NOT EXISTS ketter (tag)")
#...
#Here's where we create tables for all the lots
#...
con.commit()
con.close()

def process_tag(response):
    lotID = list(response.keys())[0]
    tagID = list(response.values())[0]
    con = sqlite3.connect("smartpark.db")
    cur = con.cursor()
    cur.execute("SELECT * FROM ketter WHERE tag=?", (tagID,))
    result = cur.fetchone()
    if result == None:
        cur.execute("INSERT INTO ketter VALUES (?)", (tagID,))
    else:
        cur.execute("DELETE FROM ketter WHERE tag=?", (tagID,))
    con.commit()
    con.close()
