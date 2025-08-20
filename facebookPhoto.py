import requests

def post_image_to_facebook(access_token, page_id, image_url, message=""):
    """
    Posts an image to a Facebook Page using its URL via the Graph API.

    Args:
        access_token (str): Your Facebook Page Access Token.
        page_id (str): The ID of your Facebook Page.
        image_url (str): The public URL of the image you want to post.
        message (str): The text message to accompany the image (optional).
    """
    graph_api_version = "v23.0"  # Current recommended API version. Adjust if needed.
    url = f"https://graph.facebook.com/{graph_api_version}/{page_id}/photos"

    params = {
        'access_token': access_token,
        'url': image_url,
        'message': message,
        'published': True  # Set to False if you want to upload without publishing immediately
    }

    print(f"Attempting to post image to Facebook Page ID: {page_id}")
    print(f"Image URL: {image_url}")
    print(f"Message: '{message}'")

    try:
        response = requests.post(url, params=params)
        response.raise_for_status()  # Raise an exception for HTTP errors (4xx or 5xx)
        result = response.json()

        if 'id' in result:
            print(f"SUCCESS: Photo posted! Photo ID: {result['id']}")
            if 'post_id' in result:
                print(f"SUCCESS: Corresponding Post ID: {result['post_id']}")
        else:
            print(f"ERROR: Could not post photo. Response: {result}")

    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
        print(f"Response content: {response.text}")
    except requests.exceptions.ConnectionError as conn_err:
        print(f"Connection error occurred: {conn_err}")
    except requests.exceptions.Timeout as timeout_err:
        print(f"Timeout error occurred: {timeout_err}")
    except requests.exceptions.RequestException as req_err:
        print(f"An error occurred during the request: {req_err}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    # Your provided details
    ACCESS_TOKEN = "EAAZAQ4af9HVABPL0bToC9lXkMioVgVZBbZCdTip0fcIJRuhFglRViylEwIQgV8IwX7pEjXcZC6VdYYEqYkgfSm9NzxJUxpmyJpk41NVBGqLxpTWC13DR9hU9y5XfOWkyb5sZAWu35jltcj7rYr92fGO5FYtQc54FWdXZAf9DBeKm4GQVPzm4RDImuzThkwLZCJbYZCmelFB0"
    PAGE_ID = "680389971832363"
    IMAGE_URL = "https://asset.gecdesigns.com/img/wallpapers/happy-birthday-wishes-for-a-friend-cake-with-lit-candles-in-a-festive-background-sr27052511-cover.webp"
    POST_MESSAGE = "Check out this beautiful landscape from Pexels! #Pexels #Nature"

    post_image_to_facebook(ACCESS_TOKEN, PAGE_ID, IMAGE_URL, POST_MESSAGE)
