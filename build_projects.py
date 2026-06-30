import html
import urllib.request
import json
import re
from datetime import datetime

USERNAME = "jayanth0725"
API_URL = f"https://api.github.com/users/{USERNAME}/repos?sort=updated"

def get_language_color(language):
    colors = {"Rust" : "#dea584", "Python" : "#3572a5", "C": "#555555", "C++": "#f34b7d", "HTML": "#e34c26", "JavaScript": "#f1e05a"}
    return colors.get(language, "var(--colour-primary)")    

def update_portfolio():
    headers = {'User-Agent': 'Mozilla/5.0', 'Accept': 'application/vnd.github.v3+json'}
    req = urllib.request.Request(API_URL, headers=headers)
    
    with urllib.request.urlopen(req) as response:
        repos = json.loads(response.read().decode())

    filtered = [r for r in repos if 'portfolio' in r.get('topics', [])]

    cards_html = ""
    for repo in filtered:
        name = html.escape(repo['name'].replace('-', ' '))
        desc = html.escape(repo.get('description') or "No description provided.")
        url = html.escape(repo.get('html_url', ''))
        lang = html.escape(repo.get('language') or "Multiple")
        lang_color = get_language_color(repo.get('language'))
        homepage = html.escape(repo.get('homepage') or "")

        cards_html += f"""
            <section class="card hidden">
                <h2 class="project-title">{name}</h2>
                <div class="project-lang-container">
                    <span class="project-lang-dot" style="background-color: {lang_color};"></span>
                    {lang}
                </div>
                <h3>What it does:</h3>
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
    print("Successfully built projects.html and updated all timestamps.")