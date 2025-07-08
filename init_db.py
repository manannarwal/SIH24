import sqlite3

# Connect to SQLite database (this will create the file if it doesn't exist)
conn = sqlite3.connect('database.db')

# Create a cursor object to execute SQL commands
cursor = conn.cursor()

# Create tables
cursor.execute('''
CREATE TABLE IF NOT EXISTS visitors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    visit_date TEXT
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_id INTEGER,
    ticket_type TEXT NOT NULL,
    ticket_price REAL NOT NULL,
    booking_date TEXT,
    FOREIGN KEY (visitor_id) REFERENCES visitors(id)
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_id INTEGER,
    feedback_text TEXT,
    feedback_date TEXT,
    FOREIGN KEY (visitor_id) REFERENCES visitors(id)
)
''')

# Commit the changes and close the connection
conn.commit()
conn.close()

print("Database initialized successfully.")
