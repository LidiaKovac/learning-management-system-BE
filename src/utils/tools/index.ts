export const get_token_from_cookies = (cookies:String) => {
    const arr = cookies.split(";") // splits in an array of string, each containing a cookie
    const token = arr[0].split("=")
    return token[1]
}