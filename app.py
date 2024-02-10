from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from pymongo import MongoClient
import jwt
import bcrypt
import datetime

app = Flask(__name__)

# Assuming you have a MongoDB client and a users_collection
client = MongoClient("mongodb://localhost:27017")
db = client["task"]
users_collection = db["users"]
collection = db["tabledatas"]
SECRET_KEY = "qwerty123"
cur_username = ""
@app.route('/api/checkuser', methods=['POST'])
def checkuser():
    global cur_username  # Use the global variable

    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        user = {"email": email}
        user_data = users_collection.find_one(user)

        if user_data is not None:
                hashed_password = user_data.get("password", "")
                if bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
                    # Update the global variable with the current username
                    cur_username = user_data.get("username", "")
                    print("Current username:", cur_username)  # Add this line for debugging


                # Generate JWT token
                token_payload = {
                    'email': email,
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
                }
                jwt_token = jwt.encode(token_payload, SECRET_KEY, algorithm='HS256')
                
                # Return response with JWT token and user information
                return jsonify({
                    "is_logged_in": True,
                    "name": cur_username,  # Use the current username
                    "token": jwt_token
                })
        return jsonify({"is_logged_in": False, "message": "Invalid credentials"})
@app.route('/api/regt', methods=['POST'])
def register():
    username = request.form.get("username")
    email = request.form.get("email")
    password = request.form.get("password")

    print(username, email, password)

    if not (username and email and password):
        return jsonify({"error": "Missing required fields"})

    existing_user = users_collection.find_one({"email": email})

    if existing_user is None:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        reg_user = {
            "username": username,
            "email": email,
            "password": hashed_password.decode('utf-8')
        }
        users_collection.insert_one(reg_user)
        return jsonify({"message": "Registration successful"})
    else:
        return jsonify({"error": "User with this email already exists"})



@app.route('/')
def home(): 
    return render_template('home.html')

@app.route('/dashboard')
def dashboard():
    try:
        tabledatas = list(collection.find())
        for data in tabledatas:
            data['_id'] = str(data['_id'])
        # print(tabledatas)
        return render_template('dashboard.html', tabledatas=tabledatas)

    except Exception as e:
        return render_template('dashboard.html', error=str(e))

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/login')
def login():
    return render_template('login.html')
@app.route("/meeting")
def meeting():
    global cur_username  # Use the global variable
    print(cur_username)  # Print the current username for debugging
    return render_template("meeting.html", username=cur_username)


@app.route('/api/tabledatas', methods=['GET'])
def get_tabledatas():
    try:
        tabledatas = list(collection.find())
        for data in tabledatas:
            data['_id'] = str(data['_id'])

        return jsonify({"tabledatas": tabledatas})

    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        users = list(users_collection.find())
        for data in users:
            data['_id'] = str(data['_id'])
        return jsonify({"users": users})
    except Exception as e:
        return jsonify({"error": str(e)})
@app.route("/join", methods=["GET", "POST"])
def join():
    if request.method == "POST":
        room_id = request.form.get("roomID")
        return redirect(f"/meeting?roomID={room_id}")

    return render_template("join.html")
if __name__ == '__main__':
    app.run(debug=True)
