from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

FINNA_API_BASE_URL = "https://api.finna.fi/v1"

@app.route('/frontpage')
def welcome_message():
    return f'Tervetuloa! Kysy minulta jotain!'

@app.route('/search', methods=['GET'])
def search():
    # Required parameter
    query = request.args.get('query', '')
    if not query:
        return jsonify({"error": "Missing required 'query' parameter"}), 400

    # Material type filter
    material_type = request.args.get('material_type', 'both').lower()
    if material_type not in ['book', 'audiobook', 'both']:
        return jsonify({
            "error": "Invalid material_type. Use 'book', 'audiobook', or 'both'"
        }), 400

    # Building filter (default: PIKI)
    building_param = request.args.get('building', '0/Piki/')  # Default to PIKI
    buildings = [b.strip() for b in building_param.split(',')]  # Split multiple values
    building_filter = ' OR '.join(buildings)

    # Combine all filters
    filters = []
    
    # Material type filters
    if material_type == 'book':
        filters.append('format_ext_str_mv:0/Book/')
    elif material_type == 'audiobook':
        filters.append('format_ext_str_mv:1/Book/AudioBook/')
    else:
        filters.append('~format_ext_str_mv:0/Book/ OR 1/Book/AudioBook/')
    
    # Building filter (OR logic for multiple buildings)
    filters.append(f'~building:{building_filter}')

    # API parameters
    params = {
        'lookfor': query,
        'filter[]': filters,
        'limit': 100,
        'prettyPrint': 1,
        'lng': 'fi'
    }

    try:
        response = requests.get(
            f"{FINNA_API_BASE_URL}/search",
            params=params
        )
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500


    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)