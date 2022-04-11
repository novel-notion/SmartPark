import sqlite3

con = sqlite3.connect("smartpark.db")
cur = con.cursor()
cur.execute("CREATE TABLE IF NOT EXISTS ketter (tag)")
#...
#Here's where we create tables for all the lots
#...
con.commit()
con.close()

def process_tag(tag):
    con = sqlite3.connect("smartpark.db")
    cur = con.cursor()
    cur.execute("SELECT * FROM ketter WHERE tag=?", (tag,))
    result = cur.fetchone()
    if result == None:
        cur.execute("INSERT INTO ketter VALUES (?)", (tag,))
    else:
        cur.execute("DELETE FROM ketter WHERE tag=?", (tag,))
    con.commit()
    con.close()

con = sqlite3.connect("smartpark.db")
cur = con.cursor()
cur.execute("SELECT * FROM ketter")
results = cur.fetchall()
for i in results:
    print("run 1:", i)
process_tag(696969696)
results = cur.fetchall()
for i in results:
    print("run 2:", i)
process_tag(4503)
results = cur.fetchall()
for i in results:
    print("run 2:", i)
con.close()