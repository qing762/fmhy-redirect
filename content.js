const sfwDomain = "fmhy.xyz";
const nsfwDomains = [
    "fmhy.net", 
    "fmhy.pages.dev",
    "fmhy.lol",
    "fmhy.github.io",
    "fmhy.vercel.app",
];

const specificFMHYUrls = [
    "rentry.co/FMHY",
    "rentry.org/FMHY", 
    "github.com/fmhy/FMHY/wiki",
    "fmhy.github.io/edit"
];

const currentDomain = window.location.hostname;
const currentPath = window.location.pathname;
const currentUrl = window.location.href;

function shouldRedirect(url) {
    if (nsfwDomains.some(domain => currentDomain === domain)) {
        return true;
    }

    return specificFMHYUrls.some(fmhyUrl => url.includes(fmhyUrl));
}

if (shouldRedirect(currentUrl)) {
    if (specificFMHYUrls.some(fmhyUrl => currentUrl.includes(fmhyUrl))) {
        window.location.href = `https://${sfwDomain}`;
    } else {
        const currentFullPath = window.location.pathname + window.location.search + window.location.hash;
        window.location.href = `https://${sfwDomain}${currentFullPath}`;
    }
}

function replaceUnofficialLinks() {
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        const originalHref = link.href;

        if (shouldRedirectLink(originalHref)) {
            const url = new URL(originalHref);

            if (specificFMHYUrls.some(fmhyUrl => originalHref.includes(fmhyUrl))) {
                link.href = `https://${sfwDomain}`;
            } else {
                url.hostname = sfwDomain;
                link.href = url.toString();
            }
        }
    });
}

function shouldRedirectLink(url) {
    try {
        const urlObj = new URL(url);

        if (nsfwDomains.some(domain => urlObj.hostname === domain)) {
            return true;
        }

        return specificFMHYUrls.some(fmhyUrl => url.includes(fmhyUrl));
    } catch (e) {
        return false;
    }
}

replaceUnofficialLinks();

const observer = new MutationObserver(replaceUnofficialLinks);
observer.observe(document.body, { childList: true, subtree: true });