import requests
import json

def fetch_research_projects():
    print("=== Fetching Research Projects ===")
    
    # Make sure you're using the API endpoint, not the webpage URL
    url = "http://127.0.0.1:8000/api/projects/"  # Changed from /projects/ to /api/projects/
    
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes
        
        if response.headers.get('content-type') == 'application/json':
            return response.json()
        else:
            print(f"Unexpected content type: {response.headers.get('content-type')}")
            print(f"Response Text: {response.text[:200]}...")  # Print first 200 chars
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"Error making request: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}")
        return None

if __name__ == "__main__":
    projects = fetch_research_projects()
    if projects:
        print(f"Found {len(projects)} projects")
        for project in projects:
            print(project)