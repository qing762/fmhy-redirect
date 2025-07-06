const sfwDomain = "fmhy.xyz";
const nsfwDomains = [
    "fmhy.net", 
    "fmhy.pages.dev",
    "fmhy.lol",
    "fmhy.github.io/edit",
    "fmhy.vercel.app",
    "rentry.co/FMHY",
    "github.com/fmhy/FMHY/wiki",
    "rentry.org/FMHY",
];
const currentDomain = window.location.hostname;
const currentPath = window.location.pathname;

if (nsfwDomains.some(domain => currentDomain.includes(domain))) {
    if (currentPath === "/download") {
        window.location.href = `https://${sfwDomain}/download`;
    } else {
        window.location.href = `https://${sfwDomain}`;
    }
}

function replaceUnofficialLinks() {
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        nsfwDomains.forEach(domain => {
            if (link.href.includes(domain)) {
                const url = new URL(link.href);
                url.hostname = sfwDomain;
                if (url.pathname === "/download") {
                    url.pathname = '/download';
                } else {
                    url.pathname = '';
                }
                url.search = '';
                link.href = url.toString();
            }
        });
    });
}

replaceUnofficialLinks();

const observer = new MutationObserver(replaceUnofficialLinks);
observer.observe(document.body, { childList: true, subtree: true });