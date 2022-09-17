import fetch from "node-fetch";

export async function fetchUrl(url) {
    const response = await fetch(url);

    if (response.status != 200) {
        return "Error fetching response";
    } else {
        return response.json();
    }
}