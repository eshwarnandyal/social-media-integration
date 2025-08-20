import requests
import time

ACCESS_TOKEN = "EAAZAQ4af9HVABPOiCDZAR3n8ofShXjRsZAzsNNRSYZCT2l8M0xstHXBAQXzPkzgNl9ah4jZCUpUmor8naJQdCv0Svr1Tl2LZB8q703LR0SdEZBSRu0ZA13PTgq3bwZAQ8atzPTqe6ZBBzD7j3GSxxEO1E2WVHCEP25EhSZAePx3MdFum27J9qzF563z43GONObR"
IG_USER_ID = "17841476436195126"
IMAGE_URL = "https://media.istockphoto.com/id/948400550/photo/students-in-balliol-college-oxford-england.jpg?s=612x612&w=0&k=20&c=HTHAY0WjnlJeYOM2ii60JRrMlZr50k--wpVqq3yYGrU="  # Must be publicly accessible
CAPTION = "yeah! in my campus.."

#  Create a media object
media_url = f"https://graph.facebook.com/v19.0/{IG_USER_ID}/media"
media_payload = {
    "image_url": IMAGE_URL,
    "caption": CAPTION,
    "access_token": ACCESS_TOKEN
}

media_response = requests.post(media_url, data=media_payload)
media_result = media_response.json()

if "id" not in media_result:
    print("Media creation failed:", media_result)
    exit()

creation_id = media_result["id"]
print("Media created with ID:", creation_id)

# Publish the media object
publish_url = f"https://graph.facebook.com/v19.0/{IG_USER_ID}/media_publish"
publish_payload = {
    "creation_id": creation_id,
    "access_token": ACCESS_TOKEN
}

# Wait for a few seconds to make sure the media is ready
time.sleep(5)

publish_response = requests.post(publish_url, data=publish_payload)
publish_result = publish_response.json()

if "id" in publish_result:
    print("Post published successfully! Post ID:", publish_result["id"])
else:
    print("Failed to publish:", publish_result)
