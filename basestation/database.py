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
    cur.execute("SELECT COUNT(tag) FROM ketter")
    capacity = cur.fetchone()[0]
    cur.execute("SELECT * FROM ketter WHERE tag=?", (tagID,))
    result = cur.fetchone()
    if result == None:
        cur.execute("INSERT INTO ketter VALUES (?)", (tagID,))
        capacity = capacity + 1
    else:
        cur.execute("DELETE FROM ketter WHERE tag=?", (tagID,))
        capacity = capacity - 1
    con.commit()
    con.close()
    return capacity
