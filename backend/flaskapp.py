from flask import Flask, request, jsonify
from finna_api import search_finna

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Tervetuloa! Kysy minulta jotain!"})

@app.route('/search', methods=['GET'])
def search():
    # Required parameter
    query = request.args.get('query', '')
    if not query:
        return jsonify({"error": "Missing required 'query' parameter"}), 400

    # Optional parameters
    material_type = request.args.get('material_type', 'both').lower()
    if material_type not in ['book', 'audiobook', 'both']:
        return jsonify({
            "error": "Invalid material_type. Use 'book', 'audiobook', or 'both'"
        }), 400

    building = request.args.get('building', '0/Piki/')  # Default to PIKI

    # Call the Finna API logic
    result = search_finna(
        query=query,
        material_type=material_type,
        building=building
    )

    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True, port=5002)