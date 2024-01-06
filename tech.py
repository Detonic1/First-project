from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommend', methods=['POST'])
def recommend():
    language = request.form.get('language')
    # Get other user choices similarly
    # ...

    # Simple logic to determine tech path based on choices (Modify as per your requirements)
    tech_path = f"Based on your interests in {language}, you might consider exploring opportunities in Software Development."

    return render_template('index.html', tech_path=tech_path)

if __name__ == '__main__':
    app.run(debug=True)
