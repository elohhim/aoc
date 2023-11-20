import argparse
import json
import urllib.request
import time

from github_env import GITHUB_ENV


def create_github_issue(repo_owner, access_token, repo_name, title, body, labels=[]):
    url = f"https://api.github.com/repos/{repo_owner}/{repo_name}/issues"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
    }

    data = {"title": title, "body": body, "labels": labels}
    data_json = json.dumps(data).encode('utf-8')

    request = urllib.request.Request(url, data=data_json, headers=headers, method='POST')

    try:
        # Perform the request
        with urllib.request.urlopen(request) as response:
            if response.getcode() == 201:
                print(f"Issue created successfully: {json.loads(response.read())['html_url']}")
            else:
                print(f"Failed to create issue. Status code: {response.getcode()}, Error: {response.read().decode('utf-8')}")
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code}, {e.reason}")


if __name__ == "__main__":
    # Load Github configuration
    user = GITHUB_ENV["USER"]
    access_token = GITHUB_ENV["ACCESS_TOKEN"]
    repo = GITHUB_ENV["REPO"]
    # Parse args
    parser = argparse.ArgumentParser(description="Generates Github issues for solving AoC.")
    parser.add_argument("year", type=int, help="The event year.")
    parser.add_argument("start_day", type=int, help="The start day.")
    parser.add_argument("end_day", type=int, help="The end day.")
    parser.add_argument("--language", help="Optional: The programming language.")
    args = parser.parse_args()
    
    for day in range(args.start_day, args.end_day+1):
        title = f"AoC 2022, Day {day:02}"
        body = f"Create solution for Advent of Code 2022, Day {day:02}"
        if args.language is not None:
            title += f', {args.language}'
            body += f' in {args.language}'
        labels = ["task"]
        create_github_issue(user, access_token, repo, title, body, labels)
        time.sleep(0.5)
