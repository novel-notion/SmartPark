import sqlite3
import json

con = sqlite3.connect("smartpark.db")
cur = con.cursor()
cur.execute("CREATE TABLE IF NOT EXISTS ketter (tag)")
#...
#Here's where we'd create tables for all the lots
#...
con.commit()
con.close()

#Use ketter for proof of concept (index 0)
dummy_capacity_array = [0, 20, 30, 40, 50, 60, 70, 80, 90, 100, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 10, 20, 30, 40, 50, 60]
max_capacity_array = []
capacity_array = []
for i in range(len(dummy_capacity_array)):
    max_capacity_array.append(100)
    capacity_array.append([dummy_capacity_array[i], max_capacity_array[i]])
capacity_array[0][1] = 3         #Set ketter max = 3 for visualization purposes

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
    # cur.execute("SELECT * FROM ketter")
    # print(cur.fetchall())
    con.commit()
    con.close()
    capacity_array[0][0] = capacity
    return

def current_data():
    return json.dumps(capacity_array)