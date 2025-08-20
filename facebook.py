import requests
import webbrowser

PAGE_ID = "680389971832363"
PAGE_ACCESS_TOKEN = "EAAZAQ4af9HVABPL0bToC9lXkMioVgVZBbZCdTip0fcIJRuhFglRViylEwIQgV8IwX7pEjXcZC6VdYYEqYkgfSm9NzxJUxpmyJpk41NVBGqLxpTWC13DR9hU9y5XfOWkyb5sZAWu35jltcj7rYr92fGO5FYtQc54FWdXZAf9DBeKm4GQVPzm4RDImuzThkwLZCJbYZCmelFB0"
API_VERSION = "v23.0"

message_text = "eshwar here"
post_url = f"https://graph.facebook.com/{API_VERSION}/{PAGE_ID}/feed"
payload = {
    'message': message_text,
    'access_token': PAGE_ACCESS_TOKEN
}

try:
    response = requests.post(post_url, data=payload)
    response.raise_for_status()
    print("Text post successful:")
    print(response.json())
except requests.exceptions.RequestException as e:
    print(f"Error posting text: {e}")
    if response is not None:
        print(response.json())
