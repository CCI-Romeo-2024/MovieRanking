const Youtube = (url) => {
    try {
        const urlObj = new URL(url);

        if (urlObj.hostname === "www.youtube.com" && urlObj.pathname.startsWith("/embed/")) {
            return `https://www.youtube.com/embed/${urlObj.pathname.split("/embed/")[1].split("?")[0]}`;
        }

        if (urlObj.hostname === "youtu.be") {
            return `https://www.youtube.com/embed/${urlObj.pathname.substring(1)}`;
        }

        if (urlObj.hostname.includes("youtube.com")) {
            const videoId = urlObj.searchParams.get("v");
            if (videoId) return `https://www.youtube.com/embed/${videoId}`;
        }

        throw new Error();
    } catch {
        return null;
    }
}

export { Youtube };