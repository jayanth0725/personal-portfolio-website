import html
import urllib.request
import json
import re
from datetime import datetime

USERNAME = "jayanth0725"
ORG_NAME = "team-zero-latency"

USER_API_URL = f"https://api.github.com/users/{USERNAME}/repos?sort=updated"
ORG_API_URL = f"https://api.github.com/orgs/{ORG_NAME}/repos"

def get_language_color(language):
    colors = {"Rust": "#dea584", "Python": "#3572a5", "C": "#555555", "C++": "#f34b7d", "HTML": "#e34c26", "JavaScript": "#f1e05a"}
    return colors.get(language, "var(--colour-primary)")    

def fetch_repositories(url):
    headers = {'User-Agent': 'Mozilla/5.0', 'Accept': 'application/vnd.github.v3+json'}
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())
    except Exception as e:
        print(f"Warning: Could not fetch from {url}. Error: {e}")
        return []

def update_portfolio():
    user_repos = fetch_repositories(USER_API_URL)
    org_repos = fetch_repositories(ORG_API_URL)
    
    all_repos = user_repos + org_repos

    filtered = []
    seen_ids = set()
    for repo in all_repos:
        if repo['id'] not in seen_ids and 'portfolio' in repo.get('topics', []):
            filtered.append(repo)
            seen_ids.add(repo['id'])

    cards_html = ""
    for repo in filtered:
        name = html.escape(repo['name'].replace('-', ' '))
        desc = html.escape(repo.get('description') or "No description provided.")
        url = html.escape(repo.get('html_url', ''))
        lang = html.escape(repo.get('language') or "Multiple")
        lang_color = get_language_color(repo.get('language'))
        homepage = html.escape(repo.get('homepage') or "")
        
        updated_at = repo.get('updated_at', '')
        if updated_at:
            date_obj = datetime.strptime(updated_at, "%Y-%m-%dT%H:%M:%SZ")
            formatted_date = date_obj.strftime("%b %d, %Y")
        else:
            formatted_date = "Recently"

        topics = repo.get('topics', [])
        tags_html = ""
        for t in topics:
            if t != 'portfolio':
                tags_html += f'<span class="topic-tag">{html.escape(t)}</span>'

        cards_html += f"""
            <section class="card hidden">
                <h2 class="project-title">{name}</h2>
                <div class="project-lang-container">
                    <span class="project-lang-dot" style="background-color: {lang_color};"></span>
                    {lang} &nbsp;&bull;&nbsp; Updated {formatted_date}
                </div>
                <div class="topic-tags-container">
                    {tags_html}
                </div>
                <h3>Overview:</h3>
                <p>{desc}</p>
                <div class="project-links-container">
                    <a href="{url}" class="project-link" target="_blank" rel="noopener noreferrer">View Source</a>
                    {f'<a href="{homepage}" class="project-link" target="_blank" rel="noopener noreferrer">Live Demo</a>' if homepage else ''}
                </div>
            </section>
        """

    current_date_str = f"Last updated: {datetime.now().strftime('%B %Y')}"
    date_pattern = re.compile(r"Last updated: [a-zA-Z]+ \d{4}")

    static_pages = ['index.html', 'about.html', 'contact.html']
    for page in static_pages:
        try:
            with open(page, 'r') as file:
                content = file.read()
            updated_content = date_pattern.sub(current_date_str, content)
            with open(page, 'w') as file:
                file.write(updated_content)
        except FileNotFoundError:
            print(f"Warning: Could not find {page}")

    try:
        with open('projects_template.html', 'r') as file:
            template = file.read()

        target_projects = "<!-- PROJECTS_GO_HERE -->"
        target_date = "<!-- DATE_GOES_HERE -->"

        final_html = template.replace(target_projects, cards_html)
        final_html = final_html.replace(target_date, f"<p>{current_date_str}</p>")
        
        with open('projects.html', 'w') as file:
            file.write(final_html)
    except FileNotFoundError:
        print("Error: projects_template.html is missing!")

if __name__ == "__main__":
    update_portfolio()