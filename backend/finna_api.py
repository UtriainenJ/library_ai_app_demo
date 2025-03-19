import requests

FINNA_API_BASE_URL = "https://api.finna.fi/v1"

def build_finna_filters(material_type='both', building='0/Piki/'):
    """
    Build Finna API filters based on material type and building.
    """
    filters = []

    # Material type filters
    if material_type == 'book':
        filters.append('format_ext_str_mv:0/Book/')
    elif material_type == 'audiobook':
        filters.append('format_ext_str_mv:1/Book/AudioBook/')
    else:
        filters.append('~format_ext_str_mv:0/Book/')  # Books
        filters.append('~format_ext_str_mv:1/Book/AudioBook/')  # Audiobooks

    # Building filter (OR logic for multiple buildings)
    buildings = [b.strip() for b in building.split(',')]
    building_filter = ' OR '.join(buildings)
    filters.append(f'~building:{building_filter}')

    return filters


def search_finna(query, material_type='both', building='0/Piki/', limit=100, language='fi'):
    """
    Perform a search using the Finna API.
    """
    filters = build_finna_filters(material_type, building)

    params = {
        'lookfor': query,
        'filter[]': filters,
        'limit': limit,
        'prettyPrint': 1,
        'lng': language
    }

    try:
        response = requests.get(
            f"{FINNA_API_BASE_URL}/search",
            params=params
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}