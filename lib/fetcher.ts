export default function fetcher(url: string, data = undefined) {
    return fetch(`${window.location.origin}/api/${url}`, {
        method: data ? 'POST' : 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(
        (res) => {
            const status = res.status
            if (status > 399 && status < 200) throw new Error()
            return res.json()
        },
        (error) => console.error(error)
    )
}
